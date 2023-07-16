import React from 'react'
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Formik, Form } from 'formik';

const TaskReopenComments = (props: any) => {
 
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%",
                    height:300
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.onOpen}
            onClose={() => props.onClose()}
            title={`Reopen Comment`}
        >
            <Box>
                    
                <Formik
                    validateOnChange
                    // innerRef={res => formikData = res}
                    initialValues={props.getInitialFields}
                    // validationSchema={schemaCapnitiValidation}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        props.onSubmit(values)
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
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder={"Comment"}
                                                variant='outlined'
                                                label={"Comment"}
                                                id={`reopenComments`}
                                                name={`reopenComments`}
                                                onChange={handleChange}
                                                multiline
                                                rows={3}
                                            />
                                        </FormControl>
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
                                            props.onClose()
                                        }}
                                    >  Cancel </Button>
                                    <Button sx={{
                                        position: "relative",
                                        minWidth: 100,
                                        marginRight: 2
                                    }}
                                    disabled={values && values.reopenComments !==""?false:true}
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

export default TaskReopenComments