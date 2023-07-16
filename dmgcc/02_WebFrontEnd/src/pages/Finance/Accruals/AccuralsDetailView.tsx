import React, { useEffect } from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { TableBody, TableHead, Table, TableCell, TableRow, FormControl, Input, Box, Button } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";
import { connect } from 'react-redux'
import { getAccuralsDetailsAction, initFinanceAccuralFileRequest, initFinanceAccuralsAction, setAccuralFileDownloadAction, setAccuralFileUploadAction, updateAccuralDetailsAction } from 'saga/Actions';
import { toast } from 'react-toastify';
import { AppLoader } from '@crema';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FieldArray, Form, Formik } from 'formik';
import { accuralSLAConst } from 'shared/constants/AppConst';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AccuralsDetailView = (props?: any) => {
    let formikRef: any;
    const { accuralsInfo, accuralUploadResponse, isLoading, accuralsDownloadResponse, accuralsUpdateResponse } = props;
    // const [showUploadFile, setUploadFile] = React.useState(false);
    const [isDetailInit, setIsDetailInit] = React.useState(false);
    const [showAccuralDetails, setShowAccuralDetails] = React.useState<any>(null)
    // const [slaID, setSlaID] = React.useState<any>(null)
    const [expanded, setExpanded] = React.useState(null);
    const [isFetched, setIsFetched] = React.useState(true);


    useEffect(() => {
        props.getAccuralsDetails({ accural_id: props?.accuralDetail.id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if ((accuralsInfo && accuralsInfo.status) && !isDetailInit) {
            setIsDetailInit(true);
            setShowAccuralDetails(accuralsInfo.data);
            setAccuralsFormUpdate(accuralsInfo.data);
        }
        if (accuralUploadResponse && accuralUploadResponse.status) {
            toast.success(accuralUploadResponse.message, { position: 'bottom-right' });
            // setSlaID(null);
            setIsDetailInit(false);
            // setUploadFile(false);
            props.initAccuralFileRequest();
            props.getAccuralsDetails({ accural_id: props?.accuralDetail.id })
        }
        if (accuralsDownloadResponse && accuralsDownloadResponse.status) {
            downloadFile(accuralsDownloadResponse.data, 'sla_details.csv', accuralsDownloadResponse.headers['content-type'])
            props.initAccuralFileRequest();
        }
        if (accuralsUpdateResponse.status) {
            toast.success(accuralsUpdateResponse.message, { position: 'bottom-right' });
            goBack();
          }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accuralsInfo, accuralUploadResponse, accuralsDownloadResponse, accuralsUpdateResponse])

    const handleExpandChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const downloadFile = (data: any, fileName: any, fileType: any) => {
        const blob = new Blob([data], { type: fileType })
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const setAccuralsFormUpdate = (accuralInfo) => {
        if (formikRef) {
            formikRef.setFieldValue('accuralsList', accuralInfo);
            setIsFetched(false);
        }
    }

    const goBack = () => {
        props.initAccurals();
        props.close();
    }


    /** Total Monthly SLA Calculations */
    const onMonthWiseTotalSet = (index, tariffIndex, monthlyTariffIndex, event) => {
        const eventValue = (event.target.value) ? event.target.value : '0';
        const slaMonthColumn = `accuralsList[${index}].accurals_tarriff_data[${tariffIndex}].monthly_datas[${monthlyTariffIndex}].value`;

        if (eventValue) {
            formikRef.setFieldValue(slaMonthColumn, eventValue);
            setTimeout(() => {
                const monthlyAccuralTariffData = formikRef.values['accuralsList'][index]['accurals_tarriff_data'];
                if (monthlyAccuralTariffData.length) {
                    let monthTotal: any = 0;
                    monthlyAccuralTariffData.forEach((tariffData) => {
                        if (tariffData.tarrif_name !== 'Total') {
                            monthTotal = monthTotal + parseInt(tariffData.monthly_datas[monthlyTariffIndex].value);
                            const slaMonthTotalColumn = `accuralsList[${index}].accurals_tarriff_data[${formikRef.values['accuralsList'][index]['accurals_tarriff_data'].length - 1}].monthly_datas[${monthlyTariffIndex}].value`;
                        
                            formikRef.setFieldValue(slaMonthTotalColumn, monthTotal);
                        }
                    });
                }
            }, 500);
        }
    }

    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 1200,
                    width: "100%"
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.show}
            onClose={() => {
                props.initAccurals();
                props.close();
            }}
            title={"Accrual Details"}
        >
            <div>
                {(isLoading && isFetched) ? <div style={{ marginTop: 8, marginBottom: 8 }}>
                    <AppLoader />
                    <Typography sx={{ textAlign: 'center', marginTop: 12 }}
                        component={'h2'}>Loading.. </Typography>
                </div> :
                    <React.Fragment>
                        {
                            showAccuralDetails?
                        <Formik
                            enableReinitialize
                            innerRef={(action) => {
                                formikRef = action;
                            }}
                            initialValues={(showAccuralDetails) ? { accuralsList: showAccuralDetails } : accuralSLAConst}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                if (values) {
                                    props.updateSLAAccuralsData({ data: values['accuralsList'] });
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({
                                isSubmitting,
                                values,
                                errors,
                                touched,
                                setFieldValue,
                                handleChange,
                                handleSubmit,
                            }) => {

                                return(
                                <Form
                                    style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <React.Fragment>
                                        <FieldArray
                                            name="accuralsList"
                                            render={(accuralsListHelpers) => (

                                                <React.Fragment>
                                                    {values.accuralsList && values.accuralsList.length &&
                                                        values.accuralsList.map((accuralProperty, index) => (
                                                            <React.Fragment key={index}>
                                                                <Accordion sx={{ my: 5 }} expanded={expanded === `sla_${accuralProperty.slaid}`} onChange={handleExpandChange(`sla_${accuralProperty.slaid}`)}>
                                                                    <AccordionSummary aria-controls={`sla${accuralProperty.slaid}d-content`} id={`sla${accuralProperty.slaid}d-header`}>
                                                                        <Typography>SLA #{accuralProperty?.slaid}{(accuralProperty?.slaname) && ` - ${accuralProperty?.slaname}`} - {accuralProperty?.billing_cycle}</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <AppTableContainer>
                                                                            <Table className="table">
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                            SLA Name
                                                                                        </TableCell >
                                                                                        <TableCell>
                                                                                            Billing Cycle
                                                                                        </TableCell >
                                                                                        <TableCell>
                                                                                            Tariffs
                                                                                        </TableCell>
                                                                                        {accuralProperty.accurals_tarriff_data.length &&
                                                                                            accuralProperty.accurals_tarriff_data[0].monthly_datas.map(
                                                                                                (monthData, monIndex) => (
                                                                                                    <React.Fragment key={monIndex}>
                                                                                                        <TableCell>
                                                                                                            {monthData.month}
                                                                                                        </TableCell>
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            )}
                                                                                    </TableRow>
                                                                                </TableHead>

                                                                                <FieldArray
                                                                                    name="accurals_tarriff_data"
                                                                                    render={(accuralTariffListHelpers) => (
                                                                                        <TableBody>
                                                                                            {values.accuralsList[index]
                                                                                                .accurals_tarriff_data.length &&
                                                                                                values.accuralsList[
                                                                                                    index
                                                                                                ].accurals_tarriff_data.map(
                                                                                                    (tariffSheet, tariffIndex) => (
                                                                                                        <TableRow key={tariffIndex} >
                                                                                                            {(tariffIndex === 0) && < TableCell
                                                                                                                component="th"
                                                                                                                scope="row"
                                                                                                                align="center"
                                                                                                                style={{
                                                                                                                    backgroundColor: '#f6f6f6',
                                                                                                                    zIndex: 1,
                                                                                                                }}
                                                                                                                rowSpan={values.accuralsList[index]
                                                                                                                    .accurals_tarriff_data.length + 1}
                                                                                                            >
                                                                                                                {values.accuralsList[0].sla_name}
                                                                                                            </TableCell>}
                                                                                                            <TableCell
                                                                                                                component="th"
                                                                                                                scope="row"
                                                                                                                align="center"
                                                                                                                style={{
                                                                                                                    backgroundColor: '#f6f6f6',
                                                                                                                    zIndex: 1,
                                                                                                                }}
                                                                                                            >
                                                                                                                {
                                                                                                                    values.accuralsList[0]
                                                                                                                        .billing_cycle
                                                                                                                }
                                                                                                            </TableCell>
                                                                                                            <TableCell
                                                                                                                component="th"
                                                                                                                scope="row"
                                                                                                                align="center"
                                                                                                                style={{
                                                                                                                    backgroundColor: '#f6f6f6',
                                                                                                                    zIndex: 1,
                                                                                                                }}
                                                                                                            >
                                                                                                                {tariffSheet.tarrif_name}
                                                                                                            </TableCell>

                                                                                                            <FieldArray
                                                                                                                name="monthly_datas"
                                                                                                                render={(
                                                                                                                    monthyTariffListHelpers
                                                                                                                ) => (
                                                                                                                    <React.Fragment>
                                                                                                                        {values.accuralsList[index]
                                                                                                                            .accurals_tarriff_data[
                                                                                                                            tariffIndex
                                                                                                                        ].monthly_datas.length &&
                                                                                                                            values.accuralsList[
                                                                                                                                index
                                                                                                                            ].accurals_tarriff_data[
                                                                                                                                tariffIndex
                                                                                                                            ].monthly_datas.map(
                                                                                                                                (
                                                                                                                                    monthlyTariff,
                                                                                                                                    monthlyTariffIndex
                                                                                                                                ) => {
                                                                                                                                    return(
                                                                                                                                    <React.Fragment
                                                                                                                                        key={monthlyTariffIndex}
                                                                                                                                    >
                                                                                                                                        {monthlyTariff.active ? (
                                                                                                                                            <TableCell>
                                                                                                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                                                                    <Input id={`accuralsList[${index}].accurals_tarriff_data[${tariffIndex}].monthly_datas[${monthlyTariffIndex}].value`}
                                                                                                                                                        name={`accuralsList[${index}].accurals_tarriff_data[${tariffIndex}].monthly_datas[${monthlyTariffIndex}].value`}
                                                                                                                                                        value={monthlyTariff.value}
                                                                                                                                                        type="number"
                                                                                                                                                        onChange={(data) => onMonthWiseTotalSet(index, tariffIndex, monthlyTariffIndex, data)}
                                                                                                                                                        disabled={tariffSheet && tariffSheet.tarrif_name === "Total" ? true:false}
                                                                                                                                                    />
                                                                                                                                                </FormControl>
                                                                                                                                            </TableCell>
                                                                                                                                        ) : (
                                                                                                                                            <TableCell style={{
                                                                                                                                                backgroundColor: '#f6f6f6',
                                                                                                                                                zIndex: 1,
                                                                                                                                            }}
                                                                                                                                            >{monthlyTariff.value}</TableCell>
                                                                                                                                        )}
                                                                                                                                    </React.Fragment>
                                                                                                                                )}
                                                                                                                            )}
                                                                                                                    </React.Fragment>
                                                                                                                )}
                                                                                                            />
                                                                                                        </TableRow >
                                                                                                    )
                                                                                                )}
                                                                                        </TableBody>
                                                                                    )}
                                                                                />
                                                                            </Table>
                                                                        </AppTableContainer>
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </React.Fragment>
                                                        ))}
                                                </React.Fragment>
                                            )}
                                        />
                                        <Box sx={{ py: 1, textAlign: "right", my: 2 }}>
                                            <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                color="inherit" type="button" onClick={goBack}> Cancel
                                            </Button>
                                            <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                color="primary" type="submit" disabled={!(values.accuralsList && values.accuralsList.length)}> Save
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                </Form>
                            )}}
                        </Formik>
                        :<Box>No Data</Box>
                        }

                    </React.Fragment>
                }
            </div>
        </AppDialog >
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.financeAccurals.isLoading,
        error: state.financeAccurals.errors,
        accuralsGridData: state.financeAccurals,
        accuralsInfo: state.financeAccurals.accuralsResponse,
        accuralUploadResponse: state.financeAccurals.accuralsUploadResponse,
        accuralsDownloadResponse: state.financeAccurals.accuralsDownloadResponse,
        accuralsUpdateResponse: state.financeAccurals.accuralsUpdateResponse
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initAccurals: () => {
            dispatch(initFinanceAccuralsAction())
        },
        initAccuralFileRequest: () => {
            dispatch(initFinanceAccuralFileRequest())
        },
        getAccuralsDetails: (data: any) => {
            dispatch(getAccuralsDetailsAction(data))
        },
        uploadAccuralData: (data: any) => {
            dispatch(setAccuralFileUploadAction(data))
        },
        downloadAccuralData: (data: any) => {
            dispatch(setAccuralFileDownloadAction(data))
        },
        updateSLAAccuralsData: (data: any) => {
            dispatch(updateAccuralDetailsAction(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccuralsDetailView)  