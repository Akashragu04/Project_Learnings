import React from 'react'
import {
    Grid, Box, Button, TextField, Autocomplete, Typography, FormHelperText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArchiveIcon from '@mui/icons-material/Archive';
import { makeStyles } from '@mui/styles';
import { connect } from "react-redux";
import { provisionsFilterConst } from 'shared/constants/AppConst';
import { Form, Formik } from 'formik';
import ProvisionModalView from './ProvisionModalView';
// import LoginIcon from '@mui/icons-material/Login';
import moment from 'moment';
import {
    checkAddProvisionDetailAction,
    downloadProvisionsOverallDetailsAction,
    getAllProvisionsCostCenterAction, getAllProvisionsStatusAction,
    getProvisionsFilterDetailsAction, getProvisionsOverallMetricsAction, initProvisionsResetAction, initProvisionsUpdateAction, reqDeleteProvisionsData, setProvisionsArchieveDownloadAction, updateProvisionsDetailsAction
} from 'saga/Actions';
import { toast } from 'react-toastify';
import { provisionFilterValidationSchema } from 'shared/constants/FormConstValidations';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from 'recharts';
import { saveAs } from 'file-saver';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const RenderMixBarLegend = (props: any) => {

    const capitalize = (keyStr) => {
        let frags: any = keyStr.split('_');
        for (let i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 2, flexWrap: 'wrap' }} className="custom-legend" >
                {props?.payload.map((chartData, index) => (
                    <Box key={index} sx={{ marginRight: 2, color: chartData?.color, display: 'flex' }}>
                        <Box sx={{ background: chartData?.color, width: 15, height: 15, borderRadius: 10, marginRight: 2 }}></Box>
                        {capitalize(chartData?.dataKey)}
                    </Box>
                ))}
            </Box>
        </React.Fragment>
    )
}

const ViewProvisionsMaster = (props?: any) => {
    const { getProvisionResponse, provisionsUpdateResponse, provisionsArchieveResponse, provisionsDownloadResponse,
        provisionsChartResponse } = props;
    let formikRef: any;
    const classes = useStyles();
    const [openProvisionModalView, setProvisionModalView] = React.useState(false);
    const [monthList, setMonthList] = React.useState<any>([]);
    const [yearsList, setYearsList] = React.useState<any>([]);
    const [isProvisionDetailInitiated, setProvisionDetailInitiated] = React.useState(false);
    const [provisionResponse, setProvisionResponse] = React.useState(null);
    const [provisionFilterResponse, setProvisionFilterResponse] = React.useState<any>(null);
    const [getCostCenterValues, setCostCenterValues] = React.useState<any>(null);

    React.useEffect(() => {
        props.initProvisions();
        props.getProvisionCostCenterData();
        props.getProvisionsStatusData();
        props.getProvisionsOverallChartMetrics();
        setMonthList(moment.months());
        getYearListConst();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (!isProvisionDetailInitiated && getProvisionResponse.status && getProvisionResponse.data) {
            setProvisionDetailInitiated(true);
            setProvisionResponse(getProvisionResponse.data);
            setProvisionModalAction(true)
        }else{            
            setProvisionModalAction(false)
        }
        if (provisionsUpdateResponse.status) {
            toast.success(provisionsUpdateResponse.message, { position: 'bottom-right' });
            props.initProvisionsUpdate();
            setProvisionModalView(false);
        }
        if (provisionsArchieveResponse && provisionsArchieveResponse.status) {
            downloadFile(provisionsArchieveResponse.data, 'provisions_archieve.xlsx', provisionsArchieveResponse.headers['content-type'])
            props.initProvisionsUpdate();
        }
        if (provisionsDownloadResponse && provisionsDownloadResponse.status) {
            downloadFile(provisionsDownloadResponse.data, 'provisions_report.xlsx', provisionsDownloadResponse.headers['content-type'])
            props.initProvisionsUpdate();
        }
if(getProvisionResponse && getProvisionResponse.data){
    setProvisionModalView(true)
}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProvisionResponse, provisionsUpdateResponse, provisionsArchieveResponse, provisionsDownloadResponse])

    const getCostCenterDetails = (getValues:any)=>{
if(getValues){
    setCostCenterValues(getValues)
}else{
    setCostCenterValues(null)

}
    }
    const downloadFile = (data: any, fileName: any, fileType: any) => {
        if (data) {
            let byteCharacters;
            if (data.hasOwnProperty('status') && !data.status) {
                byteCharacters = window.atob(data.data);
            } else {
                byteCharacters = window.atob(data);
            }
            fileType = fileType || '';
            let sliceSize = 1024;
            let bytesLength = byteCharacters.length;
            let slicesCount = Math.ceil(bytesLength / sliceSize);
            let byteArrays = new Array(slicesCount);
            for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                let begin = sliceIndex * sliceSize;
                let end = Math.min(begin + sliceSize, bytesLength);
                let bytes = new Array(end - begin);
                for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            const blob = new Blob(byteArrays, { type: fileType });
            saveAs.saveAs(blob, fileName);
        }
    }

    const getYearListConst = () => {
        const max: any = parseInt(moment().add(5, 'years').format("YYYY"));
        const min: any = max - 10;
        const years: any = [];
        for (let i = min; i <= max; i++) {
            years.push(i.toString())
        }
        setYearsList(years);
    }

    const initProvisionDetails = () => {
        setProvisionDetailInitiated(false);
        if (formikRef.values) {
            props.getProvisionsFilterDetails({
                costcenter: formikRef.values.costcenter, status: formikRef.values.status,
                month: formikRef.values.month, year: formikRef.values.year
            })
        }
    }

    const setProvisionModalAction = (dialog) => (event) => {
        setProvisionModalView(event ? dialog : false);
    }

    const setProvisionModalClose = () => {
        initProvisionDetails();
        setProvisionModalView(false);
        setProvisionFilterResponse(null);
    }


    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>


            <Grid container spacing={{ xs: 2, md: 8 }}>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    {(provisionsChartResponse && provisionsChartResponse?.data) &&
                        <Typography variant={'h4'} component={'div'} sx={{ 'margin': 'auto 0' }}>Total Required Sum - {provisionsChartResponse?.data?.total_required_sum}</Typography>}
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <ResponsiveContainer height={300}>
                        <BarChart
                            data={provisionsChartResponse?.data?.provisionschart ? provisionsChartResponse?.data?.provisionschart
                                : []}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis 
                             tickFormatter={(value) =>
                                new Intl.NumberFormat("en-US", {
                                  notation: "compact",
                                  compactDisplay: "short",
                                }).format(value)
                              }
                            />
                            <Tooltip />
                            <Legend content={RenderMixBarLegend} />
                            <Bar dataKey="planned_value" barSize={40} fill="#00677f" />
                            <Bar dataKey="actual_nonrequired_sum" barSize={40} stackId="a" fill="#03c2ef" />
                            <Bar dataKey="actual_required_sum" barSize={40} stackId="a" fill="#06a1c5" />
                            <Bar dataKey="actual_invoicesubmitted_sum" barSize={40} stackId="a" fill="#00347f" />
                            <Bar dataKey="current_value" barSize={40} fill="#00677f" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 5 }}>
                    <Box style={{ marginTop: 8 }}>
                        <Formik
                            enableReinitialize
                            innerRef={(action) => { formikRef = action }}
                            initialValues={provisionsFilterConst}
                            validationSchema={provisionFilterValidationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                if (values) {
                                    setProvisionFilterResponse(values);
                                    props.getProvisionsFilterDetails({
                                        costcenter: values.costcenter, 
                                        status: values && values.status?values.status.provision_status:'',
                                        month: values.month, 
                                        year: values.year,
                                        team:getCostCenterValues && getCostCenterValues.team?getCostCenterValues.team:''
                                    })
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => (
                                <Form
                                    style={{ width: "100%", display: "flex", flexDirection: "column" }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Box>
                                        <Grid container spacing={{ xs: 2, md: 8 }}>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    onChange={(event: any, value: any) => {
                                                        setFieldValue("costcenter", value.costcenter);
                                                        setFieldValue("team", value.team);
                                                        getCostCenterDetails(value)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option.costcenter : "")}
                                                    id='costcenter'
                                                    options={props.getProvisionCostCentreList ?
                                                        props.getProvisionCostCentreList : []}
                                                    filterSelectedOptions
                                                    value={getCostCenterValues?getCostCenterValues:''}
                                                    renderInput={(params) => <TextField {...params} label='Cost Centre' />}
                                                />
                                                {errors.costcenter && <FormHelperText error>{errors.costcenter}</FormHelperText>}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    onChange={(event: any, value: any) => {
                                                        setFieldValue("year", value);
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option : "")}
                                                    id='year'
                                                    options={yearsList ? yearsList : []}
                                                    filterSelectedOptions
                                                    value={values?.year}
                                                    renderInput={(params) => <TextField {...params} label='Year' />}
                                                />
                                                {errors.year && <FormHelperText error>{errors.year}</FormHelperText>}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    onChange={(event: any, value: any) => {
                                                        setFieldValue("month", value);
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option : "")}
                                                    id='month'
                                                    options={monthList ? monthList : []}
                                                    filterSelectedOptions
                                                    value={values?.month}
                                                    renderInput={(params) => <TextField {...params} label='Month' />}
                                                />
                                                {errors.month && <FormHelperText error>{errors.month}</FormHelperText>}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    onChange={(event: any, value: any) => {
                                                        setFieldValue("status", value);
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option.provision_status : "")}
                                                    id='status'
                                                    options={props.getProvisionStatusList ?
                                                        props.getProvisionStatusList : []}
                                                    filterSelectedOptions
                                                    value={values?.status}
                                                    renderInput={(params) => <TextField {...params} label='Status Filter' />}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ pt: 3, textAlign: "right", marginTop: 4 }}>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                            color="inherit" type="button" startIcon={<ArchiveIcon />}
                                            onClick={(event) => {
                                                props.downloadProvisionArchieveDetails();
                                            }} > Archive
                                        </Button>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                            color="inherit" type="button" startIcon={<ArchiveIcon />}
                                            onClick={(event) => {
                                                props.downloadProvisionOverallDetails();
                                            }} > Download
                                        </Button>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                            color="primary" type="submit" startIcon={<SearchIcon />} > Add
                                        </Button>
                                        {/* {(provisionFilterResponse && getProvisionResponse.data) && // && getProvisionResponse.data.length !== 0
                                            <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                                color="primary" type="button" startIcon={<LoginIcon />} onClick={setProvisionModalAction(true)}> Open
                                            </Button>} */}
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                        {(openProvisionModalView && provisionFilterResponse && getProvisionResponse && getProvisionResponse.data) && <ProvisionModalView show={openProvisionModalView} setProvisionModalClose={setProvisionModalClose}
                            setProvisionModalAction={setProvisionModalAction} provisionStatusList={props.getProvisionStatusList}
                            provisionFilter={provisionFilterResponse} provisionResponse={provisionResponse} reqDeleteProvisionsData={props.reqDeleteProvisionsData}/>}
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}


const mapStateToProps = (state: any) => {
    return {
        loading: state.provisions.loading,
        getProvisionCostCentreList: state.provisions.provisionsCostCenter,
        getProvisionStatusList: state.provisions.provisionsStatus,
        getProvisionResponse: state.provisions.provisionsResponse,
        checkProvisionAddResponse: state.provisions.provisionsConditionalAddResponse,
        provisionsUpdateResponse: state.provisions.provisionsUpdateResponse,
        provisionsArchieveResponse: state.provisions.provisionsArchieveResponse,
        provisionsDownloadResponse: state.provisions.provisionsDownloadResponse,
        provisionsChartResponse: state.provisions.provisionsChartResponse,
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initProvisions: () => {
            dispatch(initProvisionsResetAction())
        },
        initProvisionsUpdate: () => {
            dispatch(initProvisionsUpdateAction())
        },
        getProvisionCostCenterData: (data: any) => {
            dispatch(getAllProvisionsCostCenterAction(data))
        },
        getProvisionsStatusData: (data: any) => {
            dispatch(getAllProvisionsStatusAction(data))
        },
        getProvisionsFilterDetails: (data: any) => {
            dispatch(getProvisionsFilterDetailsAction(data))
        },
        updateProvisionDetails: (data: any) => {
            dispatch(updateProvisionsDetailsAction(data))
        },
        downloadProvisionArchieveDetails: (data: any) => {
            dispatch(setProvisionsArchieveDownloadAction(data))
        },
        checkAddProvisionDetails: (data: any) => {
            dispatch(checkAddProvisionDetailAction(data))
        },
        downloadProvisionOverallDetails: (data: any) => {
            dispatch(downloadProvisionsOverallDetailsAction(data))
        },
        getProvisionsOverallChartMetrics: (data: any) => {
            dispatch(getProvisionsOverallMetricsAction(data))
        },
        reqDeleteProvisionsData:(getURL:any) =>{
            dispatch(reqDeleteProvisionsData(getURL))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProvisionsMaster);
