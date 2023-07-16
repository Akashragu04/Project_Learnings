import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Grid, TextField, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';

const ViewBusinessDetails = (props: any) => {

    const downloadFile = (getURL: any) => {
        window.open(getURL, '_blank')
    }

    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 900,
                    width: "100%"
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.onOpen}
            onClose={() => props.OnClose()}
            title={"View Lead Details"}
        >
            {
                props.onLeadInfo ?

                    <Formik
                        enableReinitialize
                        validateOnChange
                        initialValues={props.onLeadInfo}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // setSubmitting(true);
                            // console.log(values,'values...')
                        }}
                    >
                        {({ isSubmitting, values, errors, isValid, dirty, touched, setFieldValue, handleChange }) => {
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
                                    <Box sx={{ flexGrow: 1, width: '100%', padding: 5 }}>
                                        <Grid container spacing={2}>
                                            {/* <Grid item xs={12} md={8}> */}
                                            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='request_date'
                                                            name="request_date"
                                                            label='Request Date'
                                                            value={values?.request_date}
                                                            onChange={handleChange}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='receiver_short_id'
                                                            name="receiver_short_id"
                                                            label='Service Receiver/ Customer Short Id'
                                                            value={values?.service_receiver_short_id}
                                                            onChange={handleChange}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='receiver_contact_name'
                                                            name="receiver_contact_name"
                                                            label='Service Receiver Contact'
                                                            value={values?.service_receiver_contact_name}
                                                            onChange={handleChange}
                                                            disabled
                                                        />


                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='receiver_email_id'
                                                            name="receiver_email_id"
                                                            label='Service Receiver Email ID'
                                                            value={values?.service_receiver_email_id}
                                                            onChange={handleChange}
                                                            disabled
                                                        />

                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='receiver_department'
                                                            name="receiver_department"
                                                            label='Service Receiver Department'
                                                            disabled
                                                            value={values?.service_receiver_department}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='receiver_entity'
                                                            name="receiver_entity"
                                                            label='Service Receiver Entity'
                                                            disabled
                                                            value={values?.service_receiver_entity}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='project_name'
                                                            name="project_name"
                                                            label='Project Name'
                                                            disabled
                                                            value={values?.project_name}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='provider_short_idn'
                                                            name="provider_short_id"
                                                            label='Service Provider/ Business Short Id'
                                                            disabled
                                                            value={values?.service_provider_short_id}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='provider_name'
                                                            name="provider_name"
                                                            label='Service Provider Name'
                                                            disabled
                                                            value={values?.service_provider_contact_name}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='provider_email'
                                                            name="provider_email"
                                                            label='Service Provider Email'
                                                            disabled
                                                            value={values?.service_provider_email_id}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='provider_department'
                                                            name="provider_department"
                                                            label='Service Provider Department'
                                                            disabled
                                                            value={values?.service_provider_department}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                        <TextField
                                                            id='short-description'
                                                            name="short_description"
                                                            label='Short Description'
                                                            multiline
                                                            rows={3}
                                                            disabled
                                                            value={values?.short_description}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {
                                                        props.onLeadInfo && props.onLeadInfo.supporting_files ?
                                                            props.onLeadInfo.supporting_files.map((items?: any, index?: any) => (
                                                                <Box sx={{padding:2, border:'1px solid #ccc', borderRadius:2, cursor:'pointer'}} onClick={() => downloadFile(items.supporting_files_url)}>{items.supporting_files_name}</Box>
                                                            ))
                                                            : null
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                    : null
            }
        </AppDialog>
    )
}

export default ViewBusinessDetails