import React from 'react';
import {
    Button, IconButton, Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel,
    Select, MenuItem, TextField, Fab, Input, FormHelperText
} from '@mui/material';
import { ErrorMessage, FieldArray } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DatePicker from '@mui/lab/DatePicker';
import CheckIcon from '@mui/icons-material/Check';
import {
    facilityRequirementSchema, itRequirementSchema, systemAccessRequirementSchema, thirdPartyCostRequirementSchema,
    travelCostRequirementSchema, customerExpenseSchema, RoutePermittedRole, costTypeConstant, thirdPartyServiceRequirementSchema,
    otherCostRequirementSchema, capexConstant, capexOnetimeConstant, appConstants
} from '../../../shared/constants/AppConst';
import { AppLoader } from '@crema';
import CommonStore from '@crema/services/commonstore';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

function AdditionalRequirementsForm({ bizYearList, formikRef, onCustomerExpenseTotal, onCustomerExpenseRemoval, action, itUsersList, facilityUsersList, values, handleChange, expanded, handleAccordinChange, onSaveAndNotifyInfo }) {

    const userRole = CommonStore().userRoleType;

    const onCloneAllProperties = (moduleListHelpers, propertyList) => {
        const propertyListData = JSON.parse(JSON.stringify(propertyList));
        if (propertyListData.length) {
            propertyListData.forEach((property) => {
                property['business_year'] = '';
                moduleListHelpers.push(property);
            });
        }
    };

    const onPropertyClone = (action, moduleListHelpers, property) => {
        const propertyData = JSON.parse(JSON.stringify(property));
        propertyData['business_year'] = '';
        moduleListHelpers.push(propertyData);
    };

    return (
        <>
            <React.Fragment>
                {/* IT Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) ||
                    (userRole === RoutePermittedRole.IT) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'itInfo'} onChange={handleAccordinChange('itInfo')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='it-content' id='it-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>IT</Typography>

                                {values.it_contact_person && <Box sx={{ display: 'inline-flex', justifyContent: 'right', mr: 2 }}>
                                    {
                                        values?.isitfilledbizcas === true?
                                        <CheckIcon fontSize="medium" sx={{
                                            color: 'green', fontWeight: 'bold', position: 'relative',
                                            top: '6px', right: '2px'
                                        }} />
                                        :null
                                    }
                                    
                                    <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                                        Assigned to: {values.it_contact_person}
                                    </Typography>
                                </Box>}
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="it_info"
                                    render={itListHelpers => (
                                        <Box sx={{ marginTop: 2 }}>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end" sx={{ margin: 3 }}>
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(itListHelpers, values.it_info)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => itListHelpers.push(itRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.it_info.map((itProperty, index) => (
                                                <React.Fragment key={index} >
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`it_info[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={itProperty.description} onChange={handleChange} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`it_info[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField
                                                                    id={`it_info[${index}].remark-label`}
                                                                    name={`it_info[${index}].remark`}
                                                                    label='Remark/Comment'
                                                                    multiline
                                                                    variant='standard'
                                                                    value={itProperty.remark}
                                                                    onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`it_info[${index}].remark`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`it_info[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={itProperty.quantity} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`it_info[${index}].cost`}
                                                                    label='Cost' variant='standard' value={itProperty.cost} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`it_info[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`it_info[${index}].cost_type-label`}
                                                                    id={`it_info[${index}].cost_type-label-standard`}
                                                                    name={`it_info[${index}].cost_type`}
                                                                    value={itProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(itProperty.cost_type && (itProperty.cost_type === capexConstant || itProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`it_info[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={itProperty.amortization} onChange={handleChange}
                                                                        type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    disablePast
                                                                    label='Target Date'
                                                                    value={itProperty.target_date}
                                                                    onAccept={(data) => {
                                                                        const targetDateColumn = `it_info[${index}].target_date`;
                                                                        const itTargetDate = moment(data);
                                                                        itListHelpers.form.setFieldValue(targetDateColumn, itTargetDate.format(appConstants.dateFormat));
                                                                    }}
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                    onChange={(data) => { }}
                                                                    renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`it_info[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`it_info[${index}].business_year-label`}
                                                                    id={`it_info[${index}].business_year-label-standard`}
                                                                    name={`it_info[${index}].business_year`}
                                                                    value={itProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('IT', itListHelpers, itProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton sx={{}} aria-label='delete' onClick={(event) => itListHelpers.remove(index)}>
                                                                <RemoveCircleIcon fontSize='small' />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.it_info.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                            {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                                                <Grid container spacing={{ xs: 2, md: 8 }} direction="row" justifyContent={'flex-end'} alignContent={'flex-end'}>
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl variant='standard' fullWidth margin='dense'>
                                                            <InputLabel id='it-contact-person-list-label'>Contact Person</InputLabel>
                                                            <Select
                                                                labelId='it-contact-person-list-label'
                                                                id='it-contact-person-list-label-standard'
                                                                name="it_contact_person"
                                                                value={values.it_contact_person}
                                                                onChange={handleChange}
                                                                label='Contact Person'
                                                                defaultValue=''
                                                            >
                                                                <MenuItem value=''><em>None</em></MenuItem>
                                                                {(itUsersList.length) && itUsersList.map((option, optionIndex) => (
                                                                    <MenuItem key={optionIndex} value={option.emp_name}>{option.shortid}-{option.emp_name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('IT')} disabled={!values.it_contact_person}>Save &amp; Notify </Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* Facility Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) ||
                    (userRole === RoutePermittedRole.Facility) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'facilityInfo'} onChange={handleAccordinChange('facilityInfo')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='facility-content' id='facility-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Facility</Typography>

                                {values.fac_contact_person && <Box sx={{ display: 'inline-flex', justifyContent: 'right', mr: 2 }}>
                                {
                                        values?.isfacilityfilledbizcas === true?
                                    <CheckIcon fontSize="medium" sx={{
                                        color: 'green', fontWeight: 'bold', position: 'relative',
                                        top: '6px', right: '2px'
                                    }} />
                                    :null}
                                    <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                                        Assigned to: {values.fac_contact_person}
                                    </Typography>
                                </Box>}
                            </AccordionSummary>
                            <AccordionDetails>

                                <FieldArray
                                    name="facility"
                                    render={facilityListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(facilityListHelpers, values.facility)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => facilityListHelpers.push(facilityRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.facility.map((facilityProperty, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`facility[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={facilityProperty.description} onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`facility[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField
                                                                    id={`facility[${index}].remark-label`}
                                                                    name={`facility[${index}].remark`}
                                                                    label='Meeting Rooms/Seats/Others'
                                                                    multiline
                                                                    variant='standard'
                                                                    value={facilityProperty.remark}
                                                                    onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`facility[${index}].remark`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`facility[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={facilityProperty.quantity} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`facility[${index}].cost`}
                                                                    label='Cost' variant='standard' value={facilityProperty.cost} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`facility[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`facility[${index}].cost_type-label`}
                                                                    id={`facility[${index}].cost_type-label-standard`}
                                                                    name={`facility[${index}].cost_type`}
                                                                    value={facilityProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(facilityProperty.cost_type && (facilityProperty.cost_type === capexConstant || facilityProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`facility[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={facilityProperty.amortization} onChange={handleChange}
                                                                        type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    disablePast
                                                                    label='Target Date'
                                                                    value={facilityProperty.target_date}
                                                                    onAccept={(data) => {
                                                                        const targetDateColumn = `facility[${index}].target_date`;
                                                                        const facilityTargetDate = moment(data);
                                                                        facilityListHelpers.form.setFieldValue(targetDateColumn, facilityTargetDate.format(appConstants.dateFormat));
                                                                    }} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                    onChange={(data) => { }}
                                                                    renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`facility[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`facility[${index}].business_year-label`}
                                                                    id={`facility[${index}].business_year-label-standard`}
                                                                    name={`facility[${index}].business_year`}
                                                                    value={facilityProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('FACILITY', facilityListHelpers, facilityProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label='delete' onClick={(event) => facilityListHelpers.remove(index)}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.facility.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                            {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                                                <Grid container spacing={{ xs: 2, md: 8 }} direction="row" justifyContent={'flex-end'} alignContent={'flex-end'}>
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl variant='standard' fullWidth margin='dense'>
                                                            <InputLabel id='facility-contact-person-list-label'>Contact Person</InputLabel>
                                                            <Select
                                                                labelId='facility-contact-person-list-label'
                                                                id='facility-contact-person-list-label-standard'
                                                                name="fac_contact_person"
                                                                value={values.fac_contact_person}
                                                                onChange={handleChange}
                                                                label='Contact Person'
                                                                defaultValue='' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                            >
                                                                <MenuItem value=''><em>None</em></MenuItem>
                                                                {(facilityUsersList.length) && facilityUsersList.map((option, optionIndex) => (
                                                                    <MenuItem key={optionIndex} value={option.emp_name}>{option.shortid}-{option.emp_name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('FACILITY')} disabled={!values.fac_contact_person}>Save &amp; Notify </Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* SystemAccess/License Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'systemAccessInfo'} onChange={handleAccordinChange('systemAccessInfo')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='system-access-content' id='system-access-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography variant={'h5'}>System Access/License</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="system_access"
                                    render={systemAccessListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(systemAccessListHelpers, values.system_access)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => systemAccessListHelpers.push(systemAccessRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.system_access.map((systemAccessProperty, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`system_access[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={systemAccessProperty.description} onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`system_access[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`system_access[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={systemAccessProperty.quantity} onChange={handleChange} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                    type="number" />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`system_access[${index}].cost`}
                                                                    label='Cost' variant='standard' value={systemAccessProperty.cost} onChange={handleChange} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                    type="number" />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`system_access[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`system_access[${index}].cost_type-label`}
                                                                    id={`system_access[${index}].cost_type-label-standard`}
                                                                    name={`system_access[${index}].cost_type`}
                                                                    value={systemAccessProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(systemAccessProperty.cost_type && (systemAccessProperty.cost_type === capexConstant || systemAccessProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`system_access[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={systemAccessProperty.amortization} onChange={handleChange}
                                                                        type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <DatePicker
                                                                disablePast
                                                                label='Target Date'
                                                                value={systemAccessProperty.target_date}
                                                                onAccept={(data) => {
                                                                    const targetDateColumn = `system_access[${index}].target_date`;
                                                                    const systemAccessTargetDate = moment(data);
                                                                    systemAccessListHelpers.form.setFieldValue(targetDateColumn, systemAccessTargetDate.format(appConstants.dateFormat));
                                                                }} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                onChange={(data) => { }}
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown} />} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`system_access[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`system_access[${index}].business_year-label`}
                                                                    id={`system_access[${index}].business_year-label-standard`}
                                                                    name={`system_access[${index}].business_year`}
                                                                    value={systemAccessProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('SYSTEMACCESS', systemAccessListHelpers, systemAccessProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label='delete' onClick={(event) => systemAccessListHelpers.remove(index)}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.system_access.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('SYSTEM_ACCESS')}>Save</Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* 3rd Party Service Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'thirdpartyService'} onChange={handleAccordinChange('thirdpartyService')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='thirdparty_service-content' id='thirdparty_service-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography variant={'h5'}>3rd Party Services</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="thirdparty_service"
                                    render={thirdPartyServiceListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(thirdPartyServiceListHelpers, values.thirdparty_service)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => thirdPartyServiceListHelpers.push(thirdPartyServiceRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.thirdparty_service.map((thirdPartyServiceProperty, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`thirdparty_service[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={thirdPartyServiceProperty.description} onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`thirdparty_service[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`thirdparty_service[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={thirdPartyServiceProperty.quantity} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`thirdparty_service[${index}].cost`}
                                                                    label='Cost' variant='standard' value={thirdPartyServiceProperty.cost} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`thirdparty_service[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`thirdparty_service[${index}].cost_type-label`}
                                                                    id={`thirdparty_service[${index}].cost_type-label-standard`}
                                                                    name={`thirdparty_service[${index}].cost_type`}
                                                                    value={thirdPartyServiceProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(thirdPartyServiceProperty.cost_type && (thirdPartyServiceProperty.cost_type === capexConstant || thirdPartyServiceProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`thirdparty_service[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={thirdPartyServiceProperty.amortization} onChange={handleChange}
                                                                        type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <DatePicker
                                                                disablePast
                                                                label='Target Date'
                                                                value={thirdPartyServiceProperty.target_date}
                                                                onAccept={(data) => {
                                                                    const targetDateColumn = `thirdparty_service[${index}].target_date`;
                                                                    const thirdPartyServiceTargetDate = moment(data);
                                                                    thirdPartyServiceListHelpers.form.setFieldValue(targetDateColumn, thirdPartyServiceTargetDate.format(appConstants.dateFormat));
                                                                }} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                onChange={(data) => { }}
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`thirdparty_service[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`thirdparty_service[${index}].business_year-label`}
                                                                    id={`thirdparty_service[${index}].business_year-label-standard`}
                                                                    name={`thirdparty_service[${index}].business_year`}
                                                                    value={thirdPartyServiceProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('THIRDPARTYSERVICE', thirdPartyServiceListHelpers, thirdPartyServiceProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label='delete' onClick={(event) => thirdPartyServiceListHelpers.remove(index)}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.thirdparty_service.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('THIRD_PARTY_SERVICE')}>Save</Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* 3rd Party Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'thirdPartyCost'} onChange={handleAccordinChange('thirdPartyCost')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='thirdparty-content' id='thirdparty-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography variant={'h5'}>3rd Party Cost</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="thirdparty_cost"
                                    render={thirdPartyListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(thirdPartyListHelpers, values.thirdparty_cost)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => thirdPartyListHelpers.push(thirdPartyCostRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.thirdparty_cost.map((thirdpartyProperty, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`thirdparty_cost[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={thirdpartyProperty.description} onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`thirdparty_cost[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`thirdparty_cost[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={thirdpartyProperty.quantity} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`thirdparty_cost[${index}].cost`}
                                                                    label='Cost' variant='standard' value={thirdpartyProperty.cost} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField
                                                                    id={`thirdparty_cost[${index}].purchase_order-label`}
                                                                    name={`thirdparty_cost[${index}].purchase_order`}
                                                                    label='Purchase Order'
                                                                    multiline
                                                                    variant='standard'
                                                                    value={thirdpartyProperty.purchase_order}
                                                                    onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`thirdparty_cost[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`thirdparty_cost[${index}].cost_type-label`}
                                                                    id={`thirdparty_cost[${index}].cost_type-label-standard`}
                                                                    name={`thirdparty_cost[${index}].cost_type`}
                                                                    value={thirdpartyProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type' disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(thirdpartyProperty.cost_type && (thirdpartyProperty.cost_type === capexConstant || thirdpartyProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`thirdparty_cost[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={thirdpartyProperty.amortization} onChange={handleChange}
                                                                        type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <DatePicker
                                                                disablePast
                                                                label='Target Date'
                                                                value={thirdpartyProperty.target_date}
                                                                onAccept={(data) => {
                                                                    const targetDateColumn = `thirdparty_cost[${index}].target_date`;
                                                                    const thirdPartyTargetDate = moment(data);
                                                                    thirdPartyListHelpers.form.setFieldValue(targetDateColumn, thirdPartyTargetDate.format(appConstants.dateFormat));
                                                                }} disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                onChange={(data) => { }}
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`thirdparty_cost[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`thirdparty_cost[${index}].business_year-label`}
                                                                    id={`thirdparty_cost[${index}].business_year-label-standard`}
                                                                    name={`thirdparty_cost[${index}].business_year`}
                                                                    value={thirdpartyProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('THIRDPARTY', thirdPartyListHelpers, thirdpartyProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label='delete' onClick={(event) => thirdPartyListHelpers.remove(index)}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.thirdparty_cost.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('THIRD_PARTY_COST')}>Save</Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* Travel Cost Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'travelCostInfo'} onChange={handleAccordinChange('travelCostInfo')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='travelcost-content' id='travelcost-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography variant={'h5'}>Travel Cost</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="travel_cost"
                                    render={travelCostListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(travelCostListHelpers, values.travel_cost)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => travelCostListHelpers.push(travelCostRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.travel_cost.map((travelCostProperty, index) => (
                                                <React.Fragment key={index} >
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`travel_cost[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={travelCostProperty.description} onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`travel_cost[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`travel_cost[${index}].cost`}
                                                                    label='Cost' variant='standard' value={travelCostProperty.cost} onChange={handleChange}
                                                                    type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`travel_cost[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`travel_cost[${index}].cost_type-label`}
                                                                    id={`travel_cost[${index}].cost_type-label-standard`}
                                                                    name={`travel_cost[${index}].cost_type`}
                                                                    value={travelCostProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(travelCostProperty.cost_type && (travelCostProperty.cost_type === capexConstant || travelCostProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`travel_cost[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={travelCostProperty.amortization} onChange={handleChange}
                                                                        type="number"  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <DatePicker
                                                                disablePast
                                                                label='Target Date'
                                                                value={travelCostProperty.target_date}
                                                                onAccept={(data) => {
                                                                    const targetDateColumn = `travel_cost[${index}].target_date`;
                                                                    const travelCostTargetDate = moment(data);
                                                                    travelCostListHelpers.form.setFieldValue(targetDateColumn, travelCostTargetDate.format(appConstants.dateFormat));
                                                                }}
                                                                disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                onChange={(data) => { }}
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`travel_cost[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`travel_cost[${index}].business_year-label`}
                                                                    id={`travel_cost[${index}].business_year-label-standard`}
                                                                    name={`travel_cost[${index}].business_year`}
                                                                    value={travelCostProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('TRAVELCOST', travelCostListHelpers, travelCostProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label='delete' onClick={(event) => travelCostListHelpers.remove(index)}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.travel_cost.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('TRAVEL_COST')}>Save</Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* Other Cost Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'otherCostsInfo'} onChange={handleAccordinChange('otherCostsInfo')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='other-cost-content' id='other-cost-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography variant={'h5'}>Other Cost(Business)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="other_cost"
                                    render={otherCostsListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab sx={{ mx: 1 }} variant='extended' size='medium' color='primary' aria-label='add'
                                                        onClick={(event) => onCloneAllProperties(otherCostsListHelpers, values.other_cost)}>
                                                        <ContentCopyIcon fontSize='small' />
                                                        Clone All
                                                    </Fab>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => otherCostsListHelpers.push(otherCostRequirementSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.other_cost.map((otherCostsProperty, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`other_cost[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={otherCostsProperty.description} onChange={handleChange} 
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`other_cost[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`other_cost[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={otherCostsProperty.quantity} onChange={handleChange}
                                                                    type="number" 
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`other_cost[${index}].cost`}
                                                                    label='Cost' variant='standard' value={otherCostsProperty.cost} onChange={handleChange}
                                                                    type="number" 
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`other_cost[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`other_cost[${index}].cost_type-label`}
                                                                    id={`other_cost[${index}].cost_type-label-standard`}
                                                                    name={`other_cost[${index}].cost_type`}
                                                                    value={otherCostsProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(otherCostsProperty.cost_type && (otherCostsProperty.cost_type === capexConstant || otherCostsProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`other_cost[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={otherCostsProperty.amortization} onChange={handleChange}
                                                                        type="number" 
                                                                        disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <DatePicker
                                                                disablePast
                                                                label='Target Date'
                                                                value={otherCostsProperty.target_date}
                                                                onAccept={(data) => {
                                                                    const targetDateColumn = `other_cost[${index}].target_date`;
                                                                    const otherCostTargetDate = moment(data);
                                                                    otherCostsListHelpers.form.setFieldValue(targetDateColumn, otherCostTargetDate.format(appConstants.dateFormat));
                                                                }}
                                                                onChange={(data) => { }}
                                                                disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`other_cost[${index}].business_year-label`}>Business Year</InputLabel>
                                                                <Select
                                                                    labelId={`other_cost[${index}].business_year-label`}
                                                                    id={`other_cost[${index}].business_year-label-standard`}
                                                                    name={`other_cost[${index}].business_year`}
                                                                    value={otherCostsProperty.business_year}
                                                                    onChange={handleChange}
                                                                    label='Business Year'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {bizYearList.map((option) => (
                                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton sx={{}} aria-label='clone' onClick={(event) => onPropertyClone('OTHERCOST', otherCostsListHelpers, otherCostsProperty)}>
                                                                <ContentCopyIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label='delete' onClick={(event) => otherCostsListHelpers.remove(index)}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.other_cost.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                    )} />
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('OTHER_COST')}>Save</Button>
                                </Box>}
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}
                {/* Customer Expense Requirement Module */}
                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) &&
                    <React.Fragment>
                        <Accordion expanded={expanded === 'customerExpenseInfo'} onChange={handleAccordinChange('customerExpenseInfo')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='customerExpense-content' id='customerExpense-header' sx={{ backgroundColor: "#f5f3f3" }}>
                                <Typography variant={'h5'}>Customer Expenses</Typography>
                                {(values.isCalculating) && <AppLoader />}
                            </AccordionSummary>
                            <AccordionDetails>
                                <FieldArray
                                    name="customer_expenses"
                                    render={customerExpenseListHelpers => (
                                        <Box>
                                            {(userRole !== RoutePermittedRole.Finance) && <Grid container spacing={{ xs: 2, md: 8 }} direction="column" alignItems="flex-end" justifyContent="flex-end">
                                                <Grid item xs={12} md={12}>
                                                    <Fab size='small' color='primary' aria-label='add' onClick={(event) => customerExpenseListHelpers.push(customerExpenseSchema)}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>}
                                            {values.customer_expenses.map((customerExpenseProperty, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`customer_expenses[${index}].section_type-label`}>Section Type</InputLabel>
                                                                <Select
                                                                    labelId={`customer_expenses[${index}].section_type-label`}
                                                                    id={`customer_expenses[${index}].section_type-label-standard`}
                                                                    name={`customer_expenses[${index}].section_type`}
                                                                    value={customerExpenseProperty.section_type}
                                                                    onChange={handleChange}
                                                                    label='Section Type'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    <MenuItem value={'manpower_cost'}>Manpower Cost</MenuItem>
                                                                    <MenuItem value={'it_cost'}>IT Cost</MenuItem>
                                                                    <MenuItem value={'facility_cost'}>Facility Cost</MenuItem>
                                                                    <MenuItem value={'system_access_cost'}>System Access Cost</MenuItem>
                                                                    <MenuItem value={'thirdparty_cost'}>3rd Party Cost</MenuItem>
                                                                    <MenuItem value={'travel_cost'}>Travel Cost</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`customer_expenses[${index}].description`}
                                                                    label='Description' variant='standard' multiline value={customerExpenseProperty.description} onChange={handleChange}  disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`customer_expenses[${index}].description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField
                                                                    id={`customer_expenses[${index}].remark-label`}
                                                                    name={`customer_expenses[${index}].remark`}
                                                                    label='Remark/Comment'
                                                                    multiline
                                                                    variant='standard'
                                                                    value={customerExpenseProperty.remark}
                                                                    onChange={handleChange} 
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} />
                                                                <ErrorMessage name={`customer_expenses[${index}].remark`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <TextField name={`customer_expenses[${index}].quantity`}
                                                                    label='Quantity' variant='standard' value={customerExpenseProperty.quantity} onChange={handleChange}
                                                                    type="number"
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false}  />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                <InputLabel htmlFor={`customer_expenses[${index}].cost`}>Cost</InputLabel>
                                                                <Input id={`customer_expenses[${index}].cost`} name={`customer_expenses[${index}].cost`}
                                                                    value={customerExpenseProperty.cost} onChange={(data) => onCustomerExpenseTotal(index, data)} type="number"
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false}  />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                                <InputLabel id={`customer_expenses[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                                <Select
                                                                    labelId={`customer_expenses[${index}].cost_type-label`}
                                                                    id={`customer_expenses[${index}].cost_type-label-standard`}
                                                                    name={`customer_expenses[${index}].cost_type`}
                                                                    value={customerExpenseProperty.cost_type}
                                                                    onChange={handleChange}
                                                                    label='Cost Type'
                                                                    disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                >
                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                    {costTypeConstant.map((option, optionIndex) => (
                                                                        <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {(customerExpenseProperty.cost_type && (customerExpenseProperty.cost_type === capexConstant || customerExpenseProperty.cost_type === capexOnetimeConstant)) &&
                                                            <Grid item xs={12} md={2}>
                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                    <TextField name={`customer_expenses[${index}].amortization`}
                                                                        label='Amortization(Years)' variant='standard' value={customerExpenseProperty.amortization} onChange={handleChange}
                                                                        type="number"
                                                                        disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false}  />
                                                                </FormControl>
                                                            </Grid>
                                                        }
                                                        <Grid item xs={12} md={2}>
                                                            <DatePicker
                                                                disablePast
                                                                label='Target Date'
                                                                value={customerExpenseProperty.target_date}
                                                                onAccept={(data) => {
                                                                    const targetDateColumn = `customer_expenses[${index}].target_date`;
                                                                    const customerExpenseTargetDate = moment(data);
                                                                    customerExpenseListHelpers.form.setFieldValue(targetDateColumn, customerExpenseTargetDate.format(appConstants.dateFormat));
                                                                }}
                                                                onChange={(data) => { }}
                                                                disabled={(userRole && userRole === RoutePermittedRole.Finance)?true:false} 
                                                                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>}

                                                            />
                                                        </Grid>
                                                        {(userRole !== RoutePermittedRole.Finance) && <Grid item xs={12} md={1}>
                                                            <IconButton aria-label='delete' onClick={(event) => {
                                                                onCustomerExpenseRemoval(customerExpenseListHelpers, index, event);
                                                            }}>
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        </Grid>}
                                                    </Grid>
                                                    {(index !== (values.customer_expenses.length - 1)) && <hr style={{ border: '1px solid #cfcfcf', margin: '16px 0' }} />}
                                                </React.Fragment>
                                            ))}
                                            <Grid container spacing={{ xs: 2, md: 8 }} direction="row" justifyContent={'flex-end'} alignContent={'flex-end'}>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`customer_expense_total`} type="number"
                                                            label='Total' variant='standard' value={values.customer_expense_total} onChange={handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )} />
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>}

            </React.Fragment>
        </>
    );
}

export default AdditionalRequirementsForm;

