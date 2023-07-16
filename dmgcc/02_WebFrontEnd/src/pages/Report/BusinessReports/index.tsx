import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { connect } from "react-redux";
import {
  downloadBizCaseSetupReportAction, downloadCustomerBizReportAction,
  downloadDetailedBizCaseExcelReportAction, downloadDetailedBizCasePdfReportAction,
  downloadLeadsBizReportAction, downloadNewBizRecruitmentReportAction, getBizCaseDetailsReportAction,
  getBizProfitLossCalculationListAction,
  getBusinessSetupInfo, initBizProfitLossIterationDetailnAction, initBusinessReportsAction, reqBusinessDashboardDetails,
  reqCommonGet, reqProjectList
} from "saga/Actions";
import { saveAs } from 'file-saver';
import SetBizCaseSetup from "pages/Business/BusinessSetup/setBizCaseSetup/SetBizCaseSetup";
import { ConfigAPI } from "services/config";
import ViewBizCaseCalView from "./ViewBizCaseCalView";
import ViewBizCaseCalculationIterationView from '../../Business/addRequirements/viewbizcase-calculation-iterationview';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});


const BusinessReports = (props?: any) => {
  const { customerBizReportResponse, leadsBizReportResponse, detailedBizExcelResponse,
    bizSetupReportResponse, newBizRecruitmentResponse, detailedBizPdfResponse } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(null);
  const [bizCaseDetail, setBizCaseDetail] = React.useState<any>(null);
  const [getBizInfo, setBizInfo] = React.useState<any>(null);
  const [openBizPrint, setOPenBizPrint] = React.useState(false);
  const [viewBizDetailsPrint, setViewBizDetailsPrint] = React.useState(false);
  const [calcPreviewAction, setCalcPreviewAction] = React.useState('');
  const [calcIterationPreview, setCalcIterationPreview] = React.useState(false);

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    props.initBizReportsProcess();
    props.getAllBizCaseInfoList();
    props.reqProjectList()
    props.initBizProfitLossIterationDetail();
    showCalcIterationPreview('Preview')
    props.reqCommonGet(ConfigAPI.getBizInforeportAPI)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDetailedBusinessCase = (getValues: any) => {
    if(getValues){
      props.getBizCalculationIterationList({ biz_id: getValues.id })
      setBizCaseDetail(getValues);
    }
   
  }

  const onCloseDetailedBusinessCase = () => {
    // setBizCaseDetail(null);
    setViewBizDetailsPrint(false)
  }

  useEffect(() => {
    if (customerBizReportResponse && customerBizReportResponse.data) {
      downloadFile(customerBizReportResponse.data, 'customer-business-report.xlsx', customerBizReportResponse.headers['content-type'])
      props.initBizReportsProcess();
    }
    if (leadsBizReportResponse && leadsBizReportResponse.data) {
      downloadFile(leadsBizReportResponse.data, 'leads-business-report.xlsx', leadsBizReportResponse.headers['content-type'])
      props.initBizReportsProcess();
    }
    if (detailedBizExcelResponse && detailedBizExcelResponse.data) {
      downloadFile(detailedBizExcelResponse.data, 'detailed-business-report.xlsx', detailedBizExcelResponse.headers['content-type'])
      props.initBizReportsProcess();
      // setBizCaseDetail(null);
    }
    if (detailedBizPdfResponse && detailedBizPdfResponse.data) {
      downloadFile(detailedBizPdfResponse.data, 'detailed-business-report.pdf', detailedBizPdfResponse.headers['content-type'])
      props.initBizReportsProcess();
      // setBizCaseDetail(null);
    }
    if (bizSetupReportResponse && bizSetupReportResponse.data) {
      downloadFile(bizSetupReportResponse.data, 'businesscase-setup-report.xlsx', bizSetupReportResponse.headers['content-type'])
      props.initBizReportsProcess();
    }
    if (newBizRecruitmentResponse && newBizRecruitmentResponse.data) {
      downloadFile(newBizRecruitmentResponse.data, 'new-business-recruitment-report.xlsx', newBizRecruitmentResponse.headers['content-type'])
      props.initBizReportsProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerBizReportResponse, leadsBizReportResponse, detailedBizExcelResponse, detailedBizPdfResponse, bizSetupReportResponse, newBizRecruitmentResponse])

  const onGetBizInfo = (getBizDetails?: any) => {
    setBizInfo(getBizDetails)
    if (getBizDetails) {
      props.getBusinessCaseSetup(getBizDetails.id)
    }
    if (getBizDetails && getBizDetails.project) {
      let postValue: any = {
        projectId: getBizDetails.project.id,
        reportType: 'cost'
      }
      props.reqBusinessDashboardDetails(postValue)
    }
  }

  const onCloseBizInfo = () => {
    // setBizInfo(null)
    setOPenBizPrint(false)
  }

  const onOpenBusinessCaseReport = () => {
    setOPenBizPrint(true)

  }

  const onDownloadReports = (action?: any, bizId?: any) => {
    switch (action) {
      case 'customer':
        props.downloadCustomerBizReport();
        break;
      case 'leads':
        props.downloadLeadsBizReport();
        break;
      case 'bizDetailExcel':
        props.downloadDetailedBizExcelReport({ bizcase_id: bizId?.id });
        break;
      case 'bizDetailPdf':
        props.downloadDetailedBizPdfReport({ bizcase_id: bizId?.id });
        break;
      // case 'bizSetup':
      //   props.downloadBizCaseSetupReport();
      // break;
      case 'newbizRecruitment':
        props.downloadNewBizRecruitmentReport(ConfigAPI.getDownloadRecruitments);
        break;

      default:
        break;
    }
  }

  const downloadFile = (data: any, fileName: any, fileType: any) => {
    if (data) {
      let byteCharacters: any;
      if (data.hasOwnProperty('status')) {
        byteCharacters = atob('');
      } else {
        byteCharacters = atob(data);
      }
      fileType = fileType || '';
      let sliceSize = 1024;
      let bytesLength = byteCharacters.length;
      let slicesCount = Math.ceil(bytesLength / sliceSize);
      let byteArrays = new Array(slicesCount);
      for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);
        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      const blob = new Blob(byteArrays, { type: fileType });
      saveAs.saveAs(blob, fileName);
    }
  }

  const onDownloadDetailsBizCase = () => {
    setCalcIterationPreview(true)
  }

  const showCalcIterationPreview = (getValues: any) => {
    setCalcPreviewAction(getValues)
  }

  const setIterationPreviewClose = () => {

  }
  const setIterationAction = (dialog) => (event) => {
    setIterationPreviewDataClose()
  }
  const updateFinalIterationCalculation = (iteration, bizRequirementData) => {

  }

  const setIterationPreviewDataClose = () => {
    setCalcIterationPreview(false);
  }

  return (
    <>
      {viewBizDetailsPrint && <ViewBizCaseCalView setIterationPreviewClose={setIterationPreviewClose} businessProfitIterationList={props.businessProfitIterationList} requirementId={getBizInfo ? getBizInfo.id : null} action={calcPreviewAction}
        show={viewBizDetailsPrint} setIterationAction={setIterationAction} updateFinalIterationCalculation={updateFinalIterationCalculation} onClose={onCloseDetailedBusinessCase} />}
      {
        props.getBizCaseSetupData && openBizPrint ?
          <SetBizCaseSetup bizSetupResponse={getBizInfo} show={openBizPrint} closeSetupBusinessMapping={onCloseBizInfo}
            getBizCaseSetupData={props.getBizCaseSetupData} getBizId={getBizInfo} dashboardDetails={props.dashboardDetails} />
          : null
      }

      {calcIterationPreview && props.businessProfitIterationList ? <ViewBizCaseCalculationIterationView setIterationPreviewClose={setIterationPreviewDataClose} businessProfitIterationList={props.businessProfitIterationList} requirementId={bizCaseDetail ? bizCaseDetail.id : null} action={calcPreviewAction}
        show={calcIterationPreview} setIterationAction={setIterationAction} updateFinalIterationCalculation={updateFinalIterationCalculation} />:null}

      <Box sx={{ height: 'auto', my: 4 }} className={classes.root}>
        <Typography variant="h2" component="div">Business Reports</Typography>
        <Typography variant='caption' display='block' gutterBottom>Business Module Report Details</Typography>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={{ xs: 2, md: 8 }} >
            <Grid item xs={12} md={12}>
              <Accordion expanded={expanded === 'bizCustomer'} onChange={handleAccordinChange('bizCustomer')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='bizCustomer-content' id='bizCustomer-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Customer Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Customer Report Based Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('customer')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'bizLeads'} onChange={handleAccordinChange('bizLeads')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='bizLeads-content' id='bizLeads-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Leads Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Leads Report Based Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('leads')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'detBizCase'} onChange={handleAccordinChange('detBizCase')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='detBizCase-content' id='detBizCase-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Detailed Business Case</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Business Case Detailed Reports
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            onDetailedBusinessCase(value)

                          }}
                          options={props.restCommonGet ? props.restCommonGet : []}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => `${option.costcenter} - ${option.project && option.project.project_name ? option.project.project_name : ''}`}
                          id='bizCaseInfo'
                          filterSelectedOptions
                          value={bizCaseDetail}
                          sx={{ marginTop: 5 }}
                          renderInput={(params) => <TextField {...params} label='Business Case' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('bizDetailExcel', bizCaseDetail)} disabled={(bizCaseDetail) ? false : true}>
                            Download Excel
                          </Button>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<PictureAsPdfIcon />}
                            onClick={() => onDownloadDetailsBizCase()} disabled={(bizCaseDetail) ? false : true}>
                            Download PDF
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'bizSetupReport'} onChange={handleAccordinChange('bizSetupReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='bizSetupReport-content' id='bizSetupReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Business Setup Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Business Setup Report Details
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            onGetBizInfo(value);
                          }}
                          options={props.restCommonGet ? props.restCommonGet : []}
                          getOptionLabel={(option: any) => `${option.costcenter} - ${option.project && option.project.project_name ? option.project.project_name : ''}`}
                          id='bizCaseInfo'
                          filterSelectedOptions
                          sx={{ marginTop: 5 }}
                          value={getBizInfo}
                          renderInput={(params) => <TextField {...params} label='Business Setup' />}
                        />
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<PictureAsPdfIcon />}
                            onClick={() => onOpenBusinessCaseReport()} disabled={getBizInfo ? false : true}>
                            Download PDF
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'newBizRecruitment'} onChange={handleAccordinChange('newBizRecruitment')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='newBizRecruitment-content' id='newBizRecruitment-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>New Business & Recruitment Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          New Business &amp; Recruitment Report Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('newbizRecruitment')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    isLoading: state.businessReports.isLoading,
    error: state.businessReports.errors,
    bizCaseInfoList: state.businessReports.bizCaseInfoList,
    customerBizReportResponse: state.businessReports.customerBizReportResponse,
    leadsBizReportResponse: state.businessReports.leadsBizReportResponse,
    detailedBizExcelResponse: state.businessReports.detailedBizExcelResponse,
    detailedBizPdfResponse: state.businessReports.detailedBizPdfResponse,
    bizSetupReportResponse: state.businessReports.bizSetupReportResponse,
    newBizRecruitmentResponse: state.businessReports.newBizRecruitmentResponse,
    getProjectList: state.operationProcess.getProjectList,
    getBizCaseSetupData: state.BizCaseSetup.getBizCaseData,
    dashboardDetails: state.dashboardDetails.getResponseBusinessCaseDashboard,
    restCommonGet: state.othersReducer.resCommonViewData,
    businessProfitIterationList: state.businessCalculations.businessProfitIterationList
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    initBizReportsProcess: () => { dispatch(initBusinessReportsAction()) },
    getAllBizCaseInfoList: (data: any) => { dispatch(getBizCaseDetailsReportAction(data)) },
    downloadCustomerBizReport: (data: any) => { dispatch(downloadCustomerBizReportAction(data)) },
    downloadLeadsBizReport: (data: any) => { dispatch(downloadLeadsBizReportAction(data)) },
    downloadDetailedBizExcelReport: (data: any) => { dispatch(downloadDetailedBizCaseExcelReportAction(data)) },
    downloadDetailedBizPdfReport: (data: any) => { dispatch(downloadDetailedBizCasePdfReportAction(data)) },
    downloadBizCaseSetupReport: (data: any) => { dispatch(downloadBizCaseSetupReportAction(data)) },
    downloadNewBizRecruitmentReport: (data?: any) => { dispatch(downloadNewBizRecruitmentReportAction(data)) },
    reqProjectList: () => { dispatch(reqProjectList()) },
    reqCommonGet: (getURL: any) => { dispatch(reqCommonGet(getURL)) },
    getBusinessCaseSetup: (getBizId?: any) => dispatch(getBusinessSetupInfo(getBizId)),
    reqBusinessDashboardDetails: (getBizCaseReport?: any) => dispatch(reqBusinessDashboardDetails(getBizCaseReport)),
    initBizProfitLossIterationDetail: () => {
      dispatch(initBizProfitLossIterationDetailnAction())
    },  
    getBizCalculationIterationList: (data: any) => {
      dispatch(getBizProfitLossCalculationListAction(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessReports)
