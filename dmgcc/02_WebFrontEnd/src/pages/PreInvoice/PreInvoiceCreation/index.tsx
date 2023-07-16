import React, { useEffect } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, FormControl,
  Grid, InputLabel, MenuItem, Select, Typography,
  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormHelperText
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form, FieldArray } from 'formik';
import { AppComponentHeader } from '../../../@crema';
import { useDropzone } from 'react-dropzone';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  appConstants,
  currencyConstants, preInvoiceRequirementSchema,
} from '../../../shared/constants/AppConst';
import { createPreInvoiceReq, getPreInvoiceDetailAction, getPreInvoiceEditBizCaseSLA, initPreInvoiceAction } from "../../../saga/Actions/Preinvoice.action"
import { connect } from "react-redux";
import PerinvoiceTableHeader from './Table/PerinvoiceTableHeader';
import { reqUpdateAttachmentsConditionss } from 'saga/Actions';
import { toast } from 'react-toastify';
import FileRowCustom from '@crema/core/thirdParty/reactDropzone/components/FileRow/FileRowCustom';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const PreInvoiceCreation = (props: any) => {
  const navState: any = useLocation();
  const navigate = useNavigate();
  let formikRef: any;
  const [expanded, setExpanded] = React.useState(null);
  const [viewPreinvoiceDisabled, setPreinvoiceDisabled] = React.useState(false);
  const [detailsInitiated, setDetailsInitiated] = React.useState(false);
  const SlaId = navState.state;
  const dropzone = useDropzone({
    accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
    maxFiles: 5,
    maxSize: 10000000
  });
  const { acceptedFiles } = dropzone;
  const [uploadedFiles, setUploadedFiles]: any = React.useState([]);
  const [oldUploadedFiles, setOldUploadedFiles]: any = React.useState([]);
  const [getPreInvoiceData, setPreInvoiceData]: any = React.useState<any>(null);
  const [getPreInvoiceStatus, setPreInvoiceStatus]: any = React.useState(false);
  const [getFailPreInvoiceStatus, setFailPreInvoiceStatus]: any = React.useState(false);

  const { getPerinvoiceData, resAttachmentsFileUpload, createPreInvoiceResponse, preInvoiceResponseData } = props;

  useEffect(() => {
    if (SlaId) {
      props.initPreInvoiceProcess();
      if (SlaId.action === 'view') {
        setPreinvoiceDisabled(true);
        props.getPreInvoiceDetail({ preInvoiceId: SlaId.preinvoiceId })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (SlaId.action === 'create') {
      if (getPerinvoiceData) {
        fetchPreInvoiceData(getPerinvoiceData)
      }
      if (createPreInvoiceResponse && createPreInvoiceResponse.status) {
        toast.success(createPreInvoiceResponse.message, { position: 'bottom-right' });
        props.initPreInvoiceProcess();
        resSuccessPage();
      }
    }
    if (SlaId.action === 'view') {
      if (preInvoiceResponseData && preInvoiceResponseData.status && !detailsInitiated) {
        fetchPreInvoiceData(preInvoiceResponseData.data)
        setDetailsInitiated(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPerinvoiceData, createPreInvoiceResponse, preInvoiceResponseData])

  React.useEffect(() => {
    if (getPreInvoiceData && getPreInvoiceData.sla_preinvoice_tariffsheet) {
      let findPreInvoiceStatus: any = getPreInvoiceData.sla_preinvoice_tariffsheet.find((item: any) => item.total_amount === null)
      if (findPreInvoiceStatus) {
        findPreInvoiceStatus['total_amount'] = 0;
        findPreInvoiceStatus['amount'] = 0;
        setPreInvoiceStatus(false)
      } else {
        setPreInvoiceStatus(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPreInvoiceData])

  React.useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
    if (dropzone.acceptedFiles.length) {
      getSLAUploadFile(dropzone.acceptedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles])

  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };

  const onTCDeleteOldUploadFile = (file) => {
    const supFileList: any = [];
    uploadedFiles.forEach((supFiles: any, index: any) => {
      if (file.supporting_files_name === supFiles.supporting_files_name) {
        supFiles["disable"] = true;
      }
      supFileList.push(supFiles)
    })
    setUploadedFiles(supFileList)
  }

  const getSLAUploadFile = (uploadedFiles?: any) => {
    const formData = new FormData();
    if (uploadedFiles.length) {
      for (const tcUpload in uploadedFiles) {
        formData.append("file", uploadedFiles[tcUpload]);
      }
      props.postUpdateAttachmentsConditionss(formData)
    }
  }
  const resSuccessPage = () => {
    navigate('/Preinvoice/PreInvoiceGrid')
  }

  const goBack = () => {
    if(navState && navState.state && navState.state.pagestatus === "PreInvoice-creation"){
      navigate('/SLA/biz-case-sla')
    }else{
      navigate('/Preinvoice/PreInvoiceGrid')
    }
  }

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchPreInvoiceData = (preInvoiceData: any) => {
    if (formikRef && preInvoiceData) {
      formikRef.setFieldValue('sla', preInvoiceData.slaname);
      formikRef.setFieldValue('customer', preInvoiceData.customer);
      formikRef.setFieldValue('address', preInvoiceData.address);
      formikRef.setFieldValue('project_name', preInvoiceData.project_name);
      formikRef.setFieldValue('cost_center', preInvoiceData.cost_center);
      formikRef.setFieldValue('currency', preInvoiceData.currency);
      formikRef.setFieldValue('start_date', preInvoiceData.start_date);
      formikRef.setFieldValue('end_date', preInvoiceData.end_date);
      formikRef.setFieldValue('service_description', preInvoiceData.service_description);
      formikRef.setFieldValue('billing_cycle', preInvoiceData.billing_cycle);
      formikRef.setFieldValue('preinvoice_period', preInvoiceData.preinvoice_period);
      if (preInvoiceData.po_number) {
        formikRef.setFieldValue('po_number', preInvoiceData.po_number);
      }
      if (preInvoiceData.date_of_service) {
        formikRef.setFieldValue('date_of_service', preInvoiceData.date_of_service);
      }
      if (preInvoiceData.remarks) {
        formikRef.setFieldValue('remarks', preInvoiceData.remarks);
      }
      if (preInvoiceData.attachments && preInvoiceData.attachments.length) {
        setOldUploadedFiles(preInvoiceData.attachments);
      }
      const preInvoiceTariff = preInvoiceData.sla_preinvoice_tariffsheet;
      if (preInvoiceTariff) {
        preInvoiceTariff.forEach((element) => {
          const markupValue = appConstants.markupValue;
          const markupValueData: any = markupValue / 100;

          const tariffAmount = element.amount ? element.amount : 0;
          const totalMarkUpValue = parseInt(tariffAmount) * markupValueData;
          element['totalMarkupValue'] = totalMarkUpValue;
          element['markup_value'] = markupValue;
        });
        formikRef.setFieldValue('sla_preinvoice_tariffsheet', preInvoiceTariff);
      }
    }
  }

  const onCalTariffSheet = (getValues: any, getAmount?: any, index?: any) => {
    formikRef.setFieldValue(`sla_preinvoice_tariffsheet[${index}].amount`, getAmount);
    if (getValues && getValues.material_description && getPreInvoiceData && getPreInvoiceData.sla_preinvoice_tariffsheet) {
      let findObject: any = getPreInvoiceData.sla_preinvoice_tariffsheet.find((item: any) => item.material_description === getValues.material_description)
      if (findObject) {
        let TotalAmount: any = parseInt(findObject.rate) * parseInt(getAmount)
        if (parseInt(TotalAmount) <= parseInt(findObject.budget_available)) {
          setFailPreInvoiceStatus(false)
          formikRef.setFieldValue(`sla_preinvoice_tariffsheet[${index}].total_amount`, String(TotalAmount));
        } else {
          setFailPreInvoiceStatus(true)
          formikRef.setFieldValue(`sla_preinvoice_tariffsheet[${index}].total_amount`, TotalAmount?String(TotalAmount):0);
          toast.error(`should not be more than ${findObject.budget_available} Budget available`, { position: 'bottom-right' });
        }
      }
    }

  }

  return (
    <>
      <AppComponentHeader
        title="Generate Pre-Invoice "
        description={(SlaId.action === 'create') ? "Add Pre-Invoice" : "View Pre-Invoice"} //"Add Pre-Invoice"
      />
      <AppGridContainer>

        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Box style={{ marginTop: 16 }}>
                <Formik
                  enableReinitialize
                  innerRef={(action) => { formikRef = action }}
                  initialValues={preInvoiceRequirementSchema}
                  //validationSchema={bizCaseSLAValidationSchema}
                  onSubmit={(values, actions) => {
                    values['attachments'] = (resAttachmentsFileUpload) ? resAttachmentsFileUpload : [];
                    values['id'] = SlaId.preinvoiceId;
                    const ProjectValue: any = {
                      slaid: SlaId.slaid,
                      slaFormData: values
                    }
                    props.createPreInvoiceDetails(ProjectValue)
                  }}
                >
                  {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => {
                    setPreInvoiceData(values)
                    return (
                      <Form
                        style={{ width: "100%", display: "flex", flexDirection: "column" }}
                        noValidate
                        autoComplete="off"
                      >
                        <Accordion expanded={expanded === 'customerDetails'} onChange={handleExpandChange('customerDetails')}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Customer Details</Typography>
                          </AccordionSummary>
                          <AccordionDetails>

                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                              <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginBottom: 5 }} >

                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    label='SLA'
                                    id='outlined-size-small'
                                    name={'sla'}
                                    value={values.sla}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    label='Customer Name'
                                    id='outlined-size-small'
                                    name={'customer'}
                                    value={values.customer}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    label='Address'
                                    id='outlined-size-small'
                                    name={'address'}
                                    value={values.address}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    label='Project'
                                    id='outlined-size-small'
                                    name={'project_name'}
                                    value={values.project_name}
                                    onChange={handleChange}
                                    required
                                    error={(errors.project_name) ? true : false} helperText={errors.project_name}
                                  />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                  <TextField
                                    fullWidth
                                    name='cost_center'
                                    label='Cost Centre'
                                    id='outlined-size-small'
                                    disabled
                                    value={values.cost_center}
                                    onChange={handleChange}
                                  />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                  <FormControl variant='outlined' fullWidth >
                                    <InputLabel id='currency-list-label'>Currency</InputLabel>
                                    <Select
                                      labelId='currency-list-label'
                                      id='currency-list-label-standard'
                                      name="currency"
                                      value={values.currency}
                                      onChange={handleChange}
                                      label='currency'
                                      required
                                      disabled
                                    >
                                      <MenuItem value=''><em>None</em></MenuItem>
                                      {currencyConstants.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                      ))}
                                    </Select>
                                    {errors.currency && <FormHelperText error>{errors.currency}</FormHelperText>}
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    name='start_date'
                                    label='Start Date'
                                    id='start_date-small'
                                    value={values.start_date}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    name='end_date'
                                    label='End Date'
                                    id='end_date-small'
                                    value={values.end_date}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    fullWidth
                                    name='service_description'
                                    label='Service Description'
                                    id='outlined-size-small'
                                    value={values.service_description}
                                    onChange={handleChange}
                                    disabled
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    fullWidth
                                    name='billing_cycle'
                                    label='Billing Cycle'
                                    id='outlined-size-small'
                                    value={values.billing_cycle}
                                    onChange={handleChange}
                                    disabled
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled={viewPreinvoiceDisabled}
                                    fullWidth
                                    name='po_number'
                                    label='PO Number'
                                    id='outlined-size-small'
                                    value={values.po_number}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled
                                    fullWidth
                                    name='date_of_service'
                                    label='Date Of Service'
                                    id='date_of_service'
                                    value={values?.preinvoice_period}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    disabled={viewPreinvoiceDisabled}
                                    fullWidth
                                    label='Remarks'
                                    name='remarks'
                                    id='outlined-size-small'
                                    value={values.remarks}
                                    onChange={handleChange}
                                  />
                                </Grid>
                              </Grid>
                            </Box>

                          </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'tariffDetails'} onChange={handleExpandChange('tariffDetails')}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>Tariff Sheet</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TableContainer component={Paper}>
                              <Table aria-label='simple table'>
                                <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                                  <PerinvoiceTableHeader />
                                </TableHead>
                                <TableBody>
                                  <FieldArray
                                    name="sla_preinvoice_tariffsheet"
                                    render={tariffSheetListHelpers => (
                                      <React.Fragment>
                                        {
                                          // getTariffSheetStatus?
                                          (values.sla_preinvoice_tariffsheet && values.sla_preinvoice_tariffsheet.length !== 0) && values.sla_preinvoice_tariffsheet.map((tariffSheetProperty, index) => (
                                            <TableRow key={index}>
                                              <TableCell sx={{}}>{tariffSheetProperty.material_description}</TableCell>
                                              <TableCell sx={{}}>{tariffSheetProperty.units}</TableCell>
                                              <TableCell sx={{}}>
                                                <React.Fragment>
                                                  <FormControl fullWidth margin='dense'>
                                                    <TextField
                                                      disabled={viewPreinvoiceDisabled} name={`sla_preinvoice_tariffsheet[${index}].amount`}
                                                      label='Quantity' variant='outlined' value={(tariffSheetProperty.amount) ? tariffSheetProperty.amount : ""} onChange={(event: any) => {
                                                        onCalTariffSheet(tariffSheetProperty, event.target.value, index)
                                                      }}
                                                      type="number" />
                                                  </FormControl>
                                                </React.Fragment>
                                              </TableCell>
                                              <TableCell sx={{}}>{tariffSheetProperty.rate}</TableCell>
                                              <TableCell sx={{}}>{tariffSheetProperty.total_amount?tariffSheetProperty.total_amount:'-'}</TableCell>
                                              <TableCell sx={{}}>{tariffSheetProperty.budget_available}</TableCell>
                                            </TableRow>
                                          ))
                                          // :null
                                        }
                                      </React.Fragment>
                                    )}
                                  />
                                </TableBody>
                              </Table>
                            </TableContainer>

                          </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'attachmentDetails'} onChange={handleExpandChange('attachmentDetails')}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                          >
                            <Typography>Attachments</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid item xs={12} md={12}>
                              {!viewPreinvoiceDisabled && <React.Fragment>
                                <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom: 2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
                                <UploadModern
                                  uploadText={commonInformationDetails.drapanddrop}
                                  dropzone={dropzone}
                                />
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
                              </React.Fragment>}

                              <aside>
                                <AppList
                                  data={oldUploadedFiles}
                                  renderRow={(file, index) => (
                                    <FileRowCustom
                                      key={index}
                                      file={file}
                                      onDeleteUploadFile={onTCDeleteOldUploadFile}
                                    />
                                  )}
                                />
                              </aside>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                        <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                          <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                            color="inherit" type="button" onClick={(event) => { goBack(); }}> Cancel
                          </Button>
                          {(SlaId.action === 'create') && <Button disabled={getPreInvoiceStatus === false && getFailPreInvoiceStatus === false ? false : true} sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                            color="primary" type="submit"> Save
                          </Button>}
                        </Box>
                      </Form>
                    )
                  }}
                </Formik>
              </Box>
            </CardContent>
          </Card>
          {/* Iteration View Modal PopUp */}
        </Grid>
      </AppGridContainer>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.preInvoiceProcess.loading,
    getSLAEditDetailsList: state.preInvoiceProcess.getSLAEditDetails,
    getPerinvoiceData: state.bizCaseSLAProcess.getPerinvoiceData,
    resAttachmentsFileUpload: state.bizCaseSLAProcess.resAttachmentsFileUpload,
    createPreInvoiceResponse: state.preInvoiceProcess.createPreInvoiceResponse,
    preInvoiceResponseData: state.preInvoiceProcess.preInvoiceResponseData,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  initPreInvoiceProcess: (data: any) => {
    dispatch(initPreInvoiceAction())
  },
  createPreInvoiceDetails: (getValue) => {
    dispatch(createPreInvoiceReq(getValue))
  },
  getSLADetails: (getSLAId?: any) => dispatch(getPreInvoiceEditBizCaseSLA(getSLAId)),
  postUpdateAttachmentsConditionss: (getValue?: any) => dispatch(reqUpdateAttachmentsConditionss(getValue)),
  getPreInvoiceDetail: (data: any) => {
    dispatch(getPreInvoiceDetailAction(data))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(PreInvoiceCreation);


