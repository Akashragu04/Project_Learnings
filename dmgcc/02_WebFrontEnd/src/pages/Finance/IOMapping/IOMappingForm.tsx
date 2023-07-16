import React from 'react'
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup, FormControl, FormHelperText, Grid } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';
import { validationSchemaIONumber } from './IoMappingValidation';

const IOMappingForm = (props?: any) => {

  const goBack = () => {
    props.handleClose()
  }

  const onSubmitValue =(getValue?:any) =>{
    if(getValue){
      getValue.ionumbermapped.forEach((item:any)=>{      
        item['year'] = moment(item.year).format('YYYY')
      })
       props.onSubmit(getValue)
    }

  }
  return (
    <Box sx={{ padding: 5 }}>
      <Formik
        validateOnChange
        // innerRef={res => formikData = res}
        initialValues={props.getFieldData}
        validationSchema={validationSchemaIONumber}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmitValue(values)
          // const postResponse = JSON.parse(JSON.stringify(values));
          // postResponse['year'] = moment(values.year).format('YYYY');
         
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
              <FieldArray
                name="ionumbermapped"
                render={({ insert, remove, push }) => (
                  <>
                    {values.ionumbermapped.length > 0 &&
                      values.ionumbermapped.map(
                        (fieldItem: any, index: any) => (
                          <Box key={index}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={5}>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                  <TextField
                                    placeholder="IO Number"
                                    variant='outlined'
                                    label="IO Number"
                                    id={`ionumbermapped.${index}.order_id`}
                                    name={`ionumbermapped.${index}.order_id`}
                                    onChange={handleChange}
                                    value={fieldItem.order_id ? fieldItem.order_id : ''}
                                  />
                                   <ErrorMessage name={`ionumbermapped.${index}.order_id`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} md={5}>
                                <FormControl variant='outlined' fullWidth margin='dense'>
                                  <DatePicker
                                    disablePast
                                    views={['year']}
                                    label='Year'
                                    value={fieldItem.year}
                                    onChange={(date) => {
                                      setFieldValue(`ionumbermapped.${index}.year`, date)
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth onKeyDown={onKeyDown} />}
                                  />
                                  <ErrorMessage name={`ionumbermapped.${index}.year`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                </FormControl>
                              </Grid>
                              <Grid item xs={2} md={2} sx={{ textAlign: 'center', marginTop: 5 }}>
                                <ButtonGroup size='small' aria-label='small button group'>
                                  <Button
                                    variant="outlined"
                                    color="inherit" type="button"
                                    onClick={() => {
                                      remove(index)
                                    }
                                    }
                                    disabled={values.ionumbermapped.length <= 1 ? true : false}
                                  >
                                    -
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="primary" type="button"
                                    onClick={() =>
                                      push({
                                        year: "",
                                        order_id: '',
                                      })
                                    }
                                  >
                                    <i className="material-icons">add</i>
                                  </Button>
                                </ButtonGroup>

                              </Grid>
                            </Grid>
                          </Box>))}


                  </>

                )} />
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

export default IOMappingForm;