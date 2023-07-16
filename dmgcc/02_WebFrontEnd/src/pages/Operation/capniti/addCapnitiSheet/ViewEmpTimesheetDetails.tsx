import React from 'react';
import { Dialog, Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../../saga/Types/OperationTypes';
import ViewTimesheet from './ViewTimesheet';
import DownloadIcon from '@mui/icons-material/Download';
import { reqClearState, reqCommonDownload } from 'saga/Actions/aboutus.action';
import { ConfigAPI } from 'services/config';
import { donwloadXlsxFiles } from '@crema/commonservices/CommonFileDownload';

const ViewEmpTimesheetDetails = (props?: any) => {

    React.useEffect(() => {
        getTimesheetDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(()=>{
        if (props.resCommonDownload) {
            // resFileObject
            donwloadXlsxFiles(props.resCommonDownload, 'Timesheet.xlsx', "text/xlsx")
            props.reqClearState()
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.resCommonDownload])

    const getTimesheetDetails = () => {
        const getTaskData: any = {
            size: 10,
            page: 0,
            sort: '',
            Serachkeyword: '',
            project_id: props.getProjectInfo.id
        }
        props.getEmpTimeSheetDetails(getTaskData)
    }

    const onDownloadTimesheet = () =>{
        if(props.getProjectInfo){
            props.reqCommonDownload(`${ConfigAPI.getTimesheetExcelReport}${props.getProjectInfo.id}`)
        }
    }

    return (
        <Dialog
            fullScreen
            open={props.showCapniti}
            onClose={props.closeCapniti}
        >
            <AppBar sx={{ position: 'relative', marginBottom: 5 }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                        View Timesheet
                    </Typography>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={props.closeCapniti}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ marginBottom: 5, padding: 5 }}>
                <Box sx={{display:'flex', justifyContent:'right'}}>
                <Button variant="outlined" startIcon={<DownloadIcon />} onClick={onDownloadTimesheet}>
                  Export Timesheet
                </Button>
                </Box>
                    <ViewTimesheet getEmployeeTimesheetList={props.getEmployeeTimesheetList} loading={props.loading}
                        getEmpTimeSheetDetails={props.getEmpTimeSheetDetails} getProjectInfo={props.getProjectInfo} />
            </Box>
        </Dialog>
    )
}



const mapStateToProps = (state: any) => {
    return {
        loading: state.operationProcess.loading,
        getEmployeeTimesheetList: state.operationProcess.getEmployeeTimesheetList,
        resCommonDownload:state.aboutUsDetails.resCommonDownload
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getEmpTimeSheetDetails: (getProjectId?: any) => dispatch({ type: OperationActionTypes.GET_EMPLOYEE_TIMESHEET_REQUEST, value: getProjectId }),
        reqCommonDownload:(getPostURL?:any) =>dispatch(reqCommonDownload(getPostURL)),
        reqClearState: () => dispatch(reqClearState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmpTimesheetDetails);
