import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, FormHelperText, Grid } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { ExternalResValidationSchema } from './ExternalResourceValidation';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const ExternalResourceForm = (props?: any) => {
  const goBack = () => {
    props.handleClose()
  }
  return (
    <Box sx={{ padding: 5 }}>
      <Formik
        validateOnChange
        // innerRef={res => formikData = res}
        initialValues={props.getFieldData}
        validationSchema={ExternalResValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const editFieldData: any = {
            id: values.id,
            shortid: values.shortid,
            hrid: values.hrid,
            emp_name: values.emp_name,
            functions: values.functions,
            department_id: values.department_id,
            date_of_join: moment(values.date_of_join).format('YYYY-MM-DD'),
            email: values.email,
            designation:values.designation
          }
          props.onSubmitData(editFieldData)
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
                <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth margin='dense' >
                      <TextField
                        placeholder="Short Id"
                        variant='outlined'
                        label="Short Id"
                        id='shortid'
                        onChange={handleChange}
                        value={values.shortid ? values.shortid : ''}
                        error={(errors.shortid)?true:false}
                      />
                      <FormHelperText> {(errors.shortid) ? (
                        <Box className="errormsg"> {errors.shortid}</Box>
                      ) : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="HR Id"
                        variant='outlined'
                        label="HR Id"
                        id='hrid'
                        onChange={handleChange}
                        value={values.hrid ? values.hrid : ''}
                        error={(errors.hrid)?true:false}
                      />
                         <FormHelperText> {(errors.hrid) ? (
                        <span className="errormsg"> {errors.hrid}</span>
                      ) : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="Employee Name"
                        variant='outlined'
                        label="Employee Name"
                        id='emp_name'
                        onChange={handleChange}
                        value={values.emp_name ? values.emp_name : ''}
                        error={(errors.emp_name)?true:false}
                      />
                         <FormHelperText> {(errors.emp_name) ? (
                        <span className="errormsg"> {errors.emp_name}</span>
                      ) : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="Function"
                        variant='outlined'
                        label="Function"
                        id='functions'
                        onChange={handleChange}
                        value={values.functions ? values.functions : ''}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <DatePicker
                        label='DOJ'
                        value={values.date_of_join ? values.date_of_join : ''}
                        minDate={props.getDateStatus ? moment().toDate() : null}
                        onChange={reqDate => setFieldValue("date_of_join", reqDate)}
                        renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown}/>}
                        disabled={props.editForm}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="Email"
                        variant='outlined'
                        label="Email"
                        id='email'
                        value={values.email ? values.email : ''}
                        onChange={handleChange}
                        error={(errors.email)?true:false}
                      />
                           <FormHelperText> {(errors.email) ? (
                        <span className="errormsg"> {errors.email}</span>
                      ) : null}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="Designation/Role"
                        variant='outlined'
                        label="Designation/Role"
                        id='designation'
                        value={values.designation ? values.designation : ''}
                        onChange={handleChange}
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

  )
}

export default ExternalResourceForm;