import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid } from '@mui/material';

const CostCenterForm = (props?: any) => {
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
                        placeholder="Cost Centre"
                        variant='outlined'
                        label="Cost Centre"
                        id='costcenter'
                        name="costcenter"
                        onChange={handleChange}
                        value={values.costcenter ? values.costcenter : ''}
                        disabled
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="Team"
                        variant='outlined'
                        label="Team"
                        id='team'
                        onChange={handleChange}
                        value={values.team ? values.team : ''}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                      <TextField
                        placeholder="Department"
                        variant='outlined'
                        label="Department"
                        id='team_group'
                        onChange={handleChange}
                        value={values.team_group ? values.team_group : ''}
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

export default CostCenterForm;