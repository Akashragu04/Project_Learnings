import React from 'react'
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl,
    FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, IconButton, RadioGroup, Select, Typography,
    TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    contractOptionConstants, currencyConstants, contractStatusConstants
} from '../../../shared/constants/AppConst';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AppGridContainer } from '@crema';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const PreivoiceEditForm = (props?: any) => {
    let formikRef: any
    return (
        <Formik
            enableReinitialize
            innerRef={(action) => { formikRef = action }}
            initialValues={props.getEditData}
            // validationSchema={}
            onSubmit={(values, actions) => {
                const ProjectValue: any = {
                    slaid: props.ProjSlaId,
                    slaFormData: values
                }
                props.onSubmitData(ProjectValue)
            }}
        >
            {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => {
                return(
                <Form
                    style={{ width: "100%", display: "flex", flexDirection: "column" }}
                    noValidate
                    autoComplete="off"
                >
                    <Accordion expanded={props.expanded === 'customerDetails'} onChange={props.handleExpandChange('customerDetails')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Customer Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                <AppGridContainer>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth >
                                        <Select
                                                labelId='customer_company-list-label'
                                                id='customer_company-list-label-standard'
                                                name="customer_company"
                                                value={values.customer_company ? values.customer_company : '' }
                                                onChange={(event, value: any) => {
                                                    
                                                    setFieldValue("customer_company", value.customer_company);
                                                    if (value) {
                                                        setFieldValue("customer_address", value.address);
                                                        setFieldValue("customer_company", value.customerName);
                                                    } else {
                                                        setFieldValue("customer_address", '');
                                                        setFieldValue("customer_company", '');
                                                    }

                                                }}
                                                label='customer company'
                                            >
                                                <MenuItem value=''><em>None</em></MenuItem>
                                                {props.getCustomerList.map((option, index) => (
                                                    <MenuItem key={index} value={option.customerName}>{option.customerName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label='Address'
                                            id='outlined-size-small'
                                            name={'customer_address'}
                                            onChange={handleChange}
                                            value={values.id ? values.id : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label='Project'
                                            id='outlined-size-small'
                                            name={'project_name'}
                                            value={values.project_name ? values.project_name : ''}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth >
                                            <InputLabel id='currency-list-label'>Currency</InputLabel>
                                            <Select
                                                labelId='currency-list-label'
                                                id='currency-list-label-standard'
                                                name="currency"
                                                value={values.currency ? values.currency : '' }
                                                onChange={handleChange} 
                                                label='currency'
                                            >
                                                <MenuItem value=''><em>None</em></MenuItem>
                                                {currencyConstants.map((option, index) => (
                                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disablePast
                                                minDate={props.minEndDate}
                                                label='Start Date'
                                                value={values.start_date}
                                                onChange={startDate => { props.onCustomerStartDate('start_date', 'end_date', startDate) }}
                                                renderInput={(params) => <TextField fullWidth variant='outlined' {...params} required
                                                    error={(errors.start_date) ? true : false} helperText={errors.start_date} onKeyDown={onKeyDown}/>}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disablePast
                                                minDate={values.start_date}
                                                label='End Date'
                                                value={values.end_date}
                                                onChange={endDate => {
                                                    formikRef.setFieldValue('end_date', endDate);
                                                }}
                                                renderInput={(params) => <TextField fullWidth variant='outlined' {...params} required
                                                    error={(errors.end_date) ? true : false} helperText={errors.end_date} onKeyDown={onKeyDown}/>}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disablePast
                                                minDate={values.start_date}
                                                label='Effective Date'
                                                value={values.effective_date}
                                                onChange={effectiveDate => {
                                                    formikRef.setFieldValue('effective_date', effectiveDate);

                                                }}
                                                renderInput={(params) => <TextField fullWidth variant='outlined' {...params} required
                                                    error={(errors.effective_date) ? true : false} helperText={errors.effective_date} onKeyDown={onKeyDown}/>} />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth >
                                            <InputLabel id='Contract-list-label'>Contract Status</InputLabel>
                                            <Select
                                                labelId='contract-list-label'
                                                id='contract-list-label-standard'
                                                name="contract_status"
                                                value={values.contract_status}
                                                onChange={handleChange}
                                                label='contract'
                                            >
                                                <MenuItem value=''><em>None</em></MenuItem>
                                                {contractStatusConstants.map((option, index) => (
                                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth >
                                            <InputLabel id='Contract-option-label'>Contract Option</InputLabel>
                                            <Select
                                                labelId='contract-option-label'
                                                id='contract-list-option-standard'
                                                name="contract_option"
                                                value={values.contract_option}
                                                onChange={handleChange}
                                                label='contract'
                                            >
                                                <MenuItem value=''><em>None</em></MenuItem>
                                                {contractOptionConstants.map((option, index) => (
                                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label='Customer Cost Centre'
                                            id='outlined-size-small'
                                            //size='small'
                                            value={values.customer_cost_center}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label='Customer Cost Centre Manager'
                                            id='outlined-size-small'
                                            //size='small'
                                            value={values.customer_cost_center_manager}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl component='fieldset'>
                                            <FormLabel component='legend'>Organization</FormLabel>
                                            <RadioGroup row aria-label='organization' name='organization_type' value={values.organization_type}
                                                onChange={handleChange}>
                                                <FormControlLabel value='Daimler' control={<Radio />} label='Daimler HQ' />
                                                <FormControlLabel value='Cars' control={<Radio />} label='Car/Vans' />
                                                <FormControlLabel value='Truck' control={<Radio />} label='Truck/Buses' />
                                                <FormControlLabel value='Finacial' control={<Radio />} label='Financial Services' />
                                                <FormControlLabel value='Other' control={<Radio />} label='Other Daimler Affiliates' />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            label='Service Description'
                                            id='outlined-size-small'
                                            multiline
                                            rows={4}
                                            //size='small'
                                            value={values.service_description}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl component='fieldset'>
                                            <FormLabel component='legend'>Billing Cycle</FormLabel>
                                            <RadioGroup row aria-label='billing_cycle' name='billing_cycle' value={values.billing_cycle}
                                                onChange={handleChange}>
                                                <FormControlLabel value='YEARLY' control={<Radio />} label='Yearly' />
                                                <FormControlLabel value='HALF' control={<Radio />} label='Haly Yearly' />
                                                <FormControlLabel value='QUARTER' control={<Radio />} label='Quarterly' />
                                                <FormControlLabel value='MONTHLY' control={<Radio />} label='Monthly' />
                                                <FormControlLabel value='ONCE' control={<Radio />} label='One-Time' />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </AppGridContainer>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={props.expanded === 'tariffDetails'} onChange={props.handleExpandChange('tariffDetails')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Tariff Sheet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                            <TableContainer component={Paper}>
                                <Table aria-label='simple table'>
                                    <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Material Description</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Units</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Estimated Quantity</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Rate</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Markup</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Markup Value</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Amount</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <FieldArray
                                            name="sla_tariffsheet"
                                            render={tariffSheetListHelpers => {
                                                props.tariffHelpersRef.current = tariffSheetListHelpers
                                                return (
                                                    <React.Fragment>
                                                        {values.sla_tariffsheet.map((tariffSheetProperty, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell sx={{}}>{tariffSheetProperty.material_description}</TableCell>
                                                                <TableCell sx={{}}>{tariffSheetProperty.units}</TableCell>
                                                                <TableCell sx={{}}>{tariffSheetProperty.estimated_quantity}</TableCell>
                                                                <TableCell sx={{}}>{tariffSheetProperty.rate}</TableCell>
                                                                <TableCell sx={{}}>{tariffSheetProperty.markup_value}</TableCell>
                                                                <TableCell sx={{}}>Null</TableCell>
                                                                <TableCell sx={{}}>{tariffSheetProperty.amount}</TableCell>
                                                                <TableCell sx={{}}>
                                                                    <IconButton aria-label='delete' onClick={(event) => tariffSheetListHelpers.remove(index)}>
                                                                        <RemoveCircleIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </React.Fragment>
                                                )
                                            }}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion expanded={props.expanded === 'attachmentDetails'} onChange={props.handleExpandChange('attachmentDetails')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                        >
                            <Typography>Attachments</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                            color="inherit" type="button" onClick={(event) => { }}> Cancel
                        </Button>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                            color="primary" type="submit"> Save
                        </Button>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                            color="secondary" type="button" onClick={(event) => {
                            }} >Calculate </Button>
                    </Box>
                </Form>
            )}}
        </Formik>
    )
}

export default PreivoiceEditForm;