import React from 'react';
import { Grid, Box, Typography, Button, Select, MenuItem, FormControl, TextField, InputLabel, } from '@mui/material';
import { Formik, Form, FieldArray, } from 'formik';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { onKeyDown, onNumbervalition } from '@crema/commonservices/CommonFileDownload';

const SystemAccessForm = (props:any) => {
    let formikRef: any;
    const [remainingQunt, setRemainingQunt] = React.useState(false)
    
    //This is function use to check quantity details
    const onChangeQuantity = (getRemark?: any, index?: any) => {
        if(props.getBizCaseSetupChart){
          let getPassValues:any =  onNumbervalition(getRemark)
          if(getPassValues){
            props.getBizCaseSetupChart.system_access_info.forEach((items: any, i: any) => {
                if (i === index) {
                    let remainingValues: any;
                    if (items.quantity) {
                        remainingValues = items.quantity - getRemark;
                    }
                    if (parseInt(getRemark) <= parseInt(items.quantity)) {
                        formikRef.setFieldValue(`systemAceess.${index}.remaining_quantity`, String(remainingValues))
                        setRemainingQunt(false)
                    } else {
                        formikRef.setFieldValue(`systemAceess.${index}.remaining_quantity`, '')
                        toast.error('Should not be more than Estimations Quantity', { position: 'bottom-right' });
                        setRemainingQunt(true)
                    }
                }
            })
          }else{
            setRemainingQunt(true)
            toast.error('Invalid quantity', { position: 'bottom-right' });
          }
        
        }
      
    }
    return (
        <Box sx={{ marginTop: 5, padding: 5 }}>
            <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
                System Access Setup
            </Typography>
            <Box sx={{ border: "1px solid #ccc", padding: 5 }}>
                <Formik
                    validateOnChange
                    initialValues={props.getSystemAccess}
                    enableReinitialize
                    innerRef={res => formikRef = res}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const postData: any = {
                            system_access_info: props.setBizCaseSetupData,
                            system_access_data: values.systemAceess
                        }
                        props.putBusinessCaseSetup(postData)
                    }}
                >
                    {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => {
                        const facilityValue: any = values;
                        return (
                            <Form
                                style={{ width: "100%", display: "flex", flexDirection: "column" }}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} style={{ marginTop: 0 }}>
                                        <FieldArray
                                            name="systemAceess"
                                            render={({ insert, remove, push }) => (
                                                <Box>
                                                    {
                                                        facilityValue.systemAceess ?
                                                            facilityValue.systemAceess.map((facilityProperty: any, index: any) => (
                                                                <Box className='flexcolumbox' sx={{marginBottom:5}}>
                                                               {/* <Grid key={index} container direction="row" alignItems="center" */}
                                                                    {/* justifyContent="center" sx={{ marginTop: 6 }} spacing={4} > */}
                                                                    <Grid item xs={12} md={3} sx={{marginRight:2}}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`systemAceess[${index}].description`}
                                                                                label='Description' variant='outlined' multiline value={facilityProperty.description}
                                                                                onChange={handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={3} sx={{marginRight:2}}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField
                                                                                name={`systemAceess.${index}.remark`}
                                                                                label='Remark/Comment'
                                                                                multiline
                                                                                variant='outlined' value={facilityProperty.remark}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`systemAceess.${index}.quantity`} value={facilityProperty.quantity}
                                                                                label='Quantity' variant='outlined' onChange={(e?: any) => {
                                                                                    setFieldValue(`systemAceess.${index}.quantity`, e.target.value)
                                                                                    onChangeQuantity(e.target.value, index)
                                                                                }}
                                                                                type="number"
                                                                                InputProps={{
                                                                                    inputProps: {
                                                                                        max: 1000000, min: 0
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`systemAceess.${index}.remaining_quantity`}
                                                                                value={facilityProperty.remaining_quantity}
                                                                                label='Remaining Quantity' variant='outlined' onChange={handleChange}
                                                                                disabled />
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`systemAceess.${index}.cost`} label='Cost' variant='outlined' onChange={handleChange}
                                                                                value={facilityProperty.cost}
                                                                                type="number"
                                                                                InputProps={{
                                                                                    inputProps: {
                                                                                        max: 100000000, min: 0
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`systemAceess[${index}].cost_type`}>Cost Type</InputLabel>
                                                                            <Select
                                                                                labelId={`systemAceess[${index}].cost_type`}
                                                                                name={`systemAceess.${index}.cost_type`}
                                                                                onChange={handleChange}
                                                                                value={facilityProperty.cost_type}
                                                                                label='Cost Type'
                                                                            >
                                                                                <MenuItem value=''><em>None</em></MenuItem>
                                                                                <MenuItem value={'opex'}>opex</MenuItem>
                                                                                <MenuItem value={'capex'}>Capex/Onetime Cost</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        <DatePicker
                                                                            label='Target Date'
                                                                            value={facilityProperty.target_date ? facilityProperty.target_date : moment(new Date()).format('YYYY-MM-DD')}
                                                                            onChange={(data) => {
                                                                                const targetDateColumn = `systemAceess.${index}.target_date`;
                                                                                const systemAccessTargetDate = moment(data);
                                                                                facilityProperty.setFieldValue(targetDateColumn, systemAccessTargetDate.format("YYYY-MM-DD"));
                                                                            }}
                                                                            disabled={true}
                                                                            renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown} />}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        {/* <Box sx={{ display: 'flex' }}>
                                                                            <Brightness1Icon sx={{ color: `${facilityProperty.status || 'black'}`, fontSize: 18, marginTop: 6, marginRight: 3 }} /> */}
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`systemAceess.${index}.status_color`}>Status</InputLabel>
                                                                            <Select
                                                                                labelId={`systemAceess.${index}.status_color`}
                                                                                name={`systemAceess.${index}.status_color`}
                                                                                onChange={handleChange}
                                                                                label='Cost Type'
                                                                                value={facilityProperty.status_color}
                                                                            // style={{ color: facilityProperty.status }}
                                                                            >
                                                                                <MenuItem value=''><em>None</em></MenuItem>
                                                                                <MenuItem value={'red'}>Red</MenuItem>
                                                                                <MenuItem value={'green'}>Green</MenuItem>
                                                                                <MenuItem value={'yellow'}>Yellow</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                        {/* </Box> */}

                                                                    </Grid>
                                                                    <Grid item xs={12} md={2} sx={{marginRight:2}}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`systemAceess[${index}].business_year-label`}>Business Year</InputLabel>
                                                                            <Select
                                                                                labelId={`systemAceess[${index}].business_year-label`}
                                                                                id={`systemAceess[${index}].business_year-label-standard`}
                                                                                name={`systemAceess[${index}].business_year`}
                                                                                value={facilityProperty.business_year}
                                                                                onChange={handleChange}
                                                                                label='Business Year'
                                                                                disabled
                                                                            >
                                                                                <MenuItem value=''><em>None</em></MenuItem>
                                                                                {(props.bizYearList && props.bizYearList.length) && props.bizYearList.map((option) => (
                                                                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={3} sx={{marginRight:2}}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`systemAceess.${index}.remark_comment`}
                                                                                value={facilityProperty.remark_comment}
                                                                                label='Remark' variant='outlined' onChange={handleChange} />
                                                                        </FormControl>
                                                                    </Grid>
                                                                {/* </Grid> */}
                                                                    </Box>
                                                            )) : null}
                                                </Box>
                                            )}
                                        />
                                        <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                            <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                color="primary" type="submit" disabled={remainingQunt}>Save &amp; Notify </Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Form>
                        )
                    }}
                </Formik>
            </Box>

        </Box>
    )
}

export default SystemAccessForm;