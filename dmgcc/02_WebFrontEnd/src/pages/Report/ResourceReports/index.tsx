import React, { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { connect } from "react-redux";
import { downloadAttritionResourceReportAction, downloadBenchResourceReportAction, downloadManpowerSkillsetReportAction, downloadOperationsPositionsReportAction, downloadResourceOperationsReportAction, getCostCenterListDetailAction, initOperationsReportsAction, initResourceReportAction } from "saga/Actions";
import { saveAs } from 'file-saver';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const ResourceReports = (props?: any) => {
  const { manpowerSkillSetResponse, benchResourceResponse, attritionResponse, resourceReportResponse, costCenterList, positionsReportResponse } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(null);
  const [positionCostCenterInfo, setPositionCostCenterInfo] = React.useState(null);

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    props.initResourceReportsProcess();
    props.getCostCenterListDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (resourceReportResponse && resourceReportResponse.data) {
      downloadFile(resourceReportResponse.data, 'resource-report.xlsx', resourceReportResponse.headers['content-type'])
      props.initOperationReportsProcess();
    }
    if (manpowerSkillSetResponse && manpowerSkillSetResponse.data) {
      downloadFile(manpowerSkillSetResponse.data, 'manpower-skillset-report.xlsx', manpowerSkillSetResponse.headers['content-type'])
      props.initResourceReportsProcess();
    }
    if (benchResourceResponse && benchResourceResponse.data) {
      downloadFile(benchResourceResponse.data, 'bench-resource-report.xlsx', benchResourceResponse.headers['content-type'])
      props.initResourceReportsProcess();
    }
    if (attritionResponse && attritionResponse.data) {
      downloadFile(attritionResponse.data, 'attrition-report.xlsx', attritionResponse.headers['content-type'])
      props.initResourceReportsProcess();
    }
    if (positionsReportResponse && positionsReportResponse.data) {
      downloadFile(positionsReportResponse.data, 'positions-report.xlsx', positionsReportResponse.headers['content-type'])
      setPositionCostCenterInfo(null);
      props.initOperationReportsProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manpowerSkillSetResponse, benchResourceResponse, attritionResponse, resourceReportResponse, positionsReportResponse])

  const onDownloadReports = (action?: any, dataParam?: any) => {
    switch (action) {
      case 'resources':
        props.downloadOperationResourceReport();
        break;
      case 'manpowerSkillset':
        props.downloadManpowerSkillsetReport();
        break;
      case 'benchResource':
        props.downloadBenchResourceReport();
        break;
      case 'attrition':
        props.downloadAttritionReport();
        break;        
      case 'position':
        props.downloadOperationPositionsReport({ costcenter: dataParam?.costcenter });
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

  //   const newdownloadFile = function base64toBlob(data: any, fileName: any, fileType: any) {
  //     fileType = fileType || '';
  //     var sliceSize = 1024;
  //     var byteCharacters = atob(data);
  //     var bytesLength = byteCharacters.length;
  //     var slicesCount = Math.ceil(bytesLength / sliceSize);
  //     var byteArrays = new Array(slicesCount);



  //    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
  //         var begin = sliceIndex * sliceSize;
  //         var end = Math.min(begin + sliceSize, bytesLength);



  //        var bytes = new Array(end - begin);
  //         for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
  //             bytes[i] = byteCharacters[offset].charCodeAt(0);
  //         }
  //         byteArrays[sliceIndex] = new Uint8Array(bytes);
  //     }
  //     const blob = new Blob(byteArrays, { type: fileType });
  //     saveAs.saveAs(blob, fileName);
  // }

  return (
    <>
      <Box sx={{ height: 'auto', my: 4 }} className={classes.root}>
        <Typography variant="h2" component="div" sx={{color:'#00677f'}}>Business Reports</Typography>
        <Typography variant='caption' display='block' gutterBottom>Business Module Report Details</Typography>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={{ xs: 2, md: 8 }} >
            <Grid item xs={12} md={12}>

              <Accordion expanded={expanded === 'resourceReport'} onChange={handleAccordinChange('resourceReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='resourceReport-content' id='resourceReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Resource Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Resource Report Detailed
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('resources')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'positionsReport'} onChange={handleAccordinChange('positionsReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='positionsReport-content' id='positionsReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Positions Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Position Report(E2E) based details
                        </Typography>
                        <Autocomplete
                          onChange={(event: any, value: any) => {
                            setPositionCostCenterInfo(value);
                          }}
                          options={(costCenterList) ? costCenterList : []}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => `${option.costcenter}`}
                          id='costCenterInfoPositions'
                          filterSelectedOptions
                          value={positionCostCenterInfo}
                          renderInput={(params) => <TextField {...params} label='Cost Centre' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('position', positionCostCenterInfo)} disabled={(positionCostCenterInfo) ? false : true}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'manpowerSkillset'} onChange={handleAccordinChange('manpowerSkillset')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='manpowerSkillset-content' id='manpowerSkillset-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Manpower Skillset Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Manpower Skillset Report based Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('manpowerSkillset')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'benchResource'} onChange={handleAccordinChange('benchResource')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='benchResource-content' id='benchResource-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Bench Resource</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Bench Resources Report based Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('benchResource')}>
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'attritionReport'} onChange={handleAccordinChange('attritionReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='attritionReport-content' id='attritionReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Attrition</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          Attrition Report based Details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={() => onDownloadReports('attrition')}>
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
    isLoading: state.resourceReports.isLoading,
    error: state.resourceReports.errors,
    manpowerSkillSetResponse: state.resourceReports.manpowerSkillSetResponse,
    benchResourceResponse: state.resourceReports.benchResourceResponse,
    attritionResponse: state.resourceReports.attritionResponse,
    resourceReportResponse: state.operationsReports.resourceReportResponse,
    costCenterList: state.operationsReports.costCenterList,
    positionsReportResponse: state.operationsReports.positionsReportResponse,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    initOperationReportsProcess: () => {
      dispatch(initOperationsReportsAction())
    },
    initResourceReportsProcess: () => {
      dispatch(initResourceReportAction())
    },
    downloadManpowerSkillsetReport: (data: any) => {
      dispatch(downloadManpowerSkillsetReportAction(data))
    },
    downloadBenchResourceReport: (data: any) => {
      dispatch(downloadBenchResourceReportAction(data))
    },
    downloadAttritionReport: (data: any) => {
      dispatch(downloadAttritionResourceReportAction(data))
    },
    downloadOperationResourceReport: (data: any) => {
      dispatch(downloadResourceOperationsReportAction(data))
    },
    getCostCenterListDetails: (data: any) => {
      dispatch(getCostCenterListDetailAction(data))
    },
    downloadOperationPositionsReport: (data: any) => {
      dispatch(downloadOperationsPositionsReportAction(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceReports)
