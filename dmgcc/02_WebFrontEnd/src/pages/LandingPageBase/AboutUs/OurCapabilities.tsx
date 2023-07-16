import { Box, Grid } from '@mui/material';
import React from 'react'

const OurCapabilities = (props: any) => {
  return (
    <React.Fragment>
      {/* <!-- Service Start --> */}
      <section>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center mx-auto mb-2 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
              {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Contacts</div> */}
              <h3 className="mb-2">Our Capabilities</h3>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box sx={{ padding: 2 }}>
                <img src={'/img/about_us.jpg'} alt="" style={{width:'100%', border:'2px solid #ccc', borderRadius:10}}/>
                </Box>
              </Grid>

            </Grid>
            <div className="row g-4 mt-1 justify-content-center">
              {
                props.resCapabilitiesData && props.resCapabilitiesData.length ?
                props.resCapabilitiesData.map((items: any, index: any) => (
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                      <div className="causes-item d-flex flex-column bg-light border-top border-5 border-primary rounded-top overflow-hidden h-100">
                        <div className="text-center">
                          <h5 className="mb-1 p-1">{items.title}</h5>
                          <p className="mb-1 p-1">{items.description}</p>
                        </div>
                        <div className="position-relative mt-auto">
                          <img className="img-fluid" src={items.supporting_files?items.supporting_files.supporting_files_url:"../img/unpost.png"} alt="" />
                        </div>
                      </div>
                    </div>
                  ))
                  : null
              }

            </div>


          </div>
        </div>
      </section>

      {/* <!-- Service End --> */}
    </React.Fragment>
  )
}

export default OurCapabilities;
