import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { connect } from "react-redux";
import {
  downloadOperationsCapacityReportAction, downloadOperationsPositionsReportAction, downloadOperationsTaskReportAction,
  downloadOperationsTimesheetAsCostCenterReportAction, downloadOperationsTimesheetAsShortIDReportAction, downloadResourceOperationsReportAction,
  getCostCenterListDetailAction,
  getEmployeeListDetailAction,
  getProjectsListDetailAction,
  initOperationsReportsAction
} from "saga/Actions";
import { saveAs } from 'file-saver';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const OperationsReports = (props?: any) => {
  const { resourceReportResponse, capacityReportResponse, positionsReportResponse, timesheetCostCenterReportResponse,
    timesheetShortIDReportResponse, taskReportResponse, costCenterList, employeesList, projectsList } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(null);
  const [costCenterInfo, setCostCenterInfo] = React.useState(null);
  const [employeeInfo, setEmployeeInfo] = React.useState(null);
  const [projectInfo, setProjectInfo] = React.useState(null);

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    props.initOperationReportsProcess();
    props.getCostCenterListDetails();
    props.getEmployeesListDetails();
    props.getProjectsListDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (resourceReportResponse && resourceReportResponse.data) {
      downloadFile(resourceReportResponse.data, 'resource-report.xlsx', resourceReportResponse.headers['content-type'])
      props.initOperationReportsProcess();
    }
    if (capacityReportResponse && capacityReportResponse.data) {
      downloadFile(capacityReportResponse.data, 'capacity-report.xlsx', capacityReportResponse.headers['content-type'])
      props.initOperationReportsProcess();
    }
    if (positionsReportResponse && positionsReportResponse.data) {
      downloadFile(positionsReportResponse.data, 'positions-report.xlsx', positionsReportResponse.headers['content-type'])
      props.initOperationReportsProcess();
    }
    if (timesheetCostCenterReportResponse && timesheetCostCenterReportResponse.data) {
      downloadFile(timesheetCostCenterReportResponse.data, 'timesheet-with-costcenter-report.xlsx', timesheetCostCenterReportResponse.headers['content-type'])
      setCostCenterInfo(null);
      props.initOperationReportsProcess();
    }
    if (timesheetShortIDReportResponse && timesheetShortIDReportResponse.data) {
      downloadFile(timesheetShortIDReportResponse.data, 'timesheet-with-shortid-report.xlsx', timesheetShortIDReportResponse.headers['content-type'])
      props.initOperationReportsProcess();
    }
    if (taskReportResponse && taskReportResponse.data) {
      downloadFile(taskReportResponse.data, 'task-report.xlsx', taskReportResponse.headers['content-type'])
      props.initOperationReportsProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceReportResponse, capacityReportResponse, positionsReportResponse, timesheetCostCenterReportResponse,
    timesheetShortIDReportResponse, taskReportResponse])


  const onDownloadReports = (action?: any, dataParam?: any) => {
    switch (action) {
      case 'resources':
        props.downloadOperationResourceReport();
        break;
      case 'capacity':
        props.downloadOperationCapacityReport();
        break;
      case 'position':
        props.downloadOperationPositionsReport({ costcenter: dataParam?.costcenter });
        break;
      case 'timesheerAsCostCenter':
        props.downloadOperationTimesheetAsCostCenterReport({ costcenter: dataParam?.costcenter });
        break;
      case 'timesheetAsShortID':
        props.downloadOperationTimesheetAsShortIDReport({ shortID: dataParam?.shortid });
        break;
      case 'task':
        props.downloadOperationTaskReport({ project_id: dataParam?.id });
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
        <Typography variant="h2" component="div" sx={{color:'#00677f'}}>Operations Reports</Typography>
        {/* <Typography variant='caption' display='block' gutterBottom>Operations Module Report Details</Typography> */}
        <Box sx={{ my: 4 }}>
          <Grid container spacing={{ xs: 2, md: 8 }} >
            <Grid item xs={12} md={12}>

              <Accordion expanded={expanded === 'capacityReport'} onChange={handleAccordinChange('capacityReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='capacityReport-content' id='capacityReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Capacity Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Capacity Report based details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('capacity')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'timesheetReportasCostCenter'} onChange={handleAccordinChange('timesheetReportasCostCenter')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='timesheetReportasCostCenter-content' id='timesheetReportasCostCenter-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Timesheet Report(Cost Centre)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Timesheet Report based details using the Cost Centre
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            setCostCenterInfo(value);
                          }}
                          options={(costCenterList) ? costCenterList : []}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => `${option.costcenter}`}
                          id='costCenterInfo'
                          filterSelectedOptions
                          value={costCenterInfo}
                          renderInput={(params) => <TextField {...params} label='Cost Centre' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('timesheerAsCostCenter', costCenterInfo)} disabled={(costCenterInfo) ? false : true}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'timesheetReportasProject'} onChange={handleAccordinChange('timesheetReportasProject')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='timesheetReportasProject-content' id='timesheetReportasProject-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Timesheet Report(ShortID)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Timesheet Report based details using the Employee Short ID
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            setEmployeeInfo(value);
                          }}
                          options={(employeesList) ? employeesList : []}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => `${option.shortid}`}
                          id='employeeInfo'
                          filterSelectedOptions
                          value={employeeInfo}
                          renderInput={(params) => <TextField {...params} label='Short ID' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('timesheetAsShortID', employeeInfo)} disabled={(employeeInfo) ? false : true}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'taskReport'} onChange={handleAccordinChange('taskReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='taskReport-content' id='taskReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Task Report(Project)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Task Report(Project) Details
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            setProjectInfo(value);
                          }}
                          options={(projectsList) ? projectsList : []}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => `${option.project_name}`}
                          id='projectInfo'
                          filterSelectedOptions
                          value={projectInfo}
                          renderInput={(params) => <TextField {...params} label='Project' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('task', projectInfo)} disabled={(projectInfo) ? false : true}>
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
    isLoading: state.operationsReports.isLoading,
    error: state.operationsReports.errors,
    costCenterList: state.operationsReports.costCenterList,
    employeesList: state.operationsReports.employeesList,
    projectsList: state.operationsReports.projectsList,
    resourceReportResponse: state.operationsReports.resourceReportResponse,
    capacityReportResponse: state.operationsReports.capacityReportResponse,
    positionsReportResponse: state.operationsReports.positionsReportResponse,
    timesheetCostCenterReportResponse: state.operationsReports.timesheetCostCenterReportResponse,
    timesheetShortIDReportResponse: state.operationsReports.timesheetShortIDReportResponse,
    taskReportResponse: state.operationsReports.taskReportResponse,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    initOperationReportsProcess: () => {
      dispatch(initOperationsReportsAction())
    },
    getCostCenterListDetails: (data: any) => {
      dispatch(getCostCenterListDetailAction(data))
    },
    getEmployeesListDetails: (data: any) => {
      dispatch(getEmployeeListDetailAction(data))
    },
    getProjectsListDetails: (data: any) => {
      dispatch(getProjectsListDetailAction(data))
    },
    downloadOperationResourceReport: (data: any) => {
      dispatch(downloadResourceOperationsReportAction(data))
    },
    downloadOperationCapacityReport: (data: any) => {
      dispatch(downloadOperationsCapacityReportAction(data))
    },
    downloadOperationPositionsReport: (data: any) => {
      dispatch(downloadOperationsPositionsReportAction(data))
    },
    downloadOperationTimesheetAsCostCenterReport: (data: any) => {
      dispatch(downloadOperationsTimesheetAsCostCenterReportAction(data))
    },
    downloadOperationTimesheetAsShortIDReport: (data: any) => {
      dispatch(downloadOperationsTimesheetAsShortIDReportAction(data))
    },
    downloadOperationTaskReport: (data: any) => {
      dispatch(downloadOperationsTaskReportAction(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OperationsReports)
