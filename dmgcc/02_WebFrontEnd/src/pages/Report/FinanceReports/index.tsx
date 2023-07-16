import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { connect } from "react-redux";
import { downloadAccuralsReportAction, downloadMaterialExpenseRevenueReportAction, downloadRevenueSummaryReportAction, downloadTravelCostReportAction, getProjectsListDetailAction, initFinanceReportsAction } from "saga/Actions";
import { saveAs } from 'file-saver';
import moment from "moment";

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const FinanceReports = (props?: any) => {
  const { projectsList, revenueSummaryResponse, EbitSummaryResponse, expenseSummaryResponse, accuralsReportResponse,
    travelCostResponse, materialRevenueExpenseResponse } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(null);
  const [projectInfo, setProjectInfo] = React.useState(null);

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    props.initFinanceReportsProcess();
    props.getProjectsListDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (revenueSummaryResponse && revenueSummaryResponse.data) {
      downloadFile(revenueSummaryResponse.data, 'revenuesummary-report.xlsx', revenueSummaryResponse.headers['content-type'])
      props.initFinanceReportsProcess();
    }
    if (EbitSummaryResponse && EbitSummaryResponse.data) {
      downloadFile(EbitSummaryResponse.data, 'ebitsummary-report.xlsx', EbitSummaryResponse.headers['content-type'])
      props.initFinanceReportsProcess();
    }
    if (expenseSummaryResponse && expenseSummaryResponse.data) {
      downloadFile(expenseSummaryResponse.data, 'expensesummary-report.xlsx', expenseSummaryResponse.headers['content-type'])
      props.initFinanceReportsProcess();
    }
    if (accuralsReportResponse && accuralsReportResponse.data) {
      downloadFile(accuralsReportResponse.data, 'accurals-report.xlsx', accuralsReportResponse.headers['content-type'])
      props.initFinanceReportsProcess();
    }
    if (travelCostResponse && travelCostResponse.data) {
      downloadFile(travelCostResponse.data, 'travelcost-report.xlsx', travelCostResponse.headers['content-type'])
      props.initFinanceReportsProcess();
    }
    if (materialRevenueExpenseResponse && materialRevenueExpenseResponse.data) {
      downloadFile(materialRevenueExpenseResponse.data, 'material-revenue-expense-report.xlsx', materialRevenueExpenseResponse.headers['content-type'])
      props.initFinanceReportsProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revenueSummaryResponse, EbitSummaryResponse, expenseSummaryResponse, accuralsReportResponse,
    travelCostResponse, materialRevenueExpenseResponse])

  const onDownloadReports = (action?: any, dataParam?: any) => {
    switch (action) {
      case 'revenue':
        props.downloadRevenueSummaryReport({ year: moment().year() });
        break;
      case 'ebit':
        props.downloadEbitSummaryReport();
        break;
      case 'expense':
        props.downloadExpenseSummaryReport();
        break;
      case 'accurals':
        props.downloadAccuralsReport();
        break;
      case 'travelCost':
        props.downloadTravelCostReport({ project_id: dataParam?.id });
        break;
      case 'materialRevenue':
        props.downloadMaterialRevenueExpenseReport();
        break;
      default:
        break;
    }
  }

  const downloadFile = (data: any, fileName: any, fileType: any) => {
    if (data) {
      let byteCharacters:any;
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

  return (
    <>
      <Box sx={{ height: 'auto', my: 4 }} className={classes.root}>
        <Typography variant="h2" component="div">Finance Reports</Typography>
        <Typography variant='caption' display='block' gutterBottom>Finance Module Report Details</Typography>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={{ xs: 2, md: 8 }} >
            <Grid item xs={12} md={12}>

              <Accordion expanded={expanded === 'revenueSummary'} onChange={handleAccordinChange('revenueSummary')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='revenueSummary-content' id='revenueSummary-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Revenue-EBIT-Expense Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Revenue-EBIT-Expense Summary Report Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('revenue')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'accuralsReport'} onChange={handleAccordinChange('accuralsReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='accuralsReport-content' id='accuralsReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Accruals</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                        Accruals Report Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('accurals')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'travelCostReport'} onChange={handleAccordinChange('travelCostReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='travelCostReport-content' id='travelCostReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Travel Cost Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Travel Cost Report Details
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            setProjectInfo(value);
                          }}
                          options={(projectsList) ? projectsList : []}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => `${option.project_name}`}
                          id='project'
                          filterSelectedOptions
                          value={projectInfo}
                          renderInput={(params) => <TextField {...params} label='Project ID' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('travelCost', projectInfo)} disabled={(projectInfo) ? false : true}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>


              <Accordion expanded={expanded === 'materialDescRevenueReport'} onChange={handleAccordinChange('materialDescRevenueReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='materialDescRevenueReport-content' id='materialDescRevenueReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Material Description wise Revenue &amp; Expense Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Material Description wise Revenue &amp; Expense Report based Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('materialRevenue')}>
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
    isLoading: state.financeReports.isLoading,
    error: state.financeReports.errors,
    projectsList: state.operationsReports.projectsList,
    revenueSummaryResponse: state.financeReports.revenueSummaryResponse,
    EbitSummaryResponse: state.financeReports.EbitSummaryResponse,
    expenseSummaryResponse: state.financeReports.expenseSummaryResponse,
    accuralsReportResponse: state.financeReports.accuralsReportResponse,
    travelCostResponse: state.financeReports.travelCostResponse,
    materialRevenueExpenseResponse: state.financeReports.materialRevenueExpenseResponse
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    initFinanceReportsProcess: () => {
      dispatch(initFinanceReportsAction())
    },
    getProjectsListDetails: (data: any) => {
      dispatch(getProjectsListDetailAction(data))
    },
    downloadRevenueSummaryReport: (data: any) => {
      dispatch(downloadRevenueSummaryReportAction(data))
    },
    downloadAccuralsReport: (data: any) => {
      dispatch(downloadAccuralsReportAction(data))
    },
    downloadTravelCostReport: (data: any) => {
      dispatch(downloadTravelCostReportAction(data))
    },
    downloadMaterialRevenueExpenseReport: (data: any) => {
      dispatch(downloadMaterialExpenseRevenueReportAction(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FinanceReports)
