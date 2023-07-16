import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { fieldCapniti } from '../Types';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import { Box, Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Stack, Switch, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { schemaTimesheet } from './TimeSheetValidation';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const TimeSheetForm = (props?: any) => {
    let formikData: any;
    const [getStartDate, setStartDate] = React.useState(null)
    const [getEndtDate, setEndDate] = React.useState(null)
    const [getTotalHours, setTotalHours] = React.useState(null)
    const [showTaskList, setShowTaskList] = React.useState(false)
    const [getSlAInfo, setSlAInfo] = React.useState({})
    const [getTaskInfo, setTaskInfo] = React.useState(null)
    React.useEffect(() => {
        formikData.setFieldValue('project', props.getProjectInfo ? props.getProjectInfo.project_name : '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getStartTime = (getStartTime?: any) => {
        const startTimes: any = moment(getStartTime).format("hh:mm:ss a")
        setStartDate(startTimes)
    }
    const getEndTime = (getEndTime?: any) => {
        // alert(getEndTime)
        const endTimes: any = moment(getEndTime).format("hh:mm:ss a")
        setEndDate(endTimes)
    }

    const onSLAtDetails = (getEvent?: any, getSLAInfo?: any) => {
        props.getSLAtDetails(getEvent, getSLAInfo)
        setSlAInfo(getSLAInfo.id)
        setShowTaskList(true)
    }
    const getTaskListData = (getEvent?: any, getSLAInfo?: any) => {
        setTaskInfo(getSLAInfo.id)
    }
    return (
        <Formik
            validateOnChange
            innerRef={res => formikData = res}
            initialValues={fieldCapniti}
            validationSchema={schemaTimesheet}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const postTimesheetDetails: any = {
                    timesheet_date: moment(new Date(values.timesheet_date)).format('DD-MM-YYYY'),
                    working_hours: getTotalHours,
                    start_time: moment(values.start_time).format("hh:mm a"),
                    end_time: moment(values.end_time).format("hh:mm a"),
                    project: props.getProjectInfo ? props.getProjectInfo.id : '',
                    sla: getSlAInfo,
                    task: getTaskInfo,
                    comments: values.comments,
                    captinityleave: values.captinityleave
                }
                props.onSubmitTimesheet(postTimesheetDetails)
                props.onCloseCapniti()
            }}>
            {({ isSubmitting, values, errors, touched, isValid, setFieldValue, handleChange }) => {
                // This is function use to calculation on total time
                let totalHours: any;
                if (values.start_time && values.end_time) {
                    const updateStartTime: any = moment(getStartDate, 'HH:mm:ss a');
                    const updateEndTime: any = moment(getEndtDate, 'HH:mm:ss a');
                    const duration: any = moment.duration(updateEndTime.diff(updateStartTime));
                    // duration in hours
                    const hours: any = parseInt(duration.hours());
                    // duration in minutes
                    const minutes: any = parseInt(duration.minutes());
                    totalHours = `${hours}:${minutes}`;
                    setTotalHours(totalHours)
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
                        <Box sx={{ flexGrow: 1, width: '100%', padding: 5 }}>
                            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                <Grid item xs={12} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label='Request Date'
                                            value={values.timesheet_date}
                                            maxDate = {new Date()}
                                            onChange={reqDate => setFieldValue("timesheet_date", reqDate)}
                                            renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown}/>}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            label='Start Time'
                                            value={values.start_time}
                                            onChange={reqTime => {
                                                setFieldValue("start_time", reqTime)
                                                getStartTime(reqTime)
                                            }}
                                            renderInput={(params) => <TextField fullWidth margin='dense'
                                                variant='outlined' {...params}
                                                id="start_time"
                                                error={(errors.start_time) ? true : false} />}
                                        />
                                        <FormHelperText> {(errors.start_time) ? (
                                            <Box className="errormsg"> {errors.start_time}</Box>
                                        ) : null}
                                        </FormHelperText>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            label='End Time'
                                            value={values.end_time}
                                            onChange={reqTime => {
                                                getEndTime(reqTime)
                                                setFieldValue("end_time", reqTime)
                                            }}
                                            renderInput={(params) => <TextField fullWidth margin='dense'
                                                variant='outlined' {...params}
                                                id="end_time"
                                                error={(errors.end_time) ? true : false} />}
                                        />
                                        <FormHelperText> {(errors.end_time) ? (
                                            <Box className="errormsg"> {errors.end_time}</Box>
                                        ) : null}
                                        </FormHelperText>
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} md={3} sx={{ marginTop: 4 }}>
                                    <Stack direction='row' spacing={1} alignItems='center'>
                                        <Typography sx={{ mr: 2 }} >Working</Typography>
                                        <FormControl component='fieldset' variant='standard'>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={values.captinityleave}
                                                            onChange={handleChange}
                                                            name='captinityleave'
                                                        />
                                                    }
                                                    label='Leave'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                        {/* <InputLabel htmlFor="working_hours">Working Hours</InputLabel> */}
                                        <TextField
                                            placeholder="Working Hours"
                                            variant='outlined'
                                            label="Working Hours"
                                            id='working_hours'
                                            onKeyUp={reqTime => {
                                            }}
                                            onChange={() => handleChange}
                                            value={totalHours ? totalHours : 0}
                                            disabled
                                        />
                                        {/* <Input id="working_hours" name="working_hours" value={values.working_hours} onChange={handleChange} readOnly /> */}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Project"
                                            variant='outlined'
                                            label="Project"
                                            id='project'
                                            onChange={() => handleChange}
                                            value={props.getProjectInfo ? props.getProjectInfo.project_name : ''}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <Autocomplete
                                            onChange={(event: any, newValue: any) => {
                                                onSLAtDetails(event, newValue)
                                                setFieldValue("sla", newValue.slaid)
                                            }}
                                            getOptionLabel={(option: any) => (option ? option.slaid : "")}
                                            onInputChange={(event, newInputValue) => {
                                                //   getLeadsConversion(newInputValue)
                                            }}
                                            id='sla'
                                            options={props.getTimesheetSLAList ? props.getTimesheetSLAList : []}
                                            sx={{ width: '100%', marginRight: 2 }}
                                            renderInput={(params) => <TextField {...params}
                                                label='SLA Code'
                                                id="sla"
                                                error={(errors.sla) ? true : false} />}
                                        />
                                        <FormHelperText> {(errors.sla) ? (
                                            <Box className="errormsg"> {errors.sla}</Box>
                                        ) : null}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <Autocomplete
                                            onChange={(event: any, newValue: any) => {
                                                getTaskListData(event, newValue)
                                                setFieldValue("task", newValue.taskname)
                                            }}
                                            getOptionLabel={(option: any) => (option ? option.taskname : "")}
                                            onInputChange={(event, newInputValue) => {
                                                //   getLeadsConversion(newInputValue)
                                            }}
                                            id='task'
                                            disabled={showTaskList ? false : true}
                                            options={props.getTimesheetTaskList ? props.getTimesheetTaskList : []}
                                            sx={{ width: '100%', marginRight: 2 }}
                                            renderInput={(params) => <TextField {...params} label='Task' id="task" error={(errors.task) ? true : false} />}
                                        />
                                        <FormHelperText> {(errors.task) ? (
                                            <Box className="errormsg"> {errors.task}</Box>
                                        ) : null}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <FormControl variant='filled' fullWidth margin='dense'>
                                        <TextField
                                            placeholder="Comments"
                                            fullWidth
                                            margin='dense'
                                            variant='outlined'
                                            label="Comments"
                                            id='comments'
                                            multiline
                                            rows={2}
                                            maxRows={4}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ pt: 3, textAlign: "right", }} >

                            <Button sx={{
                                position: "relative",
                                minWidth: 100,
                                marginRight: 2
                            }}
                                variant="contained"
                                color="inherit"
                                type="button"
                                onClick={() => {
                                    props.goBack()
                                }}
                            >  Cancel </Button>
                            <Button sx={{
                                position: "relative",
                                minWidth: 100,
                                marginRight: 2
                            }}
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!isValid}
                            >  Submit </Button>
                        </Box>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default TimeSheetForm;