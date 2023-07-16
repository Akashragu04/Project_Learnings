import React, { useState } from 'react';
import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails,
    InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { RoutePermittedRole } from 'shared/constants/AppConst';
import CommonStore from '@crema/services/commonstore';
import { connect } from 'react-redux';
import AppConfirmDialog from '@crema/core/AppConfirmDialog';

const Transition: any = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IterationView = (props: any) => {

    const userRole = CommonStore().userRoleType;
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

    const onDenyAction = () => {
        setConfirmDialogOpen(false);
        props.setIteration('');
    }

    const onConfirmAction = () => {
        const bizIterationList = props.bizIterationList;
        const bizIterationResponse = props.bizIterationResponse;

        const getBizItartionAction = bizIterationList.find((item: any) => item.id === props.Iteration);
        if (getBizItartionAction) {
            let iterationActionItem: any;
            if (getBizItartionAction.action === 'manPowerIteration') {
                iterationActionItem = 'manpower_Iteration';
            } else if (getBizItartionAction.action === 'hrIteration') {
                iterationActionItem = 'hr_Iteration';
            }
            const activeBizIterationResponse = bizIterationResponse[getBizItartionAction.action];
            const getChoosenBizItartion = activeBizIterationResponse.find((item: any) => item[iterationActionItem] === props.Iteration);
            if (getChoosenBizItartion) {
                props.submitBizIteration(getChoosenBizItartion, getBizItartionAction.action)
                props.setIterationClose();
                setConfirmDialogOpen(false);
            }
        }
    }

    return (
        <>
            <Box>
                <Dialog
                    fullScreen
                    open={props.show}
                    onClose={props.setIterationAction(false)}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: "relative" }}>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                                {/* Iteration View */}
                            </Typography>

                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={props.setIterationAction(false)}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ ml: 4, mr: 4 }}>
                        {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                            <Grid container direction={'row'} spacing={{ xs: 2, md: 8 }}>
                                <Grid item xs={12} md={8}></Grid>
                                <Grid item xs={12} md={4}>
                                    {/* <FormControl variant='standard' fullWidth margin='dense'> */}
                                    <InputLabel id='business-iteration-list-label'>Choose Iteration for Business Setup</InputLabel>
                                    <Select
                                        labelId='business-iteration-list-label'
                                        id='business-iteration-list-label-standard'
                                        name="business_iteration"
                                        value={props.Iteration}
                                        onChange={(event) => {
                                            props.setIteration(event.target.value);
                                            if (event.target.value) {
                                                setConfirmDialogOpen(true);
                                            }
                                        }}
                                        label='Iteration Type'
                                        variant='standard'
                                        fullWidth
                                        margin='dense'
                                    >
                                        <MenuItem value=''><em>None</em></MenuItem>
                                        {(props.bizIterationList.length) && props.bizIterationList.map((option, optionIndex) => (
                                            <MenuItem key={optionIndex} value={option.id}>{option.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {/* </FormControl> */}
                                </Grid>
                            </Grid>
                        }
                        <Grid container direction={'row'} spacing={{ xs: 2, md: 8 }}>
                            {(props.bizIterationResponse?.manPowerIteration.length !== 0) && props.bizIterationResponse?.manPowerIteration.map((manPowerOption, manPowerOptionIndex) => (
                                <Grid key={manPowerOptionIndex} item xs={12} md={12}>
                                    <Accordion sx={{ backgroundColor: "#f5f5f5", marginTop: 4 }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${manPowerOptionIndex}-content`}
                                            id={`panel${manPowerOptionIndex}-header`}
                                        >
                                            <Typography variant={'h6'} sx={{}}>{manPowerOption?.manpower_label}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box>
                                                <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label='simple table'>
                                                                    <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell sx={{
                                                                                color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: 0, backgroundColor: '#005384'
                                                                            }}>Level</TableCell>
                                                                            <TableCell sx={{
                                                                                color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                                            }}>Total</TableCell>
                                                                            {(manPowerOption.manpower_Rampups.length) ? manPowerOption.manpower_Rampups[0].properties.map((manpowerProperty, propertyIndex) => (
                                                                                <React.Fragment key={propertyIndex}>
                                                                                    {/* {(bizYear && (rampupProperty.year === bizYear)) ?  */}
                                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>{manpowerProperty.property_name}</TableCell>
                                                                                    {/* : null} */}
                                                                                </React.Fragment>
                                                                            )) : null}

                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {manPowerOption.manpower_Rampups.map((manpowerProperty, propertyIndex) => (
                                                                            <TableRow
                                                                                key={propertyIndex}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                                    {manpowerProperty.level}
                                                                                </TableCell>
                                                                                <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                                    {manpowerProperty.total}
                                                                                </TableCell>
                                                                                {manpowerProperty.properties.map((property, propertyKey) => (
                                                                                    <TableCell key={propertyKey}>
                                                                                        {property.property_value}
                                                                                    </TableCell>
                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                </Paper>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}

                            {(props.bizIterationResponse?.hrIteration && props.bizIterationResponse?.hrIteration.length !== 0) && props.bizIterationResponse?.hrIteration.map((manPowerOption, manPowerOptionIndex) => (
                                <Grid key={manPowerOptionIndex} item xs={12} md={12}>
                                    <Accordion sx={{ backgroundColor: "#f5f5f5", marginTop: 4 }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${manPowerOptionIndex}-content`}
                                            id={`panel${manPowerOptionIndex}-header`}
                                        >
                                            <Typography variant={'h6'} sx={{}}>{manPowerOption?.hr_label}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box>
                                                <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
                                                    <Grid item xs={12} md={12}>
                                                        <Box style={{ width: '100%' }}>
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label='simple table'>
                                                                    <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell sx={{
                                                                                color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: 0, backgroundColor: '#005384'
                                                                            }}>Level</TableCell>
                                                                            <TableCell sx={{
                                                                                color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                                            }}>Total</TableCell>
                                                                            {(manPowerOption.hr_rampups.length) ? manPowerOption.hr_rampups[0].properties.map((manpowerProperty, propertyIndex) => (
                                                                                <React.Fragment key={propertyIndex}>
                                                                                    {/* {(bizYear && (rampupProperty.year === bizYear)) ?  */}
                                                                                    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>{manpowerProperty.property_name}</TableCell>
                                                                                    {/* : null} */}
                                                                                </React.Fragment>
                                                                            )) : null}

                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {manPowerOption.hr_rampups.map((manpowerProperty, propertyIndex) => (
                                                                            <TableRow
                                                                                key={propertyIndex}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                                    {manpowerProperty.level}
                                                                                </TableCell>
                                                                                <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                                    {manpowerProperty.total}
                                                                                </TableCell>
                                                                                {manpowerProperty.properties.map((property, propertyKey) => (
                                                                                    <TableCell key={propertyKey}>
                                                                                        {property.property_value}
                                                                                    </TableCell>
                                                                                ))}
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    </Grid>
                                                </Paper>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>
                </Dialog>
            </Box>
            <AppConfirmDialog
                open={isConfirmDialogOpen}
                onDeny={onDenyAction}
                onConfirm={onConfirmAction}
                title={'Are you sure to choose this as Business Iteration ?'}
                dialogTitle={'Confirm'}
            />
        </>
    );
};


const mapStateToProps = (state: any) => ({
    loading: state.businessRequirement.loading,
    isLoading: state.businessRequirement.isLoading,
    error: state.businessRequirement.errors
})

const mapDispatchToProps = (dispatch: any) => ({
    initBizRequirement: () => {
        // dispatch(initBizRequirementAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(IterationView);
