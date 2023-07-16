import React, { useEffect } from 'react'
import AppDialog from "@crema/core/AppDialog";
import { connect } from 'react-redux'
import { Fonts } from "shared/constants/AppEnums";
import { Grid, FormControl, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';
import { entityMasterConst } from 'shared/constants/AppConst';
import { initFinanceEntityMasterAction } from 'saga/Actions';
import * as yup from "yup";
import { toast } from 'react-toastify';

export const entityMasterValidationSchema = yup.object({
    customerid: yup.string().required(String("Customer ID is required")),
    customername: yup.string().required(String("Customer Name is required"))
});

const EntityMasterForm = (props?: any) => {
    let formikRef: any;
    const [entityResponse, setEntityResponse] = React.useState<any>(null)

    useEffect(() => {
        if (props.action === 'Update' && props.entityResponseData.id) {
            setEntityResponse(props.entityResponseData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (formikRef) {
            onSetEntityFormValue(entityResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entityResponse])

    const onSetEntityFormValue = (data) => {
        if (formikRef) {
            formikRef.setFieldValue('customerid', data.customerid);
            formikRef.setFieldValue('customername', data.customername);
            formikRef.setFieldValue('address', data.address);
            formikRef.setFieldValue('code', data.code);
            formikRef.setFieldValue('country', data.country);
            formikRef.setFieldValue('currency', data.currency);
            formikRef.setFieldValue('fax', data.fax);
            formikRef.setFieldValue('genesiscode', data.genesiscode);
            formikRef.setFieldValue('gstin', data.gstin);
            formikRef.setFieldValue('shortname', data.shortname);
            formikRef.setFieldValue('state', data.state);
            formikRef.setFieldValue('telephone', data.telephone);
        }
    }

    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 1200,
                    width: "100%",
                    height: "auto"
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.openAddForm}
            onClose={() => props.closeOpenAddForm()}
            title={`${props.action} Entity Master`}
        >
            <Box sx={{ padding: 5 }}>
                <Formik
                    enableReinitialize
                    innerRef={res => formikRef = res}
                    initialValues={entityMasterConst}
                    // validationSchema={entityMasterValidationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        values['action'] = props.action;
                        if (props.action === 'Create') {
                            if (values.customerid && values.customername) {
                                props.onSubmitEntityData(values)
                            } else {
                                toast.warn("Customer ID is Requied", { position: 'bottom-right' });
                            }
                        } else if (props.action === 'Update') {
                            if (entityResponse.id) {
                                values['id'] = entityResponse.id;
                                if (values.customerid && values.customername) {
                                    props.onSubmitEntityData(values)
                                } else {
                                    toast.warn("Customer ID & Name is Requied", { position: 'bottom-right' });
                                }
                            }
                        }
                    }}>
                    {({ values, errors, handleChange, handleBlur }) => {
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
                                    <Grid container rowSpacing={3} spacing={{ xs: 2, md: 8 }}  >
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Customer ID"
                                                    variant='outlined'
                                                    label="customer ID"
                                                    id={`customerid`}
                                                    name={`customerid`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.customerid}
                                                    error={(errors?.customerid) ? true : false} helperText={errors?.customerid}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Customer Name"
                                                    variant='outlined'
                                                    label="customer Name"
                                                    id={`customername`}
                                                    name={`customername`}
                                                    onChange={handleChange}
                                                    value={values.customername}
                                                    error={(errors?.customername) ? true : false} helperText={errors?.customername}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Short Name"
                                                    variant='outlined'
                                                    label="Short Name"
                                                    id={`shortname`}
                                                    name={`shortname`}
                                                    value={values.shortname}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Telephone"
                                                    variant='outlined'
                                                    label="Telephone"
                                                    id={`telephone`}
                                                    name={`telephone`}
                                                    value={values.telephone}
                                                    onChange={handleChange}
                                                    type='number'
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Fax"
                                                    variant='outlined'
                                                    label="Fax"
                                                    id={`fax`}
                                                    name={`fax`}
                                                    value={values.fax}
                                                    onChange={handleChange}
                                                    type='number'
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Country Code"
                                                    variant='outlined'
                                                    label="Country code"
                                                    id={`code`}
                                                    name={`code`}
                                                    value={values.code}
                                                    onChange={handleChange}
                                                    type='number'
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Country"
                                                    variant='outlined'
                                                    label="Country"
                                                    id={`country`}
                                                    name={`country`}
                                                    value={values.country}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Currency"
                                                    variant='outlined'
                                                    label="Currency"
                                                    id={`currency`}
                                                    name={`currency`}
                                                    value={values.currency}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Genesis Code"
                                                    variant='outlined'
                                                    label="Genesis Code"
                                                    id={`genesiscode`}
                                                    name={`genesiscode`}
                                                    value={values.genesiscode}
                                                    onChange={handleChange}
                                                    type='number'
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="GST IN"
                                                    variant='outlined'
                                                    label="GST IN"
                                                    id={`gstin`}
                                                    name={`gstin`}
                                                    value={values.gstin}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="State"
                                                    variant='outlined'
                                                    label="State"
                                                    id={`state`}
                                                    name={`state`}
                                                    value={values.state}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Address"
                                                    variant='outlined'
                                                    label="Address"
                                                    id={`address`}
                                                    name={`address`}
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    multiline
                                                />
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
                                            props.closeOpenAddForm()
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
        </AppDialog>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.entityMaster.isLoading,
        error: state.entityMaster.errors
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initEntityMaster: () => {
            dispatch(initFinanceEntityMasterAction())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EntityMasterForm)