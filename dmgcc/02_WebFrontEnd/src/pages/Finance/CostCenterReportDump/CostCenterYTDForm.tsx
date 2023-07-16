import React, { useEffect } from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Grid, FormControl, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';
import { getCostCenterYTDDetailsAction } from 'saga/Actions';
import { connect } from 'react-redux'

const costCenterYTDData: any = {

}

const CostCenterYTDForm = (props?: any) => {
    // let formikRef: any;
    const [isCCYTDInitiated, setIsCCYTDInitiated] = React.useState(false)
    const [ccYTDResponse, setCCYTDResponse] = React.useState(null)

    const { ccYTDDetails } = props;

    useEffect(() => {
        if (props.action === 'Update' && props.responseData.id) {
            props.getCostCenterYTDDetails({ ccdump_id: props.responseData.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.responseData])

    useEffect(() => {
        if (props.ccYTDDetails.status && !isCCYTDInitiated) {
            setCCYTDResponse(props.ccYTDDetails.data);
            // onSetEntityFormValue(props.ccYTDDetails.data);
            setIsCCYTDInitiated(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ccYTDDetails])


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
                    // innerRef={(action) => { formikRef = action }}
                    initialValues={ccYTDResponse ? ccYTDResponse : costCenterYTDData}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        if (values) {
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => (
                        <Form
                            style={{ width: "100%", display: "flex", flexDirection: "column" }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Fiscal Year"
                                                variant='outlined'
                                                label="Fiscal Year"
                                                id={`fiscalyear`}
                                                name={`fiscalyear`}
                                                value={values.fiscalyear}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Period"
                                                variant='outlined'
                                                label="Period"
                                                id={`period`}
                                                name={`period`}
                                                value={values.period}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Cost Centre"
                                                variant='outlined'
                                                label="Cost Centre"
                                                id={`costcenter`}
                                                name={`costcenter`}
                                                value={values.costcenter}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Company Name"
                                                variant='outlined'
                                                label="Company Name"
                                                id={`coobjectname`}
                                                name={`coobjectname`}
                                                value={values.coobjectname}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Cost Element"
                                                variant='outlined'
                                                label="Cost Element"
                                                id={`cost_element`}
                                                name={`cost_element`}
                                                value={values.costelement}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Cost Element Name"
                                                variant='outlined'
                                                label="Cost Element Name"
                                                id={`cost_element_name`}
                                                name={`cost_element_name`}
                                                value={values.costelementname}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Cost"
                                                variant='outlined'
                                                label="Cost"
                                                id={`cost`}
                                                name={`cost`}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Offsetting"
                                                variant='outlined'
                                                label="Offsetting"
                                                id={`offsetting`}
                                                name={`offsetting`}
                                                value={values.offsetacctno}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Offsetting Account Name"
                                                variant='outlined'
                                                label="Offsetting Account Name"
                                                id={`offset_acc_name`}
                                                name={`offset_acc_name`}
                                                value={values.offsetacctname}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Name"
                                                variant='outlined'
                                                label="Name"
                                                id={`name`}
                                                name={`name`}
                                                value={values.name}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Document Number"
                                                variant='outlined'
                                                label="Document Number"
                                                id={`document_number`}
                                                name={`document_number`}
                                                value={values.document_number}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Document Date"
                                                variant='outlined'
                                                label="Document Date"
                                                id={`document_Date`}
                                                name={`document_date`}
                                                value={values.documentdate}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Posting Date"
                                                variant='outlined'
                                                label="Posting Date"
                                                id={`posting_date`}
                                                name={`posting_date`}
                                                value={values.postingdate}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Ref"
                                                variant='outlined'
                                                label="Ref"
                                                id={`ref`}
                                                name={`ref`}
                                                value={values.referenceprocedure}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Document Header"
                                                variant='outlined'
                                                label="Document Header"
                                                id={`document_header`}
                                                name={`document_header`}
                                                value={values.documentheadertext}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Purchasing Document"
                                                variant='outlined'
                                                label="Purchasing Document"
                                                id={`purchasing_document`}
                                                name={`purchasing_document`}
                                                value={values.purchasingdocument}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Purchase Order"
                                                variant='outlined'
                                                label="Purchase Order"
                                                id={`purchase_order`}
                                                name={`purchase_order`}
                                                value={values.purchaseordertext}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Material"
                                                variant='outlined'
                                                label="Material"
                                                id={`material`}
                                                name={`material`}
                                                value={values.material}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Material Description"
                                                variant='outlined'
                                                label="Material Description"
                                                id={`material_desc`}
                                                name={`material_desc`}
                                                value={values.materialdescription}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Total Quality"
                                                variant='outlined'
                                                label="Total Quality"
                                                id={`total_quality`}
                                                name={`total_quality`}
                                                value={values.totalquantity}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Plant"
                                                variant='outlined'
                                                label="Plant"
                                                id={`plant`}
                                                name={`plant`}
                                                value={values.plant}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Reference"
                                                variant='outlined'
                                                label="Reference"
                                                id={`reference`}
                                                name={`reference`}
                                                value={values.referenceprocedure}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Rep Currency"
                                                variant='outlined'
                                                label="Rep Currency"
                                                id={`rep_currency`}
                                                name={`rep_currency`}
                                                value={values.referenceprocedure}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Transaction"
                                                variant='outlined'
                                                label="Transaction"
                                                id={`transaction`}
                                                name={`transaction`}
                                                value={values.transactioncurrency}
                                                onChange={handleChange}
                                                disabled
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
                                                value={values.value_obj_crcy}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Transaction Amount"
                                                variant='outlined'
                                                label="Transaction Amount"
                                                id={`transaction_amount`}
                                                name={`transaction_amount`}
                                                value={values.val_inrep_cur}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Report"
                                                variant='outlined'
                                                label="Report"
                                                id={`report`}
                                                name={`report`}
                                                value={values.referenceprocedure}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Type"
                                                variant='outlined'
                                                label="Type"
                                                id={`type`}
                                                name={`type`}
                                                value={values.valuetype}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Partner"
                                                variant='outlined'
                                                label="Partner"
                                                id={`partner`}
                                                name={`partner`}
                                                value={values.partnerobject}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                    color="inherit" type="button" onClick={() => props.closeOpenAddForm()}> Cancel
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </AppDialog>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.financeCCYTD.isLoading,
        error: state.financeCCYTD.errors,
        ccYTDDetails: state.financeCCYTD.costCenterResponse
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getCostCenterYTDDetails: (data: any) => {
            dispatch(getCostCenterYTDDetailsAction(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CostCenterYTDForm) 