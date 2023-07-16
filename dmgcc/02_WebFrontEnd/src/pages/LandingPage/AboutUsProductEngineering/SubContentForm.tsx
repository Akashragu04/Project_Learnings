import React from 'react'
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import { Box, Button, ButtonGroup, FormControl, Grid, TextField } from '@mui/material';

const SubContentForm = (props:any) => {
  return (
    <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getInitilContentValues}
                // validationSchema={validationSchemaTest}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postValues: any = {
                            id: values.id,
                            description: values.description,
                            title: values.title,
                            sub_list: values.sub_list
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
                                                disabled={props.showViewContent?true:false}
                                            />
                                            <ErrorMessage className="errormsg" name={`title`} />
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
                                                            <Grid item xs={12} md={props.showViewContent?12:10}>
                                                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder="content"
                                                                            variant='outlined'
                                                                            label="Content"
                                                                            id={`sub_list.${index}.content`}
                                                                            name={`sub_list.${index}.content`}
                                                                            onChange={handleChange}
                                                                            value={fieldItem?.content}
                                                                            disabled={props.showViewContent?true:false}
                                                                        />
                                                                        <ErrorMessage className="errormsg" name={`sub_list.${index}.content`} />
                                                                    </FormControl>
                                                                </Grid>
                                                            <Grid item xs={12} md={1} sx={{ textAlign: 'right', marginTop: 5, display:props.showViewContent?'none':'block' }}>
                                                                    <ButtonGroup size='small' aria-label='small button group'>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="inherit" type="button"
                                                                            onClick={() => {
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
                            <Box sx={{ pt: 10, textAlign: "right", display:props.showViewContent?'none':'block' }} >

                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="inherit"
                                    type="button"
                                    onClick={() => {
                                        props.goBack()
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

export default SubContentForm;