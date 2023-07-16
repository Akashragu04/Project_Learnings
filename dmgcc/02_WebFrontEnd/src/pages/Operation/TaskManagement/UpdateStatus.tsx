import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Formik, Form } from 'formik';
import { statusList } from './Types';

const UpdateStatus = (props?: any) => {
    const initialFields: any = {
        task_id: props.getUpdateStateInfo.id,
        status: props.getUpdateStateInfo?props.getUpdateStateInfo.task_status:''
    }
    const goBack = () => {
        props.closeUpdateStatus()
    }
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%",
                    height: 250
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.openUpdateState}
            onClose={() => props.closeUpdateStatus()}
            title={`Update Status`}
        >
            <Box>
                <Formik
                    validateOnChange
                    initialValues={initialFields}
                    // validationSchema={taskValidationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        props.onSubmitUpdateStatu(values)
                        setSubmitting(false);
                    }}
                >
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
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12} sx={{ marginBottom: 3, marginTop:2 }}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                     <InputLabel id='status'>Status</InputLabel>
                                     <Select
                                       labelId='status'
                                       id='status'
                                       name="status"
                                       value={values.status}
                                       onChange={(e:any) => {
                                         setFieldValue('status', e.target.value)
                                       }}   
                                       label='Status'
                                     >
                                       {statusList&& statusList !== null ?
                                       statusList.map((items:any, index:any)=> <MenuItem value={items.name} key={index}>{items.name}</MenuItem>)
                                       :null}
                                     </Select>
                                   </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12} sx={{ marginBottom: 5 }}>
                                    <Box
                                        sx={{
                                            pt: 3,
                                            textAlign: "right",
                                        }}
                                    >

                                        <Button
                                            sx={{
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
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            sx={{
                                                position: "relative",
                                                minWidth: 100,
                                                marginRight: 2
                                            }}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                    </Grid>
                                  
                                </Grid>
                            </Form>
                        )
                    }}

                </Formik>
            </Box>
        </AppDialog>
    )
}

export default UpdateStatus;