import React from 'react';
import {
    Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel,
    Select, MenuItem, TextField, Checkbox,
} from '@mui/material';
import { FieldArray } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from '@mui/lab/DatePicker';
import { costTypeConstant, capexConstant, capexOnetimeConstant, appConstants } from '../../../shared/constants/AppConst';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

function FinanceAdditionalRequirementsForm(props: any) {
    return (
        <>
            <React.Fragment>
                {/* IT Requirement Module */}
                <React.Fragment>
                    <Accordion expanded={props?.expanded === 'itInfo'} onChange={props?.handleAccordinChange('itInfo')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='it-content' id='it-header' sx={{ backgroundColor: "#f5f3f3" }}>
                            <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>IT</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FieldArray
                                name="bizit_info"
                                render={itListHelpers => (
                                    <Box>
                                        {props?.values.bizit_info.map((itProperty, index) => (
                                            <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                <Grid item xs={12} md={1}>
                                                    <FormControl variant="standard" margin='dense'>
                                                        <Checkbox
                                                            name={`bizit_info[${index}].isratecard`}
                                                            checked={(itProperty.isratecard) ? itProperty.isratecard : false}
                                                            onChange={(event) => props?.setFieldValue(`bizit_info[${index}].isratecard`, event.target.checked)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{ mt: 4 }}
                                                            disabled={props.isRateCardDisabled}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizit_info[${index}].description`}
                                                            label='Description' variant='standard' multiline value={itProperty.description}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id={`bizit_info[${index}].remark-label`}
                                                            name={`bizit_info[${index}].remark`}
                                                            label='Remark/Comment'
                                                            multiline
                                                            variant='standard'
                                                            value={itProperty.remark}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizit_info[${index}].quantity`}
                                                            label='Quantity' variant='standard' value={itProperty.quantity} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizit_info[${index}].cost`}
                                                            label='Cost' variant='standard' value={itProperty.cost} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizit_info[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                        <Select
                                                            labelId={`bizit_info[${index}].cost_type-label`}
                                                            id={`bizit_info[${index}].cost_type-label-standard`}
                                                            name={`bizit_info[${index}].cost_type`}
                                                            value={(itProperty.cost_type) ? itProperty.cost_type : ''}
                                                            onChange={props?.handleChange}
                                                            label='Cost Type'
                                                            disabled
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
                                                            <TextField name={`bizit_info[${index}].amortization`}
                                                                label='Amortization' variant='standard' value={itProperty.amortization} onChange={props?.handleChange}
                                                                type="number" disabled />
                                                        </FormControl>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            disabled
                                                            disablePast
                                                            label='Target Date'
                                                            value={itProperty.target_date}
                                                            onAccept={(data) => {
                                                                const targetDateColumn = `bizit_info[${index}].target_date`;
                                                                const itTargetDate = moment(data);
                                                                itListHelpers.form.setFieldValue(targetDateColumn, itTargetDate.format(appConstants.dateFormat));
                                                            }}
                                                            onChange={(data) => { }}
                                                            renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizit_info[${index}].business_year-label`}>Business Year</InputLabel>
                                                        <Select
                                                            labelId={`bizit_info[${index}].business_year-label`}
                                                            id={`bizit_info[${index}].business_year-label-standard`}
                                                            name={`bizit_info[${index}].business_year`}
                                                            value={(itProperty.business_year) ? itProperty.business_year : ''}
                                                            onChange={props?.handleChange}
                                                            label='Business Year'
                                                            disabled
                                                        >
                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                            {props?.bizYearList.map((option) => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                )} />
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>
                {/* Facility Requirement Module */}
                <React.Fragment>
                    <Accordion expanded={props?.expanded === 'facilityInfo'} onChange={props?.handleAccordinChange('facilityInfo')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='facility-content' id='facility-header' sx={{ backgroundColor: "#f5f3f3" }}>
                            <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Facility</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <FieldArray
                                name="bizfacility"
                                render={facilityListHelpers => (
                                    <Box>
                                        {props?.values.bizfacility.map((facilityProperty, index) => (
                                            <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                <Grid item xs={12} md={1}>
                                                    <FormControl variant="standard" margin='dense'>
                                                        <Checkbox
                                                            name={`bizfacility[${index}].isratecard`}
                                                            checked={(facilityProperty.isratecard) ? facilityProperty.isratecard : false}
                                                            onChange={(event) => props?.setFieldValue(`bizfacility[${index}].isratecard`, event.target.checked)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{ mt: 4 }}
                                                            disabled={props.isRateCardDisabled}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizfacility[${index}].description`}
                                                            label='Description' variant='standard' multiline value={facilityProperty.description}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id={`bizfacility[${index}].remark-label`}
                                                            name={`bizfacility[${index}].remark`}
                                                            label='Meeting Rooms/Seats/Others'
                                                            multiline
                                                            variant='standard'
                                                            value={facilityProperty.remark}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizfacility[${index}].quantity`}
                                                            label='Quantity' variant='standard' value={facilityProperty.quantity} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizfacility[${index}].cost`}
                                                            label='Cost' variant='standard' value={facilityProperty.cost} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizfacility[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                        <Select
                                                            labelId={`bizfacility[${index}].cost_type-label`}
                                                            id={`bizfacility[${index}].cost_type-label-standard`}
                                                            name={`bizfacility[${index}].cost_type`}
                                                            value={(facilityProperty.cost_type) ? facilityProperty.cost_type : ''}
                                                            onChange={props?.handleChange}
                                                            label='Cost Type' disabled
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
                                                            <TextField name={`bizfacility[${index}].amortization`}
                                                                label='Amortization' variant='standard' value={facilityProperty.amortization} onChange={props?.handleChange}
                                                                type="number" disabled />
                                                        </FormControl>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            disabled
                                                            disablePast
                                                            label='Target Date'
                                                            value={facilityProperty.target_date}
                                                            onAccept={(data) => {
                                                                const targetDateColumn = `bizfacility[${index}].target_date`;
                                                                const facilityTargetDate = moment(data);
                                                                facilityListHelpers.form.setFieldValue(targetDateColumn, facilityTargetDate.format(appConstants.dateFormat));
                                                            }}
                                                            onChange={(data) => { }}
                                                            renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizfacility[${index}].business_year-label`}>Business Year</InputLabel>
                                                        <Select
                                                            labelId={`bizfacility[${index}].business_year-label`}
                                                            id={`bizfacility[${index}].business_year-label-standard`}
                                                            name={`bizfacility[${index}].business_year`}
                                                            value={(facilityProperty.business_year) ? facilityProperty.business_year : ''}
                                                            onChange={props?.handleChange}
                                                            label='Business Year' disabled
                                                        >
                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                            {props?.bizYearList.map((option) => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                )} />
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>
                {/* SystemAccess/License Requirement Module */}
                <React.Fragment>
                    <Accordion expanded={props?.expanded === 'systemAccessInfo'} onChange={props?.handleAccordinChange('systemAccessInfo')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='system-access-content' id='system-access-header' sx={{ backgroundColor: "#f5f3f3" }}>
                            <Typography variant={'h5'}>System Access/License</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FieldArray
                                name="bizsystem_access"
                                render={systemAccessListHelpers => (
                                    <Box>
                                        {props?.values.bizsystem_access.map((systemAccessProperty, index) => (
                                            <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                <Grid item xs={12} md={1}>
                                                    <FormControl variant="standard" margin='dense'>
                                                        <Checkbox
                                                            name={`bizsystem_access[${index}].isratecard`}
                                                            checked={(systemAccessProperty.isratecard) ? systemAccessProperty.isratecard : false}
                                                            onChange={(event) => props?.setFieldValue(`bizsystem_access[${index}].isratecard`, event.target.checked)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{ mt: 4 }}
                                                            disabled={props.isRateCardDisabled}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizsystem_access[${index}].description`}
                                                            label='Description' variant='standard' multiline value={systemAccessProperty.description}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizsystem_access[${index}].quantity`}
                                                            label='Quantity' variant='standard' value={systemAccessProperty.quantity} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizsystem_access[${index}].cost`}
                                                            label='Cost' variant='standard' value={systemAccessProperty.cost} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizsystem_access[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                        <Select
                                                            labelId={`bizsystem_access[${index}].cost_type-label`}
                                                            id={`bizsystem_access[${index}].cost_type-label-standard`}
                                                            name={`bizsystem_access[${index}].cost_type`}
                                                            value={(systemAccessProperty.cost_type) ? systemAccessProperty.cost_type : ''}
                                                            onChange={props?.handleChange}
                                                            label='Cost Type'
                                                            disabled
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
                                                            <TextField name={`bizsystem_access[${index}].amortization`}
                                                                label='Amortization' variant='standard' value={systemAccessProperty.amortization} onChange={props?.handleChange}
                                                                type="number" disabled />
                                                        </FormControl>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <DatePicker
                                                        disabled
                                                        disablePast
                                                        label='Target Date'
                                                        value={systemAccessProperty.target_date}
                                                        onAccept={(data) => {
                                                            const targetDateColumn = `bizsystem_access[${index}].target_date`;
                                                            const systemAccessTargetDate = moment(data);
                                                            systemAccessListHelpers.form.setFieldValue(targetDateColumn, systemAccessTargetDate.format(appConstants.dateFormat));
                                                        }}
                                                        onChange={(data) => { }}
                                                        renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizsystem_access[${index}].business_year-label`}>Business Year</InputLabel>
                                                        <Select
                                                            labelId={`bizsystem_access[${index}].business_year-label`}
                                                            id={`bizsystem_access[${index}].business_year-label-standard`}
                                                            name={`bizsystem_access[${index}].business_year`}
                                                            value={(systemAccessProperty.business_year) ? systemAccessProperty.business_year : ''}
                                                            onChange={props?.handleChange}
                                                            label='Business Year'
                                                            disabled
                                                        >
                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                            {props?.bizYearList.map((option) => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                )} />
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>
                {/* 3rd Party Service Requirement Module */}
                <React.Fragment>
                    <Accordion expanded={props?.expanded === 'thirdpartyService'} onChange={props?.handleAccordinChange('thirdpartyService')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='bizthirdparty-service-content' id='bizthirdparty-service-header' sx={{ backgroundColor: "#f5f3f3" }}>
                            <Typography variant={'h5'}>3rd Party Services</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FieldArray
                                name="bizthirdparty_service"
                                render={thirdPartyServiceListHelpers => (
                                    <Box>
                                        {props?.values.bizthirdparty_service.map((thirdPartyServiceProperty, index) => (
                                            <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                <Grid item xs={12} md={1}>
                                                    <FormControl variant="standard" margin='dense'>
                                                        <Checkbox
                                                            name={`bizthirdparty_service[${index}].isratecard`}
                                                            checked={(thirdPartyServiceProperty.isratecard) ? thirdPartyServiceProperty.isratecard : false}
                                                            onChange={(event) => props?.setFieldValue(`bizthirdparty_service[${index}].isratecard`, event.target.checked)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{ mt: 4 }}
                                                            disabled={props.isRateCardDisabled}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizthirdparty_service[${index}].description`}
                                                            label='Description' variant='standard' multiline value={thirdPartyServiceProperty.description}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizthirdparty_service[${index}].quantity`}
                                                            label='Quantity' variant='standard' value={thirdPartyServiceProperty.quantity} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizthirdparty_service[${index}].cost`}
                                                            label='Cost' variant='standard' value={thirdPartyServiceProperty.cost} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizthirdparty_service[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                        <Select
                                                            labelId={`bizthirdparty_service[${index}].cost_type-label`}
                                                            id={`bizthirdparty_service[${index}].cost_type-label-standard`}
                                                            name={`bizthirdparty_service[${index}].cost_type`}
                                                            value={(thirdPartyServiceProperty.cost_type) ? thirdPartyServiceProperty.cost_type : ''}
                                                            onChange={props?.handleChange}
                                                            label='Cost Type'
                                                            disabled
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
                                                            <TextField name={`bizthirdparty_service[${index}].amortization`}
                                                                label='Amortization' variant='standard' value={thirdPartyServiceProperty.amortization} onChange={props?.handleChange}
                                                                type="number" disabled />
                                                        </FormControl>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <DatePicker
                                                        disabled
                                                        disablePast
                                                        label='Target Date'
                                                        value={thirdPartyServiceProperty.target_date}
                                                        onAccept={(data) => {
                                                            const targetDateColumn = `bizthirdparty_service[${index}].target_date`;
                                                            const thirdPartyServiceTargetDate = moment(data);
                                                            thirdPartyServiceListHelpers.form.setFieldValue(targetDateColumn, thirdPartyServiceTargetDate.format(appConstants.dateFormat));
                                                        }}
                                                        onChange={(data) => { }}
                                                        renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizthirdparty_service[${index}].business_year-label`}>Business Year</InputLabel>
                                                        <Select
                                                            labelId={`bizthirdparty_service[${index}].business_year-label`}
                                                            id={`bizthirdparty_service[${index}].business_year-label-standard`}
                                                            name={`bizthirdparty_service[${index}].business_year`}
                                                            value={(thirdPartyServiceProperty.business_year) ? thirdPartyServiceProperty.business_year : ''}
                                                            onChange={props?.handleChange}
                                                            label='Business Year'
                                                            disabled
                                                        >
                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                            {props?.bizYearList.map((option) => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                )} />
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>
                {/* Travel Cost Requirement Module */}
                <React.Fragment>
                    <Accordion expanded={props?.expanded === 'travelCostInfo'} onChange={props?.handleAccordinChange('travelCostInfo')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='travelcost-content' id='travelcost-header' sx={{ backgroundColor: "#f5f3f3" }}>
                            <Typography variant={'h5'}>Travel Cost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FieldArray
                                name="biztravel_cost"
                                render={travelCostListHelpers => (
                                    <Box>
                                        {props?.values.biztravel_cost.map((travelCostProperty, index) => (
                                            <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>                                                
                                                <Grid item xs={12} md={3}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`biztravel_cost[${index}].description`}
                                                            label='Description' variant='standard' multiline value={travelCostProperty.description} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`biztravel_cost[${index}].cost`}
                                                            label='Cost' variant='standard' value={travelCostProperty.cost} type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`biztravel_cost[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                        <Select
                                                            labelId={`biztravel_cost[${index}].cost_type-label`}
                                                            id={`biztravel_cost[${index}].cost_type-label-standard`}
                                                            name={`biztravel_cost[${index}].cost_type`}
                                                            value={(travelCostProperty.cost_type) ? travelCostProperty.cost_type : ''}
                                                            label='Cost Type'
                                                            disabled
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
                                                            <TextField name={`biztravel_cost[${index}].amortization`}
                                                                label='Amortization' variant='standard' value={travelCostProperty.amortization}
                                                                type="number" disabled />
                                                        </FormControl>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <DatePicker
                                                        disabled
                                                        disablePast
                                                        label='Target Date'
                                                        value={travelCostProperty.target_date}
                                                        onChange={(data) => { }}
                                                        renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`biztravel_cost[${index}].business_year-label`}>Business Year</InputLabel>
                                                        <Select
                                                            labelId={`biztravel_cost[${index}].business_year-label`}
                                                            id={`biztravel_cost[${index}].business_year-label-standard`}
                                                            name={`biztravel_cost[${index}].business_year`}
                                                            value={(travelCostProperty.business_year) ? travelCostProperty.business_year : ''}
                                                            label='Business Year'
                                                            disabled
                                                        >
                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                            {props?.bizYearList.map((option) => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                )} />
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>
                {/* Other Cost Requirement Module */}
                <React.Fragment>
                    <Accordion expanded={props?.expanded === 'otherCostsInfo'} onChange={props?.handleAccordinChange('otherCostsInfo')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='other-cost-content' id='other-cost-header' sx={{ backgroundColor: "#f5f3f3" }}>
                            <Typography variant={'h5'}>Other Cost(Business)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FieldArray
                                name="bizother_cost"
                                render={otherCostsListHelpers => (
                                    <Box>
                                        {props?.values.bizother_cost.map((otherCostsProperty, index) => (
                                            <Grid key={index} container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                <Grid item xs={12} md={1}>
                                                    <FormControl variant="standard" margin='dense'>
                                                        <Checkbox
                                                            name={`bizother_cost[${index}].isratecard`}
                                                            checked={(otherCostsProperty.isratecard) ? otherCostsProperty.isratecard : false}
                                                            onChange={(event) => props?.setFieldValue(`bizother_cost[${index}].isratecard`, event.target.checked)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{ mt: 4 }}
                                                            disabled={props.isRateCardDisabled}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizother_cost[${index}].description`}
                                                            label='Description' variant='standard' multiline value={otherCostsProperty.description}
                                                            onChange={props?.handleChange} disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizother_cost[${index}].quantity`}
                                                            label='Quantity' variant='standard' value={otherCostsProperty.quantity} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField name={`bizother_cost[${index}].cost`}
                                                            label='Cost' variant='standard' value={otherCostsProperty.cost} onChange={props?.handleChange}
                                                            type="number" disabled />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizother_cost[${index}].cost_type-label`}>Cost Type</InputLabel>
                                                        <Select
                                                            labelId={`bizother_cost[${index}].cost_type-label`}
                                                            id={`bizother_cost[${index}].cost_type-label-standard`}
                                                            name={`bizother_cost[${index}].cost_type`}
                                                            value={(otherCostsProperty.cost_type) ? otherCostsProperty.cost_type : ''}
                                                            onChange={props?.handleChange}
                                                            label='Cost Type'
                                                            disabled
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
                                                            <TextField name={`bizother_cost[${index}].amortization`}
                                                                label='Amortization' variant='standard' value={otherCostsProperty.amortization} onChange={props?.handleChange}
                                                                type="number" disabled />
                                                        </FormControl>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <DatePicker
                                                        disabled
                                                        disablePast
                                                        label='Target Date'
                                                        value={otherCostsProperty.target_date}
                                                        onAccept={(data) => {
                                                            const targetDateColumn = `bizother_cost[${index}].target_date`;
                                                            const otherCostTargetDate = moment(data);
                                                            otherCostsListHelpers.form.setFieldValue(targetDateColumn, otherCostTargetDate.format(appConstants.dateFormat));
                                                        }}
                                                        onChange={(data) => { }}
                                                        renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} error={false} onKeyDown={onKeyDown}/>} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <FormControl variant='standard' fullWidth margin='dense'>
                                                        <InputLabel id={`bizother_cost[${index}].business_year-label`}>Business Year</InputLabel>
                                                        <Select
                                                            labelId={`bizother_cost[${index}].business_year-label`}
                                                            id={`bizother_cost[${index}].business_year-label-standard`}
                                                            name={`bizother_cost[${index}].business_year`}
                                                            value={(otherCostsProperty.business_year) ? otherCostsProperty.business_year : ''}
                                                            onChange={props?.handleChange}
                                                            label='Business Year'
                                                            disabled
                                                        >
                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                            {props?.bizYearList.map((option) => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                )} />
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>

            </React.Fragment>
        </>
    );
}

export default FinanceAdditionalRequirementsForm;

