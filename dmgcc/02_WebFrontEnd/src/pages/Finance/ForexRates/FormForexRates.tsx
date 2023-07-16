import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { forexRatesList } from './Types';
import { yearList } from '../../../services/Constants';

const FormForexRates = (props?: any) => {
    const goBack = () => {
        props.handleClose()
    }

    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getFieldData}
                // validationSchema={schemaCapnitiValidation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    props.onSubmit(values)
                }}>
                {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
                    return (
                        <Form
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <InputLabel id='currency'>Currency</InputLabel>
                                            <Select
                                                labelId='currency'
                                                id='currency'
                                                name="currency"
                                                value={values.currency}
                                                onChange={(e: any) => {
                                                    setFieldValue('currency', e.target.value)
                                                    // selectReceiverUserData(e);
                                                }}
                                                label='Currency'
                                            >
                                                {forexRatesList && forexRatesList !== null ?
                                                    forexRatesList.map((items: any, index: any) =>
                                                        <MenuItem value={items.currency} key={index} >{items.currency}</MenuItem>)
                                                    : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="To INR"
                                                variant='outlined'
                                                label="To INR"
                                                id='to_inr'
                                                onChange={handleChange}
                                                value={values.to_inr ? values.to_inr : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <InputLabel id='year'>Year</InputLabel>
                                            <Select
                                                labelId='year'
                                                id='year'
                                                name='year'
                                                value={values.year ? values.year : ''}
                                                onChange={(e: any) => {
                                                    setFieldValue(`year`, e.target.value)
                                                    // selectReceiverUserData(e);
                                                }}
                                                label='Currency'
                                            >
                                                {yearList && yearList !== null ?
                                                    yearList.map((items: any, index: any) =>
                                                        <MenuItem value={items.year} key={index} >{items.year}</MenuItem>)
                                                    : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ pt: 10, textAlign: "right", }} >

                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="inherit"
                                    type="button"
                                    onClick={() => {
                                        goBack()
                                    }}
                                >  Cancel </Button>
                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >  Submit </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default FormForexRates;