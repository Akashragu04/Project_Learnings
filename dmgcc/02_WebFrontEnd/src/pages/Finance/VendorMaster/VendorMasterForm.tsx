import React from 'react'
import { Formik, Form, FieldArray } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, ButtonGroup } from '@mui/material';

const VendorMasterForm = (props?:any) => {
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
                        props.onSubmit(values.vendorMaster)
                  
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
                                        name="vendorMaster"
                                        render={({ insert, remove, push }) => (
                                            <>
                                                {values.vendorMaster.length > 0 &&
                                                    values.vendorMaster.map(
                                                        (fieldItem: any, index: any) => (
                                                            <Box key={index}>
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12} md={3}>
                                                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                                                            <TextField
                                                                                placeholder="Vendor Id"
                                                                                variant='outlined'
                                                                                label="Vendor Id"
                                                                                id={`vendorMaster.${index}.vendorid`}
                                                                                name={`vendorMaster.${index}.vendorid`}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={4}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <TextField
                                                                                placeholder="Code"
                                                                                variant='outlined'
                                                                                label="Code"
                                                                                id={`vendorMaster.${index}.code`}
                                                                                name={`vendorMaster.${index}.code`}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={4}>
                                                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                                                            <TextField
                                                                                placeholder="Name"
                                                                                variant='outlined'
                                                                                label="Name"
                                                                                id={`vendorMaster.${index}.name`}
                                                                                name={`vendorMaster.${index}.name`}
                                                                                onChange={handleChange}
                                                                            />
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
                                                                                disabled={values.vendorMaster.length <= 1 ? true : false}
                                                                            >
                                                                                -
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary" type="button"
                                                                                onClick={() =>
                                                                                    push({
                                                                                        vendorid: "",
                                                                                        code: '',
                                                                                        name: ''
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

export default VendorMasterForm;