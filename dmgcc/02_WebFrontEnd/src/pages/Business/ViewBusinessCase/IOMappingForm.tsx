import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, FormHelperText, Grid } from '@mui/material';
import { bizCaseValidationSchema } from './BizCaseValidation';

const IOMappingForm = (props:any) => {
  return (
    <React.Fragment>
          <Formik
        validateOnChange
        // innerRef={res => formikData = res}
        initialValues={props.getFieldData}
        validationSchema={bizCaseValidationSchema}
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
                <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                  <Grid item xs={12} md={12}>
                    <FormControl variant="outlined" fullWidth margin='dense'>
                      <TextField
                        placeholder="IO Number"
                        variant='outlined'
                        label="IO Number"
                        id='activeIoNumber'
                        name="activeIoNumber"
                        onChange={handleChange}
                        value={values.activeIoNumber ? values.activeIoNumber : ''}
                      />
                      <ErrorMessage name={`activeIoNumber`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                      {/* <ErrorMessage className="errormsg" name={`activeIoNumber`} /> */}
                    </FormControl>
                  </Grid>

                  {/* <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <DatePicker
                        disablePast
                        views={['year']}
                        label='Year'
                        value={values.year}
                        onChange={(date) => {
                          setFieldValue('year', date)
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} fullWidth />}
                      />
                    </FormControl>
                  </Grid> */}
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
                    props.handleClose()
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
        </React.Fragment>
  )
}

export default IOMappingForm