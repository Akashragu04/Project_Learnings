import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl } from '@mui/material';

const UpdateProductForm = (props: any) => {

    const goBack = () => {
        props.closeOpenAddForm()
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getInitilValues}
                // validationSchema={validationSchemaTest}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postValues: any = {
                            id: values.id,
                            description: values.description,
                            title: values.title,
                        }
                        props.onSubmit(postValues)
                    }
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
                            <Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Title"
                                                variant='outlined'
                                                label="Title"
                                                id={`title`}
                                                name={`title`}
                                                value={values?.title}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage className="errormsg" name={`title`} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Description"
                                                variant='outlined'
                                                label="Description"
                                                id={`description`}
                                                name={`description`}
                                                multiline
                                                rows={3}
                                                value={values?.description}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage className="errormsg" name={`description`} />
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

export default UpdateProductForm;
