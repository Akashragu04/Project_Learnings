import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
// import AppAnimate from "@crema/core/AppAnimate";
import { Card, Box, Grid, CardContent, Autocomplete, TextField, FormControl } from '@mui/material';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import Overview from "./Overview";
import { Formik, Form } from 'formik';
import SlaViewGrid from './SlaViewGrid';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';

const OverViewSLA = (props?: any) => {
  let formikData: any;
  const [filterProject, setFilterProject] = React.useState(false)
  const [businessCase, setBusinessCase] = React.useState('');


  React.useEffect(() => {
    props.getProjectList()  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {   
    if (props.getProjectOverview !== null) {
      if (props.getProjectOverview.project_details.business_case === true) {
        setBusinessCase('YES')
      } else if (props.getProjectOverview.project_details.business_case === false) {
        setBusinessCase('No')
      } else {
        setBusinessCase('NA')
      }
    } else {
      setBusinessCase('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getProjectOverview]);

  const initialFields: any = {
    project_code: '',
    project_name: '',
    business_case: ''
  }

  const getProjectDetail = (e?: any, getValue?: any) => {
    props.getProjectOverviewDetails(getValue)
    if (getValue) {
      formikData.setFieldValue('project_name', getValue.project_name)
      formikData.setFieldValue('business_case', getValue.business_case)
    }
    setFilterProject(true)
  }

  const closeProjectFilterData = (getValues?: any) => {
    setFilterProject(false)
  }
  
  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {/* <AppAnimate animation="transition.fadeIn" delay={200}> */}
      <AppGridContainer className="marginTop">
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Grid item xs={12} style={{ marginTop: 0 }}>
                <Formik
                  innerRef={res => formikData = res}
                  validateOnChange
                  initialValues={initialFields}
                  //  validationSchema={leadsValidationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => { }}>
                  {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
                    return (
                      <Form>
                        <Box sx={{ flexGrow: 1, width: '100%', padding: 5 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} md={4}>
                              <Box sx={{ paddingTop: 5 }}>
                                <Autocomplete
                                  onChange={(event: any, newValue: any) => {
                                    getProjectDetail(event, newValue)
                                  }}
                                  getOptionLabel={(option) => `${option.project_id} - ${option.project_name}`}
                                  id='project_code'
                                  options={props.getProjectListDetail ? props.getProjectListDetail : []}
                                  className="Project Code"
                                  renderInput={(params) => <TextField {...params} label='Project Code' />}
                                  sx={{ marginRight: 3 }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                              <Box sx={{ paddingTop: 5 }}>
                                <FormControl fullWidth>
                                  <TextField id='project_name' label='Project Name' value={values?.project_name}
                                    variant='outlined' onChange={handleChange} disabled={true} />
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                              <Box sx={{ paddingTop: 5 }}>
                                <FormControl fullWidth>
                                  <TextField id='business_case' label='Business Case' value={businessCase}
                                    variant='outlined' onChange={handleChange} disabled={true} />
                                </FormControl>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Form>
                    )
                  }}
                </Formik>
              </Grid>

              <Grid item xs={12} style={{ marginTop: 0 }}>
                {props.getProjectOverview && props.getProjectOverview.project_details ?
                  <Overview showProjectDetails={filterProject} data={props.getProjectOverview}
                    getProjectOverview={props.getProjectOverview.project_details} />
                  : null}

              </Grid>
              {props.getProjectOverview && props.getProjectOverview.list_of_sla ?
                <SlaViewGrid showProjectDetails={filterProject} getProjectOverview={props.getProjectOverview.list_of_sla} closeProjectFilterData={closeProjectFilterData} />
                : null}

            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
      {/* </AppAnimate> */}
    </>
  )
}

const breadCrumbValues = {
  title: 'Overview',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}


const mapStateToProps = (state: any) => {
  return {
    loading: state.operationProcess.loading,
    getProjectOverview: state.operationProcess.getProjectOverview,
    getProjectListDetail: state.operationProcess.getProjectList
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getProjectList: () => dispatch({ type: OperationActionTypes.GET_PROJECT_LIST_REQUEST }),
    getProjectOverviewDetails: (projectId?: any) => dispatch({ type: OperationActionTypes.PROJECT_OVERVIEW_REQUEST, value: projectId }),
  }
}

// export default OverViewSLA;
export default connect(mapStateToProps, mapDispatchToProps)(OverViewSLA);
