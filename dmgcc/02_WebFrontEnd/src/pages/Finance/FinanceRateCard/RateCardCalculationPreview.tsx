import React, { useEffect } from 'react';
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Box, Grid, Accordion, AccordionSummary,
    AccordionDetails, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EuroIcon from '@mui/icons-material/Euro';
import { makeStyles } from '@mui/styles';
import { getRateCardDetailsAction, initFinanceProcessAction } from 'saga/Actions';

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

const RateCardCalculationPreview = (props: any) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('levelRateCard');
    const [bizRateCardPreview, setBizRateCardPreview] = React.useState<any>(null);
    const [isDetailResponseInitiated, setIsDetailResponseInitiated] = React.useState(false);

    const { getBizRateCardInfo }: any = props;

    const handleAccordinChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    useEffect(() => {
        if (props.action === 'leads') {
            props.getBizRateCardDetail({ bizcase_id: props?.bizRateCardDetails?.biz_id.id })
            setBizRateCardPreview(null);
        } else if (props.action === 'rateCard') {
            setBizRateCardPreview(props?.bizRateCardDetails);
            setIsDetailResponseInitiated(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (getBizRateCardInfo && getBizRateCardInfo.status && !isDetailResponseInitiated) {
            const getBizRateCardDetails = JSON.parse(JSON.stringify(getBizRateCardInfo.data));
            setBizRateCardPreview(getBizRateCardDetails);
            setIsDetailResponseInitiated(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getBizRateCardInfo])

    return (
        <>
            <Box>
                <Dialog
                    fullScreen
                    open={props.show}
                    onClose={props.setRateCardPreviewAction(false)}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: "relative" }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                Rate Card
                            </Typography>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={props.setRateCardPreviewAction(false)}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ my: 4, mx: 4 }}>
                        <Grid container direction={'row'} spacing={{ xs: 2, md: 8 }}>
                            <Grid item xs={12} md={12}>
                                <Accordion expanded={expanded === 'levelRateCard'} onChange={handleAccordinChange('levelRateCard')}
                                    sx={{ backgroundColor: "#f5f5f5" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography variant={'h4'} sx={{}}>Level Rate Card</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {(bizRateCardPreview?.total_yearly_cost && isDetailResponseInitiated) && <Box>
                                            <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
                                                <Grid container direction={'row'} spacing={2} alignItems={'center'} justifyItems={'center'}>
                                                    {/* <Grid item xs={12} md={3}>
                                                        <Typography variant={'h5'} sx={{}}>Total yearly cost without markup</Typography>
                                                    </Grid> */}
                                                    <Grid item xs={12} md={6}>
                                                        {bizRateCardPreview?.total_yearly_cost && <TextField label="Total yearly cost without markup" id="yearly_markup" name="yearly_markup"
                                                            value={bizRateCardPreview?.total_yearly_cost.toFixed(2)} fullWidth margin='dense'
                                                            variant='outlined' type='number' disabled />}
                                                    </Grid>
                                                </Grid>
                                                <Grid container direction={'row'} spacing={2} alignItems={'center'} justifyItems={'center'}>
                                                    <Grid item xs={12} md={12}>
                                                        <TableContainer component={Paper} sx={{ mt: 4 }}>
                                                            <Table className={classes.table} stickyHeader aria-label='sticky table'>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align='center'>
                                                                            Years
                                                                        </TableCell>
                                                                        {(bizRateCardPreview?.yearlybasedcalculations && bizRateCardPreview?.yearlybasedcalculations.length !== 0) && bizRateCardPreview?.yearlybasedcalculations.map((levelProperty, index) => (
                                                                            <React.Fragment key={index}>
                                                                                <TableCell align='center' colSpan={levelProperty?.level_properties.length * 3}>
                                                                                    {levelProperty?.year}
                                                                                </TableCell>
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell align='center'>
                                                                            Levels
                                                                        </TableCell>
                                                                        {(bizRateCardPreview?.yearlybasedcalculations && bizRateCardPreview?.yearlybasedcalculations.length !== 0) && bizRateCardPreview?.yearlybasedcalculations.map((levelProperties, index) => (
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
                                                                        <TableCell align='center'>
                                                                            Total working hours
                                                                        </TableCell>
                                                                        {(bizRateCardPreview?.yearlybasedcalculations && bizRateCardPreview?.yearlybasedcalculations.length !== 0) && bizRateCardPreview?.yearlybasedcalculations.map((levelProperties, index) => (
                                                                            <React.Fragment key={index}>
                                                                                {levelProperties?.level_properties.map((levelProperty, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        <TableCell align='center' colSpan={3}>
                                                                                            {levelProperty?.total_working_hours}
                                                                                        </TableCell>
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell align='center'>
                                                                            Hourly Rate (Without markup)
                                                                        </TableCell>
                                                                        {(bizRateCardPreview?.yearlybasedcalculations && bizRateCardPreview?.yearlybasedcalculations.length !== 0) && bizRateCardPreview?.yearlybasedcalculations.map((levelProperties, index) => (
                                                                            <React.Fragment key={index}>
                                                                                {levelProperties?.level_properties.map((levelProperty, keyIndex) => (
                                                                                    <React.Fragment key={keyIndex}>
                                                                                        {levelProperty?.hourly_rate.map((levelHourlyRate, levelIndex) => (
                                                                                            <TableCell align='center' key={levelIndex}>
                                                                                                {(levelHourlyRate?.rate === 'INR') && <CurrencyRupeeIcon fontSize='small' />}
                                                                                                {(levelHourlyRate?.rate === 'USD') && <AttachMoneyIcon fontSize='small' />}
                                                                                                {(levelHourlyRate?.rate === 'EUR') && <EuroIcon fontSize='small' />}
                                                                                                <p>{levelHourlyRate?.price}</p>
                                                                                            </TableCell>
                                                                                        ))}
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Box>}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>


                        </Grid>
                    </Box>
                </Dialog>
            </Box >
        </>
    );
};

const mapStateToProps = (state: any) => ({
    loading: state.businessRequirement.loading,
    error: state.businessRequirement.errors,
    isLoading: state.finance.isLoading,
    getBizRateCardInfo: state.finance.getRateCard,
})

const mapDispatchToProps = (dispatch: any) => ({
    initBizRateCardProcess: () => {
        dispatch(initFinanceProcessAction())
    },
    getBizRateCardDetail: (data: any) => {
        dispatch(getRateCardDetailsAction(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(RateCardCalculationPreview);
