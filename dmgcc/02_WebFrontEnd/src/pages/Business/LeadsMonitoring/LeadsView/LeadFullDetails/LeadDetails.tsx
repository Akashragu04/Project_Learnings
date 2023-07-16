import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const LeadDetails = (props?: any) => {
  const downloadFile = (getURL?: any) => {
    window.open(getURL, '_blank')
  }
  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Box >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }}>
                <Typography sx={{ flex: 1 }} variant='h4' component='div'>Request Date </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              : {props.getLeadDetails.request_date}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'> Service Receiver Contact Name</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_receiver_contact_name}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>  Service Receiver Email ID</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_receiver_email_id}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>  Service Receiver Entity</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_receiver_entity}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>  Project Name</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.project_name}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>Service Provider Short Id</Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_provider_short_id}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>  Service Provider Contact Name</Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_provider_contact_name}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>  Service Provider Email ID</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_provider_email_id}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ flex: 1 }} variant='h4' component='div'>  Service Provider Department</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              :  {props.getLeadDetails.service_provider_department}
            </Grid>
            <Grid container spacing={3} sx={{ marginTop: 2, paddingLeft: 2 }}>
              <Grid item xs={12}>
                <Typography sx={{ flex: 1 }} variant='h4' component='div'>Supporting Files</Typography>
              </Grid>
              {props.getLeadDetails.supporting_files ?
                props.getLeadDetails.supporting_files.map((items: any, index: any) => (
                  <Grid item xs={3} md={1} key={index}>
                    <Link to={'#'} target="_blank" onClick={() => downloadFile(items.supporting_files_url)}>
                      <SystemUpdateAltIcon sx={{ fontSize: 35 }} />
                    </Link>
                  </Grid>
                ))
                : <Typography sx={{ flex: 1 }} variant='h5' component='div'>No Data</Typography>}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={3}>
      </Grid>

    </Grid>
  )
}

export default LeadDetails;