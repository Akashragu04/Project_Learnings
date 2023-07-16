import React, { useEffect } from 'react'
import { Grid, Box, Typography, Button, Select, MenuItem, FormControl, TextField, InputLabel, } from '@mui/material';
import { Formik, Form, FieldArray, } from 'formik';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { BizCaseBarChar } from '../ITView/BizCaseBarChar';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const FacilityDetailsAdd = (props?: any) => {
    let formikRef: any;
    const [remainingQunt, setRemainingQunt] = React.useState(false)

    useEffect(() => {
    }, [])

    const onChangeQuantity = (getRemark?: any, index?: any) => {
        props.setBizCaseSetupData.forEach((items: any, i: any) => {
            if (i === index) {
                let remainingValues: any;
                if (items.quantity) {
                    remainingValues = items.quantity - getRemark;
                }
                if (parseInt(getRemark) <= parseInt(items.quantity)) {
                    formikRef.setFieldValue(`facility.${index}.remaining_quantity`, String(remainingValues))
                    setRemainingQunt(false)
                } else {
                    formikRef.setFieldValue(`facility.${index}.remaining_quantity`, '')
                    toast.error('Should not be more than Estimations Quantity', { position: 'bottom-right' });
                    setRemainingQunt(true)
                }
            }
        })
    }

    return (
        <Box sx={{ marginTop: 5, padding: 5 }}>
            <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
                Add Business Case Setup
            </Typography>
            <Box sx={{marginBottom:5}}>
    <BizCaseBarChar/>
    </Box>
            <Box sx={{ border: "1px solid #ccc", padding: 5 }}>
                <Formik
                    validateOnChange
                    initialValues={props.facilityList}
                    enableReinitialize
                    innerRef={res => formikRef = res}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const postData: any = {
                            facility_info: props.setBizCaseSetupData,
                            facility_data: values.facility
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
                                            name="facility"
                                            render={({ insert, remove, push }) => (
                                                <Box>
                                                    {
                                                        facilityValue.facility ?
                                                            facilityValue.facility.map((facilityProperty: any, index: any) => (
                                                                <Grid key={index} container direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: 6 }} spacing={4} >
                                                                    <Grid item xs={12} md={3}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`facility[${index}].description`}
                                                                                label='Description'
                                                                                variant='outlined'
                                                                                multiline
                                                                                value={facilityProperty.description}
                                                                                onChange={handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={3}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField
                                                                                name={`facility.${index}.remark`}
                                                                                label='Meeting Rooms/Seats/Others'
                                                                                multiline
                                                                                value={facilityProperty.remark}
                                                                                variant='outlined'
                                                                                onChange={handleChange}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`facility.${index}.quantity`}
                                                                                value={facilityProperty.quantity ? facilityProperty.quantity : 0}
                                                                                label='Quantity' variant='outlined' onChange={(e?: any) => {
                                                                                    setFieldValue(`facility.${index}.quantity`, e.target.value)
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
                                                                    <Grid item xs={12} md={2}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`facility.${index}.remaining_quantity`}
                                                                                value={facilityProperty.remaining_quantity}
                                                                                label='Remaining Quantity' variant='outlined' onChange={handleChange}
                                                                                disabled />
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={2}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`facility.${index}.cost`} label='Cost'
                                                                                value={facilityProperty.cost} variant='outlined' onChange={handleChange}
                                                                                type="number"
                                                                                InputProps={{
                                                                                    inputProps: {
                                                                                        max: 100000000, min: 0
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`facility[${index}].cost_type`}>Cost Type</InputLabel>
                                                                            <Select
                                                                                labelId={`facility[${index}].cost_type`}
                                                                                name={`facility.${index}.cost_type`}
                                                                                onChange={handleChange}
                                                                                label='Cost Type'
                                                                                value={facilityProperty.cost_type}
                                                                            >
                                                                                <MenuItem value=''><em>None</em></MenuItem>
                                                                                <MenuItem value={'opex'}>opex</MenuItem>
                                                                                <MenuItem value={'capex'}>Capex/Onetime Cost</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2}>
                                                                        <DatePicker
                                                                            label='Target Date'
                                                                            value={
                                                                                facilityProperty.target_date ?
                                                                                    facilityProperty.target_date : moment(new Date()).format('YYYY-MM-DD')
                                                                            }
                                                                            onChange={(data) => {
                                                                                const targetDateColumn = `facility.${index}.target_date`;
                                                                                const systemAccessTargetDate = moment(data);
                                                                                facilityProperty.setFieldValue(targetDateColumn, systemAccessTargetDate.format("YYYY-MM-DD"));
                                                                            }}
                                                                            disabled={true}
                                                                            renderInput={(params) => <TextField error={false} fullWidth margin='dense' variant='outlined'
                                                                                {...params} onKeyDown={onKeyDown} />}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={2}>
                                                                        {/* <Box sx={{ display: 'flex' }}>
                                                                            <Brightness1Icon sx={{ color: `${facilityProperty.status || 'white'}`, fontSize: 18, }} /> */}
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`facility.${index}.status_color`}>Status</InputLabel>
                                                                            <Select
                                                                                labelId={`facility.${index}.status_color`}
                                                                                name={`facility.${index}.status_color`}
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
                                                                    <Grid item xs={12} md={2}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`facility[${index}].business_year-label`}>Business Year</InputLabel>
                                                                            <Select
                                                                                labelId={`facility[${index}].business_year-label`}
                                                                                id={`facility[${index}].business_year-label-standard`}
                                                                                name={`facility[${index}].business_year`}
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
                                                                    <Grid item xs={12} md={2}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField name={`facility.${index}.remark_comment`}
                                                                                value={facilityProperty.remark_comment}
                                                                                label='Remark' variant='outlined' onChange={handleChange} />
                                                                        </FormControl>
                                                                    </Grid>
                                                                </Grid>
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

export default FacilityDetailsAdd;
