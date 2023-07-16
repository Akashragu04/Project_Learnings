import React from 'react'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer";
import FeedBackTableHeading from './FeedBackTableHeading';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, 
    Grid, RadioGroup, TableCell, TableRow, TextField, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import { ErrorMessage, Form, Formik } from 'formik';
import { feedbackValidationSchema } from './feedbackValidationScheme';

const FeedBackForm = (props: any) => {
    let formikData: any;
    const [getQualityStatus, setQualityStatus] = React.useState("");
    const [getAdherenceStatus, setAdherenceStatus] = React.useState("");
    const [getQualityTimeLineStatus, setQualityTimeLineStatus] = React.useState("");
    const [getKnowledgeStatus, setKnowledgeStatus] = React.useState("");
    const [getResponsivenessStatus, setResponsivenessStatus] = React.useState("");
    const [getCommunicationSkillsStatus, setCommunicationSkillsStatus] = React.useState("");
    const [getOverallPlanStatus, setOverallPlanStatus] = React.useState("");
    const [getSustainabilityStatus, setSustainabilityStatus] = React.useState("");
    const [getRecommendStatus, setRecommendStatus] = React.useState("")
    // const [getUserDetails, setUserDetails] = React.useState(null)
    const [getProjectDetails, setProjectDetails] = React.useState(null)
    const [getFormValidation, setFormValidation] = React.useState(false)

    React.useEffect(() => {
        if (props.getInitilValues && props.getInitilValues.quality_status) {
            setQualityStatus(props.getInitilValues ? props.getInitilValues.quality_status : "")
            setAdherenceStatus(props.getInitilValues ? props.getInitilValues.adherence_status : "")
            setQualityTimeLineStatus(props.getInitilValues ? props.getInitilValues.quality_timeLine_status : "")
            setKnowledgeStatus(props.getInitilValues ? props.getInitilValues.knowledge_status : "")
            setResponsivenessStatus(props.getInitilValues ? props.getInitilValues.responsiveness_status : "")
            setCommunicationSkillsStatus(props.getInitilValues ? props.getInitilValues.communication_skills_status : "")
            setOverallPlanStatus(props.getInitilValues ? props.getInitilValues.overall_plan_status : "")
            setSustainabilityStatus(props.getInitilValues ? props.getInitilValues.sustainability_status : "")
            setRecommendStatus(props.getInitilValues ? props.getInitilValues.recommend_counterpart_state : "")      
            if(props.getProjectList){
                let getProjectDetails:any = props.getProjectList.find((items:any)=>items.project_name === props.getInitilValues.project_name)
                if(getProjectDetails){
                    setProjectDetails(getProjectDetails)
                    formikData.setFieldValue('project_id', getProjectDetails.project_id)
                    formikData.setFieldValue('cost_center', getProjectDetails.cost_center)
                    formikData.setFieldValue('project_name', getProjectDetails.project_name)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    React.useEffect(()=>{
if(props.getUserInformation){
    formikData.setFieldValue('short_id', props.getUserInformation.shortid)
                    formikData.setFieldValue('designation_level', props.getUserInformation.designation_level)
                    formikData.setFieldValue('department', props.getUserInformation.department)
                    formikData.setFieldValue('orgranization', props.getUserInformation.organization)
}
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.getUserInformation])
    const onQualityStatus = (getQuality: any) => {
        setQualityStatus(getQuality)
    }

    const onAdherenceStatus = (getValues: any) => {
        setAdherenceStatus(getValues)

    }

    const onQualityTimeLineStatus = (getValues: any) => {
        setQualityTimeLineStatus(getValues)

    }

    const onKnowledgeStatus = (getValues: any) => {
        setKnowledgeStatus(getValues)

    }

    const onResponsivenessStatus = (getValues: any) => {
        setResponsivenessStatus(getValues)

    }

    const onCommunicationSkillsStatus = (getValues: any) => {
        setCommunicationSkillsStatus(getValues)
    }

    const onOverallPlanStatus = (getValues: any) => {
        setOverallPlanStatus(getValues)
    }

    const onSustainabilityStatus = (getValues: any) => {
        setSustainabilityStatus(getValues)
    }

    const onRecommendStatus = (getValues: any) => {
        setRecommendStatus(getValues)
    }

    const onGetProjectDetails = (getProjectDetails: any) => {
        formikData.setFieldValue('project_id', getProjectDetails.project_id)
        formikData.setFieldValue('cost_center', getProjectDetails.cost_center)
        setProjectDetails(getProjectDetails)
    }
    
    return (
        <React.Fragment>
            <Formik
                validateOnChange
                innerRef={res => formikData = res}
                initialValues={props.getInitilValues}
                validationSchema={feedbackValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postValues: any = {
                            id: values.id,
                            short_id: values.short_id,
                            designation_level: values.designation_level,
                            project_name: values.project_name,
                            project_id: values.project_id,
                            cost_center: values.cost_center,
                            department: values.department,
                            orgranization: values.orgranization,
                            quality_status: getQualityStatus,
                            adherence_status: getAdherenceStatus,
                            quality_timeLine_status: getQualityTimeLineStatus,
                            knowledge_status: getKnowledgeStatus,
                            responsiveness_status: getResponsivenessStatus,
                            communication_skills_status: getCommunicationSkillsStatus,
                            overall_plan_status: getOverallPlanStatus,
                            sustainability_status: getSustainabilityStatus,
                            quality_remark: values.quality_remark,
                            adherence_remark: values.adherence_remark,
                            quality_timeLine_remark: values.quality_timeLine_remark,
                            knowledge_remark: values.knowledge_remark,
                            responsiveness_remark: values.responsiveness_remark,
                            communication_skills_remark: values.communication_skills_remark,
                            overall_plan_remark: values.overall_plan_remark,
                            sustainability_remark: values.sustainability_remark,
                            recommend_counterpart_state: getRecommendStatus,
                            recommend_counterpart: values.recommend_counterpart,
                            suggestions_improvement_areas: values.suggestions_improvement_areas
                        }
                        props.onSubmit(postValues)
                    }

                }}>
                {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
                    if(getQualityStatus && getAdherenceStatus && getQualityTimeLineStatus 
                        && getKnowledgeStatus && getResponsivenessStatus && getCommunicationSkillsStatus 
                        && getOverallPlanStatus && getSustainabilityStatus && getRecommendStatus && values.project_name !==""){
                            setFormValidation(true)
                    }else{
                        setFormValidation(false)
                    }
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
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                        Project Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4, marginTop: 2 }}>
                                        <Autocomplete
                                            id='project_name'
                                            options={props.getProjectList ? props.getProjectList : []}
                                            getOptionLabel={(option: any) => `${option.project_name}`}
                                            onChange={(event, value: any) => {
                                                setFieldValue('project_name', value.project_name)
                                                onGetProjectDetails(value)
                                            }}
                                            filterSelectedOptions
                                            value={getProjectDetails}
                                            disabled={props.showViewContent}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label='Choose Project Name'
                                                    variant='outlined'
                                                    placeholder='Project Name'
                                                />
                                            )}
                                        />
                                        <ErrorMessage name={`project_name`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4 }}>
                                        <FormControl variant="outlined" fullWidth margin='dense' >
                                            <TextField
                                                placeholder="Project Id"
                                                variant='outlined'
                                                label="Project Id"
                                                id={`project_id`}
                                                name={`project_id`}
                                                onChange={handleChange}
                                                value={values?.project_id}
                                                disabled
                                            />
                                        </FormControl>
                                        <ErrorMessage name={`project_id`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4 }}>
                                        <FormControl variant="outlined" fullWidth margin='dense' >
                                            <TextField
                                                placeholder="Cost Centre"
                                                variant='outlined'
                                                label="Cost Centre"
                                                id={`cost_center`}
                                                name={`cost_center`}
                                                onChange={handleChange}
                                                value={values?.cost_center}
                                                disabled
                                            />
                                        </FormControl>
                                        <ErrorMessage name={`cost_center`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                        User Infomation
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4 }}>
                                    <FormControl variant="outlined" fullWidth margin='dense' >
                                            <TextField
                                                placeholder="Short Id"
                                                variant='outlined'
                                                label="Short Id"
                                                id={`short_id`}
                                                name={`short_id`}
                                                onChange={handleChange}
                                                value={values?.short_id}
                                                disabled
                                            />
                                        </FormControl>
                                        <ErrorMessage name={`short_id`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4 }}>
                                        <FormControl variant="outlined" fullWidth margin='dense' >
                                            <TextField
                                                placeholder="Designation/Level"
                                                variant='outlined'
                                                label="Designation/Level"
                                                id={`designation_level`}
                                                name={`designation_level`}
                                                onChange={handleChange}
                                                value={values?.designation_level}
                                                disabled
                                            />
                                        </FormControl>
                                        <ErrorMessage name={`designation_level`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4 }}>
                                        <FormControl variant="outlined" fullWidth margin='dense' >
                                            <TextField
                                                placeholder="Department"
                                                variant='outlined'
                                                label="Department"
                                                id={`department`}
                                                name={`department`}
                                                onChange={handleChange}
                                                value={values?.department}
                                                disabled
                                            />
                                        </FormControl>
                                        <ErrorMessage name={`department`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ marginBottom: 4 }}>
                                        <FormControl variant="outlined" fullWidth margin='dense' >
                                            <TextField
                                                placeholder="Orgranization"
                                                variant='outlined'
                                                label="Orgranization"
                                                id={`orgranization`}
                                                name={`orgranization`}
                                                onChange={handleChange}
                                                value={values?.orgranization}
                                                disabled
                                            />
                                        </FormControl>
                                        <ErrorMessage name={`orgranization`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                    </Box>
                                </Grid>
                            </Grid>
                            {
                          getFormValidation === false ?
                            <Box sx={{ color: '#ff0000', marginBottom:4 }}>Please choice all ratings and Would you recommend us to your counterparts/colleagues?</Box>
                            : null
                        }
                            <AppTableContainer>
                                <Table className="table">
                                    <TableHead>
                                        <FeedBackTableHeading />
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Quality of the project deliverables
                                                
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityStatus === 'Quality Very Satisfled'}
                                                    onChange={() => onQualityStatus("Quality Very Satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityStatus === 'Quality Satisfled'}
                                                    onChange={() => onQualityStatus("Quality Satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityStatus === 'Quality Netutral'}
                                                    onChange={() => onQualityStatus("Quality Netutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityStatus === 'Unsatisfled'}
                                                    onChange={() => onQualityStatus("Unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityStatus === 'Very Unsatisfled'}
                                                    onChange={() => onQualityStatus("Very Unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`quality_remark`}
                                                        name={`quality_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.quality_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Adherence to the project delivery timeline
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getAdherenceStatus === 'Adherence very satisfled'}
                                                    onChange={() => onAdherenceStatus("Adherence very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getAdherenceStatus === 'Adherence satisfled'}
                                                    onChange={() => onAdherenceStatus("Adherence satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getAdherenceStatus === 'Adherence Netural'}
                                                    onChange={() => onAdherenceStatus("Adherence Netural")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getAdherenceStatus === 'Adherence unsatisfled'}
                                                    onChange={() => onAdherenceStatus("Adherence unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getAdherenceStatus === 'Adherence very unsatisfled'}
                                                    onChange={() => onAdherenceStatus("Adherence very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`adherence_remark`}
                                                        name={`adherence_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.adherence_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Quality and timeliness of progress updates and reports
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityTimeLineStatus === 'Timeliness very satisfled'}
                                                    onChange={() => onQualityTimeLineStatus("Timeliness very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityTimeLineStatus === 'Timeliness satisfled'}
                                                    onChange={() => onQualityTimeLineStatus("Timeliness satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityTimeLineStatus === 'Timeliness Neutral'}
                                                    onChange={() => onQualityTimeLineStatus("Timeliness Neutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityTimeLineStatus === 'Timeliness unsatisfled'}
                                                    onChange={() => onQualityTimeLineStatus("Timeliness unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getQualityTimeLineStatus === 'Timeliness very unsatisfled'}
                                                    onChange={() => onQualityTimeLineStatus("Timeliness very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">

                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`quality_timeLine_remark`}
                                                        name={`quality_timeLine_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.quality_timeLine_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Responsiveness of the team
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getResponsivenessStatus === 'Responsiveness very satisfled'}
                                                    onChange={() => onResponsivenessStatus("Responsiveness very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getResponsivenessStatus === 'Responsiveness satisfled'}
                                                    onChange={() => onResponsivenessStatus("Responsiveness satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getResponsivenessStatus === 'Responsiveness Neutral'}
                                                    onChange={() => onResponsivenessStatus("Responsiveness Neutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getResponsivenessStatus === 'Responsiveness unsatisfled'}
                                                    onChange={() => onResponsivenessStatus("Responsiveness unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getResponsivenessStatus === 'Responsiveness very unsatisfled'}
                                                    onChange={() => onResponsivenessStatus("Responsiveness very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`responsiveness_remark`}
                                                        name={`responsiveness_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={3}
                                                        value={values?.responsiveness_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Communication skills of the team
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getCommunicationSkillsStatus === 'Communication very satisfled'}
                                                    onChange={() => onCommunicationSkillsStatus("Communication very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getCommunicationSkillsStatus === 'Communication satisfled'}
                                                    onChange={() => onCommunicationSkillsStatus("Communication satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getCommunicationSkillsStatus === 'Communication Neutral'}
                                                    onChange={() => onCommunicationSkillsStatus("Communication Neutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getCommunicationSkillsStatus === 'Communication unsatisfled'}
                                                    onChange={() => onCommunicationSkillsStatus("Communication unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getCommunicationSkillsStatus === 'Communication very unsatisfled'}
                                                    onChange={() => onCommunicationSkillsStatus("Communication very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`communication_skills_remark`}
                                                        name={`communication_skills_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.communication_skills_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Knowledge of the team
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getKnowledgeStatus === 'Knowledge very satisfled'}
                                                    onChange={() => onKnowledgeStatus("Knowledge very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getKnowledgeStatus === 'Knowledge satisfled'}
                                                    onChange={() => onKnowledgeStatus("Knowledge satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getKnowledgeStatus === 'Knowledge Neutral'}
                                                    onChange={() => onKnowledgeStatus("Knowledge Neutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getKnowledgeStatus === 'Knowledge unsatisfled'}
                                                    onChange={() => onKnowledgeStatus("Knowledge unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getKnowledgeStatus === 'Knowledge very unsatisfled'}
                                                    onChange={() => onKnowledgeStatus("Knowledge very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`knowledge_remark`}
                                                        name={`knowledge_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.knowledge_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Overall planning and execution of project
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getOverallPlanStatus === 'Overall plan very satisfled'}
                                                    onChange={() => onOverallPlanStatus("Overall plan very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getOverallPlanStatus === 'Overall plan satisfled'}
                                                    onChange={() => onOverallPlanStatus("Overall plan satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getOverallPlanStatus === 'Overall plan Neutral'}
                                                    onChange={() => onOverallPlanStatus("Overall plan Neutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getOverallPlanStatus === 'Overall plan unsatisfled'}
                                                    onChange={() => onOverallPlanStatus("Overall plan unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getOverallPlanStatus === 'Overall plan very unsatisfled'}
                                                    onChange={() => onOverallPlanStatus("Overall plan very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`overall_plan_remark`}
                                                        name={`overall_plan_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.overall_plan_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{
                                                "& .tableCell": {
                                                    fontSize: 13,
                                                    padding: 2,
                                                    whiteSpace: "nowrap",
                                                    "&:first-of-type": {
                                                        pl: 5,
                                                    },
                                                    "&:last-of-type": {
                                                        pr: 5,
                                                    },
                                                },
                                            }}
                                            className="item-hover"
                                        >
                                            <TableCell align="left" className="tableCell">
                                                Sustainability and handover of the project
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getSustainabilityStatus === 'Sustainability very satisfled'}
                                                    onChange={() => onSustainabilityStatus("Sustainability very satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getSustainabilityStatus === 'Sustainability satisfled'}
                                                    onChange={() => onSustainabilityStatus("Sustainability satisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getSustainabilityStatus === 'Sustainability Neutral'}
                                                    onChange={() => onSustainabilityStatus("Sustainability Neutral")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getSustainabilityStatus === 'Sustainability unsatisfled'}
                                                    onChange={() => onSustainabilityStatus("Sustainability unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <Radio
                                                    checked={getSustainabilityStatus === 'Sustainability very unsatisfled'}
                                                    onChange={() => onSustainabilityStatus("Sustainability very unsatisfled")}
                                                    value="b"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'B' }}
                                                    disabled={props.showViewContent}
                                                />
                                            </TableCell>
                                            <TableCell align="center" className="tableCell">
                                                <FormControl variant="outlined" fullWidth margin='dense' >
                                                    <TextField
                                                        placeholder="Remarks/Suggestion"
                                                        variant='outlined'
                                                        label="Remarks/Suggestion"
                                                        id={`sustainability_remark`}
                                                        name={`sustainability_remark`}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                        value={values?.sustainability_remark}
                                                        disabled={props.showViewContent}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AppTableContainer>
                            <Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <Box sx={{ marginTop: 4 }}>
                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Would you recommend us to your counterparts/colleagues?</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel value="female" control={<Radio
                                                        checked={getRecommendStatus === 'Yes'}
                                                        disabled={props.showViewContent}
                                                        onChange={() => onRecommendStatus("Yes")} />} label="Yes" />
                                                    <FormControlLabel value="male" control={<Radio
                                                        checked={getRecommendStatus === 'No'}
                                                        disabled={props.showViewContent}
                                                        onChange={() => onRecommendStatus("No")} />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                            <ErrorMessage name={`recommend_counterpart`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Box sx={{ marginTop: 4 }}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Any suggestions or improvement areas that you would recommend"
                                                    variant='outlined'
                                                    label="Any suggestions or improvement areas that you would recommend"
                                                    id={`suggestions_improvement_areas`}
                                                    name={`suggestions_improvement_areas`}
                                                    value={values?.suggestions_improvement_areas}
                                                    onChange={handleChange}
                                                    multiline
                                                    rows={2}
                                                    disabled={props.showViewContent}
                                                />
                                            </FormControl>
                                            <ErrorMessage name={`suggestions_improvement_areas`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ pt: 10, textAlign: "right", }} >

                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="inherit"
                                    type="button"
                                    onClick={() => {
                                        props.handleClose()
                                    }}
                                >  Cancel </Button>
                                {
                                    !props.showViewContent?
                                    <Button sx={{
                                        position: "relative",
                                        minWidth: 100,
                                        marginRight: 2
                                    }}
                                        disabled={getFormValidation?false:true}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >  Submit </Button>
                                    :null
                                }
                              
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </React.Fragment>
    )
}

export default FeedBackForm