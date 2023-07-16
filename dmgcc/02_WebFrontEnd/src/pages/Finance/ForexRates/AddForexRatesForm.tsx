import React from 'react'
import { Formik, Form, FieldArray } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid, ButtonGroup, InputLabel, MenuItem, Select } from '@mui/material';
import { forexRatesList } from './Types';
import {yearList} from '../../../services/Constants';

const AddForexRatesForm = (props?: any) => {

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
                    props.onSubmit(values.teams)
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
                                    <FieldArray
                                        name="teams"
                                        render={({ insert, remove, push }) => (
                                            <>
                                                {values.teams.length > 0 &&
                                                    values.teams.map(
                                                        (fieldItem: any, index: any) => (
                                                            <Box key={index}>
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12} md={4}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`teams.${index}.currency`}>Currency Conversation</InputLabel>
                                                                            <Select
                                                                                labelId={`teams.${index}.currency`}
                                                                                id={`teams.${index}.currency`}
                                                                                name={`teams.${index}.currency`}
                                                                                value={fieldItem.currency}
                                                                                onChange={(e: any) => {
                                                                                    setFieldValue(`teams.${index}.currency`, e.target.value)
                                                                                    // onSelectCurrency(e.target.value);
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
                                                                                placeholder={(fieldItem.currency) ? fieldItem.currency : "Enter Currency"}
                                                                                variant='outlined'
                                                                                label={(fieldItem.currency) ? fieldItem.currency : "Enter Currency"}
                                                                                id={`teams.${index}.to_inr`}
                                                                                name={`teams.${index}.to_inr`}
                                                                                onChange={handleChange}
                                                                                type="number"
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    
                                                                    <Grid item xs={12} md={2}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <InputLabel id={`teams.${index}.year`}>Year</InputLabel>
                                                                            <Select
                                                                                labelId={`teams.${index}.year`}
                                                                                id={`teams.${index}.year`}
                                                                                name={`teams.${index}.year`}
                                                                                value={fieldItem.year}
                                                                                onChange={(e: any) => {
                                                                                    setFieldValue(`teams.${index}.year`, e.target.value)
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

                                                                    <Grid item xs={2} md={1} sx={{ textAlign: 'center', marginTop: 5 }}>
                                                                        <ButtonGroup size='small' aria-label='small button group'>
                                                                            <Button
                                                                                variant="outlined"
                                                                                color="inherit" type="button"
                                                                                onClick={() => {
                                                                                    remove(index)
                                                                                }
                                                                                }
                                                                                disabled={values.teams.length <= 1 ? true : false}
                                                                            >
                                                                                -
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary" type="button"
                                                                                onClick={() =>
                                                                                    push({
                                                                                        currency: "",
                                                                                        to_inr: '',
                                                                                    })
                                                                                }
                                                                            >
                                                                                <i className="material-icons">add</i>
                                                                            </Button>
                                                                        </ButtonGroup>

                                                                    </Grid>


                                                                </Grid>
                                                            </Box>
                                                        ))}


                                            </>

                                        )} />
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

export default AddForexRatesForm;