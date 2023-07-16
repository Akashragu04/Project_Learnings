import React from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { resourceRecordList } from '../Types';
import GridResourceRecord from './GridResourceRecord';
import { Grid, TableBody, TableHead, Table, Box, Typography, Switch } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";
import SkillTableHeader from './SkillTable/SkillTableHeader';
import SkillTableItems from './SkillTable/SkillTableItems';

const ViewResourceDetails = (props?: any) => {
  return (
    <Dialog
      fullScreen
      open={props.showResourceDetails}
      onClose={props.handleResourceClose}
    // TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
            HR Id: {props.resourceInfo ? props.resourceInfo.user.hrid : null}
          </Typography>
          <IconButton
            edge='start'
            color='inherit'
            onClick={props.handleResourceClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding: 5 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="HR Id" variant="outlined" value={props.resourceInfo.hrid && props.resourceInfo.user.hrid !== null ? props.resourceInfo.user.hrid : ''} fullWidth disabled />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="Employee Name" variant="outlined" value={props.resourceInfo ? props.resourceInfo.user.emp_name : ''} fullWidth disabled />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={props.resourceInfo ? props.resourceInfo.user.email : ''} fullWidth disabled />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="Job Category" variant="outlined" value={props.resourceInfo ? props.resourceInfo.user.category : ''} fullWidth disabled />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="DOJ" variant="outlined" value={props.resourceInfo ? props.resourceInfo.user.date_of_join : ''} fullWidth disabled />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="Employee Type" variant="outlined" value={props.resourceInfo && props.resourceInfo.user ? props.resourceInfo.user.employee_type : ''} fullWidth disabled />
          </Box>
        </Grid>

        <Grid item xs={10}>          
          <Typography sx={{ ml: 2, flex: 1, marginTop: 5, marginBottom: 2 }} variant='h5' component='div'>
            Primary Skills:
          </Typography>
          <Box sx={{ marginLeft: 2 }}>
            {props.resourceInfo.user.skills ? props.resourceInfo.user.skills.primaryskill : '-'}
          </Box>

        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ ml: 2, flex: 1, marginBottom: 1 }} variant='h5' component='div'>
            Under Project   <Switch disabled
              checked={props.resourceInfo.under_project ? props.resourceInfo.under_project : false}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Typography>

        </Grid>
        <Grid item xs={10}>
          
        </Grid>
        <Grid item xs={2}>
        <Typography sx={{ ml: 2, flex: 1, marginBottom: 2 }} variant='h5' component='div'>
            Project Status:
          </Typography>
          <Box sx={{marginLeft: 2}}>
          {props.resourceInfo.user.skills && props.resourceInfo.user.skills.bench_resource ? 'Bench Resource' : 'On Board'}
          </Box>
        </Grid>
        <Grid item xs={12}>
        <Typography sx={{ ml: 2, flex: 1, marginBottom: 2 }} variant='h5' component='div'>
            secondary Skills:
          </Typography>
          {resourceRecordList ?
            <AppTableContainer>
              <Table className="table" sx={{ border: '1px solid #ccc' }}>
                <TableHead>
                  {
                    props.resourceInfo ?
                      <SkillTableHeader />
                      : null
                  }
                </TableHead>
                <TableBody>
                  {
                    props.resourceInfo.user.skills &&
                    <React.Fragment>
                      {
                        (props.resourceInfo.user.skills.secondary && props.resourceInfo.user.skills.secondary.length) && props.resourceInfo.user.skills.secondary.map((data: any, i: any) => {
                          return (
                            <SkillTableItems data={data} indexValues={i} key={i} />
                          )
                        })
                      }
                    </React.Fragment>
                  }
                </TableBody>
              </Table>
            </AppTableContainer>
            : null}

        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ ml: 2, flex: 1, marginTop: 5 }} variant='h4' component='div'>
            Projects Mapped
          </Typography>
          {props.resourceInfo.sla_reports && props.resourceInfo.sla_reports !== null ?
            <GridResourceRecord resourceRecordList={props.resourceInfo.sla_reports} />
            : null}

        </Grid>

      </Grid>

    </Dialog>
  )
}

export default ViewResourceDetails;
