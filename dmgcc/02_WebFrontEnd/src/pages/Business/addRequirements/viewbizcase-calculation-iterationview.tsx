import React, { useEffect } from 'react';
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails,
    InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Button, FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { RoutePermittedRole, costLabelList, revenueLabelList } from 'shared/constants/AppConst';
import CommonStore from '@crema/services/commonstore';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { getBizProfitLossCalculationDetailRequst, getBizProfitLossCalculationListAction, getBizProfitLossIterationDetailsAction, initBizProfitLossIterationDetailnAction } from 'saga/Actions';
import { AppCard, AppConfirmDialog, AppLoader } from '@crema';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { scaleLinear } from 'd3-scale';
import RequirementDetails from './RequirementDetails';
import CustomTooltip from './totalrevenuetooltip/CustomTooltip';


const Transition: any = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    table: {
        "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)"
        }
    }
});

const ViewBizCaseCalculationIterationView = (props: any) => {
    const classes = useStyles();
    const userRole = CommonStore().userRoleType;
    const [isIterationFetched, setIsIterationFetched] = React.useState(true);
    const [isDetailResponseInitiated, setIsDetailResponseInitiated] = React.useState(false);
    const [isIterationDetailInitiated, setIsIterationDetailInitiated] = React.useState(false);
    const [activeIteration, setActiveIteration] = React.useState('');
    const [bizIterationResponse, setBizIterationResponse] = React.useState<any>(null);
    const [isConfirmDialogOpen, setConfirmDialogOpen] = React.useState<boolean>(false);
    // const [getNoteEditDetails, getNoteEditDetails] = React.useState<any>(null);
    const [getProfitLoss, setProfitLoss] = React.useState('Profit/Loss')

    const { isLoading, bizCalculationResponse, bizCalculationIterationResponse }: any = props;

    useEffect(() => {
        if (props.requirementId && props.action) {
            setIsIterationFetched(false);
            props.getBizCalculationIterationList({ biz_id: props.requirementId });
            if (props.action === "Preview") {
                props.getBizProfitCalculationDetail({ biz_id: props.requirementId })
            } else {

            }
        }
        setProfitLoss('Profit/Loss')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (bizCalculationResponse.status && !isDetailResponseInitiated) {
            const getBizInitialData: any = bizCalculationResponse.data;
            // const getBizInitialData = JSON.parse(JSON.stringify(bizCalculationResponse.data));
            setIsDetailResponseInitiated(true);
            setBizIterationResponse(getBizInitialData);
            setIsIterationFetched(false);
        }
        if (bizCalculationIterationResponse.status && !isIterationDetailInitiated) {
            const getBizInitialData = JSON.parse(JSON.stringify(bizCalculationIterationResponse.data));
            setIsIterationDetailInitiated(true);
            setBizIterationResponse(getBizInitialData);
            setIsIterationFetched(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bizCalculationResponse, bizCalculationIterationResponse]);

    const saveFinalIteration = () => {
        setConfirmDialogOpen(true);
    }

    const onDenyAction = () => {
        setConfirmDialogOpen(false);
    }

    const onConfirmAction = () => {
        if (activeIteration && bizIterationResponse) {
            props.updateFinalIterationCalculation(activeIteration, bizIterationResponse);
            setConfirmDialogOpen(false);
            // props.setIterationPreviewClose();
        }
    }
    const PdfDownload = () => {
        window.print();
    }

    return (
        <>
            <Box>
                <Dialog
                    fullScreen
                    open={props.show}
                    onClose={props.setIterationAction(false)}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: "relative" }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                Business Case Calculation {props.action}
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={props.setIterationAction(false)}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ marginTop: 4 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={8}>
                                <Button
                                    onClick={() => PdfDownload()}
                                    sx={{
                                        // position: "relative",
                                        minWidth: 75,
                                        marginLeft: 2
                                        // float: 'right'
                                    }}
                                    variant="contained"
                                    color="info">Print</Button>
                            </Grid>
                            {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                                <React.Fragment>
                                    {(props.action === 'Iteration') &&
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant='outlined' fullWidth margin='dense'>
                                                <InputLabel id='business-iteration-list-label'>Choose Iteration for Business Calculation</InputLabel>
                                                <Select
                                                    labelId='business-iteration-list-label'
                                                    id='business-iteration-list-label-standard'
                                                    name="business_iteration"
                                                    value={activeIteration}
                                                    // variant='outlined'
                                                    fullWidth
                                                    onChange={(event) => {
                                                        setIsIterationDetailInitiated(false);
                                                        setActiveIteration(event.target.value);
                                                        if (event.target.value) {
                                                            props.getBizProfitIterationCalculationDetail({ biz_id: props.requirementId, iteration_id: event.target.value })
                                                        } else {
                                                            setBizIterationResponse(null);
                                                        }
                                                    }}
                                                    label='Iteration Type'

                                                >
                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                    {(props.businessProfitIterationList.length) && props.businessProfitIterationList.map((option, optionIndex) => (
                                                        <MenuItem key={optionIndex} value={option.id}>{option.overall_Iteration}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    }
                                </React.Fragment>
                            }

                        </Grid>
                    </Box>
                    {/* This is business case calculation report chart */}
                    {
                        bizIterationResponse?
                    <Box sx={{ marginTop: 5, padding: 4, marginBottom: 6 }}>
                        <Grid container direction={'row'} spacing={{ xs: 2, md: 8 }}>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    component="h5"
                                    variant="inherit"
                                    color="inherit"
                                    sx={{
                                        fontSize: 16,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                        marginBottom: 2
                                    }}
                                >
                                    Project Details
                                </Typography>
                                <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
                                    <RequirementDetails data={bizIterationResponse} />
                                </AppCard>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    component="h5"
                                    variant="inherit"
                                    color="inherit"
                                    sx={{
                                        fontSize: 16,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                        marginBottom: 2
                                    }}
                                >
                                    Total Revenue
                                </Typography>
                                {
                                    bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.total_revenue ?
                                        <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
                                            <ResponsiveContainer width='100%' height={250}>
                                                <BarChart data={bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.total_revenue ? bizIterationResponse.graphReports.total_revenue : []}
                                                    margin={{
                                                        top: 20,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}>

                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                                    <XAxis dataKey="name" height={20} />
                                                    <YAxis />
    <Legend />

                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Bar dataKey="total_revenue" stackId="a" maxBarSize={30} fill="#06a1c5" />
                                                    <Bar dataKey="markup" stackId="a" maxBarSize={30} fill="#00677F" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </AppCard>
                                        : null
                                }

                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography
                                    component="h5"
                                    variant="inherit"
                                    color="inherit"
                                    sx={{
                                        fontSize: 16,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                        marginBottom: 2
                                    }}
                                >
                                    Profit / Profitability
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <AppCard sxStyle={{ height: 100, border: '1px solid #ccc' }} >
                                            <Box sx={{ display: "flex", alignItems: "center" }} >
                                                <Box sx={{ width: "calc(100% - 70px)" }} >
                                                    <Typography component="h3" variant="inherit" color="inherit" sx={{
                                                        overflow: "hidden", textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap", width: "100%",
                                                    }} >
                                                        {bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.profit ? bizIterationResponse.graphReports.profit : 0} Cr INR
                                                    </Typography>
                                                    <Box component="p" sx={{
                                                        pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                                        width: "100%", fontSize: 16
                                                    }} >
                                                        {'Profit'}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </AppCard>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        {
                                            bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.profitability ?
                                                <AppCard sxStyle={{ height: 100, border: '1px solid #ccc' }} >
                                                    <Box sx={{ display: "flex", alignItems: "center" }} >
                                                        <Box sx={{ width: "calc(100% - 70px)" }} >
                                                            <Typography component="h3" variant="inherit" color="inherit" sx={{
                                                                overflow: "hidden", textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap", width: "100%",
                                                            }} >
                                                                {bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.profitability ? bizIterationResponse.graphReports.profitability : 0}
                                                            </Typography>
                                                            <Box component="p" sx={{
                                                                pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                                                width: "100%", fontSize: 16
                                                            }} >
                                                                {'Profitability'}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </AppCard>
                                                : null
                                        }

                                    </Grid>
                                </Grid>

                            </Grid>
                            {
                                bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.cost ?
                                    <Grid item xs={12} md={12}>
                                        <Typography
                                            component="h5"
                                            variant="inherit"
                                            color="inherit"
                                            sx={{
                                                fontSize: 16,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                width: "100%",
                                                marginBottom: 2,
                                                marginTop: 4
                                            }}
                                        >
                                            Cost Details
                                        </Typography>
                                        <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
                                            <ResponsiveContainer width='100%' height={350}>
                                                <BarChart data={bizIterationResponse && bizIterationResponse.graphReports && bizIterationResponse.graphReports.cost ? bizIterationResponse.graphReports.cost : []}
                                                    margin={{
                                                        top: 20,
                                                    }}>
                                                    <CartesianGrid
                                                        strokeDasharray="1 10"
                                                        vertical={false}
                                                        horizontalCoordinatesGenerator={args => {
                                                            let hPoints: any = [];
                                                            const totalLines = Math.ceil(args.offset.height / 70);
                                                            const hScale = scaleLinear()
                                                                .range([args.offset.top, args.height - args.offset.bottom])
                                                                .domain([0, totalLines]);

                                                            for (let i = 0; i <= totalLines; i++) {
                                                                hPoints = [...hPoints, hScale(i)];
                                                            }
                                                            return hPoints;
                                                        }}
                                                    />
                                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                                    <XAxis dataKey="name" height={20} />
                                                    <YAxis
                                                        tickFormatter={(value) =>
                                                            new Intl.NumberFormat("en-US", {
                                                                notation: "compact",
                                                                compactDisplay: "short",
                                                            }).format(value)
                                                        }
                                                    />

                                                    <Tooltip
                                                        cursor={false}
                                                        separator=""
                                                        formatter={(value?: any, name?: any, props?: any) => {
                                                            return [props.payload.label, ''];
                                                        }}
                                                    />
                                                    <Bar fill="#00677F" dataKey="value" maxBarSize={30}>
                                                        <LabelList position="top" dataKey="label" />
                                                    </Bar>
                                                    {/* <Bar dataKey="to_do" stackId="a" maxBarSize={30} fill="#00677F" />
                                            <Bar dataKey="in_progress" stackId="a" maxBarSize={30} fill="#06a1c5" /> */}
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </AppCard>
                                    </Grid>
                                    : null
                            }

                        </Grid>
                    </Box>
:null
}

                    <Box sx={{ ml: 4, mr: 4 }}>

                        {(isLoading || isIterationFetched) ? <AppLoader /> :
                            bizIterationResponse && <Grid container direction={'row'} spacing={{ xs: 2, md: 8 }}>
                                <Grid item xs={12} md={12}>
                                    <Accordion sx={{ backgroundColor: "#f5f5f5", marginTop: 4 }} expanded={getProfitLoss === 'Profit/Loss'}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel1-content`}
                                            id={`panel1-header`}
                                        >
                                            <Typography variant={'h4'} sx={{}}>Profit/Loss Calculation</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box>
                                                <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', fontSize: 14
                                                                            }}>Cost</TableCell>
                                                                            {(bizIterationResponse['cost_info'] && bizIterationResponse['cost_info'].length) && bizIterationResponse['cost_info'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(costLabelList.length) && costLabelList.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.label}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['cost_info'] && bizIterationResponse['cost_info'].length) && bizIterationResponse['cost_info'].map((property, keyIndex) => (
                                                                                    <TableCell key={keyIndex} component='th' scope='row' align="center">
                                                                                        {property[labelProperty.key]}
                                                                                    </TableCell>
                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Revenue</TableCell>
                                                                            {(bizIterationResponse['revenue_info'] && bizIterationResponse['revenue_info'].length) && bizIterationResponse['revenue_info'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(revenueLabelList.length) && revenueLabelList.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    <Box>{labelProperty?.label}</Box>
                                                                                    <Box sx={{ marginTop: 2, color: '#ff0000', fontSize: 12 }}>{labelProperty?.note}</Box>
                                                                                </TableCell>
                                                                                {(bizIterationResponse['revenue_info'] && bizIterationResponse['revenue_info'].length) && bizIterationResponse['revenue_info'].map((property, keyIndex) => (
                                                                                    <TableCell key={keyIndex} component='th' scope='row' align="center">
                                                                                        {property[labelProperty.key]}
                                                                                    </TableCell>
                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Rampup Plan &amp; Manpower Cost</TableCell>
                                                                            {(bizIterationResponse['manpower_cost_info'] && bizIterationResponse['manpower_cost_info'].length) && bizIterationResponse['manpower_cost_info'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['manpower_cost_info'] && bizIterationResponse['manpower_cost_info'].length) && bizIterationResponse['manpower_cost_info'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['manpower_cost_info'] && bizIterationResponse['manpower_cost_info'].length) && bizIterationResponse['manpower_cost_info'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>

                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Opex Non-Manpower Cost</TableCell>
                                                                            {(bizIterationResponse['opex_non_manpower_cost_info'] && bizIterationResponse['opex_non_manpower_cost_info'].length) && bizIterationResponse['opex_non_manpower_cost_info'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['opex_non_manpower_cost_info'] && bizIterationResponse['opex_non_manpower_cost_info'].length) && bizIterationResponse['opex_non_manpower_cost_info'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['opex_non_manpower_cost_info'] && bizIterationResponse['opex_non_manpower_cost_info'].length) && bizIterationResponse['opex_non_manpower_cost_info'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Capex Non-Manpower Cost</TableCell>
                                                                            {(bizIterationResponse['copex_non_manpower_cost_info'] && bizIterationResponse['copex_non_manpower_cost_info'].length) && bizIterationResponse['copex_non_manpower_cost_info'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['copex_non_manpower_cost_info'] && bizIterationResponse['copex_non_manpower_cost_info'].length) && bizIterationResponse['copex_non_manpower_cost_info'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['copex_non_manpower_cost_info'] && bizIterationResponse['copex_non_manpower_cost_info'].length) && bizIterationResponse['copex_non_manpower_cost_info'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Transition Cost</TableCell>
                                                                            {(bizIterationResponse['transition_cost'] && bizIterationResponse['transition_cost'].length) ? bizIterationResponse['transition_cost'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            )) : null}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['transition_cost'] && bizIterationResponse['transition_cost'].length) ? bizIterationResponse['transition_cost'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['transition_cost'] && bizIterationResponse['transition_cost'].length) && bizIterationResponse['transition_cost'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        )) : <Box sx={{ padding: 2, fontSize: 14 }}>N/A</Box>}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Other Cost</TableCell>
                                                                            {(bizIterationResponse['other_cost_info'] && bizIterationResponse['other_cost_info'].length) && bizIterationResponse['other_cost_info'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['other_cost_info'] && bizIterationResponse['other_cost_info'].length) ? bizIterationResponse['other_cost_info'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['other_cost_info'] && bizIterationResponse['other_cost_info'].length) && bizIterationResponse['other_cost_info'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        )) : <Box sx={{ padding: 2, fontSize: 14 }}>N/A</Box>}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>

                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Opex Non-Manpower cost ( to be covered in the sla )</TableCell>
                                                                            {(bizIterationResponse['opex_sla_non_manpower_cost'] && bizIterationResponse['opex_sla_non_manpower_cost'].length) && bizIterationResponse['opex_sla_non_manpower_cost'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['opex_sla_non_manpower_cost'] && bizIterationResponse['opex_sla_non_manpower_cost'].length) && bizIterationResponse['opex_sla_non_manpower_cost'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['opex_sla_non_manpower_cost'] && bizIterationResponse['opex_sla_non_manpower_cost'].length) && bizIterationResponse['opex_sla_non_manpower_cost'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>Capex Non-Manpower Cost ( to be covered in the sla )</TableCell>
                                                                            {(bizIterationResponse['copex_sla_non_manpower_cost'] && bizIterationResponse['copex_sla_non_manpower_cost'].length) && bizIterationResponse['copex_sla_non_manpower_cost'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['copex_sla_non_manpower_cost'] && bizIterationResponse['copex_sla_non_manpower_cost'].length) && bizIterationResponse['copex_sla_non_manpower_cost'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['copex_sla_non_manpower_cost'] && bizIterationResponse['copex_sla_non_manpower_cost'].length) && bizIterationResponse['copex_sla_non_manpower_cost'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                    <Divider variant='middle' sx={{ my: 4 }} />
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table stickyHeader aria-label='simple table'>
                                                                    <TableHead sx={{ marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell width="15%" align="left" sx={{
                                                                                color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                            }}>SLA Total Estimation</TableCell>
                                                                            {(bizIterationResponse['sla_total_estimation'] && bizIterationResponse['sla_total_estimation'].length) && bizIterationResponse['sla_total_estimation'].map((property, index) => (
                                                                                <TableCell key={index} align="center" sx={{
                                                                                    fontWeight: 'bold', flex: 1, fontSize: 14
                                                                                }}>
                                                                                    {property?.year}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {(bizIterationResponse['sla_total_estimation'] && bizIterationResponse['sla_total_estimation'].length) && bizIterationResponse['sla_total_estimation'][0].properties.map((labelProperty, index) => (
                                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                                                <TableCell component='th' scope='row' align="left"
                                                                                    sx={{ fontWeight: 'bold' }}>
                                                                                    {labelProperty?.property_name}
                                                                                </TableCell>
                                                                                {(bizIterationResponse['sla_total_estimation'] && bizIterationResponse['sla_total_estimation'].length) && bizIterationResponse['sla_total_estimation'].map((property, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {property.properties.map((dataProperty, iIndex) => (
                                                                                            ((property.year === dataProperty.year) && (labelProperty.property_name === dataProperty.property_name)) &&
                                                                                            <TableCell key={iIndex} component='th' scope='row' align="center">
                                                                                                {dataProperty.property_value}
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>

                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} md={12}>
                                                        <TableContainer component={Paper} sx={{ mt: 4 }}>
                                                            <Table className={classes.table} stickyHeader aria-label='sticky table'>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell width="15%" align="left" sx={{
                                                                            color: '#00677f', fontWeight: 'bold', flex: 1, fontSize: 14
                                                                        }}>SLA Payout</TableCell>
                                                                        {(bizIterationResponse['sla_payout_cost'] && bizIterationResponse['sla_payout_cost'].length !== 0) && bizIterationResponse['sla_payout_cost'].map((levelProperty, index) => (
                                                                            <React.Fragment key={index}>
                                                                                <TableCell align='center' colSpan={levelProperty?.level_properties.length * 3}>
                                                                                    {levelProperty?.year}
                                                                                </TableCell>
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell align='left'>Billable Hours</TableCell>
                                                                        {(bizIterationResponse['sla_payout_cost'] && bizIterationResponse['sla_payout_cost'].length !== 0) && bizIterationResponse['sla_payout_cost'].map((levelProperty, index) => (
                                                                            <React.Fragment key={index}>
                                                                                <TableCell align='center' colSpan={levelProperty?.level_properties.length * 3}>
                                                                                    {levelProperty?.billable_hours}
                                                                                </TableCell>
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell align='left'>
                                                                            Levels
                                                                        </TableCell>
                                                                        {(bizIterationResponse['sla_payout_cost'] && bizIterationResponse['sla_payout_cost'].length !== 0) && bizIterationResponse['sla_payout_cost'].map((levelProperties, index) => (
                                                                            <React.Fragment key={index}>
                                                                                {levelProperties?.level_properties.map((levelProperty, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        <TableCell align='center' colSpan={3}>
                                                                                            {levelProperty?.level || 'All'}
                                                                                        </TableCell>
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell align='left'>
                                                                            Hourly Rate (Without markup)
                                                                        </TableCell>
                                                                        {(bizIterationResponse['sla_payout_cost'] && bizIterationResponse['sla_payout_cost'].length !== 0) && bizIterationResponse['sla_payout_cost'].map((levelProperties, index) => (
                                                                            <React.Fragment key={index}>
                                                                                {levelProperties?.level_properties.map((levelProperty, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        <TableCell align='center' colSpan={3}>
                                                                                            {levelProperty?.hourly_rate.toFixed(2)}
                                                                                        </TableCell>
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell align='left'>
                                                                            Total SLA payout cost against billable hours
                                                                        </TableCell>
                                                                        {(bizIterationResponse['sla_payout_cost'] && bizIterationResponse['sla_payout_cost'].length !== 0) && bizIterationResponse['sla_payout_cost'].map((levelProperties, index) => (
                                                                            <React.Fragment key={index}>
                                                                                {levelProperties?.level_properties.map((levelProperty, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        <TableCell align='center' colSpan={3}>
                                                                                            {levelProperty?.total_manpower_cost.toFixed(2)}
                                                                                        </TableCell>
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                    {(props.action && props.action !== 'Preview') && <Grid item xs={12} md={12}>
                                                        <Box sx={{ pt: 3, textAlign: "right", my: 4 }}>
                                                            <Button sx={{ position: "relative", minWidth: 100, marginBottom: 2 }} variant="contained"
                                                                color="inherit" type="button" onClick={saveFinalIteration}> Submit
                                                            </Button>
                                                        </Box>
                                                    </Grid>}

                                                </Paper>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Grid>}
                    </Box>
                </Dialog>
            </Box>
            <AppConfirmDialog
                open={isConfirmDialogOpen}
                onDeny={onDenyAction}
                onConfirm={onConfirmAction}
                title={'Are you sure to submit this Business Iteration ?'}
                dialogTitle={'Confirm'}
            />
        </>
    );
};


const mapStateToProps = (state: any) => ({
    calculationIsloading: state.businessCalculations.isLoading,
    calculationError: state.businessCalculations.errors,
    bizCalculationResponse: state.businessCalculations.bizCalculationResponse,
    bizCalculationIterationResponse: state.businessCalculations.bizCalculationIterationResponse,
})

const mapDispatchToProps = (dispatch: any) => ({
    initBizProfitLossIterationDetail: () => {
        dispatch(initBizProfitLossIterationDetailnAction())
    },
    getBizProfitCalculationDetail: (data: any) => {
        dispatch(getBizProfitLossCalculationDetailRequst(data))
    },
    getBizProfitIterationCalculationDetail: (data: any) => {
        dispatch(getBizProfitLossIterationDetailsAction(data))
    },
    getBizCalculationIterationList: (data: any) => {
        dispatch(getBizProfitLossCalculationListAction(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewBizCaseCalculationIterationView);
