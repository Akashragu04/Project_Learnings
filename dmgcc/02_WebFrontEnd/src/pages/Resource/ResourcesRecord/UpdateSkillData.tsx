import React from 'react'
import { Formik, Form, FieldArray } from 'formik';
import { TextField } from "@mui/material";
import { Button, Grid, Box, FormControl, ButtonGroup } from '@mui/material';
import { connect } from "react-redux";

const UpdateSkillData = (props?: any) => {
    return (
        <React.Fragment>
{
            props.initialValues?
            <Formik
            //   innerRef={res => formikData = res}
            initialValues={props.initialValues}
            //   validationSchema={fieldValidation}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                // setSubmitting(true);
                const postEmpSkill:any = {
                    emp_id:props.getEmployeeInfo.id,
                    update_skill:values
                }
                props.postResourceSkill(postEmpSkill)
                props.handleSkillUpdateClose()
                // setSubmitting(false);
            }}>
            {({ isSubmitting, values, errors, isValidating, dirty, isValid, touched, setFieldValue, handleChange }) => {
                return (<Form
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box sx={{ marginTop: 2 }}>
                                <TextField id="primaryskill" label="Primary Skill" variant="outlined" value={values?.primaryskill} fullWidth onChange={handleChange}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FieldArray
                                name="secondary"
                                render={({ insert, remove, push }) => (
                                    <>
                                        {values.secondary && values.secondary.length > 0 &&
                                            values.secondary.map(
                                                (fieldItem: any, index: any) => (
                                                    <Box key={index}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={10} md={10} sx={{}}>
                                                                <Box sx={{ pt: 1, ml: 6 }}>
                                                                    <FormControl variant="standard" fullWidth>
                                                                        <TextField id={`secondary.${index}.secondaryskill`}
                                                                            name={`secondary.${index}.secondaryskill`} label="Secondary Skill" variant="outlined" fullWidth 
                                                                            value={fieldItem.secondaryskill} 
                                                                            onChange={handleChange} />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={2} md={2} sx={{ textAlign: 'center', marginTop: 3 }}>
                                                                <ButtonGroup size='small' aria-label='small button group'>
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="inherit" type="button"
                                                                        onClick={() => {
                                                                            remove(index)
                                                                        }
                                                                        }
                                                                        disabled={values.secondary.length <= 1 ? true : false}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary" type="button"
                                                                        onClick={() =>
                                                                            push({
                                                                                secondaryskill: "",
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
                                        <Grid item xs={12} md={12}>
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    mb: 5,
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
                                                    onClick={props.handleSkillUpdateClose}
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
                                                    disabled={!isValid}
                                                >
                                                    {'Submit'}

                                                </Button>
                                            </Box>
                                        </Grid>

                                    </>

                                )} />
                        </Grid>

                        {/* <Grid item xs={2} md={2}></Grid> */}
                    </Grid>
                </Form>)
            }}
        </Formik>
            :null
        }
        </React.Fragment>
        
      
    )
}



const mapStateToProps = (state: any) => {
    return {
        loading: state.resourceProcess.loading
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSkillData);
// export default UpdateSkillData;