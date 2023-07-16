import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid } from '@mui/material';

const EditVendorMasterForm = (props?:any) => {
    const goBack = () => {
        props.handleClose()
      }
  return (
    <Box sx={{ padding: 5 }}>
    <Formik
      validateOnChange
      initialValues={props.getFieldData}
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
              <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth margin='dense'>
                    <TextField
                      placeholder="Vendor Id"
                      variant='outlined'
                      label="Vendor Id"
                      id='vendorid'
                      name="vendorid"
                      onChange={handleChange}
                      value={values.vendorid ? values.vendorid : ''}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl variant='outlined' fullWidth margin='dense'>
                    <TextField
                      placeholder="Code"
                      variant='outlined'
                      label="Code"
                      id='code'
                      onChange={handleChange}
                      value={values.code ? values.code : ''}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl variant='outlined' fullWidth margin='dense'>
                    <TextField
                      placeholder="Name"
                      variant='outlined'
                      label="Name"
                      id='name'
                      onChange={handleChange}
                      value={values.name ? values.name : ''}
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

export default EditVendorMasterForm;