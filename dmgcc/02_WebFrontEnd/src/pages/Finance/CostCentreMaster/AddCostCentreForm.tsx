import React from 'react'
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, ButtonGroup } from '@mui/material';
import {validationSchemaTest} from './CostCentreValidation';

const AddCostCenterForm = (props?: any) => {
    const goBack = () => {
        props.handleClose()
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getFieldData}
                validationSchema={validationSchemaTest}
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
                                <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                                    <FieldArray
                                        name="teams"
                                        render={({ insert, remove, push }) => (
                                            <>
                                                {values.teams.length > 0 &&
                                                    values.teams.map(
                                                        (fieldItem: any, index: any) => (
                                                            <Box key={index}>
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12} md={3}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField
                                                                                placeholder="Cost Centre"
                                                                                variant='outlined'
                                                                                label="Cost Centre"
                                                                                id={`teams.${index}.costcenter`}
                                                                                name={`teams.${index}.costcenter`}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <ErrorMessage className="errormsg" name={`teams.${index}.costcenter`} />
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={4}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <TextField
                                                                                placeholder="Team"
                                                                                variant='outlined'
                                                                                label="Team"
                                                                                id={`teams.${index}.team`}
                                                                                name={`teams.${index}.team`}
                                                                                onChange={handleChange}
                                                                            />
                                                                             <ErrorMessage className="errormsg" name={`teams.${index}.team`} />
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={4}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <TextField
                                                                                placeholder="Department"
                                                                                variant='outlined'
                                                                                label="Department"
                                                                                id={`teams.${index}.team_group`}
                                                                                name={`teams.${index}.team_group`}
                                                                                onChange={handleChange}
                                                                            />
                                                                             <ErrorMessage className="errormsg" name={`teams.${index}.team_group`} />
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
                                                                                        costcenter: "",
                                                                                        team: '',
                                                                                        team_group: ''
                                                                                    })
                                                                                }
                                                                            >
                                                                                <i className="material-icons">add</i>
                                                                            </Button>
                                                                        </ButtonGroup>

                                                                    </Grid>
                                                                    {/* <Grid item xs={1} md={1}>

                                                                    </Grid> */}


                                                                </Grid>
                                                            </Box>
                                                        ))}


                                            </>

                                        )} />
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

export default AddCostCenterForm;