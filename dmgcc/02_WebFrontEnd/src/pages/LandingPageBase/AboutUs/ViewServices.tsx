import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const ViewServices = (props:any) => {
  return (
    <React.Fragment>
    {/* <!-- Service Start --> */}
    <section className="sectionBg">
    <div className="container-xxl py-5">
 <div className="container">
     <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px;"}}>
         {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Contacts</div> */}
         <h3 className="mb-5">Services</h3>
     </div>
     <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                         {props.resServicesData?props.resServicesData.title:''}
                        </Typography>
                        <Box sx={{ padding: 2 }}>
                        {props.resServicesData?props.resServicesData.description:''}
                        </Box>
              </Grid>

              </Grid>
                 <div className="row g-4 mt-1 justify-content-center">
                   {
                     props.getSubContent?
                     props.getSubContent.map((items:any, index:any)=>(
                      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                      <div className="causes-item d-flex flex-column bg-light border-top border-5 border-primary rounded-top overflow-hidden h-100">
                          <div className="text-center">                            
                              <h5 className="mb-1 p-2">{items.title}</h5>                          
                          </div>
                          <div className="position-relative mt-auto">
                              <img className="img-fluid" src={items.supporting_files?items.supporting_files.supporting_files_url
:'../img/unpost.png'} alt=""/>
                          </div>
                      </div>
                  </div>
                     ))
                     :null
                   }
             
            </div>


 </div>
</div>
    </section>

{/* <!-- Service End --> */}
</React.Fragment>
  )
}

export default ViewServices;
