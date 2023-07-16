import React, { useEffect } from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, FormControl, Grid, Typography,
    TextField, Fab, IconButton, FormHelperText, InputLabel, MenuItem, Select
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import { AppComponentHeader, AppLoader } from '../../../@crema';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import {
    appConstants,
    appRateCardConstants, appRateCardValidationSchema, financeManpowerCostConstant, rateCardOtherCostConstant, RoutePermittedRole
} from '../../../shared/constants/AppConst';
import moment from 'moment';
import { connect } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom';
import RateCardCalculationPreview from './RateCardCalculationPreview';
import DatePicker from '@mui/lab/DatePicker';
import { getRateCardDetailsAction, initCreateRateCardResetAction, initFinanceProcessAction, updateRateCardDetailsAction } from 'saga/Actions';
import { toast } from 'react-toastify';
import FinanceAdditionalRequirementsForm from './finance-additional-requirements-form';
import CommonStore from '@crema/services/commonstore';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';


const RateCardCreation = (props: any) => {
    const userRole = CommonStore().userRoleType;
    const navigate = useNavigate();
    const navState: any = useLocation();
    let formikRef: any;
    const [openRateCardPreview, setOpenRateCardPreview] = React.useState(false);
    const [expanded, setExpanded] = React.useState('otherCosts');
    const [rateCardId, setRateCardId] = React.useState(null);
    const [isDetailResponseInitiated, setIsDetailResponseInitiated] = React.useState(false);
    const [isRateCardLoading, setIsRateCardLoading] = React.useState(false);
    const [bizRateCardDetails, setBizRateCardDetails] = React.useState<any>(null);
    const [bizYearList, setBizYearList] = React.useState([]);
    const [isRateCardDisabled, setRateCardDisabled] = React.useState(false);
    const [rateCardAction, setRateCardAction] = React.useState('Add');
    const [isFetched, setIsFetched] = React.useState(true);
    const [getBizRateCard, setBizRateCard] = React.useState<any>(null);

    const { isLoading, getBizRateCardInfo, updateRateCardResponse }: any = props;

    useEffect(() => {
        if (navState.state.hasOwnProperty('info') && navState.state.info && navState.state.action) {
            props.initBizRateCardProcess();
            props.getBizRateCardDetail({ bizcase_id: navState.state.info.biz_id.id })
            if (userRole === RoutePermittedRole.Business) {
                setRateCardDisabled(true);
                setRateCardAction('View')
            } else {
                setRateCardDisabled(false);
                setRateCardAction('Add')
            }
        } else {
            goBack()
        }
        if(navState.state.info && navState.state.info.biz_id){
            setBizRateCard(navState.state.info.biz_id.business_availability)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (getBizRateCardInfo.status && !isDetailResponseInitiated) {
            const getBizRateCardDetails = JSON.parse(JSON.stringify(getBizRateCardInfo.data));
            setIsDetailResponseInitiated(true);
            setRateCardId(getBizRateCardDetails.id);
            setBizRateCardInfoBind(getBizRateCardDetails); //Set Form Data func
            setBizRateCardDetails(getBizRateCardDetails);
        }
        if (updateRateCardResponse.status) {
            toast.success(updateRateCardResponse.message, { position: 'bottom-right' });
            setIsDetailResponseInitiated(false);
            props.initCreateRateCardReset();
            props.getBizRateCardDetail({ bizcase_id: navState.state.info.biz_id.id })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getBizRateCardInfo, updateRateCardResponse])

    const setBizRateCardInfoBind = (bizRateCardResponse) => {
        if (formikRef) {
            formikRef.setFieldValue('business_case_start_date', moment(bizRateCardResponse.business_case_start_date).toDate());
            formikRef.setFieldValue('business_case_end_date', moment(bizRateCardResponse.business_case_end_date).toDate());
            formikRef.setFieldValue('requirement_cost', bizRateCardResponse.requirement_cost);
            formikRef.setFieldValue('thirdparty_cost', bizRateCardResponse.thirdparty_cost);
            formikRef.setFieldValue('manpower_total_cost', bizRateCardResponse.manpower_total_cost);
            formikRef.setFieldValue('it_cost', bizRateCardResponse.it_cost);
            formikRef.setFieldValue('facility_cost', bizRateCardResponse.facility_cost);
            formikRef.setFieldValue('travel_cost', bizRateCardResponse.travel_cost);
            formikRef.setFieldValue('system_access_cost', bizRateCardResponse.system_access_cost);
            formikRef.setFieldValue('non_manpower_total_cost', bizRateCardResponse.non_manpower_total_cost);
            formikRef.setFieldValue('thirdparty_service_cost', bizRateCardResponse.thirdparty_service_cost);
            formikRef.setFieldValue('manpower_other_cost', bizRateCardResponse.manpower_other_cost);
            if (bizRateCardResponse.business_days && bizRateCardResponse.business_days.length) {
                formikRef.setFieldValue('business_days', bizRateCardResponse.business_days);
            }
            if (bizRateCardResponse.other_costs && bizRateCardResponse.other_costs.length) {
                formikRef.setFieldValue('other_costs', bizRateCardResponse.other_costs);
            }
            if (bizRateCardResponse.finance_manpower_cost && bizRateCardResponse.finance_manpower_cost.length) {
                formikRef.setFieldValue('finance_manpower_cost', bizRateCardResponse.finance_manpower_cost);
            }
            if (bizRateCardResponse.bizit_info && bizRateCardResponse.bizit_info.length) {
                formikRef.setFieldValue('bizit_info', bizRateCardResponse.bizit_info);
            }
            if (bizRateCardResponse.bizfacility && bizRateCardResponse.bizfacility.length) {
                formikRef.setFieldValue('bizfacility', bizRateCardResponse.bizfacility);
            }
            if (bizRateCardResponse.bizsystem_access && bizRateCardResponse.bizsystem_access.length) {
                formikRef.setFieldValue('bizsystem_access', bizRateCardResponse.bizsystem_access);
            }
            if (bizRateCardResponse.bizthirdparty_service && bizRateCardResponse.bizthirdparty_service.length) {
                formikRef.setFieldValue('bizthirdparty_service', bizRateCardResponse.bizthirdparty_service);
            }
            if (bizRateCardResponse.bizother_cost && bizRateCardResponse.bizother_cost.length) {
                formikRef.setFieldValue('bizother_cost', bizRateCardResponse.bizother_cost);
            }
            if (bizRateCardResponse.bizthirdparty_cost && bizRateCardResponse.bizthirdparty_cost.length) {
                formikRef.setFieldValue('bizthirdparty_cost', bizRateCardResponse.bizthirdparty_cost);
            }
            if (bizRateCardResponse.biztravel_cost && bizRateCardResponse.biztravel_cost.length) {
                formikRef.setFieldValue('biztravel_cost', bizRateCardResponse.biztravel_cost);
            }
            if (bizRateCardResponse.manpower_inflation) {
                formikRef.setFieldValue('manpower_inflation', bizRateCardResponse.manpower_inflation);
            } else {
                formikRef.setFieldValue('manpower_inflation', 0);
            }
            if (bizRateCardResponse.markup_value) {
                formikRef.setFieldValue('markup_value', bizRateCardResponse.markup_value);
            } else {
                formikRef.setFieldValue('markup_value', 13.5);
            }
            if (bizRateCardResponse.fx_risk) {
                formikRef.setFieldValue('fx_risk', bizRateCardResponse.fx_risk);
            } else {
                formikRef.setFieldValue('fx_risk', 0);
            }
            if (bizRateCardResponse.wht_value) {
                formikRef.setFieldValue('wht_value', bizRateCardResponse.wht_value);
            } else {
                formikRef.setFieldValue('wht_value', 0);
            }
            if (bizRateCardResponse.inflation_value) {
                formikRef.setFieldValue('inflation_value', bizRateCardResponse.inflation_value);
            } else {
                formikRef.setFieldValue('inflation_value', 0);
            }
            onGetRampupRange(bizRateCardResponse.business_case_start_date, bizRateCardResponse.business_case_end_date);
            setIsRateCardLoading(false);
            setIsFetched(false);
        }
    }


    const goBack = () => {
        if(navState.state.key) {
            props.initBizRateCardProcess();
            if(navState.state.key === 'rateCard') {
                navigate('/finance/ratecard');
            } else if(navState.state.key === 'leads') {
                navigate('/business/leads-monitoring');
            }
        }
    }

    const handleAccordinChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    const setRateCardPreviewAction = (dialog) => (event) => {
        setOpenRateCardPreview(event ? dialog : false);
    }

    const calcBusinessDays = (startDate, endDate) => {
        var day = moment(startDate);
        var businessDays = 0;

        while (day.isSameOrBefore(endDate, 'day')) {
            if (day.day() !== 0 && day.day() !== 6) { businessDays++ };
            day.add(1, 'd');
        }
        return businessDays;
    }

    const onGetRampupRange = (startDate, endDate) => {
        if (startDate && endDate) {
            const bizStartDate = moment(startDate);
            const bizEndDate = moment(endDate);

            const bizYearsList: any = [];
            const bizYearsDropdownList: any = [];
            while (bizStartDate.isSameOrBefore(bizEndDate)) {
                bizStartDate.add(1, 'month');
                const yearFind = bizYearsDropdownList.some((item) => item === bizStartDate.format("YYYY"));
                if (!yearFind) {
                    bizYearsDropdownList.push(bizStartDate.format("YYYY"));
                    const bizInitStartDate = moment(startDate);
                    const bizInitEndDate = moment(endDate);
                    const yearObj: any = {
                        year: bizStartDate.format("YYYY"),
                        start_date: bizStartDate.format("YYYY-01-01"),
                        end_date: bizStartDate.format("YYYY-12-31"),
                        days: '',
                        hours: ''
                    };
                    if (bizInitStartDate.format("YYYY") === bizStartDate.format("YYYY")) {
                        yearObj['start_date'] = bizInitStartDate.format(appConstants.dateFormat);
                    }
                    if (bizInitEndDate.format("YYYY") === bizStartDate.format("YYYY")) {
                        yearObj['end_date'] = bizInitEndDate.format(appConstants.dateFormat);
                    }
                    yearObj['days'] = calcBusinessDays(yearObj.start_date, yearObj.end_date);
                    bizYearsList.push(yearObj);
                }
            }
            const bizYearRangeList = bizYearsDropdownList;
            if (bizYearRangeList.length) {
                if (bizEndDate.format("YYYY") !== bizYearRangeList[bizYearRangeList.length - 1]) {
                    bizYearsDropdownList.pop();
                    bizYearsList.pop();
                }
            }
            const bizDayFieldList: any = JSON.parse(JSON.stringify(bizYearsList));
            bizDayFieldList.forEach(element => {
                delete element['start_date'];
                delete element['end_date'];
            });
            setBizYearList(bizYearsDropdownList);
            if (formikRef) {
                formikRef.setFieldValue('business_days', bizDayFieldList);
            }

        }

    };
    
    return (
        <>
            <AppComponentHeader
                title={`${rateCardAction} Rate Card`}
                description={`${rateCardAction} Rate Card details`}
            />
            <AppGridContainer>
                {(isLoading && isFetched) ? <AppLoader /> :
                    <Grid item xs={12} style={{ marginTop: 0 }}>
                        <Card variant='outlined'>
                            <CardContent>
                                {(isLoading || isRateCardLoading) && <AppLoader />}
                                <Box style={{ marginTop: 16, marginBottom:5 }}>
                                    <Formik
                                        enableReinitialize
                                        innerRef={(action) => { formikRef = action }}
                                        initialValues={appRateCardConstants}
                                        validationSchema={appRateCardValidationSchema}
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            setSubmitting(true);
                                            if (values) {
                                                values['business_case_start_date'] = moment(values.business_case_start_date).format(appConstants.dateFormat);
                                                values['business_case_end_date'] = moment(values.business_case_end_date).format(appConstants.dateFormat);
                                                setIsFetched(true);
                                                props.updateBizRateCardDetails({
                                                    ratecard_id: rateCardId, data: values
                                                });
                                            }
                                            setSubmitting(false);
                                        }}
                                    >
                                        {({ values, errors, setFieldValue, handleChange }) => (
                                            <Form
                                                style={{ width: "100%", display: "flex", flexDirection: "column" }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <Box sx={{ flexGrow: 1, width: '100%' }}>
                                                    <Grid container spacing={{ xs: 2, md: 2 }} direction={'row'} >
                                                        <Grid item xs={12} md={6}>
                                                            <DatePicker
                                                                disabled
                                                                label='Business Case Start Date'
                                                                value={values.business_case_start_date}
                                                                onChange={handleChange}
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown}/>}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <DatePicker
                                                                disabled
                                                                label='Business Case End Date'
                                                                value={values.business_case_end_date}
                                                                onChange={(endDate) => {
                                                                    setFieldValue('business_case_end_date', endDate);
                                                                    onGetRampupRange(values.business_case_start_date, endDate);
                                                                }}
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown}/>} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography sx={{ flex: 1 }} variant='h4' component='div'> Manpower Data</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Inflation(%)" id="manpower_inflation" name="manpower_inflation" value={values.manpower_inflation}
                                                                    onChange={handleChange} margin='dense' variant='outlined' type='number'
                                                                     disabled/>
                                                                     {/* disabled={isRateCardDisabled} */}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Requirement Cost" id="requirement_cost" name="requirement_cost" value={values.requirement_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="3rd Party Manpower Cost" id="thirdparty_cost" name="thirdparty_cost" value={values.thirdparty_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Total Cost" id="manpower_total_cost" name="manpower_total_cost" value={values.manpower_total_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item xs={12} md={12}>
                                                            <Typography sx={{ flex: 1 }} variant='h4' component='div'> Non-Manpower Data</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <FinanceAdditionalRequirementsForm isRateCardDisabled={isRateCardDisabled} setFieldValue={setFieldValue} bizYearList={bizYearList} formikRef={formikRef} values={values}
                                                                handleChange={handleChange} expanded={expanded} handleAccordinChange={handleAccordinChange} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="IT Cost" id="it_cost" name="it_cost" value={values.it_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Facility Cost" id="facility_cost" name="facility_cost" value={values.facility_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Travel Cost" id="travel_cost" name="travel_cost" value={values.travel_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="System Access Cost" id="system_access_cost" name="system_access_cost" value={values.system_access_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="3rd Party Service Cost" id="thirdparty_service_cost" name="thirdparty_service_cost" value={values.thirdparty_service_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Other Cost(Business)" id="manpower_other_cost" name="manpower_other_cost" value={values.manpower_other_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item xs={12} md={4}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Total Cost" id="non_manpower_total_cost" name="non_manpower_total_cost" value={values.non_manpower_total_cost}
                                                                    onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <React.Fragment>
                                                                <Accordion expanded={expanded === 'businessDays'} onChange={handleAccordinChange('businessDays')}>
                                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls='it-content' id='it-header' sx={{ backgroundColor: "#f5f3f3" }} >
                                                                        <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Billable Days</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <FieldArray
                                                                            name="business_days"
                                                                            render={billanleDayHelpers => (
                                                                                <Box>
                                                                                    <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                                                                        {values.business_days.map((billableProperty, index) => (
                                                                                            <Grid key={index} item xs={12} md={4}>
                                                                                                <FormControl fullWidth>
                                                                                                    <TextField name={`business_days[${index}].days`}
                                                                                                        label={`${billableProperty.year}-Billable Days`} value={billableProperty.days} onChange={handleChange}
                                                                                                        margin='dense' variant='outlined' type="number" disabled={isRateCardDisabled}/>
                                                                                                    <ErrorMessage name={`business_days[${index}].days`} >{msg => <FormHelperText error>{billableProperty.year} - {msg}</FormHelperText>}</ErrorMessage>
                                                                                                </FormControl>
                                                                                            </Grid>
                                                                                        ))}
                                                                                    </Grid>
                                                                                </Box>
                                                                            )}
                                                                        />
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </React.Fragment>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <React.Fragment>
                                                                <Accordion expanded={expanded === 'otherCosts'} onChange={handleAccordinChange('otherCosts')}>
                                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls='it-content' id='it-header' sx={{ backgroundColor: "#f5f3f3" }} >
                                                                        <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Other Cost(F&amp;C)</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <FieldArray
                                                                            name="other_costs"
                                                                            render={otherCostsHelpers => (
                                                                                <Box>
                                                                                    {!isRateCardDisabled && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end" >
                                                                                        <Grid item xs={12} md={12}>
                                                                                            <Fab size='small' color='primary' aria-label='add' onClick={(event) => {
                                                                                                otherCostsHelpers.push(rateCardOtherCostConstant)
                                                                                            }}>
                                                                                                <AddIcon />
                                                                                            </Fab>
                                                                                        </Grid>
                                                                                    </Grid>}
                                                                                    {values.other_costs.map((otherCostProperty, index) => (
                                                                                        <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                                                                            <Grid item xs={12} md={3}>
                                                                                                <FormControl fullWidth>
                                                                                                    <TextField name={`other_costs[${index}].description`}
                                                                                                        label='Description' multiline value={otherCostProperty.description} onChange={handleChange}
                                                                                                        margin='dense' variant='outlined' disabled={isRateCardDisabled}
                                                                                                    />
                                                                                                </FormControl>
                                                                                            </Grid>
                                                                                            <Grid item xs={12} md={3}>
                                                                                                <FormControl fullWidth>
                                                                                                    <TextField name={`other_costs[${index}].quantity`}
                                                                                                        label='Quantity' value={otherCostProperty.quantity} onChange={handleChange}
                                                                                                        type="number" margin='dense' variant='outlined' disabled={isRateCardDisabled}
                                                                                                    />
                                                                                                </FormControl>
                                                                                            </Grid>
                                                                                            <Grid item xs={12} md={3}>
                                                                                                <FormControl fullWidth>
                                                                                                    <TextField name={`other_costs[${index}].cost`}
                                                                                                        label='Cost' value={otherCostProperty.cost} onChange={handleChange}
                                                                                                        type="number" margin='dense' variant='outlined' disabled={isRateCardDisabled}
                                                                                                    />
                                                                                                </FormControl>
                                                                                            </Grid>

                                                                                            <Grid item xs={12} md={2}>
                                                                                                <FormControl fullWidth>
                                                                                                    <InputLabel id={`other_costs[${index}].business_year-label`}>Business Year</InputLabel>
                                                                                                    <Select
                                                                                                        labelId={`other_costs[${index}].business_year-label`}
                                                                                                        id={`other_costs[${index}].business_year-label-standard`}
                                                                                                        name={`other_costs[${index}].business_year`}
                                                                                                        value={otherCostProperty.business_year}
                                                                                                        onChange={handleChange}
                                                                                                        label='Business Year'
                                                                                                        disabled={isRateCardDisabled}
                                                                                                    >
                                                                                                        <MenuItem value=''><em>None</em></MenuItem>
                                                                                                        {bizYearList.map((option) => (
                                                                                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                </FormControl>
                                                                                            </Grid>
                                                                                            <Grid item xs={12} md={1}>
                                                                                                {!isRateCardDisabled && <IconButton aria-label='delete' onClick={(event) => {
                                                                                                    otherCostsHelpers.remove(index)
                                                                                                }}>
                                                                                                    <RemoveCircleIcon />
                                                                                                </IconButton>}
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    ))}
                                                                                </Box>
                                                                            )}
                                                                        />
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </React.Fragment>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <React.Fragment>
                                                                <Accordion expanded={expanded === 'financeManpowerCosts'} onChange={handleAccordinChange('financeManpowerCosts')}>
                                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls='it-content' id='it-header' sx={{ backgroundColor: "#f5f3f3" }} >
                                                                        <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Finance Manpower Related Cost</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <FieldArray
                                                                            name="finance_manpower_cost"
                                                                            render={financeManpowerCostListHelpers => (
                                                                                <Box>
                                                                                    {!isRateCardDisabled && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end" >
                                                                                        <Grid item xs={12} md={12}>
                                                                                            <Fab size='small' color='primary' aria-label='add' onClick={(event) => {
                                                                                                financeManpowerCostListHelpers.push(financeManpowerCostConstant)
                                                                                            }}>
                                                                                                <AddIcon />
                                                                                            </Fab>
                                                                                        </Grid>
                                                                                    </Grid>}
                                                                                    {values.finance_manpower_cost.map((financeManpowerCostProperty, index) => (
                                                                                        <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                                                                            <Grid item xs={12} md={6}>
                                                                                                <FormControl fullWidth>
                                                                                                    <TextField name={`finance_manpower_cost[${index}].cost`}
                                                                                                        label='Cost' value={financeManpowerCostProperty.cost} onChange={handleChange}
                                                                                                        type="number" margin='dense' variant='outlined' disabled={isRateCardDisabled}
                                                                                                    />
                                                                                                </FormControl>
                                                                                            </Grid>
                                                                                            <Grid item xs={12} md={5}>
                                                                                                <FormControl fullWidth>
                                                                                                    <InputLabel id={`finance_manpower_cost[${index}].business_year-label`}>Business Year</InputLabel>
                                                                                                    <Select
                                                                                                        labelId={`finance_manpower_cost[${index}].business_year-label`}
                                                                                                        id={`finance_manpower_cost[${index}].business_year-label-standard`}
                                                                                                        name={`finance_manpower_cost[${index}].business_year`}
                                                                                                        value={financeManpowerCostProperty.business_year}
                                                                                                        onChange={handleChange}
                                                                                                        label='Business Year'
                                                                                                        disabled={isRateCardDisabled}
                                                                                                    >
                                                                                                        <MenuItem value=''><em>None</em></MenuItem>
                                                                                                        {bizYearList.map((option) => (
                                                                                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                                                        ))}
                                                                                                    </Select>
                                                                                                </FormControl>
                                                                                            </Grid>
                                                                                            <Grid item xs={12} md={1}>
                                                                                                {!isRateCardDisabled && <IconButton aria-label='delete' onClick={(event) => {
                                                                                                    financeManpowerCostListHelpers.remove(index)
                                                                                                }}>
                                                                                                    <RemoveCircleIcon />
                                                                                                </IconButton>}
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    ))}
                                                                                </Box>
                                                                            )}
                                                                        />
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </React.Fragment>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Markup(%)" id="markup_value" name="markup_value" value={values.markup_value}
                                                                    onChange={handleChange} margin='dense' variant='outlined' type='number'
                                                                    error={(errors?.markup_value) ? true : false} helperText={errors?.markup_value} disabled={isRateCardDisabled} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="FX Risk(%)" id="fx_risk" name="fx_risk" value={values.fx_risk}
                                                                    onChange={handleChange} margin='dense' variant='outlined' type='number'
                                                                    error={(errors?.fx_risk) ? true : false} helperText={errors?.fx_risk} disabled={isRateCardDisabled} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="WHT(%)" id="wht_value" name="wht_value" value={values.wht_value}
                                                                    onChange={handleChange} margin='dense' variant='outlined' type='number'
                                                                    error={(errors?.wht_value) ? true : false} helperText={errors?.wht_value} disabled={isRateCardDisabled} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth margin='dense'>
                                                                <TextField label="Inflation(%)" id="inflation_value" name="inflation_value" value={values.inflation_value}
                                                                    onChange={handleChange} margin='dense' variant='outlined' type='number'
                                                                    error={(errors?.inflation_value) ? true : false} helperText={errors?.inflation_value} disabled={isRateCardDisabled} />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                                <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                        color="inherit" type="button" onClick={goBack}> Cancel
                                                    </Button>
                                                    {!isRateCardDisabled && <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                        color="primary" type="submit"> Save
                                                    </Button>}
                                                    {
                                                        getBizRateCard && getBizRateCard === 'without_rate'?
                                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                        color="secondary" type="button" onClick={(event) => {
                                                            setOpenRateCardPreview(true);
                                                        }} 
                                                        disabled={bizRateCardDetails&& bizRateCardDetails.total_fx_risk !==null ?false:true}
                                                        >Calculate </Button>
                                                        :null
                                                    }
                                               
                                                </Box>

                                                {/* RateCard Preview Modal PopUp */}
                                                {openRateCardPreview && <RateCardCalculationPreview show={openRateCardPreview}
                                                    setRateCardPreviewAction={setRateCardPreviewAction} values={values} handleChange={handleChange} formikRef={formikRef} action={'rateCard'} />}
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                            </CardContent>
                        </Card>
                        {/* Iteration View Modal PopUp */}
                        {openRateCardPreview && <RateCardCalculationPreview show={openRateCardPreview} setRateCardPreviewAction={setRateCardPreviewAction} bizRateCardDetails={bizRateCardDetails}
                        action={'rateCard'} />}

                    </Grid>}
            </AppGridContainer>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    loading: state.finance.loading,
    isLoading: state.finance.isLoading,
    error: state.finance.errors,
    getBizRateCardInfo: state.finance.response,
    updateRateCardResponse: state.finance.updateResponse,
})

const mapDispatchToProps = (dispatch: any) => ({
    initBizRateCardProcess: () => {
        dispatch(initFinanceProcessAction())
    },
    initCreateRateCardReset: () => {
        dispatch(initCreateRateCardResetAction())
    },
    getBizRateCardDetail: (data: any) => {
        dispatch(getRateCardDetailsAction(data))
    },
    updateBizRateCardDetails: (data: any) => {
        dispatch(updateRateCardDetailsAction(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(RateCardCreation);
