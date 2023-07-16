import React, { useEffect } from 'react';
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useLocation } from 'react-router-dom';
import JDMapAssign from './JDMapAssign';
import { connect } from "react-redux"
import { createJDAssignAndJDMappingAction, getBizJDMappingAction, getJDOptionsListAction, setJDFileUploadResetAction } from 'saga/Actions';
import { AppLoader } from '@crema';
import { toast } from 'react-toastify';


const Transition: any = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const JDRampUpMapping = (props: any) => {
    const { state }: any = useLocation();
    const [showJDMapAssign, setShowJDMapAssign] = React.useState(false);
    const [rampUpData, setRampUpData]: any = React.useState<any>(null);
    const [jdProperty, setJDProperty] = React.useState<any>(null);
    const [JDListProperty, setJDListProperty] = React.useState<any>([]);


    const { jdMappingDetail, createJDAssignResponse, jdListResponse }: any = props;

    useEffect(() => {
        if (state.hasOwnProperty('requirementData') && state.requirementData.id) {
            props.getJDMappingDetails({ bizcase_id: state.requirementData.id })
            props.getJDListOptions({ bizcase_id: state.requirementData.id })
        } else {
            props.setJDMapClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (jdMappingDetail && jdMappingDetail.status) {
            if (jdMappingDetail.data.jdRampupModel) {
                setRampUpData(jdMappingDetail.data.jdRampupModel);
            } else {
                setRampUpData(jdMappingDetail.data.manpowerrampupList);
            }

        }
        if (jdListResponse && jdListResponse.status) {
            setJDListProperty(jdListResponse.data);
        }
        if (createJDAssignResponse && createJDAssignResponse.status) {
            toast.success(createJDAssignResponse.message, { position: 'bottom-right' });
            props.resetJDAssignAndUpload({});
            props.setJDMapClose();
            props.goBack()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jdMappingDetail, createJDAssignResponse]);

    const setJDMapInit = (index, key, property, rootProperty) => {
        const propResp: any = {};
        propResp['index'] = index;
        propResp['key'] = key;
        propResp['level'] = rootProperty.level;
        propResp['total'] = parseInt(rootProperty.total);
        propResp['property'] = property;
        setShowJDMapAssign(true);
        setJDProperty(propResp);
    }

    const setJDMapAssignClose = (data) => {
        setShowJDMapAssign(false);
        setJDProperty(null);
    }

    const onJDMapAssignSubmit = (data) => {
        const JDRampInitData: any = JSON.parse(JSON.stringify(rampUpData));
        JDRampInitData.forEach((element, index) => {
            if (index === data.index) {
                element.properties.forEach((property, key) => {
                    if (key === data.key) {
                        property['jd_map'] = data.jd_assign;
                    }
                });
            }
        });
        setRampUpData(JDRampInitData);
    }

    return (
        <>
            <Box>
                <Dialog
                    fullScreen
                    open={props.show}
                    onClose={props.setJDMapClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: "relative" }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={props.setJDMapClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ ml: 4, mr: 4 }}>
                        {(props.isLoading) && <AppLoader />}
                        <Grid container direction={'row'} spacing={{ xs: 2, md: 8 }}>
                            <Grid item xs={12} md={12}>
                                <Accordion sx={{ backgroundColor: "#f5f5f5", marginTop: 4 }} defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        <Typography variant={'h6'} sx={{}}>JD Mapping</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box>
                                            <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
                                                <Grid item xs={12} md={12}>
                                                    <Box style={{ width: '100%' }}>
                                                        {rampUpData && <TableContainer component={Paper}>
                                                            <Table aria-label='simple table'>
                                                                <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                    <TableRow>
                                                                        <TableCell sx={{
                                                                            color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: 0, backgroundColor: '#005384'
                                                                        }}>Level</TableCell>
                                                                        <TableCell sx={{
                                                                            color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                                        }}>Total</TableCell>
                                                                        {(rampUpData?.length) ? rampUpData[0].properties.map((manpowerProperty, propertyIndex) => (
                                                                            <React.Fragment key={propertyIndex}>
                                                                                {/* {(bizYear && (rampupProperty.year === bizYear)) ?  */}
                                                                                <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>{manpowerProperty.property_name}</TableCell>
                                                                                {/* : null} */}
                                                                            </React.Fragment>
                                                                        )) : null}

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {rampUpData.map((manpowerProperty, propertyIndex) => (
                                                                        <React.Fragment key={propertyIndex}>
                                                                            <TableRow
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}
                                                                                    rowSpan={2}>
                                                                                    {manpowerProperty.level}
                                                                                </TableCell>
                                                                                <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}
                                                                                    rowSpan={2}>
                                                                                    {manpowerProperty.total}
                                                                                </TableCell>
                                                                                {manpowerProperty.properties.map((property, propertyKey) => (
                                                                                    <TableCell key={propertyKey}>
                                                                                        {property.property_value}
                                                                                    </TableCell>
                                                                                ))}
                                                                            </TableRow>
                                                                            <TableRow
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                {manpowerProperty.properties.map((property, propertyKey) => (
                                                                                    <React.Fragment key={`${propertyKey}_spanKey`}>
                                                                                        {property.property_value ? <TableCell>
                                                                                            <span onClick={(event) => setJDMapInit(propertyIndex, propertyKey, property, manpowerProperty)} className='pointer'><RemoveRedEyeIcon /></span>
                                                                                        </TableCell> : <TableCell></TableCell>}
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </TableRow>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>}
                                                    </Box>
                                                </Grid>
                                            </Paper>
                                        </Box>
                                    </AccordionDetails>

                                    <Box sx={{ mb: 2, pb: 2, textAlign: "right" }}>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                            color="inherit" type="button" onClick={props.setJDMapClose}> Cancel
                                        </Button>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                            color="primary" type="button" onClick={(event) => {
                                                props.createBizJDAssignAndMapping({ bizcase_id: state.requirementData.id, data: rampUpData })
                                            }} >Save </Button>
                                    </Box>
                                </Accordion>
                            </Grid>
                        </Grid>
                        {showJDMapAssign &&
                            <JDMapAssign show={showJDMapAssign} property={jdProperty} JDListProperty={JDListProperty} setJDMapAssignClose={setJDMapAssignClose} onJDMapAssignSubmit={onJDMapAssignSubmit} />
                        }
                    </Box>
                </Dialog>
            </Box>
        </>
    );
};


const mapStateToProps = (state: any) => ({
    loading: state.jdmapping.loading,
    error: state.jdmapping.errors,
    isLoading: state.jdmapping.isLoading,
    jdProjectDetail: state.jdmapping.projectResponse,
    jdMappingDetail: state.jdmapping.detailResponse,
    createJDAssignResponse: state.jdmapping.mappingResponse,
    jdListResponse: state.jdmapping.jdListResponse
})

const mapDispatchToProps = (dispatch: any) => ({
    resetJDAssignAndUpload: (data: any) => {
        dispatch(setJDFileUploadResetAction(data))
    },
    getJDListOptions: (data: any) => {
        dispatch(getJDOptionsListAction(data))
    },
    getJDMappingDetails: (data: any) => {
        dispatch(getBizJDMappingAction(data))
    },
    createBizJDAssignAndMapping: (data: any) => {
        dispatch(createJDAssignAndJDMappingAction(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(JDRampUpMapping);
