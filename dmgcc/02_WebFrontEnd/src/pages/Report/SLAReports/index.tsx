import React, { useEffect } from "react";
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { connect } from "react-redux";
import { downloadSLAReportAction, initSLAReportsAction } from "saga/Actions";
import { saveAs } from 'file-saver';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const SLAReports = (props?: any) => {
  const { slaDetailReportResponse } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(null);

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  useEffect(() => {
    props.initSLAReportsProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (slaDetailReportResponse && slaDetailReportResponse.data) {
      downloadFile(slaDetailReportResponse.data, 'sla-report.xlsx', slaDetailReportResponse.headers['content-type'])
      props.initSLAReportsProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slaDetailReportResponse])

  const onDownloadReports = () => {
    props.downloadSLAReports();
    // window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.getSLADetailsReport}`, '_blank')
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
        <Typography variant="h2" component="div" sx={{color:'#00677f'}}>SLA Reports</Typography>
        <Typography variant='caption' display='block' gutterBottom>SLA Module Report Details</Typography>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={{ xs: 2, md: 8 }} >
            <Grid item xs={12} md={12}>

              <Accordion expanded={expanded === 'slaReport'} onChange={handleAccordinChange('slaReport')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls='slaReport-content' id='slaReport-header' sx={{ backgroundColor: "#f5f3f3" }}>
                  <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>SLA Detail Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Grid container spacing={{ xs: 2, md: 8 }} >
                      <Grid item xs={12} md={12}>
                        <Typography variant='subtitle1' gutterBottom component='div'>
                          SLA Report based details
                        </Typography>
                        <Box sx={{ textAlign: "right", my: 4 }}>
                          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />}
                            onClick={onDownloadReports}>
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
    isLoading: state.slaReports.isLoading,
    error: state.slaReports.errors,
    slaDetailReportResponse: state.slaReports.slaDetailReportResponse
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    initSLAReportsProcess: () => {
      dispatch(initSLAReportsAction())
    },
    downloadSLAReports: (data: any) => {
      dispatch(downloadSLAReportAction(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SLAReports)
