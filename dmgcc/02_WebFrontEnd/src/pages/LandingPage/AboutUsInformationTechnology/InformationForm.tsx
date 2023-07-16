import React from 'react'
import { Formik, Form, ErrorMessage, FieldArray } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, ButtonGroup } from '@mui/material';

const InformationForm = (props: any) => {

    const onDeleteInformation = (getIndex: any) => {
        if (props.getInitilContentValues) {
            props.getInitilContentValues.sub_list.forEach((items: any, index?: any) => {
                if (index === getIndex) {
                    props.onDeleteSubLine(items)
                }
            })
        }
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getInitilContentValues}
                // validationSchema={validationSchemaTest}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postData: any = {
                            id: values.id,
                            title: values.title,
                            description: values.description,
                            sub_list: values.sub_list
                        }
                        props.onSubmit(postData)
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
                                            disabled={props.showViewContent ? true : false}
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
                                            disabled={props.showViewContent ? true : false}
                                        />
                                        <ErrorMessage className="errormsg" name={`description`} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <FieldArray
                                name="sub_list"
                                render={({ insert, remove, push }) => (
                                    <>
                                        {values.sub_list.length > 0 &&
                                            values.sub_list.map(
                                                (fieldItem: any, index: any) => (
                                                    <Box key={index}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} md={props.showViewContent ? 12 : 10}>
                                                                <FormControl variant="outlined" fullWidth margin='dense'>
                                                                    <TextField
                                                                        placeholder="content"
                                                                        variant='outlined'
                                                                        label="Content"
                                                                        id={`sub_list.${index}.content`}
                                                                        name={`sub_list.${index}.content`}
                                                                        onChange={handleChange}
                                                                        value={fieldItem?.content}
                                                                        disabled={props.showViewContent ? true : false}
                                                                    />
                                                                    <ErrorMessage className="errormsg" name={`sub_list.${index}.content`} />
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12} md={1} sx={{ textAlign: 'right', marginTop: 5, display: props.showViewContent ? 'none' : 'block' }}>
                                                                <ButtonGroup size='small' aria-label='small button group'>
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="inherit" type="button"
                                                                        onClick={() => {
                                                                            onDeleteInformation(index)
                                                                            remove(index)
                                                                        }
                                                                        }
                                                                        disabled={values.sub_list.length <= 1 ? true : false}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary" type="button"
                                                                        onClick={() =>
                                                                            push({
                                                                                content: ''
                                                                            })
                                                                        }
                                                                    >
                                                                        <i className="material-icons">add</i>
                                                                    </Button>
                                                                </ButtonGroup>

                                                            </Grid>

                                                            <Grid item xs={1} md={1}>
                                                            </Grid>


                                                        </Grid>
                                                    </Box>
                                                ))}
                                    </>

                                )} />
                            <Box sx={{ pt: 10, textAlign: "right", display: props.showViewContent ? 'none' : 'block' }} >

                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="inherit"
                                    type="button"
                                    onClick={() => {
                                        props.handleClose()
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

export default InformationForm;