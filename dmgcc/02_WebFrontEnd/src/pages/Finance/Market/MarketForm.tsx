import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid } from '@mui/material';

const MarketForm = (props:any) => {
  return (
    <Box sx={{ padding: 5 }}>
      <Formik
        validateOnChange
        // innerRef={res => formikData = res}
        initialValues={props.getInitilValue}
        // validationSchema={schemaCapnitiValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
         props.onPutMarketValues(values)
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
                        placeholder="FX Value"
                        variant='outlined'
                        label="FX Value"
                        id='fx_value'
                        name="fx_value"
                        onChange={handleChange}
                        value={values.fx_value ? values.fx_value : ''}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                    <TextField
                        placeholder="FX Value"
                        variant='outlined'
                        label="GST Value"
                        id='gst_value'
                        name="gst_value"
                        onChange={handleChange}
                        value={values.gst_value ? values.gst_value : ''}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth margin='dense'>
                      <TextField
                        placeholder="India WHT Value"
                        variant='outlined'
                        label="India WHT Value"
                        id='india_wht_value'
                        name="india_wht_value"
                        onChange={handleChange}
                        value={values.india_wht_value ? values.india_wht_value : ''}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                    <TextField
                        placeholder="Markup Value"
                        variant='outlined'
                        label="Markup Value"
                        id='markup_value'
                        name="markup_value"
                        onChange={handleChange}
                        value={values.markup_value ? values.markup_value : ''}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl variant='outlined' fullWidth margin='dense'>
                    <TextField
                        placeholder="Non India WHT Value"
                        variant='outlined'
                        label="Non India WHT Value"
                        id='non_india_wht_value'
                        name="non_india_wht_value"
                        onChange={handleChange}
                        value={values.non_india_wht_value ? values.non_india_wht_value : ''}
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

export default MarketForm;