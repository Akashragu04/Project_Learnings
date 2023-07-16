import React, { useState } from 'react'
import { Box, Button, FormControl, FormHelperText, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';
import Autocomplete from '@mui/material/Autocomplete';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { reqTaskSLASuccess } from '../../../saga/Actions'
import { taskValidationSchema } from './TaskManagementValid';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const AddNewTask = (props?: any) => {
    let formikData: any;
    const { getProjectList, getTaskSlaByProject, getResourceData, getTaskFileuploadData } = props;
    const [slaSelecthide, setSlaSelecthide] = useState(false)
    const [assignedToSelecthide, setassignedToSelecthide] = useState(false)
    // const [uploadedFiles, setUploadedFiles]: any = useState([]);
    const [getUserInfo, setUserInfo]: any = useState({});
    const [getProjectInfo, setProjectInfo]: any = useState({});
    const [getSLAInfo, setSLAInfo]: any = useState({});
    /** File upload */
    const dropzone = useDropzone({
        accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
        maxFiles: 5,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    React.useEffect(() => {
        props.getTaskProject()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (acceptedFiles.length) {
            getUploadData(acceptedFiles)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptedFiles])
    // let formikData: any;
    const initialFields: any = {
        task_no: '',
        task_name: '',
        sla: '',
        assigned_to: '',
        project_code: '',
        project_name: '',
        target_date: moment(new Date()).format('YYYY-MM-DD'),
        task_description: ''
    }
    const goBack = () => {
        props.closeAddNewTask(false)
    }

    const getProjectDetails = (getEvent?: any, selectProjectData?: any) => {
        if (selectProjectData) {
            formikData.setFieldValue('project_name', selectProjectData.project_name)
            props.getTaskSLAList(selectProjectData.id)
            setSlaSelecthide(true)
            setProjectInfo(selectProjectData)
        }
    }
    const getSLADetails = (getEvent?: any, selectProjectData?: any) => {
        if (selectProjectData) {
            setassignedToSelecthide(true)
            setSLAInfo(selectProjectData)
            props.getTaskResourceList(selectProjectData.id)
        }

    }
    const getUploadData = (acceptedFiles?: any) => {
        const formData = new FormData();
        if (acceptedFiles.length) {
            for (let i = 0; i < acceptedFiles.length; i++) {
                formData.append("file", acceptedFiles[i]);
            }
            props.getTaskFileupload(formData)
        }

    }

    const getUserDetails = (event?: any, getUserData?: any) => {
        setUserInfo(getUserData)
    }

    return (
        <Dialog
            fullScreen
            open={props.openAddTask}
            onClose={() => props.closeAddNewTask(false)}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                        Add New Task
                    </Typography>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={() => props.closeAddNewTask(false)}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ width: '100%', marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                <Formik
                    innerRef={res => formikData = res}
                    validateOnChange
                    initialValues={initialFields}
                    validationSchema={taskValidationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        const postTaskData: any = {
                            taskname: values.task_name,
                            tasktarget: moment(new Date(values.target_date)).format('DD-MM-YYYY'),
                            taskfile: getTaskFileuploadData ? getTaskFileuploadData : [],
                            taskdescription: values.task_description,
                            user_id: getUserInfo.userid,
                            assigned_name: getUserInfo.resource_name,
                            assigne_email: getUserInfo.resource_email,
                            assigne_shortId: getUserInfo.resource_shortid,
                            project_id: getProjectInfo.id,
                            project_name: values.project_name,
                            sla_id: getSLAInfo.id,
                            task_status: "",
                            billableHours: ""
                        }
                        if (postTaskData) {
                            props.postTaskData(postTaskData)
                            props.closeAddNewTask(false)
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
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
                                <Box sx={{ flexGrow: 1, width: '100%' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                                            <FormControl variant="standard" fullWidth margin='dense' error={!!errors.project_code}>
                                                <Autocomplete
                                                    onChange={(event: any, newValue: any) => {
                                                        getProjectDetails(event, newValue)
                                                        setFieldValue("project_code", newValue.project_id)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? `${option.project_id} - ${option.project_name}` : "")}
                                                    onInputChange={(event, newInputValue) => {
                                                        //   getLeadsConversion(newInputValue)
                                                    }}
                                                    id='project_code'
                                                    options={getProjectList ? getProjectList : []}
                                                    sx={{ width: '100%', marginRight: 2 }}
                                                    renderInput={(params) => <TextField {...params} 
                                                    label='Project Code' id='project_code' 
                                                    error={(errors.project_code) ? true : false} />}
                                                />
                                                <FormHelperText> {(errors.project_code) ? (
                                                    <Box className="errormsg"> {errors.project_code}</Box>
                                                ) : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                                            <FormControl variant="standard" fullWidth margin='dense' error={!!errors.project_name}>
                                                <TextField
                                                    placeholder="Project name"
                                                    id="project_name"
                                                    name="project_name"
                                                    value={values.project_name}
                                                    onChange={handleChange}
                                                    label="Project Name"
                                                    variant="outlined"
                                                    disabled
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label='Target Date'
                                                    value={values.target_date}
                                                    minDate={moment().toDate()}
                                                    onChange={reqDate => setFieldValue("target_date", reqDate)}
                                                    renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} disabled onKeyDown={onKeyDown}/>}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                                            <FormControl variant="standard" fullWidth margin='dense'  error={!!errors.sla}>
                                                <Autocomplete
                                                    onChange={(event: any, newValue: any) => {
                                                        getSLADetails(event, newValue)
                                                        setFieldValue("sla", newValue.slaid)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option.slaid : "")}
                                                    onInputChange={(event, newInputValue) => {
                                                        //   getLeadsConversion(newInputValue)
                                                    }}
                                                    id='sla'
                                                    options={getTaskSlaByProject ? getTaskSlaByProject : []}
                                                    sx={{ width: '100%', marginRight: 2 }}
                                                    renderInput={(params) => <TextField {...params}  label='SLA' id='sla' error={(errors.sla) ? true : false} />}
                                                    disabled={slaSelecthide ? false : true}
                                                />
                                                   <FormHelperText> {(errors.sla) ? (
                                                    <Box className="errormsg"> {errors.sla}</Box>
                                                ) : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                                            <FormControl variant="standard" fullWidth margin='dense' error={!!errors.task_name}>
                                                <TextField
                                                    placeholder="Task Name"
                                                    id="task_name"
                                                    name="task_name"
                                                    value={values.task_name}
                                                    onChange={handleChange}
                                                    label="Task Name"
                                                    variant="outlined"
                                                    error={(errors.task_name) ? true : false}
                                                />
                                                   <FormHelperText> {(errors.task_name) ? (
                                                    <Box className="errormsg"> {errors.task_name}</Box>
                                                ) : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                                            <FormControl variant="standard" fullWidth margin='dense' error={!!errors.assigned_to}>
                                                <Autocomplete
                                                    onChange={(event: any, newValue: any) => {
                                                        getUserDetails(event, newValue)
                                                        setFieldValue("assigned_to", newValue.resource_name)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option.resource_name : "")}
                                                    onInputChange={(event, newInputValue) => {

                                                        //   getLeadsConversion(newInputValue)
                                                    }}
                                                    id='assigned_to'
                                                    options={getResourceData ? getResourceData : []}
                                                    sx={{ width: "100%", marginLeft: 2 }}
                                                    renderInput={(params) => <TextField {...params} 
                                                    label='Assign To' 
                                                    id='assigned_to' 
                                                    error={(errors.assigned_to) ? true : false}/>}
                                                    disabled={assignedToSelecthide ? false : true}
                                                />
                                                   <FormHelperText> {(errors.assigned_to) ? (
                                                    <Box className="errormsg"> {errors.assigned_to}</Box>
                                                ) : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={12} sx={{ marginBottom: 5 }}>
                                            <FormControl variant="outlined" fullWidth margin='dense' error={!!errors.task_description}>
                                                <TextField
                                                    placeholder="Task description"
                                                    multiline
                                                    rows={2}
                                                    maxRows={4}
                                                    id="task_description"
                                                    name="task_description"
                                                    value={values.task_description}
                                                    onChange={handleChange}
                                                    label="Task description"
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box
                                    sx={{
                                        pt: 3,
                                        textAlign: "right",
                                    }}
                                >

                                    <Button
                                        sx={{
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
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        sx={{
                                            position: "relative",
                                            minWidth: 100,
                                            marginRight: 2
                                        }}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Form>
                        )
                    }}

                </Formik>
            </Box>
            {/* </AppDialog> */}

        </Dialog>
    )
}



const mapStateToProps = (state: any) => {
    return {
        loading: state.operationProcess.loading,
        getProjectList: state.operationProcess.getTaskProjectList,
        getTaskSlaByProject: state.operationProcess.getTaskSlaByProject,
        getResourceData: state.operationProcess.resResourceData,
        getTaskFileuploadData: state.operationProcess.getTaskFileupload
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        postTaskData: (postTaskData?: any) => dispatch({ type: OperationActionTypes.POST_TASK_REQUEST, value: postTaskData }),
        getTaskProject: () => dispatch({ type: OperationActionTypes.GET_TASK_GETPROJECT_REQUEST }),
        getTaskSLAList: (getProjectId?: any) => dispatch(reqTaskSLASuccess(getProjectId)),
        getTaskResourceList: (getResourceId?: any) => dispatch({ type: OperationActionTypes.GET_TASK_RESOURCE_BYSLA_REQUEST, value: getResourceId }),
        getTaskFileupload: (getFileUploadData?: any) => dispatch({ type: OperationActionTypes.FILE_UPLOAD_REQUEST, value: getFileUploadData }),
        // reqPostTast: (postReqValues?: any) => dispatch({ type: OperationActionTypes.POST_TASK_REQUEST, value: postReqValues })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTask);

// export default AddNewTask;