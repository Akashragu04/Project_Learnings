import React, { useEffect } from 'react'
import {
    Box, Grid, Button, Dialog, Fab, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, DialogTitle, DialogContent,
    DialogActions,
    FormHelperText
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Fonts } from "shared/constants/AppEnums";
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import { jdMapAssignProperty, jdAssignProperty, appConstants } from 'shared/constants/AppConst';
import { connect } from "react-redux"
import { AppLoader } from '@crema';
import { toast } from 'react-toastify';
import { jdMappingValidationSchema } from './JDMappingValidation';

const JDMapAssign = (props?: any) => {
    let formikRef: any;
    const [fteLevels, setFteLevels] = React.useState<any>([]);
    const [fteStatusLevels, setStatusFteLevels] = React.useState<any>(false);

    const { jdListOptions }: any = props; // eslint-disable-line no-use-before-define

    useEffect(() => {
        onSetFTEListData(); // eslint-disable-line no-use-before-define
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.property.property.hasOwnProperty('jd_map') && props.property.property.jd_map && props.property.property.jd_map.length) { // eslint-disable-line no-use-before-define
            if (formikRef) { // eslint-disable-line no-use-before-define
                formikRef.setFieldValue('jd_assign', props.property.property.jd_map) // eslint-disable-line no-use-before-define
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fteLevels]);

    const onSetFTEListData = () => {
        if (props.property.property.property_value) {
            const fteTotalData = parseInt(props.property.property.property_value);
            let jdAssignedQuantity = 0;
            if (props.property.property.jd_map && props.property.property.jd_map.length) {
                props.property.property.jd_map.forEach((jdProperty) => {
                    if (jdProperty.quantity) {
                        jdAssignedQuantity = jdAssignedQuantity + parseInt(jdProperty.quantity)
                    }
                });
            }
            const fteLevelEnable = fteTotalData - jdAssignedQuantity;
            fteLevelInit(fteLevelEnable);
            if (jdAssignedQuantity > fteTotalData) {
                toast.warning(appConstants.jdMapFTELevelValidationMsg, { position: 'bottom-right' });
                setStatusFteLevels(true)
            }else{
                setStatusFteLevels(false)
            }

        }
    }

    const fteLevelInit = (fteLevelEnable) => {
        const fteTotalData = parseInt(props.property.property.property_value);
        const fteTotalList: any = [];
        for (let index = 0; index < fteTotalData; index++) {
            const fteProperty: any = {};
            const fteCount = index + 1;
            fteProperty['id'] = fteCount;
            fteProperty['name'] = fteCount;
            if (fteCount > fteLevelEnable) {
                fteProperty['disabled'] = true;
            } else {
                fteProperty['disabled'] = false;
            }
            fteTotalList.push(fteProperty);
        }
        setFteLevels(fteTotalList);
    }

    const onFTELevelChangeData = (jdAssignIndex, event) => {
        if (event.target.value) {
            const jdMapFormValues = JSON.parse(JSON.stringify(formikRef.values));
            const fteTotalData = parseInt(props.property.property.property_value);
            let jdAssignedQuantity = 0;
            if (jdMapFormValues.jd_assign.length) {
                jdMapFormValues.jd_assign.forEach((jdProperty, jdIndex) => {
                    let fteQuantity: any = 0;
                    if (jdProperty.quantity) {
                        fteQuantity = jdProperty.quantity;
                    }
                    if (jdIndex === jdAssignIndex) {
                        fteQuantity = event.target.value;
                    }
                    jdAssignedQuantity = jdAssignedQuantity + parseInt(fteQuantity)
                });
            }
            if (jdAssignedQuantity > fteTotalData) {
                toast.warning(appConstants.jdMapFTELevelValidationMsg, { position: 'bottom-right' });
                setStatusFteLevels(true)
            }else{                
                setStatusFteLevels(false)
            }
        }
    }

    const onFTELevelRemoval = () => {
        const jdMapFormValues = JSON.parse(JSON.stringify(formikRef.values));
        const fteTotalData = parseInt(props.property.property.property_value);
        let jdAssignedQuantity = 0;
        if (jdMapFormValues.jd_assign.length) {
            jdMapFormValues.jd_assign.forEach((jdProperty, jdIndex) => {
                if (jdProperty.quantity) {
                    jdAssignedQuantity = jdAssignedQuantity + parseInt(jdProperty.quantity)
                } else {
                    jdAssignedQuantity = jdAssignedQuantity + 0;
                }
            });
        }
        if (jdAssignedQuantity > fteTotalData) {
            toast.warning(appConstants.jdMapFTELevelValidationMsg, { position: 'bottom-right' });
            setStatusFteLevels(true)
        }else{            
            setStatusFteLevels(false)
        }
    }


    const onAddJDAssign = () => {
        const jdAssignPropertyObj = JSON.parse(JSON.stringify(jdAssignProperty));
        const jdAssignDetailProperties = JSON.parse(JSON.stringify(formikRef.values.jd_assign));
        jdAssignDetailProperties.push(jdAssignPropertyObj);
        formikRef.setFieldValue('jd_assign', jdAssignDetailProperties);
    }
    const onJDListChange = (event, index) => {
        const JDListValues: any = JSON.parse(JSON.stringify(jdListOptions));
        let jdCodeItem: any = '';
        if (event.target.value) {
            const jdCodeData = JDListValues.find((item) => item.jd_code === event.target.value);
            if (jdCodeData) {
                jdCodeItem = jdCodeData.id;
            }
        }
        formikRef.setFieldValue(`jd_assign[${index}].jdcode`, jdCodeItem);
    }
    const setSubmitJDAssign = () => {
        const values = JSON.parse(JSON.stringify(formikRef.values));
        values.jd_assign.forEach((jdProps) => {
            jdProps['quantitydisabled'] = true;
        });
        values['index'] = props.property.index;
        values['key'] = props.property.key;
        props.onJDMapAssignSubmit(values);
        props.setJDMapAssignClose(false)
    }

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth={'md'}
                open={props.show}
                onClose={() => props.setJDMapAssignClose(false)}
                scroll={'paper'}
                sx={{
                    "& .MuiTypography-h6": {
                        fontWeight: Fonts.SEMI_BOLD,
                        backgroundColor: "#00677F",
                        color: "#ffffff"
                    },
                }}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>{'JD Mapping'}</DialogTitle>
                <DialogContent dividers>
                    {/* <DialogContentText
                        id='scroll-dialog-description'
                        tabIndex={-1}
                    > */}
                    <React.Fragment>
                        <Formik
                            enableReinitialize
                            innerRef={(action) => { formikRef = action }}
                            initialValues={jdMapAssignProperty}
                                    validationSchema={jdMappingValidationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true);
                                
                                setSubmitting(false);
                            }}
                        >
                            {({ values, setFieldValue, handleChange }) => (
                                <Form
                                    style={{ width: "100%", display: "flex", flexDirection: "column" }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {(values.isLoading) ? <AppLoader /> :
                                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                                            <Grid container justifyContent="center" spacing={{ xs: 2, md: 4 }} >
                                                <Grid item xs={12} md={12}>
                                                    <Box display="flex" justifyContent="flex-end">
                                                        <Fab size='small' color='primary' aria-label='add' onClick={onAddJDAssign}>
                                                            <AddIcon />
                                                        </Fab>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <TableContainer component={Paper}>
                                                        <Table aria-label='JD Assigning'>
                                                            <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                                                                <TableRow>
                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>S.No</TableCell>
                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>JD Codes</TableCell>
                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>Unit</TableCell>
                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16, minWidth: 200 }}>Remarks</TableCell>
                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Action</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <FieldArray
                                                                    name="jd_assign"
                                                                    render={jdAssignListHelpers => (
                                                                        <React.Fragment>
                                                                            {values.jd_assign.map((jdAssignInfo: any, jdAssignIndex) => (
                                                                                <React.Fragment key={jdAssignIndex}>
                                                                                    <TableRow>
                                                                                        <TableCell>{jdAssignIndex + 1}</TableCell>
                                                                                        <TableCell>
                                                                                            <FormControl fullWidth margin='dense'>
                                                                                                <InputLabel id={`jd_assign[${jdAssignIndex}].jdlist-label`}>JD's</InputLabel>
                                                                                                <Select
                                                                                                    labelId={`jd_assign[${jdAssignIndex}].jdlist-label`}
                                                                                                    id={`jd_assign[${jdAssignIndex}].jdlist`}
                                                                                                    name={`jd_assign[${jdAssignIndex}].jdlist`}
                                                                                                    value={jdAssignInfo.jdlist}
                                                                                                    onChange={(event) => {
                                                                                                        setFieldValue(`jd_assign[${jdAssignIndex}].jdlist`, event.target.value);
                                                                                                        onJDListChange(event, jdAssignIndex)
                                                                                                    }}
                                                                                                    // onChange={handleChange}
                                                                                                    label='Choose JDs'
                                                                                                >
                                                                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                                                                    {(jdListOptions.length) && jdListOptions.map((item) => (
                                                                                                        <MenuItem
                                                                                                            key={item.id}
                                                                                                            value={item.jd_code}
                                                                                                        >
                                                                                                            {item.jd_code} {item.position_code && <React.Fragment>- {item.position_code}</React.Fragment>}
                                                                                                        </MenuItem>
                                                                                                    ))}
                                                                                                </Select>
                                                                                                <ErrorMessage name={`jd_assign[${jdAssignIndex}].jdlist`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                                                            </FormControl>
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                                <TextField label="Enter FTE" id={`jd_assign[${jdAssignIndex}].quantity`} name={`jd_assign[${jdAssignIndex}].quantity`}
                                                                                                    value={jdAssignInfo.quantity}
                                                                                                    onChange={(event) => {
                                                                                                        // setFieldValue('isLoading', true);
                                                                                                        setFieldValue(`jd_assign[${jdAssignIndex}].quantity`, event.target.value);
                                                                                                        onFTELevelChangeData(jdAssignIndex, event);
                                                                                                    }} margin='dense' variant='outlined' type='number' />
                                                                                                <ErrorMessage name={`jd_assign[${jdAssignIndex}].quantity`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                                                            </FormControl>
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                                <TextField
                                                                                                    name={`jd_assign[${jdAssignIndex}].remarks`}
                                                                                                    label='Remarks'
                                                                                                    multiline
                                                                                                    rows={2}
                                                                                                    variant='outlined'
                                                                                                    fullWidth
                                                                                                    onChange={handleChange}
                                                                                                    value={jdAssignInfo.remarks}
                                                                                                />
                                                                                                <ErrorMessage name={`jd_assign[${jdAssignIndex}].remarks`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                                                                            </FormControl>
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            <Box display="flex" justifyContent="center">
                                                                                                <IconButton aria-label='delete' onClick={(event) => {
                                                                                                    jdAssignListHelpers.remove(jdAssignIndex);
                                                                                                    setTimeout(() => {
                                                                                                        onFTELevelRemoval();
                                                                                                    }, 1000);
                                                                                                }}>
                                                                                                    <RemoveCircleIcon />
                                                                                                </IconButton>
                                                                                            </Box>
                                                                                        </TableCell>

                                                                                    </TableRow>
                                                                                </React.Fragment>

                                                                            ))}
                                                                        </React.Fragment>

                                                                    )} />
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                            </Grid>
                                        </Box>}
                                </Form>
                            )}
                        </Formik>
                    </React.Fragment>
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions sx={{marginBottom:4}}>
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                        color="inherit" type="button" onClick={() => props.setJDMapAssignClose(false)}> Cancel
                    </Button>
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                        color="primary" onClick={() => setSubmitJDAssign()} disabled={fteStatusLevels === true?true:false}> Set
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    loading: state.jdmapping.loading,
    error: state.jdmapping.errors,
    isLoading: state.jdmapping.isLoading,
    jdListResponse: state.jdmapping.jdListResponse,
    jdListOptions: state.jdmapping.jdListOptions
})

const mapDispatchToProps = (dispatch: any) => ({
    init: (data: any) => {
        // dispatch(setJDFileUploadResetAction(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(JDMapAssign);