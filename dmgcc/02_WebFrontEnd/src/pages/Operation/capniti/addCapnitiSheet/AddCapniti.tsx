import React from 'react'
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TimeSheetForm from './TimeSheetForm';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../../saga/Types/OperationTypes';
import {reqTimesheetSLASuccess} from '../../../../saga/Actions/operation.action';

const AddCapniti = (props?: any) => {
    const { getTimesheetSLAList } = props;

    React.useEffect(() => {
        props.getSLAList(props.getProjectInfo.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goBack = () => {
        props.closeCapniti()
    }
    const getSLAtDetails = (getEvent?: any, getSLAId?: any) => {
        props.getTaskList(getSLAId.id)
    }
    return (
        <>
            <Dialog
                fullScreen
                open={props.showCapniti}
                onClose={props.closeCapniti}
            >
                <AppBar sx={{ position: 'relative', marginBottom: 5 }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                            Add Timesheet
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
                    <Box sx={{ border: '1px solid #ccc', padding: 2, marginTop: 5, marginBottom: 5, paddingBottom: 5 }}>
                        {
                            getTimesheetSLAList ?
                                <TimeSheetForm goBack={goBack} getProjectInfo={props.getProjectInfo} getTimesheetSLAList={getTimesheetSLAList} getSLAtDetails={getSLAtDetails} getTimesheetTaskList={props.getTimesheetTaskList} onSubmitTimesheet={props.posTimesheetDetails} onCloseCapniti={props.closeCapniti} />
                                : null
                        }

                    </Box>
                </Box>
            </Dialog>
        </>

    )
}


const mapStateToProps = (state: any) => {
    return {
        loading: state.operationProcess.loading,
        getTimesheetSLAList: state.operationProcess.getTimesheetSLAList,
        getTimesheetTaskList: state.operationProcess.getTimesheetTaskList,
        getEmployeeTimesheetList: state.operationProcess.getEmployeeTimesheetList
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getSLAList: (getProjectId?:any) => dispatch(reqTimesheetSLASuccess(getProjectId)),
        getTaskList: (getSLAId?: any) => dispatch({ type: OperationActionTypes.GET_TIMESHEET_TASK_LIST_REQUEST, value: getSLAId }),
        posTimesheetDetails: (postTimesheetData?: any) => dispatch({ type: OperationActionTypes.POST_TIMESHEET_REQUEST, value: postTimesheetData }),
        getEmpTimeSheetDetails: (getProjectId?: any) => dispatch({ type: OperationActionTypes.GET_EMPLOYEE_TIMESHEET_REQUEST, value: getProjectId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCapniti);