import { Box, Typography } from '@mui/material';
import React from 'react'

const ProductEngineering = (props:any) => {
  return (
    <React.Fragment>
      {/* <!-- Service Start --> */}
      <section>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
              {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Contacts</div> */}
              <h3 className="mb-5"> Product Engineering (R & D)</h3>
            </div>
            <Box>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
                {props.getMainContent ? props.getMainContent.title : '-'}
              </Typography>
              <Box sx={{ padding: 2 }}>

                {props.getMainContent ? props.getMainContent.description : '-'}
              </Box>
            </Box>
            <div className="row g-4 justify-content-center">
              {
                props.getSubContent ?
                  props.getSubContent.map((items: any, index?: any) => (
                    <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                      <div className="service-item bg-white h-100 p-4 p-xl-5">
                        <h4 className="mb-1">{items.title}</h4>
                        <ul>
                          {
                            items ?
                              items.sub_list.map((subItems: any, i?: any) => (
                                <li key={i}>{subItems.content}</li>
                              ))
                              : null
                          }
                        </ul>
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

export default ProductEngineering;
