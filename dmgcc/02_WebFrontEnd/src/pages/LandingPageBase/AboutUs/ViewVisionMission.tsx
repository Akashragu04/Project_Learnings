import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react'

const ViewVisionMission = (props:any) => {
  
  return (
    <React.Fragment>
      {/* <!-- Service Start --> */}
      <section >
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
              {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Contacts</div> */}
              <h3 className="mb-5">Vision & Mission</h3>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {
                  props.resMissionVisionData && props.resMissionVisionData.length?
                  props.resMissionVisionData.map((items:any, index?:any)=>(
                    <Card sx={{ display: 'flex' }} key={index}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                        {items.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {items.description}
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 200, height:200 }}
                      image={items.supporting_files?items.supporting_files.supporting_files_url:"/img/vision.png"}
                      alt="Live from space album cover"
                    />
                  </Card>
                  )):null
                }
             
              </Grid>
              <Grid item xs={12} md={6} >
              {
                  props.resVisionDetails && props.resVisionDetails.length?
                  props.resVisionDetails.map((items:any, index?:any)=>(
                    <Card sx={{ display: 'flex' }} key={index}>
                    <CardMedia
                      component="img"
                      sx={{ width: 200, height:200 }}
                      image={items.supporting_files?items.supporting_files.supporting_files_url:"/img/mission.png"}
                      alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                        {items.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{paddingTop:2, paddingBottom:2}} component="div">
                        {items.description}
                        </Typography>
                      </CardContent>
                    </Box>
  
                  </Card>
                    ))                 
                  :null
                }
              
              </Grid>

            </Grid>
          </div>
        </div>
      </section>

      {/* <!-- Service End --> */}
    </React.Fragment>
  )
}

export default ViewVisionMission;