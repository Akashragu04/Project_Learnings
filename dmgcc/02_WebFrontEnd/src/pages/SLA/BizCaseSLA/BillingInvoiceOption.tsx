import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, Autocomplete } from '@mui/material';

const BillingInvoiceOption = (props?: any) => {
    const [getPerInvoiceId, setPerInvoiceId] = React.useState(null)
    const goBack = () => {
        props.closeBillingInvoice()
    }

    const getFieldData: any = {
        billing_cycle: "",
    }

    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%",
                    height: 230
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.openBillingInvoice}
            onClose={() => props.closeBillingInvoice()}
            title={"Billing cycle"}
        >
            <Box sx={{ padding: 5 }}>
                <Formik
                    validateOnChange
                    // innerRef={res => formikData = res}
                    initialValues={getFieldData}
                    // validationSchema={validationSchemaTest}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const postValues: any = {
                            pre_id: getPerInvoiceId,
                            sla_id: props.getSLAInfo.id
                        }
                        props.onSubmitData(postValues)

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
                                <Box sx={{ flexGrow: 1, width: '100%', marginTop: 2 }}>
                                    <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                                        <Autocomplete
                                            id='billing_cycle'
                                            options={props.slaBillingCycleList}
                                            getOptionLabel={(option: any) => option.preinvoice_period}
                                            onChange={(event, value: any) => {
                                                if (value) {
                                                    setPerInvoiceId(value.id)
                                                    setFieldValue("billing_cycle", value.preinvoice_period);
                                                } else {
                                                    setFieldValue("billing_cycle", '');
                                                }
                                            }}
                                            renderOption={(props, option) => {
                                                return (
                                                    <Box component='li' {...props} key={props['data-option-index']}>
                                                        {option.preinvoice_period}
                                                    </Box >
                                                );
                                            }}
                                            fullWidth
                                            filterSelectedOptions
                                            value={values?.customerName}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label='Choose Billing Cycle'
                                                    placeholder='Billing Cycle'
                                                    name="billing_cycle"
                                                    required
                                                    error={(errors.billing_cycle) ? true : false} helperText={errors.billing_cycle}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Box>
                                <Box sx={{ pt: 5, textAlign: "right", }} >

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
        </AppDialog>
    )
}

export default BillingInvoiceOption;