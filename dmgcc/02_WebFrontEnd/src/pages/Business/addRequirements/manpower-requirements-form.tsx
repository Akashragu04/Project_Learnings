import React from 'react';
import {
    Button, Typography, Box, Grid, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel,
    Select, MenuItem, Paper, Fab, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormGroup, FormControlLabel
} from '@mui/material';
import { FieldArray } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AppLoader } from '@crema';
import { manpowerLevelConstant, levelSequenceConstant, RoutePermittedRole } from '../../../shared/constants/AppConst';
import CommonStore from '@crema/services/commonstore';
import CheckIcon from '@mui/icons-material/Check';
import { formValidationPatten } from 'services/Constants';

const ManpowerRequirementsForm = ({ setFieldValue, action, hrUserList, values, handleChange, expanded, bizYearList, bizYear,
    handleAccordinChange, onManpowerLevel, setIterationAction, onManPowerRequirementSet, onManPowerHiringCostSet,
    onBusinessYearFilter, onRampUpCalculateValidation, isSequenceEnable, onManpowerLevelChange, onSaveAndNotifyInfo, onHRRampUpCalculation,
    onLevelDynamicalRemove, getResNumber, getValidMHCInputValue, getValidInputValue }) => {

    const userRole = CommonStore().userRoleType;
    
    return (
        <>
            {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business) ||
                (userRole === RoutePermittedRole.HR) || (userRole === RoutePermittedRole.Finance)) && <React.Fragment>
                    <Accordion expanded={expanded === 'manpower'} onChange={handleAccordinChange('manpower')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls='manpower-content' id='manpower-header' sx={{ backgroundColor: "#f5f3f3" }} >
                            <Typography sx={{ flex: 1, mr: 2 }} variant={'h5'}>Manpower</Typography>

                            {values.hr_contact_person && <Box sx={{ display: 'inline-flex', justifyContent: 'right', mr: 2 }}>
                            {
                                        values?.ishrfilledbizcas === true?
                                <CheckIcon fontSize="medium" sx={{
                                    color: 'green', fontWeight: 'bold', position: 'relative',
                                    top: '6px', right: '2px'
                                }} />
                                :null}
                                <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                                    Assigned to:  {values.hr_contact_person}
                                </Typography>
                            </Box>}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className="autoscroll">
                                <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
                                    <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={{ xs: 8, md: 12 }}>
                                        <Grid item xs={12} md={5} sx={{ marginBottom: 3 }}>
                                            {((userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Admin)) &&
                                                <FormControl variant='standard' fullWidth margin='dense'>
                                                    <InputLabel id='manpower-level-list-label'>Level</InputLabel>
                                                    <Select
                                                        labelId='manpower-level-list-label'
                                                        id='manpower-level-list-label-standard'
                                                        name="manpower_level"
                                                        value={values.manpower_level}
                                                        onChange={onManpowerLevelChange}
                                                        label='Manpower Level'
                                                    >
                                                        <MenuItem value=''><em>None</em></MenuItem>
                                                        {manpowerLevelConstant.map((item, itemIndex) => (
                                                            <MenuItem key={itemIndex} value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>}
                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ marginBottom: 3 }}>
                                            {((userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Admin)) &&
                                                <FormControl variant='standard' fullWidth margin='dense'>
                                                    <InputLabel id='level-sequence-list-label'>Grade</InputLabel>
                                                    <Select
                                                        labelId='level-sequence-list-label'
                                                        id='level-sequence-list-label-standard'
                                                        name="level_sequence"
                                                        value={values.level_sequence}
                                                        onChange={handleChange}
                                                        label='Level Sequence'
                                                        disabled={isSequenceEnable}
                                                    >
                                                        <MenuItem value=''><em>None</em></MenuItem>
                                                        {levelSequenceConstant.map((item, itemIndex) => (
                                                            <MenuItem key={itemIndex} value={item.name}>{item.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>}
                                        </Grid>
                                        <Grid item xs={6} md={1} sx={{ marginBottom: 2 }}>
                                            {((userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Admin)) && <Fab size='small' color='primary' aria-label='add' onClick={(event) => onManpowerLevel(values.manpower_level, values.level_sequence)}
                                                disabled={(values.manpower_level && ((userRole === RoutePermittedRole.Business) || userRole === RoutePermittedRole.Admin)) ? false : true}>
                                                <AddIcon />
                                            </Fab>}
                                        </Grid>
                                        {/* Iteration For the Edit Requirement */}
                                        <Grid item xs={6} md={1} sx={{ marginBottom: 2 }}>
                                            {(action && action === 'update') && <Fab size='small' color='primary' aria-label='visibility' onClick={setIterationAction(true)} >
                                                <VisibilityIcon />
                                            </Fab>}
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >

                                    <Grid item xs={12} md={12}>
                                        <Accordion sx={{ backgroundColor: "#f5f5f5", marginTop: 4 }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls='panel1a-content'
                                                id='panel1a-header'
                                            >
                                                <Typography variant={'h6'} sx={{}}>Manpower Requirements</Typography>
                                                {(values.isCalculating) && <AppLoader />}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FieldArray
                                                    name="manpower_requirements"
                                                    render={requirementListHelpers => (
                                                        <Box className="autoscroll">
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label='simple table'>
                                                                    <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>Level</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>Total</TableCell>
                                                                            {(values.manpower_requirements[0].properties && values.manpower_requirements[0].properties.length !== 0) && values.manpower_requirements[0].properties.map((property, index) => (
                                                                                <TableCell key={index} sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>
                                                                                    <span style={{ display: 'inline-flex' }}>{property?.property_name}
                                                                                        {(userRole !== RoutePermittedRole.Finance) && <RemoveCircleOutlineIcon fontSize='small' sx={{ ml: 4, cursor: 'pointer' }} onClick={(event) => onLevelDynamicalRemove(property, 'manpower')} />}
                                                                                    </span>
                                                                                </TableCell>
                                                                            ))}

                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {values.manpower_requirements.length && values.manpower_requirements.map((requirement, index) => (
                                                                            <TableRow
                                                                                key={index}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                {(index === 1) ? <TableCell colSpan={2} component='th' scope='row'>
                                                                                    {requirement.level}
                                                                                </TableCell> : <TableCell component='th' scope='row'>
                                                                                    {requirement.level}
                                                                                </TableCell>}
                                                                                {(index !== 1) && <TableCell component='th' scope='row'>
                                                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                                                        <Input id={`manpower_requirements[${index}].total`}
                                                                                            name={`manpower_requirements[${index}].total`}
                                                                                            value={requirement.total} onChange={handleChange} type="number" disabled />
                                                                                    </FormControl></TableCell>}

                                                                                <FieldArray
                                                                                    name="properties"
                                                                                    render={propertyListHelpers => (
                                                                                        <React.Fragment>
                                                                                            {(values.manpower_requirements[index].properties && values.manpower_requirements[index].properties.length !== 0) && values.manpower_requirements[index].properties.map((property, propertyIndex) => (
                                                                                                <React.Fragment key={propertyIndex}>

                                                                                                    {(index === 2) ?
                                                                                                        <TableCell>
                                                                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                                <Input id={`manpower_requirements[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    name={`manpower_requirements[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    value={property.property_value} onChange={handleChange} type="number" disabled />
                                                                                                            </FormControl>
                                                                                                        </TableCell> :
                                                                                                        (index === 1) ? <TableCell>
                                                                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                                <Input id={`manpower_requirements[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    name={`manpower_requirements[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    value={property.property_value} type="number"
                                                                                                                    onChange={(data) => onManPowerRequirementSet(index, propertyIndex, data)}
                                                                                                                    disabled={(userRole === RoutePermittedRole.HR) ? false : true}
                                                                                                                />
                                                                                                            </FormControl>
                                                                                                        </TableCell> :
                                                                                                            <TableCell>
                                                                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                                    <Input id={`manpower_requirements[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                        name={`manpower_requirements[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                        value={property.property_value} type="number"
                                                                                                                        onChange={(data) => onManPowerRequirementSet(index, propertyIndex, data)}
                                                                                                                        disabled={((userRole === RoutePermittedRole.Business) || (userRole === RoutePermittedRole.Admin)) ? false : true}
                                                                                                                    />
                                                                                                                </FormControl>
                                                                                                            </TableCell>
                                                                                                    }

                                                                                                </React.Fragment>
                                                                                            ))}
                                                                                        </React.Fragment>

                                                                                    )} />

                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    )}
                                                />
                                            </AccordionDetails>
                                        </Accordion>

                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Accordion sx={{ backgroundColor: "#f5f5f5", marginTop: 4 }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls='panel1a-content'
                                                id='panel1a-header'
                                            >
                                                <Typography variant={'h6'}>Manpower Hiring Cost</Typography>
                                                {(values.isCalculating) && <AppLoader />}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FieldArray
                                                    name="manpower_hiringcost"
                                                    render={hiringListHelpers => (
                                                        <Box className="autoscroll">
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label='simple table'>
                                                                    <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                        <TableRow>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>Level</TableCell>
                                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>Total</TableCell>

                                                                            {(values.manpower_hiringcost.length) && values.manpower_hiringcost[0].properties.map((property, index) => (
                                                                                <TableCell key={index} sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>
                                                                                    {property.property_name}
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {values.manpower_hiringcost.map((requirement, index) => (
                                                                            <TableRow
                                                                                key={index}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                {(index === 1) ? <TableCell colSpan={2} component='th' scope='row'>
                                                                                    {requirement.level}
                                                                                </TableCell> : <TableCell component='th' scope='row'>
                                                                                    {requirement.level}
                                                                                </TableCell>}
                                                                                {(index === 0 || index === 3) ? <TableCell component='th' scope='row'>
                                                                                    <FormControl variant="standard" fullWidth margin='dense'>
                                                                                        <Input id={`manpower_hiringcost[${index}].total`}
                                                                                            name={`manpower_hiringcost[${index}].total`}
                                                                                            value={requirement.total} onChange={handleChange} type="number" disabled />
                                                                                    </FormControl></TableCell> : (index === 2) && <TableCell component='th' scope='row'>
                                                                                    </TableCell>}

                                                                                <FieldArray
                                                                                    name="properties"
                                                                                    render={propertyListHelpers => (
                                                                                        <React.Fragment>
                                                                                            {values.manpower_hiringcost[index].properties.map((property, propertyIndex) => (
                                                                                                <React.Fragment key={propertyIndex}>

                                                                                                    {(index === 0 || index === 3) ?
                                                                                                        <TableCell>
                                                                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                                <Input id={`manpower_hiringcost[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    name={`manpower_hiringcost[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    value={property.property_value} onChange={handleChange} type="number" disabled />
                                                                                                            </FormControl>
                                                                                                        </TableCell> :
                                                                                                        <TableCell>
                                                                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                                <Input id={`manpower_hiringcost[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    name={`manpower_hiringcost[${index}].properties[${propertyIndex}].property_value`}
                                                                                                                    value={property.property_value} onChange={(data) => onManPowerHiringCostSet(index, propertyIndex, data)} type="number"
                                                                                                                    disabled={(userRole === RoutePermittedRole.HR) ? false : true}
                                                                                                                />
                                                                                                            </FormControl>
                                                                                                        </TableCell>
                                                                                                    }

                                                                                                </React.Fragment>
                                                                                            ))}
                                                                                        </React.Fragment>

                                                                                    )} />

                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                    )}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid container direction="row" sx={{ marginBottom: 2 }}>
                                            <Grid item xs={12} md={8}>
                                                <Typography variant={'h5'} sx={{ marginTop: 6 }}>Rampup plan (monthly) -Table</Typography>
                                            </Grid>
                                            {(values.isRampCalculating) && <AppLoader />}
                                            <Grid item xs={12} md={4}>
                                                {(bizYearList.length !== 0) && <FormControl variant='standard' fullWidth margin='dense'>
                                                    <InputLabel id='business-year-list-label'>Choose Business Year</InputLabel>
                                                    <Select
                                                        labelId='business-year-list-label'
                                                        id='business-year-label-standard'
                                                        name="business_year"
                                                        value={bizYear}
                                                        onChange={item => onBusinessYearFilter(item)}
                                                        label='Business Year'
                                                    >
                                                        <MenuItem value=''><em>None</em></MenuItem>
                                                        {bizYearList.map((option) => (
                                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>}
                                            </Grid>
                                        </Grid>

                                        <FieldArray
                                            name="rampups"
                                            render={rampupsListHelpers => (
                                                <Box style={{ width: '100%' }} className="autoscroll">
                                                    <TableContainer component={Paper}>
                                                        <Table aria-label='simple table'>
                                                            <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                <TableRow>
                                                                    <TableCell sx={{
                                                                        color: 'white', fontWeight: 'bold', position: 'sticky', left: 0, backgroundColor: '#005384', minWidth: 150
                                                                    }}>Level</TableCell>
                                                                    <TableCell sx={{
                                                                        color: 'white', fontWeight: 'bold', minWidth: 150, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                                    }}>Total</TableCell>
                                                                    {(values.rampups.length) ? values.rampups[0].properties.map((rampupProperty, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {(bizYear && (rampupProperty.year === bizYear)) ? <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>{rampupProperty.property_name}</TableCell> : null}
                                                                        </React.Fragment>
                                                                    )) : null}

                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {values.rampups.map((rampup, index) => (
                                                                    <TableRow
                                                                        key={index}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                            {rampup.level}
                                                                        </TableCell>
                                                                        <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                                <Input id={`rampups[${index}].total`}
                                                                                    name={`rampups[${index}].total`}
                                                                                    value={rampup.total} onChange={handleChange} type="number" disabled />
                                                                            </FormControl>
                                                                        </TableCell>

                                                                        <FieldArray
                                                                            name="properties"
                                                                            render={propertyListHelpers => (
                                                                                <React.Fragment>
                                                                                    {values.rampups[index].properties.map((property, propertyIndex) => (
                                                                                        <React.Fragment key={propertyIndex}>
                                                                                            {(bizYear && (property.year === bizYear)) ? <TableCell>
                                                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                    <Input id={`rampups[${index}].properties[${propertyIndex}].property_value`}
                                                                                                        name={`rampups[${index}].properties[${propertyIndex}].property_value`}
                                                                                                        value={property.property_value} onChange={(data) => onRampUpCalculateValidation(index, propertyIndex, data)} type="number"
                                                                                                        disabled={((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) ? false : true} />
                                                                                                </FormControl>
                                                                                            </TableCell> : null}

                                                                                        </React.Fragment>

                                                                                    ))}
                                                                                </React.Fragment>

                                                                            )} />

                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Box>
                                            )}
                                        />
                                        {(userRole === RoutePermittedRole.HR) && <Grid item xs={12} md={12}>
                                            <Box sx={{ display: 'inline-flex' }}>
                                                <FormGroup>
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            name={`is_agree`}
                                                            checked={(values?.is_agree) ? values.is_agree : false}
                                                            onChange={(event) => {
                                                                setFieldValue(`is_agree`, event.target.checked)
                                                            }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{}}
                                                        />
                                                    } label='Please check and agree to confirm the Rampup plan' />
                                                </FormGroup>
                                            </Box>
                                        </Grid>}
                                    </Grid>
                                    {(userRole === RoutePermittedRole.HR) && <Grid item xs={12} md={12}>
                                        <Grid container direction="row" sx={{ marginBottom: 2 }}>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant={'h5'} sx={{ marginTop: 6 }}>HR Proposals (monthly)</Typography>
                                            </Grid>
                                            {(values.isRampCalculating) && <AppLoader />}
                                        </Grid>

                                        <FieldArray
                                            name="hr_rampups"
                                            render={hrRampupsListHelpers => (
                                                <Box style={{ width: '100%' }}>
                                                    <TableContainer component={Paper}>
                                                        <Table aria-label='simple table'>
                                                            <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                                <TableRow>
                                                                    <TableCell sx={{
                                                                        color: 'white', fontWeight: 'bold', position: 'sticky', left: 0, backgroundColor: '#005384', minWidth: 120
                                                                    }}>Level</TableCell>
                                                                    <TableCell sx={{
                                                                        color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                                    }}>Total</TableCell>
                                                                    {(values.hr_rampups.length) ? values.hr_rampups[0].properties.map((hrRampupProperty, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {(bizYear && (hrRampupProperty.year === bizYear)) ? <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>{hrRampupProperty.property_name}</TableCell> : null}
                                                                        </React.Fragment>
                                                                    )) : null}

                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {values.hr_rampups.map((hrRampup, index) => (
                                                                    <TableRow
                                                                        key={index}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                            {hrRampup.level}
                                                                        </TableCell>
                                                                        <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                                                <Input id={`hr_rampups[${index}].total`}
                                                                                    name={`hr_rampups[${index}].total`}
                                                                                    value={hrRampup.total} onChange={handleChange} type="number" disabled />
                                                                            </FormControl>
                                                                        </TableCell>

                                                                        <FieldArray
                                                                            name="properties"
                                                                            render={propertyListHelpers => (
                                                                                <React.Fragment>
                                                                                    {values.hr_rampups[index].properties.map((property, propertyIndex) => (
                                                                                        <React.Fragment key={propertyIndex}>
                                                                                            {(bizYear && (property.year === bizYear)) ? <TableCell>
                                                                                                <FormControl variant="standard" fullWidth margin='dense'>
                                                                                                    <Input id={`hr_rampups[${index}].properties[${propertyIndex}].property_value`}
                                                                                                        name={`hr_rampups[${index}].properties[${propertyIndex}].property_value`}
                                                                                                        value={property.property_value} onChange={(data) => onHRRampUpCalculation(index, propertyIndex, data)} type="number" inputProps={{pattern: formValidationPatten.onlynumber}} disabled={!!values.is_agree}/>
                                                                                                </FormControl>
                                                                                            </TableCell> : null}

                                                                                        </React.Fragment>

                                                                                    ))}
                                                                                </React.Fragment>

                                                                            )} />

                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Box>
                                            )}
                                        />
                                    </Grid>}
                                </Grid>
                                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                                    <Grid container spacing={{ xs: 2, md: 8 }} direction="row" justifyContent={'flex-end'} alignContent={'flex-end'}>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant='standard' fullWidth margin='dense'>
                                                <InputLabel id='manpower-contact-person-list-label'>Contact Person</InputLabel>
                                                <Select
                                                    labelId='manpower-contact-person-list-label'
                                                    id='manpower-contact-person-list-label-standard'
                                                    name="hr_contact_person"
                                                    value={values.hr_contact_person}
                                                    onChange={handleChange}
                                                    label='Contact Person'
                                                    defaultValue=''
                                                >
                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                    {(hrUserList.length) && hrUserList.map((option, optionIndex) => (
                                                        <MenuItem key={optionIndex} value={option.emp_name}>{option.shortid}-{option.emp_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>}
                                {(userRole !== RoutePermittedRole.Finance) && <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                        color="primary" onClick={(event) => onSaveAndNotifyInfo('HR')} disabled={!values.hr_contact_person}>Save &amp; Notify </Button>
                                </Box>}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>}

        </>
    );
};

export default ManpowerRequirementsForm;

