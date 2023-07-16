import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik';
import { Box, Button, Grid, Slide, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export const AddSlaModule = (props: any) => {
    const [value, setValue] = React.useState('caseWithSLA');
    const [getSlaOptionWidth, setSlaOptionWidth] = React.useState(210);

React.useEffect(()=>{
    if(value === 'casewithoutSLA'){
        setSlaOptionWidth(280)
    }else{
        setSlaOptionWidth(210)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

    const confirmSLAProcess = (getValues: any) => {
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
    const initialValues: any = {
        assign_sla: value,
        fte_count: 0,
        working_hours: 0
    }

    const onChangeSlaOption = (getValues:any) =>{
        setSlaOptionWidth(getValues)
    }
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 600,
                    width: "100%",
                    height: getSlaOptionWidth
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
            title={"Business Case"}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    if (values.assign_sla) {
                        if (values.assign_sla === 'casewithoutSLA') {
                            if (values.fte_count === 0 && values.working_hours === 0) {
                                toast.warning('FTE Count & Working Hours is required', { position: 'bottom-right' });
                            } else {
                                confirmSLAProcess(values);
                            }
                        } else {
                            confirmSLAProcess(values);
                        }
                    }
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
                            <Box sx={{ textAlign: "center" }} >
                                <FormControl component='fieldset'>
                                    <RadioGroup row
                                        aria-label='gender'
                                        name='assign_sla'
                                        value={value}
                                        onChange={(e: any) => {
                                            setFieldValue('assign_sla', e.target.value)
                                            handleChangeValues(e);
                                        }}>
                                        <FormControlLabel value='caseWithSLA' control={<Radio  onClick={()=>onChangeSlaOption(210)}/>} label='SLA with Biz case' />
                                        <FormControlLabel value='casewithoutSLA' control={<Radio onClick={()=>onChangeSlaOption(280)}/>} label='SLA without Biz case' />
                                    </RadioGroup>
                                </FormControl>
                                <Slide direction='up' in={(values.assign_sla && values.assign_sla === 'casewithoutSLA') ? true : false} mountOnEnter unmountOnExit>
                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }}>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                <TextField name="fte_count" label='FTE Count' variant='standard'
                                                    value={values.fte_count} onChange={handleChange} type="number"
                                                    disabled={(values.assign_sla && values.assign_sla === 'casewithoutSLA') ? false : true} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                <TextField name={`working_hours`}
                                                    label='Working Hours' variant='standard' value={values.working_hours} onChange={handleChange} type="number"
                                                    disabled={(values.assign_sla && values.assign_sla === 'casewithoutSLA') ? false : true} />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Slide>
                            </Box>

                            <Box
                                sx={{
                                    pt: 3,
                                    textAlign: "center",
                                    mt: 4
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
                                {values.assign_sla !== 'casewithoutSLA'?
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
                                  :
                                  <Button
                                  sx={{
                                      position: "relative",
                                      minWidth: 100,
                                      marginRight: 2
                                  }}
                                  disabled={values.fte_count !== 0 && values.working_hours !== 0 && values.working_hours !== "" && values.fte_count !== "" ? false:true}
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                              >
                                  Submit
                              </Button>
                                }
                               
                            </Box>
                        </Form>
                    )
                }}
            </Formik>

        </AppDialog>
    )
}
