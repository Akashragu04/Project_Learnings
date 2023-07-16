import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AboutUsDetails = (props: any) => {
  return (
    <React.Fragment>
      <div className="container-xxl py-2">
        <div className="container">
          <Box>
            <Box sx={{ padding: 2, marginBottom: 1 }}>
              {
                props.resAboutViewData ?
                  props.resAboutViewData.description
                  : null
              }
            </Box>
            <Grid container spacing={2}>

              <Grid item xs={12} md={12}>
                <Box sx={{ width: '100%', padding: 2 }}>
                  {/* <img src={'.../../../img/about_us.jpg'} alt='' style={{
                    width: '100%', border: '1px solid #cccccc',
                    borderRadius: 10, boxShadow: '0px 0px 5px 2px #ccc'
                  }} /> */}
                  <img src={props.resAboutViewData && props.resAboutViewData.supporting_file ? props.resAboutViewData.supporting_file.supporting_files_url : '.../../../img/about_us.jpg'} alt='' style={{
                    width: '100%', border: '1px solid #cccccc',
                    borderRadius: 10, boxShadow: '0px 0px 5px 2px #ccc'
                  }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ padding: 2 }}>
                  <ul>
                    {
                      props.resAboutViewData && props.resAboutViewData.sub_content ?
                        props.resAboutViewData.sub_content.map((items: any, index?: any) => (
                          <li key={index}>{items.content}</li>
                        )) : null}
                  </ul>
                </Box>

              </Grid>
              <Grid item xs={12} md={6} sx={{ marginTop: 2, marginBottom: 2 }}>
                <Card sx={{ boxShadow: '0px 0px 5px 1px #ccc' }}>
                  <CardContent>
                    <Timeline position="alternate">
                      {
                        props.resAboutViewData && props.resAboutViewData.sub_list ?
                          props.resAboutViewData.sub_list.map((items: any, index?: any) => (
                            <TimelineItem key={index}>
                              <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                              >
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} component="span">
                                  {items.year}
                                </Typography>
                              </TimelineOppositeContent>
                              <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot color="primary">
                                  <CalendarMonthIcon />
                                </TimelineDot>
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent sx={{ py: '12px', px: 2, fontFamily:'Daimler CAC' }}>
                                {/* <Typography variant="h6" component="span">
                          Eat
                        </Typography> */}
                                <Typography sx={{ marginTop: 1,  fontFamily: 'Daimler CAC' }}>{items.content}</Typography>
                              </TimelineContent>
                            </TimelineItem>
                          ))
                          : null
                      }

                    </Timeline>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
            <Box>

            </Box>

          </Box>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AboutUsDetails;