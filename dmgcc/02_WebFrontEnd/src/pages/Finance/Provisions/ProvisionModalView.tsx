import React from 'react';
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Box, Grid, FormControl, Button, TextField, Autocomplete, ButtonGroup, Paper, Table, TableBody, TableContainer, TableCell, TableRow, InputLabel, MenuItem, Select
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { toast } from 'react-toastify';
import CommonStore from '@crema/services/commonstore';
import { connect } from 'react-redux';
import { FieldArray, Form, Formik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import {
    initProvisionsResetAction, initProvisionsUpdateAction, updateProvisionsDetailsAction,
    checkAddProvisionDetailAction,
    reqProjectProvisionsData,
    reqSLAProvisionsData
} from 'saga/Actions';
import { AppLoader } from '@crema';
import { addProvision, initialValuesProvision } from './Types';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHeadDetail from './Tables/TableHead';
import { RoutePermittedRole } from 'shared/constants/AppConst';
import { pushProvisionJsonValues } from 'services/Constants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Transition: any = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProvisionModalView = (props: any) => {
    const [getInitilValuesChange, setInitilValuesChange] = React.useState<any>({})
    const [getInitilValuesStatusChange, setInitilValuesStatusChange] = React.useState(false)
    // const [getInitilValuesNewChange, setInitilValuesNewChange] = React.useState(true)

    let formikRef: any;

    const { checkProvisionAddResponse, provisionsUpdateResponse, getProvisionResponse }: any = props;
    const userRole = CommonStore().userRoleType;


    React.useEffect(() => {
        if (props.provisionFilter && props.provisionFilter.costcenter) {
            props.reqProjectProvisionsData(props.provisionFilter.costcenter)
        }
        if (getProvisionResponse && getProvisionResponse.data) {
            if (props.provisionProjectList) {
                getProvisionResponse.data.forEach((provisionItmes: any, index: any) => {
                    let getProjectList: any = props.provisionProjectList.find((items: any) => items.project_name === provisionItmes.project_name)
                    provisionItmes['project_list'] = getProjectList;
                    onChangeProjectDetails(getProjectList)
                })
            }
            if (getProvisionResponse.data && getProvisionResponse.data.length) {
                setInitilValuesStatusChange(true)
                setInitilValuesChange({ provisions_info: getProvisionResponse.data })
            } else {
                setInitilValuesStatusChange(false)
                setInitilValuesChange({ provisions_info: [pushProvisionJsonValues] })
            }
        } else {
            if (initialValuesProvision && initialValuesProvision.provisions_info) {
                initialValuesProvision.provisions_info.forEach((items: any) => {
                    items['costcenter'] = props.provisionFilter.costcenter;
                    items['month'] = props.provisionFilter.month;
                    items['year'] = props.provisionFilter.year;
                    items['team'] = props.provisionFilter.team;
                })
            }
            setInitilValuesChange(initialValuesProvision)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProvisionResponse])

    React.useEffect(() => {
        if (addProvision) {
            addProvision['costcenter'] = props.provisionFilter.costcenter;
            addProvision['month'] = props.provisionFilter.month;
            addProvision['year'] = props.provisionFilter.year;
            addProvision['team'] = props.provisionFilter.team;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValuesProvision])
    React.useEffect(() => {
        if (provisionsUpdateResponse.status) {
            toast.success(provisionsUpdateResponse.message, { position: 'bottom-right' });
            props.setProvisionModalClose();
            props.initProvisionsUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkProvisionAddResponse])


    const onChangeProjectDetails = (getValues: any) => {
        if (getValues) {
            props.reqSLAProvisionsData(getValues.id)
            // setProjectinfo(getValues)
        } else {
            // setProjectinfo(null)
        }
    }

    const onPushProvisionDetails = (getValues?: any) => {
        if (getValues) {
            getValues(addProvision)
        }
        

    }

    const onChangeProvisionValues = (getValues?:any, index?:any, getData?:any) =>{   
        if(getData){
            formikRef.setFieldValue(`provisions_info.${index}.thirdparty_manpower_provision`, getData);
            let totalValues:any = parseInt(getData) 
            + parseInt(getValues.thirdparty_service_provision?getValues.thirdparty_service_provision:0) 
            + parseInt(getValues.cross_charges_provision?getValues.cross_charges_provision:0) 
            + parseInt(getValues.software_provision?getValues.software_provision:0) 
            + parseInt(getValues.prototype_provision?getValues.prototype_provision:0) 
            + parseInt(getValues.other_provisions?getValues.other_provisions:0);
            formikRef.setFieldValue(`provisions_info.${index}.total_provision`, totalValues);      
        }    
    }

    
    const onChangeProvisionThirdpartyserviceProvision = (getValues?:any, index?:any, getData?:any) =>{   
        if(getData){
            formikRef.setFieldValue(`provisions_info.${index}.thirdparty_service_provision`, getData);
            let totalValues:any = parseInt(getValues.thirdparty_manpower_provision?getValues.thirdparty_manpower_provision :0) 
            + parseInt(getData) 
            + parseInt(getValues.cross_charges_provision?getValues.cross_charges_provision:0) 
            + parseInt(getValues.software_provision?getValues.software_provision:0) 
            + parseInt(getValues.prototype_provision?getValues.prototype_provision:0) 
            + parseInt(getValues.other_provisions?getValues.other_provisions:0);
            formikRef.setFieldValue(`provisions_info.${index}.total_provision`, totalValues);      
        }    
    }

    
    const onChangeProvisionCrossChargesProvisionProvision = (getValues?:any, index?:any, getData?:any) =>{   
        if(getData){
            formikRef.setFieldValue(`provisions_info.${index}.cross_charges_provision`, getData);
            let totalValues:any = parseInt(getValues.thirdparty_manpower_provision?getValues.thirdparty_manpower_provision :0) 
            + parseInt(getValues.thirdparty_service_provision?getValues.thirdparty_service_provision:0) 
            + parseInt(getData) 
            + parseInt(getValues.software_provision?getValues.software_provision:0) 
            + parseInt(getValues.prototype_provision?getValues.prototype_provision:0) 
            + parseInt(getValues.other_provisions?getValues.other_provisions:0);
            formikRef.setFieldValue(`provisions_info.${index}.total_provision`, totalValues);      
        }    
    }


    
    const onChangeProvisionSoftwareProvisionProvision = (getValues?:any, index?:any, getData?:any) =>{   
        if(getData){
            formikRef.setFieldValue(`provisions_info.${index}.software_provision`, getData);
            let totalValues:any = parseInt(getValues.thirdparty_manpower_provision?getValues.thirdparty_manpower_provision :0) 
            + parseInt(getValues.thirdparty_service_provision?getValues.thirdparty_service_provision:0) 
            + parseInt(getValues.cross_charges_provision?getValues.cross_charges_provision:0) 
            + parseInt(getData) 
            + parseInt(getValues.prototype_provision?getValues.prototype_provision:0) 
            + parseInt(getValues.other_provisions?getValues.other_provisions:0);
            formikRef.setFieldValue(`provisions_info.${index}.total_provision`, totalValues);      
        }    
    }


    
    const onChangeProvisionPrototypeProvisionProvision = (getValues?:any, index?:any, getData?:any) =>{   
        if(getData){
            formikRef.setFieldValue(`provisions_info.${index}.prototype_provision`, getData);
            let totalValues:any = parseInt(getValues.thirdparty_manpower_provision?getValues.thirdparty_manpower_provision :0) 
            + parseInt(getValues.thirdparty_service_provision?getValues.thirdparty_service_provision:0) 
            + parseInt(getValues.cross_charges_provision?getValues.cross_charges_provision:0) 
            + parseInt(getValues.software_provision?getValues.software_provision:0) 
            + parseInt(getData) 
            + parseInt(getValues.other_provisions?getValues.other_provisions:0);
            formikRef.setFieldValue(`provisions_info.${index}.total_provision`, totalValues);      
        }    
    }

    
    const onChangeProvisionOtherProvisionsProvision = (getValues?:any, index?:any, getData?:any) =>{   
        if(getData){
            formikRef.setFieldValue(`provisions_info.${index}.other_provisions`, getData);
            let totalValues:any = parseInt(getValues.thirdparty_manpower_provision?getValues.thirdparty_manpower_provision :0) 
            + parseInt(getValues.thirdparty_service_provision?getValues.thirdparty_service_provision:0) 
            + parseInt(getValues.cross_charges_provision?getValues.cross_charges_provision:0) 
            + parseInt(getValues.software_provision?getValues.software_provision:0) 
            + parseInt(getValues.prototype_provision?getValues.prototype_provision:0) 
            + parseInt(getData);
            formikRef.setFieldValue(`provisions_info.${index}.total_provision`, totalValues);      
        }    
    }

    return (
        <>
            <Box>
                <Dialog
                    fullScreen
                    open={props.show}
                    onClose={(event) => {
                        props.setProvisionModalClose();
                        props.initProvisionsUpdate();
                    }}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: "relative" }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                Provision View
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={(event) => {
                                    props.setProvisionModalClose();
                                    props.initProvisionsUpdate();
                                }}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box>
                        {(props.isLoading && props.loading) ? <AppLoader /> : <Formik
                            enableReinitialize
                            innerRef={(action) => { formikRef = action }}
                            initialValues={getInitilValuesChange}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                if (values) {
                                    props.updateProvisionDetails({ data: values.provisions_info })
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => {
                                return (
                                    <Form
                                        style={{ width: "100%", display: "flex", flexDirection: "column" }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Box sx={{ ml: 4, mr: 4, my: 4 }}>
                                            {/* <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h3'}>Provision Info</Typography> */}

                                            {
                                                props.provisionFilter ?
                                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                                <TextField label='Cost Centre' variant='outlined' value={props.provisionFilter.costcenter} disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                                <TextField label='Team' variant='outlined' value={props.provisionFilter.team} disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                                <TextField label='Month' variant='outlined' value={props.provisionFilter.month} disabled />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                                <TextField label='Year' variant='outlined' value={props.provisionFilter.year} disabled />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    : null
                                            }

                                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                                <FieldArray
                                                    name="provisions_info"
                                                    render={({ insert, remove, push }) => (
                                                        <>
                                                            {values.provisions_info.length > 0 &&
                                                                values.provisions_info.map(
                                                                    (fieldItem: any, index: any) => (
                                                                        <Box key={index} sx={{ padding: 2, marginTop: 4, marginBottom: 2, border: "1px solid #ccc", borderRadius: 3, boxShadow: '0px 0px 2px 0px #ccc' }}>
                                                                            <Box sx={{ textAlign: 'right', marginTop: 2, marginBottom: 2 }}>
                                                                                <ButtonGroup>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary" type="button"
                                                                                        onClick={() => {
                                                                                            onPushProvisionDetails(push)
                                                                                            // push(addProvision)
                                                                                        }
                                                                                        }
                                                                                    >
                                                                                        <AddIcon />
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="outlined"
                                                                                        color="inherit" type="button"
                                                                                        onClick={() => {
                                                                                            remove(index)
                                                                                        }
                                                                                        }
                                                                                        disabled={values.provisions_info.length <= 1 ? true : false}
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </Button>
                                                                                </ButtonGroup>

                                                                            </Box>

                                                                            <Grid container spacing={3} sx={{ display: 'none' }}>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Cost Center"}
                                                                                            variant='outlined'
                                                                                            label={"Cost Center"}
                                                                                            id={`provisions_info.${index}.costcenter`}
                                                                                            name={`provisions_info.${index}.costcenter`}
                                                                                            onChange={() => {
                                                                                                setFieldValue(`provisions_info.${index}.costcenter`, props.provisionFilter?.costcenter);
                                                                                                setFieldValue(`provisions_info.${index}.team`, props.provisionFilter?.team);
                                                                                                setFieldValue(`provisions_info.${index}.month`, props.provisionFilter?.month);
                                                                                                setFieldValue(`provisions_info.${index}.year`, props.provisionFilter?.year);
                                                                                            }}
                                                                                            value={props.provisionFilter?.costcenter}
                                                                                            disabled
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>

                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Team"}
                                                                                            variant='outlined'
                                                                                            label={"Team"}
                                                                                            id={`provisions_info.${index}.team`}
                                                                                            name={`provisions_info.${index}.team`}
                                                                                            onChange={handleChange}
                                                                                            value={props.provisionFilter?.team}
                                                                                            disabled
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>

                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Month"}
                                                                                            variant='outlined'
                                                                                            label={"Month"}
                                                                                            id={`provisions_info.${index}.month`}
                                                                                            name={`provisions_info.${index}.month`}
                                                                                            onChange={handleChange}
                                                                                            value={props.provisionFilter?.month}
                                                                                            disabled
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>

                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Year"}
                                                                                            variant='outlined'
                                                                                            label={"Year"}
                                                                                            id={`provisions_info.${index}.year`}
                                                                                            name={`provisions_info.${index}.year`}
                                                                                            onChange={handleChange}
                                                                                            value={props.provisionFilter?.year}
                                                                                            disabled
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                            </Grid>
                                                                            {/* //Show Feilds */}
                                                                            <Grid container spacing={3}>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        {
                                                                                            getInitilValuesStatusChange && fieldItem.project_name !== ''?
                                                                                            <TextField
                                                                                            placeholder={"Project Name"}
                                                                                            variant='outlined'
                                                                                            label={"Project Name"}
                                                                                            id={`provisions_info.${index}.project_name`}
                                                                                            name={`provisions_info.${index}.project_name`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.project_name}
                                                                                            disabled
                                                                                        />
                                                                                            :
                                                                                            <Autocomplete
                                                                                            onChange={(event: any, value: any) => {
                                                                                                setFieldValue(`provisions_info.${index}.project_name`, value.project_name);
                                                                                                setFieldValue(`provisions_info.${index}.project_list`, value);
                                                                                                onChangeProjectDetails(value)
                                                                                            }}
                                                                                            getOptionLabel={(option: any) => (option ? option.project_name : "")}
                                                                                            id={`provisions_info.${index}.project_name`}
                                                                                            options={props.provisionProjectList ?
                                                                                                props.provisionProjectList : []}
                                                                                            filterSelectedOptions
                                                                                            value={fieldItem?.project_list ? fieldItem?.project_list : null}
                                                                                            renderInput={(params) => <TextField {...params} label='Project Name' />}
                                                                                        />
                                                                                        }
                                                                                        
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                    {
                                                                                            getInitilValuesStatusChange && fieldItem.sla_name !== ''?
                                                                                            <TextField
                                                                                            placeholder={"SLA Name"}
                                                                                            variant='outlined'
                                                                                            label={"SLA Name"}
                                                                                            id={`provisions_info.${index}.sla_name`}
                                                                                            name={`provisions_info.${index}.sla_name`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.sla_name}
                                                                                            disabled
                                                                                        />
                                                                                            :
                                                                                            <React.Fragment>
                                                                                                   <InputLabel id={`provisions_info[${index}].sla_name`}>SLA Name</InputLabel>
                                                                                        <Select
                                                                                            labelId={`provisions_info[${index}].sla_name`}
                                                                                            id={`provisions_info[${index}].sla_name`}
                                                                                            name={`provisions_info[${index}].sla_name`}
                                                                                            value={fieldItem?.sla_name}
                                                                                            onChange={(event: any) => {
                                                                                                let getSelectSLAName: any = props.provisionSLAList.find((items: any) => items.slaname === event.target.value)
                                                                                                if (getSelectSLAName) {
                                                                                                    setFieldValue(`provisions_info.${index}.sla_name`, getSelectSLAName.slaname);
                                                                                                    setFieldValue(`provisions_info.${index}.slaid`, getSelectSLAName.slaid);
                                                                                                }
                                                                                            }}
                                                                                            label='SLA Name'
                                                                                            disabled={fieldItem.project_name !== "" ? false : true}
                                                                                        >
                                                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                                                            {(props.provisionSLAList && props.provisionSLAList.length !== 0) && props.provisionSLAList.map((option, optionIndex) => (
                                                                                                <MenuItem key={optionIndex} value={option.slaname}>{option.slaname}</MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                                </React.Fragment>
                                                                                        }
                                                                                     

                                                                                        {/* <Autocomplete
                                                                                        onChange={(event: any, value: any) => {
                                                                                            setFieldValue(`provisions_info.${index}.sla_name`, value.slaname);
                                                                                            setFieldValue(`provisions_info.${index}.slaid`, value.slaid);
                                                                                            onChangeSLADetails(value)
                                                                                        }}
                                                                                        getOptionLabel={(option: any) => (option ? option.slaname : "")}
                                                                                        id={`provisions_info.${index}.sla_name`}
                                                                                        options={props.provisionSLAList ?
                                                                                            props.provisionSLAList : []}
                                                                                        filterSelectedOptions
                                                                                        value={getSLAInfo ? getSLAInfo : null}
                                                                                        disabled={fieldItem.project_name !== "" ? false : true}
                                                                                        renderInput={(params) => <TextField {...params} label='SLA Name' />}
                                                                                    /> */}

                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"SLA#"}
                                                                                            variant='outlined'
                                                                                            label={"SLA#"}
                                                                                            id={`provisions_info.${index}.slaid`}
                                                                                            name={`provisions_info.${index}.slaid`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.slaid}
                                                                                            disabled
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Vendor Name"}
                                                                                            variant='outlined'
                                                                                            label={"Vendor Name"}
                                                                                            id={`provisions_info.${index}.vendor_name`}
                                                                                            name={`provisions_info.${index}.vendor_name`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.vendor_name}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Box sx={{ padding: 2 }}>
                                                                                        <Accordion>
                                                                                            <AccordionSummary
                                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                                aria-controls="panel1a-content"
                                                                                                id={`"panel${index}-header"`}
                                                                                                sx={{ background: '#efefef' }}
                                                                                            >
                                                                                                <Typography>Provision</Typography>
                                                                                            </AccordionSummary>
                                                                                            <AccordionDetails>
                                                                                                {/* //Provision Table start */}
                                                                                                <TableContainer component={Paper}>
                                                                                                    <Table aria-label='simple table'>
                                                                                                        <TableHeadDetail />
                                                                                                        <TableBody>
                                                                                                            <TableRow>
                                                                                                                <TableCell>
                                                                                                                    1
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h6'}>Provision for 3rd party manpower</Typography>
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Value"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Value"}
                                                                                                                        id={`provisions_info.${index}.thirdparty_manpower_provision`}
                                                                                                                        name={`provisions_info.${index}.thirdparty_manpower_provision`}
                                                                                                                        onChange={(event?:any)=>{
                                                                                                                                onChangeProvisionValues(fieldItem, index, event.target.value)    
                                                                                                                        }    }
                                                                                                                        value={fieldItem?.thirdparty_manpower_provision}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Remark"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Remark"}
                                                                                                                        id={`provisions_info.${index}.thirdparty_manpower_provision_remarks`}
                                                                                                                        name={`provisions_info.${index}.thirdparty_manpower_provision_remarks`}
                                                                                                                        onChange={handleChange}
                                                                                                                        value={fieldItem?.thirdparty_manpower_provision_remarks}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                            <TableRow>
                                                                                                                <TableCell>
                                                                                                                    2
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h6'}>Provision for services</Typography>
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Value"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Value"}
                                                                                                                        id={`provisions_info.${index}.thirdparty_service_provision`}
                                                                                                                        name={`provisions_info.${index}.thirdparty_service_provision`}
                                                                                                                        onChange={(event?:any)=>{
                                                                                                                            onChangeProvisionThirdpartyserviceProvision(fieldItem, index, event.target.value)    
                                                                                                                    }    }
                                                                                                                        value={fieldItem?.thirdparty_service_provision}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Remark"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Remark"}
                                                                                                                        id={`provisions_info.${index}.thirdparty_service_provision_remarks`}
                                                                                                                        name={`provisions_info.${index}.thirdparty_service_provision_remarks`}
                                                                                                                        onChange={handleChange}
                                                                                                                        value={fieldItem?.thirdparty_service_provision_remarks}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                            <TableRow>
                                                                                                                <TableCell>
                                                                                                                    3
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h6'}>Provision for cross charges</Typography>
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Value"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Value"}
                                                                                                                        id={`provisions_info.${index}.cross_charges_provision`}
                                                                                                                        name={`provisions_info.${index}.cross_charges_provision`}
                                                                                                                        onChange={(event?:any)=>{
                                                                                                                            onChangeProvisionCrossChargesProvisionProvision(fieldItem, index, event.target.value)    
                                                                                                                    }    }
                                                                                                                        value={fieldItem?.cross_charges_provision}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Remark"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Remark"}
                                                                                                                        id={`provisions_info.${index}.cross_charges_provision_remarks`}
                                                                                                                        name={`provisions_info.${index}.cross_charges_provision_remarks`}
                                                                                                                        onChange={handleChange}
                                                                                                                        value={fieldItem?.cross_charges_provision_remarks}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                            <TableRow>
                                                                                                                <TableCell>
                                                                                                                    4
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h6'}>Provision for software</Typography>
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Value"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Value"}
                                                                                                                        id={`provisions_info.${index}.software_provision`}
                                                                                                                        name={`provisions_info.${index}.software_provision`}
                                                                                                                        onChange={(event?:any)=>{
                                                                                                                            onChangeProvisionSoftwareProvisionProvision(fieldItem, index, event.target.value)    
                                                                                                                    }    }
                                                                                                                        value={fieldItem?.software_provision}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Remark"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Remark"}
                                                                                                                        id={`provisions_info.${index}.software_provision_remarks`}
                                                                                                                        name={`provisions_info.${index}.software_provision_remarks`}
                                                                                                                        onChange={handleChange}
                                                                                                                        value={fieldItem?.software_provision_remarks}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                            <TableRow>
                                                                                                                <TableCell>
                                                                                                                    5
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h6'}>Provision for prototype</Typography>
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Value"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Value"}
                                                                                                                        id={`provisions_info.${index}.prototype_provision`}
                                                                                                                        name={`provisions_info.${index}.prototype_provision`}
                                                                                                                        onChange={(event?:any)=>{
                                                                                                                            onChangeProvisionPrototypeProvisionProvision(fieldItem, index, event.target.value)    
                                                                                                                    }    }
                                                                                                                        value={fieldItem?.prototype_provision}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Remark"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Remark"}
                                                                                                                        id={`provisions_info.${index}.prototype_provision_remarks`}
                                                                                                                        name={`provisions_info.${index}.prototype_provision_remarks`}
                                                                                                                        onChange={handleChange}
                                                                                                                        value={fieldItem?.prototype_provision_remarks}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                            <TableRow>
                                                                                                                <TableCell>
                                                                                                                    6
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <Typography sx={{ flex: 1, mr: 2, mb: 2 }} variant={'h6'}>Other Provision</Typography>
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Value"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Value"}
                                                                                                                        id={`provisions_info.${index}.other_provisions`}
                                                                                                                        name={`provisions_info.${index}.other_provisions`}
                                                                                                                        onChange={(event?:any)=>{
                                                                                                                            onChangeProvisionOtherProvisionsProvision(fieldItem, index, event.target.value)    
                                                                                                                    }    }
                                                                                                                        value={fieldItem?.other_provisions}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                                                                                    <TextField
                                                                                                                        fullWidth
                                                                                                                        placeholder={"Remark"}
                                                                                                                        variant='outlined'
                                                                                                                        label={"Remark"}
                                                                                                                        id={`provisions_info.${index}.other_provisions_remarks`}
                                                                                                                        name={`provisions_info.${index}.other_provisions_remarks`}
                                                                                                                        onChange={handleChange}
                                                                                                                        value={fieldItem?.other_provisions_remarks}
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                            </TableRow>
                                                                                                        </TableBody>
                                                                                                    </Table>
                                                                                                </TableContainer>
                                                                                                {/* //Provision Table end */}
                                                                                            </AccordionDetails>
                                                                                        </Accordion>

                                                                                    </Box>
                                                                                </Grid>

                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"IO Number"}
                                                                                            variant='outlined'
                                                                                            label={"IO Number"}
                                                                                            id={`provisions_info.${index}.io_number`}
                                                                                            name={`provisions_info.${index}.io_number`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.io_number}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Corresponding PO/RO Number"}
                                                                                            variant='outlined'
                                                                                            label={"Corresponding PO/RO Number"}
                                                                                            id={`provisions_info.${index}.po_ro_number`}
                                                                                            name={`provisions_info.${index}.po_ro_number`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.po_ro_number}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Invoice Reference No"}
                                                                                            variant='outlined'
                                                                                            label={"Invoice Reference No"}
                                                                                            id={`provisions_info.${index}.invoice_reference_no`}
                                                                                            name={`provisions_info.${index}.invoice_reference_no`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.invoice_reference_no}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"If Other Provisions reported, pls explain"}
                                                                                            variant='outlined'
                                                                                            label={"If Other Provisions reported, pls explain"}
                                                                                            id={`provisions_info.${index}.previous_provisions`}
                                                                                            name={`provisions_info.${index}.previous_provisions`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.previous_provisions}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                        disabled
                                                                                            placeholder={"Total Provision"}
                                                                                            variant='outlined'
                                                                                            label={"Total Provision"}
                                                                                            id={`provisions_info.${index}.total_provision`}
                                                                                            name={`provisions_info.${index}.total_provision`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.total_provision}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        {/* <TextField
                                                                                        placeholder={"Status"}
                                                                                        variant='outlined'
                                                                                        label={"Status"}
                                                                                        id={`provisions_info.${index}.status`}
                                                                                        name={`provisions_info.${index}.status`}
                                                                                        onChange={handleChange}
                                                                                        value={fieldItem?.status}
                                                                                    /> */}
                                                                                        <InputLabel id={`provisions_info[${index}].status`}>Status</InputLabel>
                                                                                        <Select
                                                                                            labelId={`provisions_info[${index}].status`}
                                                                                            id={`provisions_info[${index}].status`}
                                                                                            name={`provisions_info[${index}].status`}
                                                                                            value={fieldItem?.status}
                                                                                            onChange={handleChange}
                                                                                            label='Status'
                                                                                        >
                                                                                            <MenuItem value=''><em>None</em></MenuItem>
                                                                                            {(props.provisionStatusList.length !== 0) && props.provisionStatusList.map((option, optionIndex) => (
                                                                                                <MenuItem key={optionIndex} value={option.provision_status}>{option.provision_status}</MenuItem>
                                                                                            ))}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder={"Comments"}
                                                                                            multiline
                                                                                            variant='outlined'
                                                                                            label={"Comments"}
                                                                                            id={`provisions_info.${index}.comments`}
                                                                                            name={`provisions_info.${index}.comments`}
                                                                                            onChange={handleChange}
                                                                                            value={fieldItem?.comments}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    ))}


                                                        </>

                                                    )} />
                                                {((userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Finance)) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                                        color="primary" type="submit" disabled={values.provisions_info.length === 0}>Save</Button>
                                                </Box>}
                                            </Box>
                                        </Box>
                                    </Form>
                                )
                            }}
                        </Formik>}
                    </Box>
                </Dialog>
            </Box >
        </>
    );
};


const mapStateToProps = (state: any) => ({
    loading: state.provisions.loading,
    isLoading: state.provisions.isLoading,
    getProvisionResponse: state.provisions.provisionsResponse,
    checkProvisionAddResponse: state.provisions.provisionsConditionalAddResponse,
    provisionsUpdateResponse: state.provisions.provisionsUpdateResponse,
    provisionProjectList: state.preInvoiceProcess.provisionProjectList,
    provisionSLAList: state.preInvoiceProcess.provisionSLAList,
})

const mapDispatchToProps = (dispatch: any) => ({
    initProvisions: () => {
        dispatch(initProvisionsResetAction())
    },
    initProvisionsUpdate: () => {
        dispatch(initProvisionsUpdateAction())
    },
    updateProvisionDetails: (data: any) => {
        dispatch(updateProvisionsDetailsAction(data))
    },
    checkAddProvisionDetails: (data: any) => {
        dispatch(checkAddProvisionDetailAction(data))
    },
    reqProjectProvisionsData: (data: any) => {
        dispatch(reqProjectProvisionsData(data))
    },
    reqSLAProvisionsData: (data: any) => {
        dispatch(reqSLAProvisionsData(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProvisionModalView);
