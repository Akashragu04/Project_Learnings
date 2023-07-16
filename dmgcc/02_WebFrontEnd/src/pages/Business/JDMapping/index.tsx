import React, { useEffect } from 'react';
import {
    Box, Button, Card, CardContent, FormControl, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab, IconButton, FormHelperText
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AppComponentHeader, AppLoader } from '../../../@crema';
import { bizJDMappingSchema, jdDetailProperty } from '../../../shared/constants/AppConst';
// import { addRequirementValidationSchema } from './FormValidations';
// import moment from 'moment';
import { connect } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import CommonStore from '@crema/services/commonstore';
import JDMappingUpload from './JDUploadModal';
import JDRampUpMapping from './JDRampUpMapping';
import { createBizJDMappingAction, getBizJDMappingAction, getBizProjectAction, initBizJDMappingsAction, setJDFileUploadAction, setJDFileUploadResetAction } from 'saga/Actions';
import { jdCreateValidationSchema } from 'shared/constants/FormConstValidations';
import { reqCommonPut } from 'saga/Actions/aboutus.action';
import { ConfigAPI } from 'services/config';


const JDMapping = (props: any) => {
    // const userRole = CommonStore().userRoleType;
    const navigate = useNavigate();
    const navState: any = useLocation();
    let formikRef: any;
    /* eslint-disable */
    const [requirementId, setRequirementId] = React.useState(null);
    const [jdIndex, setJDIndex] = React.useState(null);
    const [jdAction, setJDAction] = React.useState('');
    const [show, setJDMapVisible] = React.useState(false);
    const [showJDMapUpload, setShowJDMapUpload] = React.useState(false);
    const [isDetailResponseInitiated, setIsDetailResponseInitiated] = React.useState(false);
    const [projectJDResponse, setProjectJDResponse] = React.useState<any>(null);

    const { jdProjectDetail, createBizJDResponse, isLoading, jdMappingDetail }: any = props;

    useEffect(() => {
        props.initJDMapping();
        getInitialValuesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (jdProjectDetail && jdProjectDetail.status && !isDetailResponseInitiated) {
            const getBizProjectData = JSON.parse(JSON.stringify(jdProjectDetail.data));
            setProjectJDResponse(jdProjectDetail.data);
            setIsDetailResponseInitiated(true);
            setProjectJDResponse(getBizProjectData);
            if (getBizProjectData.project_code) {
                formikRef.setFieldValue('project_code', getBizProjectData.project_code);
                formikRef.setFieldValue('project_name', getBizProjectData.project_name);
                if (getBizProjectData.jd_information.length) {
                    formikRef.setFieldValue('jd_information', getBizProjectData.jd_information);
                }
            }
        }
   
        if (createBizJDResponse && createBizJDResponse.status) {
            toast.success(createBizJDResponse.message, { position: 'bottom-right' });
            props.initJDMapping();
            getInitialValuesData()
            location.reload()
            // goBack();
        }
    }, [jdProjectDetail, createBizJDResponse]); //jdMappingDetail

    const getInitialValuesData = () =>{
        if (navState.state.hasOwnProperty('requirementData') && navState.state.requirementData.id) {
            setRequirementId(navState.state.requirementData.id);
            props.getProjJDDetail({ bizcase_id: navState.state.requirementData.id })
            props.getJDMappingDetails({ bizcase_id: navState.state.requirementData.id })
        } else {
            goBack()
        }
    }

    const goBack = () => {
        props.initJDMapping();
        navigate('/business/business-setup');
    }


    const setJDMapInit = (condition) => {
        setJDMapVisible(true);
    }

    const setJDMapClose = () => {
        setJDMapVisible(false);
    }

    const onJDMapUploadInitiate = (action, index) => {
        setJDIndex(index);
        setJDAction(action);
        setShowJDMapUpload(true);
    }

    const onJDMapUploadClose = (condition) => {
        setJDIndex(null);
        setJDAction('');
        setShowJDMapUpload(false)
    }

    const onJDMapConditionalUpload = (action, index, desc, files) => {
        const jdDescColumn = `jd_information[${index}].jd_description`;
        const jdUploadColumn = `jd_information[${index}].supporting_files`;
        const jdIsUploadColumn = `jd_information[${index}].isuploaded`;
        const jdUploadActionColumn = `jd_information[${index}].upload_action`;
        if (action === 'create') {
            formikRef.setFieldValue(jdIsUploadColumn, true);
            formikRef.setFieldValue(jdUploadActionColumn, action);
            formikRef.setFieldValue(jdDescColumn, desc);
        } else if (action === 'upload') {
            formikRef.setFieldValue(jdIsUploadColumn, true);
            formikRef.setFieldValue(jdUploadActionColumn, action);
            formikRef.setFieldValue(jdUploadColumn, files);
        }
    }

    const onAddJDDetail = () => {
        const jdPropertyObj = JSON.parse(JSON.stringify(jdDetailProperty));
        const jdDetailProperties = JSON.parse(JSON.stringify(formikRef.values.jd_information));
        jdDetailProperties.push(jdPropertyObj);
        formikRef.setFieldValue('jd_information', jdDetailProperties);
    }


    const onRemoveJDMapping = (getData?:any) =>{
        if(getData){
            let postValues:any = {
                url:`${ConfigAPI.jddeletedapi}${getData.id}`,
                data:''
            }
            props.reqCommonDelete(postValues)
        }
    }
    
    return (
        <>
            <AppComponentHeader
                title="JD Mapping"
                description=""
            />
            <AppGridContainer>

                <Grid item xs={12} style={{ marginTop: 0 }}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Box style={{ marginTop: 16 }}>
                                {(props.loading) && <AppLoader />}
                                <Formik
                                    enableReinitialize
                                    innerRef={(action) => { formikRef = action }}
                                    initialValues={bizJDMappingSchema}
                                    validationSchema={jdCreateValidationSchema}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        setSubmitting(true);
                                        if (values) {
                                            props.createBizJDMapping({ bizcase_id: navState.state.requirementData.id, data: values.jd_information })
                                      
                                        // resetForm();
                                        }
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => (
                                        <Form
                                            style={{ width: "100%", display: "flex", flexDirection: "column" }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                                <Grid container justifyContent="center" spacing={{ xs: 2, md: 4 }} >
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth margin='dense'>
                                                            <TextField label="Project Code" id="project_code" name="project_code" value={values.project_code}
                                                                onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                            {/* error={(errors.business_case_start_date) ? true : false} helperText={errors.business_case_start_date} */}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth margin='dense'>
                                                            <TextField label="Project Name" id="project_name" name="project_name" value={values.project_name}
                                                                onChange={handleChange} margin='dense' variant='outlined' disabled />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Box display="flex" justifyContent="flex-end">
                                                            {(projectJDResponse && projectJDResponse?.jd_information.length !== 0 && values?.jd_information.length) ? <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                                                color="success" type="button" onClick={(event) => setJDMapInit(true)}> JD Mapping
                                                            </Button>:null}
                                                            <Fab size='small' color='primary' aria-label='add' onClick={onAddJDDetail}>
                                                                <AddIcon />
                                                            </Fab>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Box className="autoscroll">
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label='simple table'>
                                                                    <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>S.No</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>JD Code</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>Role</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>Create/Upload</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>Position Code</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Action</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <FieldArray
                                                                            name="jd_information"
                                                                            render={jdDetailListHelpers => (
                                                                                <React.Fragment>
                                                                                    {values.jd_information.map((jdDetail:any, jdDetailIndex) =>{
                                                                                        return(
                                                                                        <React.Fragment key={jdDetailIndex}>
                                                                                            <TableRow>
                                                                                                <TableCell>{jdDetailIndex + 1}</TableCell>
                                                                                                <TableCell>
                                                                                                    <FormControl fullWidth margin='dense'>
                                                                                                        <TextField label="JD Code" id={`jd_information[${jdDetailIndex}].jd_code`} name={`jd_information[${jdDetailIndex}].jd_code`}
                                                                                                            value={jdDetail.jd_code} onChange={handleChange}
                                                                                                            margin='dense' variant='outlined' />
                                                                                                        <ErrorMessage name={`jd_information[${jdDetailIndex}].jd_code`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                                                                    </FormControl>
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                                        <TextField label="JD Role" id={`jd_information[${jdDetailIndex}].jd_role`} name={`jd_information[${jdDetailIndex}].jd_role`}
                                                                                                            value={jdDetail.jd_role} onChange={handleChange}
                                                                                                            margin='dense' variant='outlined' />
                                                                                                        <ErrorMessage name={`jd_information[${jdDetailIndex}].jd_role`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                                                                    </FormControl>
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    {jdDetail.isuploaded ? <Box display="flex" justifyContent="center">
                                                                                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                                                                                            color="primary" type="button" onClick={(event) => onJDMapUploadInitiate(jdDetail.upload_action, jdDetailIndex)}> View
                                                                                                        </Button>
                                                                                                    </Box> :
                                                                                                        <Box display="flex" justifyContent="center">
                                                                                                            <Button id={`jd_information[${jdDetailIndex}].create`} sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                                                                                                color="primary" type="button" onClick={(event) => onJDMapUploadInitiate('create', jdDetailIndex)}> Create
                                                                                                            </Button>
                                                                                                            <Button id={`jd_information[${jdDetailIndex}].upload`} sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                                                                                                                color="primary" type="button" onClick={(event) => onJDMapUploadInitiate('upload', jdDetailIndex)}> Upload
                                                                                                            </Button>
                                                                                                        </Box>}
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                                        <TextField label="Position Code (Taleo)" id={`jd_information[${jdDetailIndex}].position_code`} name={`jd_information[${jdDetailIndex}].position_code`}
                                                                                                            value={jdDetail.position_code} onChange={handleChange}
                                                                                                            margin='dense' variant='outlined' />
                                                                                                        <ErrorMessage name={`jd_information[${jdDetailIndex}].position_code`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                                                                    </FormControl>
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <Box display="flex" justifyContent="center" >
                                                                                                        <IconButton aria-label='delete' onClick={(event) =>{ 
                                                                                                            onRemoveJDMapping(jdDetail)
                                                                                                            jdDetailListHelpers.remove(jdDetailIndex)}} disabled={jdDetail && jdDetail.ismapped === true?true:false}>
                                                                                                            <RemoveCircleIcon />
                                                                                                        </IconButton>
                                                                                                    </Box>
                                                                                                </TableCell>

                                                                                            </TableRow>
                                                                                        </React.Fragment>

                                                                                    )})}
                                                                                </React.Fragment>

                                                                            )} />
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                            <Box sx={{display:'flex', marginTop:2}}>Note: <Box sx={{color:'#ff0000', marginLeft:2, fontSize:14}}>To create Business case setup please map the JD's</Box></Box>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                                <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                    color="inherit" type="button" onClick={goBack}> Cancel
                                                </Button>
                                                <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                    color="primary" type="submit"> Save
                                                </Button>
                                            </Box>
                                            {showJDMapUpload && <JDMappingUpload values={values} index={jdIndex} action={jdAction} show={showJDMapUpload} onJDMapUploadClose={onJDMapUploadClose}
                                                onJDMapConditionalUpload={onJDMapConditionalUpload} />}
                                            {show &&
                                                <JDRampUpMapping values={values} show={show} setJDMapClose={setJDMapClose}  goBack={goBack}/>
                                            }
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </AppGridContainer>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    loading: state.jdmapping.loading,
    error: state.jdmapping.errors,
    isLoading: state.jdmapping.isLoading,
    jdProjectDetail: state.jdmapping.projectResponse,
    jdMappingDetail: state.jdmapping.detailResponse,
    createBizJDResponse: state.jdmapping.response,
    jdFileResponse: state.jdmapping.fileResponse
})

const mapDispatchToProps = (dispatch: any) => ({
    initJDMapping: () => {
        dispatch(initBizJDMappingsAction())
    },
    getProjJDDetail: (data: any) => {
        dispatch(getBizProjectAction(data))
    },
    getJDMappingDetails: (data: any) => {
        dispatch(getBizJDMappingAction(data))
    },
    createBizJDMapping: (data: any) => {
        dispatch(createBizJDMappingAction(data))
    },
    resetJDFileUpload: (data: any) => {
        dispatch(setJDFileUploadResetAction(data))
    },
    setJDFileUpload: (data: any) => {
        dispatch(setJDFileUploadAction(data))
    },
    reqCommonDelete:(getURL:any)=>{
        dispatch(reqCommonPut(getURL))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(JDMapping);
