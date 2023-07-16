import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid, FormHelperText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { capacityValidationSchema } from './AllocateValidation';
import { ErrorMessage } from 'formik';

const MapResourceForm = (props?:any) => {
    // let formikData:any;

    const onProjectDetails = (getProjectData?:any) => {
        if(getProjectData !== null){
            props.getTaskSLAListData(getProjectData.id)
        }
    }
    const goBack = () => {
        props.closeAvailableResource()

    }
  return (
    <Formik
            validateOnChange
            // innerRef={res => formikData = res}
            initialValues={props.getFieldAllocate}
            validationSchema={capacityValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => { 
                props.postMapAllocateResource(values)
                props.closeAvailableResource()
                // props.onSubmitTimesheet(postTimesheetDetails)
                // props.onCloseCapniti()
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
                            <Grid container rowSpacing={5}  spacing={{ xs: 2, md: 8 }}  >
                            <Grid item xs={12} md={6}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <Autocomplete
                                            onChange={(event: any, newValue: any) => {
                                                if(newValue){
                                                    onProjectDetails(newValue)
                                                    setFieldValue("project_code", newValue.id)
                                                }                                               
                                            }}
                                            getOptionLabel={(option: any) => (option ? option.project_name : "")}
                                            onInputChange={(event, newInputValue) => {
                                                //   getLeadsConversion(newInputValue)
                                            }}
                                            id='Project Name'
                                            options={props.getProjectList ? props.getProjectList : []}
                                            sx={{ width: '100%', marginRight: 2 }}
                                            renderInput={(params) => <TextField {...params} label='Project Name' />}
                                        />
                                        <ErrorMessage name={`project_code`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <Autocomplete
                                            onChange={(event: any, newValue: any) => {
                                                // onSLAtDetails(event, newValue)
                                                setFieldValue("sla_code", newValue.id)
                                            }}
                                            getOptionLabel={(option: any) => (option ? option.slaid : "")}
                                            onInputChange={(event, newInputValue) => {
                                                //   getLeadsConversion(newInputValue)
                                            }}
                                            id='SLA Code'
                                            options={props.getTaskSlaByProject ? props.getTaskSlaByProject : []}
                                            sx={{ width: '100%', marginRight: 2 }}
                                            renderInput={(params) => <TextField {...params} label='SLA Code' />}
                                        />
                                        <ErrorMessage name={`sla_code`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                        <TextField
                                            placeholder="User Id"
                                            variant='outlined'
                                            label="User Id"
                                            id='userid'
                                            onChange={handleChange}
                                            value={values.userid ? values.userid : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="HR Id"
                                            variant='outlined'
                                            label="HR Id"
                                            id='hrid'
                                            onChange={()=>handleChange}
                                            value={values.hrid ? values.hrid : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Name"
                                            variant='outlined'
                                            label="Name"
                                            id='resource_name'
                                            onChange={()=>handleChange}
                                            value={values.resource_name ? values.resource_name : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Email"
                                            variant='outlined'
                                            label="Email"
                                            id='resource_email'
                                            onChange={()=>handleChange}
                                            value={values.resource_email ? values.resource_email : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Short Id"
                                            variant='outlined'
                                            label="Short Id"
                                            id='resource_shortid'
                                            onChange={()=>handleChange}
                                            value={values.resource_shortid ? values.resource_shortid : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Level"
                                            variant='outlined'
                                            label="Level"
                                            id='level'
                                            onChange={()=>handleChange}
                                            value={values.level ? values.level : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Capcity"
                                            variant='outlined'
                                            label="Capcity"
                                            id='capcity'
                                            onChange={(event: any) => {
                                                setFieldValue("capcity", event.target.value)
                                                // handleChange
                                            }}
                                            value={values.capcity?values.capcity:''}
                                            type="number"
                                        />
                                         <ErrorMessage name={`capcity`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </FormControl>
                                </Grid>
                                
                            </Grid>
                        </Box>
                        <Box sx={{ pt: 1, paddingBottom:2, textAlign: "right", }} >

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
  )
}

export default MapResourceForm;
