import { Box, Typography } from '@mui/material';
import React from 'react'

const ManufacturingEngineering = (props:any) => {
  return (
    <React.Fragment>
      {/* <!-- Service Start --> */}
      <section className="sectionBg">
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
              {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Contacts</div> */}
              <h3 className="mb-5">Manufacturing Engineer</h3>
            </div>
            <Box>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
                            {props.getMainContent?props.getMainContent.title:'-'}
                        </Typography>
                        <Box sx={{padding:2}}>
                           
                        {props.getMainContent?props.getMainContent.description:'-'}
                        </Box>
            </Box>
            <div className="row g-4 justify-content-center">
                {
                    props.getSubContent?
                    props.getSubContent.map((items:any, index?:any)=>(
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                        <div className="service-item bg-white text-center h-100 p-4 p-xl-5">
                            <h4 className="mb-1">{items.title}</h4>
                            {
                              items && items.sub_list.map((item:any, i:any)=>(
                                <p className="mb-2" key={i}>{item.content}</p>
                              ))
                            }
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

export default ManufacturingEngineering;
