import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';

export const SlaConfirmationModule = (props: any) => {
    const [value, setValue] = React.useState('sla');

    const confirmSLAProcess = (getValues:any) => {
        props.onChange(getValues)
    }
    const handleChangeValues = (event) => {
        setValue(event.target.value);
    };

    const setAssignEnable = (getValues: any) => {
        props.closeDialogBox(getValues)
    }
    const goBack = (getValues) => {
        props.closeDialogBox(getValues)
    }
const initialValues:any = {
    assign_sla:value
}
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 600,
                    width: "100%",
                    height: 180
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.show}
            onClose={() => setAssignEnable(false)}
            title={"SLA Process"}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    confirmSLAProcess(values);
                    setSubmitting(false);
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
                             <Box
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                            <FormControl component='fieldset'>
                                <RadioGroup row
                                    aria-label='gender'
                                    name='assign_sla'
                                    value={value}
                                    onChange={(e:any) => {
                                        setFieldValue('assign_sla', e.target.value)
                                        handleChangeValues(e);
                                    }}>
                                    <FormControlLabel value='slaupload' control={<Radio />} label='C4D SLA' />
                                    <FormControlLabel value='sla' control={<Radio />} label='Create SLA' />
                                </RadioGroup>
                            </FormControl>
                            </Box>
                            
                            <Box
                                sx={{
                                    pt: 3,
                                    textAlign: "center",
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
                                        goBack(false)
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
                        </Form>
                    )
                }}
            </Formik>

        </AppDialog>
    )
}
