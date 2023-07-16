import { useDispatch, connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, FormControl, Grid, Input, InputLabel, createFilterOptions } from '@mui/material';
import AppGridContainer from '@crema/core/AppGridContainer';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppList } from '@crema';
import { useDropzone } from 'react-dropzone';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import moment from 'moment';
import AppLoader from '@crema/core/AppLoader'
import { ActionTypes } from "saga/sagas/Types";
import { leadsValidationSchema } from "./LeadValidation";
import FormHelperText from '@mui/material/FormHelperText';
import { formSchmFields } from './Types';
import { reqCustomerAndBusiness } from '../../../../saga/Actions';
import { onKeyDown } from "@crema/commonservices/CommonFileDownload";
import { commonInformationDetails, formValidationSizeMsg } from "services/Constants";
import CommonStore from '@crema/services/commonstore';
import { RoutePermittedRole } from "shared/constants/AppConst";
import { FilmOptionType } from "@crema/commonservices/commonFunction";


const filter = createFilterOptions<FilmOptionType>();

const AddLeadForm = (props: any) => {
  const userRole = CommonStore().userRoleType;
  const { leadRespones, getLeadDetails, statusCode, getUserDate, getCustomerandBusiness } = props;
  const [getCustomerInfo, setCustomerInfo] = React.useState<any>(null)
  const [getBusinessInfo, setBusinessInfo] = React.useState<any>(null)
  const [getCustomerStatus, setCustomerStatus] = React.useState(false);
  let formikData: any;
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLeadEditValue: any = state;

  /** File upload */
  const dropzone = useDropzone({
    accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
    maxFiles: 5,
    maxSize: 10000000
  });
  const { acceptedFiles } = dropzone;
  const [uploadedFiles, setUploadedFiles]: any = useState([]);

  // This form on submit function
  const onSubmitLeads = (getValues?: any) => {
    if (getLeadEditValue) {
      const postValue = {
        leadId: getLeadEditValue.leadId,
        postValue: getValues
      }
      dispatch({ type: ActionTypes.UPDATE_LEADS_DATA_REQUEST, postValue })
    } else {
      dispatch({ type: ActionTypes.ADD_LEADS_REQUEST, getValues })
    }
  }



  React.useEffect(() => {
    props.getUserDateList()
    props.reqCustomerAndBusiness()
    setCustomerInfo(null)
    setBusinessInfo(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (statusCode) {
      if (statusCode.status) {
        navigate('/business/leads-monitoring')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCode])

  useEffect(() => {
    getUserDetailInit()
    setUploadedFiles(dropzone.acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles, leadRespones, getLeadDetails]);

  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };

  // This is function used to add status key on user list
  const getUserDetailInit = () => {
    const userList: any = [];
    if (getUserDate && getUserDate.length) {
      getUserDate.forEach((items: any) => {
        items["disable"] = false;
        userList.push(items)
      })
    }

  }

  const goBack = () => {
    navigate("/business/leads-monitoring");
  }

  const getBusinessDetails = (getValues: any) => {
    if (getValues) {
      setBusinessInfo(getValues)
      formikData.setFieldValue('provider_short_id', getValues.shortid)
      formikData.setFieldValue('provider_name', getValues.emp_name)
      formikData.setFieldValue('provider_email', getValues.email)
      formikData.setFieldValue('provider_department', getValues.department)
      formikData.setFieldValue('service_provider_cost_center', getValues.cost_center)
    } else {
      setBusinessInfo(null)
      formikData.setFieldValue('provider_short_id', "")
      formikData.setFieldValue('provider_name', "")
      formikData.setFieldValue('provider_email', "")
      formikData.setFieldValue('provider_department', "")
      formikData.setFieldValue('service_provider_cost_center', "")
    }
  }

  const breadCrumbValues = {
    title: userRole === RoutePermittedRole.Customer ? 'Service Enquiry ' : 'Create Leads',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
  }

  const getServiceReceiverDetails = (getValues?: any) => {
    if (getValues && getValues.shortid) {
      setCustomerStatus(false)
      formikData.setFieldValue('receiver_short_id', getValues.shortid)
      formikData.setFieldValue('receiver_contact_name', getValues.emp_name)
      formikData.setFieldValue('receiver_email_id', getValues.email)
      formikData.setFieldValue('receiver_department', getValues.department)
      formikData.setFieldValue('service_receiver_cost_center', getValues.cost_center)
    } else {
      setCustomerStatus(true)
      formikData.setFieldValue('receiver_contact_name', "")
      formikData.setFieldValue('receiver_email_id', "")
      formikData.setFieldValue('receiver_department', "")
      formikData.setFieldValue('service_receiver_cost_center', "")
    }
  }
  const onClearDetails = () => {
    formikData.setFieldValue('receiver_short_id', "")
    formikData.setFieldValue('receiver_contact_name', "")
    formikData.setFieldValue('receiver_email_id', "")
    formikData.setFieldValue('receiver_department', "")
    formikData.setFieldValue('service_receiver_cost_center', "")

  }
  const onClearServiceReceiverDetails = (getValues?: any) => {
    if (getValues && getValues.inputValue) {
      setCustomerStatus(true)
      formikData.setFieldValue('receiver_contact_name', "")
      formikData.setFieldValue('receiver_email_id', "")
      formikData.setFieldValue('receiver_department', "")
      formikData.setFieldValue('service_receiver_cost_center', "")
    } else {
      setCustomerStatus(false)
    }
  }

  return (
    <>

      <BreadcrumbsData menuList={breadCrumbValues} />  {/*This is breadcrumbsdata */}
      <AppGridContainer>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Box style={{ marginTop: 16 }}>
                {formSchmFields ?
                  <Formik
                    innerRef={res => formikData = res}
                    validateOnChange
                    // validateOnBlur
                    initialValues={formSchmFields}
                    validationSchema={leadsValidationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      setSubmitting(true);
                      if (values) {
                        const formData = new FormData();
                        formData.append("request_date", moment(new Date(values.request_date)).format('YYYY-MM-DD'));
                        formData.append("service_receiver_short_id", values.receiver_short_id);
                        formData.append("service_receiver_contact_name", values.receiver_contact_name);
                        formData.append("service_receiver_email_id", values.receiver_email_id);
                        formData.append("service_receiver_entity", values.receiver_entity);
                        formData.append("project_name", values.project_name);
                        formData.append("short_description", values.short_description);
                        formData.append("service_provider_contact_name", values.provider_name);
                        formData.append("service_provider_email_id", values.provider_email);
                        formData.append("service_receiver_department", values.receiver_department);
                        formData.append("service_provider_department", values.provider_department);
                        formData.append("service_provider_short_id", values.provider_short_id);
                        formData.append("service_provider_cost_center", values.service_provider_cost_center);
                        formData.append("service_receiver_cost_center", values.service_receiver_cost_center);

                        for (let i = 0; i < uploadedFiles.length; i++) {
                          formData.append("supporting_files", uploadedFiles[i]);
                        }
                        onSubmitLeads(formData)
                      }
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, values, errors, isValid, dirty, touched, setFieldValue, handleChange }) => {
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
                          <Box sx={{ flexGrow: 1, width: '100%', padding: 5 }}>
                            <Grid container spacing={2}>
                              {/* <Grid item xs={12} md={8}> */}
                              <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                <Grid item xs={12} md={4}>
                                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                      label='Request Date *'
                                      value={values?.request_date}
                                      minDate={moment().toDate()}
                                      onChange={reqDate => setFieldValue("request_date", reqDate)}
                                      renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' onKeyDown={onKeyDown} {...params} />}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant='standard' fullWidth margin='dense' error={values.receiver_short_id === "" ? true : false}>
                                    {/* <InputLabel id='receiver_short_id'>Service Receiver/ Customer Short Id</InputLabel> */}
                                    <Autocomplete
                                      value={getCustomerInfo}
                                      onChange={(event?: any, newValue?: any) => {
                                        if (newValue) {
                                          if (newValue.shortid) {
                                            getServiceReceiverDetails(newValue);
                                            setFieldValue('receiver_short_id', newValue.shortid);
                                            setCustomerInfo(newValue)
                                          } else {
                                            getServiceReceiverDetails(newValue);
                                            setFieldValue('receiver_short_id', newValue);
                                            setCustomerInfo(newValue)
                                          }
                                        } else {
                                          onClearDetails()
                                          setCustomerInfo(null)
                                        }
                                        if (typeof newValue === 'string') {
                                          // setValue({
                                          //   rate: newValue,
                                          // });
                                        } else if (newValue && newValue.inputValue) {
                                          onClearServiceReceiverDetails(newValue)
                                        } else {
                                          // setValue(newValue);
                                        }
                                      }}
                                      filterOptions={(options?: any, params?: any) => {
                                        const filtered = filter(options, params);
                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.shortid);
                                        if (inputValue !== '' && !isExisting) {
                                          filtered.push({
                                            inputValue,
                                            shortid: `${inputValue}`,
                                          });
                                        }
                                        return filtered;
                                      }}
                                      selectOnFocus
                                      clearOnBlur
                                      handleHomeEndKeys
                                      id="free-solo-with-text-demo"
                                      // options={tariffUnitConstants?tariffUnitConstants:[]}
                                      options={getCustomerandBusiness && getCustomerandBusiness.customer !== null ? getCustomerandBusiness.customer : []}
                                      getOptionLabel={(option?: any) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                          return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                          return option.inputValue;
                                        }
                                        // Regular option
                                        return option.shortid;
                                      }}
                                      renderOption={(props?: any, option?: any) => <li {...props}>{option.shortid}</li>}
                                      freeSolo
                                      renderInput={(params) => (
                                        <TextField variant="standard" {...params} label="Service Receiver/ Customer Short Id *"
                                          placeholder='Service Receiver/ Customer Short Id *' />
                                      )}
                                    />

                                    {
                                      values.receiver_short_id ?
                                        null
                                        : <FormHelperText> {errors.receiver_short_id ? (
                                          <span className="errormsg"> {errors.receiver_short_id}</span>
                                        ) : null}</FormHelperText>
                                    }

                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant="standard" fullWidth margin='dense' error={values.receiver_contact_name === "" ? true : false}>
                                    <InputLabel htmlFor="receiver_contact_name">Service Receiver/ Customer Contact Name *</InputLabel>
                                    <Input id="receiver_contact_name" name="receiver_contact_name" value={values?.receiver_contact_name} onChange={handleChange} disabled={getCustomerStatus ? false : true} />
                                    {
                                      values.receiver_contact_name ?
                                        null
                                        : <FormHelperText> {errors.receiver_contact_name ? (
                                          <span className="errormsg"> {errors.receiver_contact_name}</span>
                                        ) : null}</FormHelperText>
                                    }
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant="standard" fullWidth margin='dense' error={values.receiver_email_id === "" ? true : false}>
                                    <InputLabel htmlFor="receiver_email_id">Service Receiver/ Customer Email ID *</InputLabel>
                                    <Input id="receiver_email_id" name="receiver_email_id" value={values?.receiver_email_id} onChange={handleChange} disabled={getCustomerStatus ? false : true} />
                                    {
                                      values.receiver_email_id ?
                                        null
                                        : <FormHelperText> {errors.receiver_email_id ? (
                                          <span className="errormsg"> {errors.receiver_email_id}</span>
                                        ) : null}</FormHelperText>
                                    }

                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant="standard" fullWidth margin='dense'>
                                    <InputLabel htmlFor="receiver_department">Service Receiver/ Customer Department *</InputLabel>
                                    <Input id="receiver_department" name="receiver_department" value={values?.receiver_department} onChange={handleChange} disabled={getCustomerStatus ? false : true} />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant="standard" fullWidth margin='dense' error={!!errors.receiver_entity}>
                                    <InputLabel htmlFor="receiver_entity">Service Receiver/ Customer Entity *</InputLabel>
                                    <Input id="receiver_entity" name="receiver_entity" value={values?.receiver_entity} onChange={handleChange} />
                                    <FormHelperText> {errors.receiver_entity ? (
                                      <span> {errors.receiver_entity}</span>
                                    ) : null}</FormHelperText>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant="standard" fullWidth margin='dense' error={!!errors.project_name}>
                                    <InputLabel htmlFor="project_name">Project Name *</InputLabel>
                                    <Input id="project_name" name="project_name" value={values?.project_name} onChange={handleChange} />
                                    <FormHelperText> {errors.project_name ? (
                                      <span> {errors.project_name}</span>
                                    ) : null}</FormHelperText>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <FormControl variant='standard' fullWidth margin='dense'>
                                    <Autocomplete
                                      id='provider_short_id'
                                      options={getCustomerandBusiness ? getCustomerandBusiness.business : []}
                                      getOptionLabel={(option: any) => `${option.shortid}`}
                                      onChange={(event, value: any) => {
                                        getBusinessDetails(value)
                                      }}
                                      filterSelectedOptions
                                      value={getBusinessInfo}
                                      renderInput={(params) => (
                                        <TextField
                                          variant="standard"
                                          {...params}
                                          label='Service Provider/ Business Short Id'
                                          placeholder='Service Provider/ Business Short Id'
                                        />
                                      )}
                                    />
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                  <FormControl variant="standard" fullWidth margin='dense'>
                                    <InputLabel htmlFor="provider-name">Service Provider/ Business Name</InputLabel>
                                    <Input id="provider-name" name="provider_name" value={values?.provider_name} onChange={handleChange} readOnly />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <FormControl variant="standard" fullWidth margin='dense'>
                                    <InputLabel htmlFor="provider_email">Service Provider/ Business Email</InputLabel>
                                    <Input id="provider_email" name="provider_email" value={values?.provider_email} onChange={handleChange} readOnly />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <FormControl variant="standard" fullWidth margin='dense'>
                                    <InputLabel htmlFor="provider_department">Service Provider/ Business Department</InputLabel>
                                    <Input id="provider_department" name="provider_department" value={values?.provider_department} onChange={handleChange} readOnly />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <FormControl variant="standard" fullWidth margin='dense' error={!!errors.short_description}>
                                    <TextField
                                      id='short_description'
                                      name="short_description"
                                      label='Short Description'
                                      multiline
                                      rows={3}
                                      variant='standard'
                                      value={values.short_description}
                                      onChange={handleChange}
                                      error={!!errors.short_description}
                                    />
                                    <FormHelperText> {errors.short_description ? (
                                      <span> {errors.short_description}</span>
                                    ) : null}</FormHelperText>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>

                                  <UploadModern
                                    uploadText={commonInformationDetails.drapanddrop}
                                    dropzone={dropzone}
                                  />
                                  <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom: 2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
                                  <aside>
                                    <AppList
                                      data={uploadedFiles}
                                      renderRow={(file, index) => (
                                        <FileRow
                                          key={index + file.path}
                                          file={file}
                                          onDeleteUploadFile={onDeleteUploadFile}
                                        />
                                      )}
                                    />
                                  </aside>
                                </Grid>

                              </Grid>
                            </Grid>
                          </Box>

                          <Box sx={{ pt: 3, textAlign: "right", }} >

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
                              className={!(dirty && isValid) ? "disabled-btn" : ""}
                              disabled={!(dirty && isValid)}
                              variant="contained"
                              color="primary"
                              type="submit"
                            >  Submit </Button>
                          </Box>
                        </Form>
                      )
                    }}
                  </Formik>
                  : <AppLoader />

                }

              </Box>
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>

  );
}



const mapStateToProps = (state: any) => {
  return {
    loading: state.businessProcess.loading,
    leadRespones: state.businessProcess,
    getLeadDetails: state.businessProcess.getLeadsEditResponse,
    updateStatus: state.businessProcess.updateStatus,
    statusCode: state.businessProcess.addEditLeadsResponse,
    getUserDate: state.businessProcess.getUserDateList,
    getCustomerandBusiness: state.businessProcess.getCustomerandBusiness,
    errorsCheckToken: state.businessProcess.errors
  }
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    getUserDateList: () => dispatch({ type: ActionTypes.GET_USERDETAILS_REQUEST }),
    getLeadData: (getValues?: any) => dispatch({ type: ActionTypes.GET_LEADS_DATA_REQUEST, getValues }),
    reqCustomerAndBusiness: () => dispatch(reqCustomerAndBusiness())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLeadForm);