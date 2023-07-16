import { Box, Typography } from '@mui/material';
import React from 'react'

const InformationTechnology = (props:any) => {
  return (
    <React.Fragment>
    <section>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-3 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
            {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Supplier Management</div> */}
            <h1 className="display-6 mb-5">Information Technology</h1>
          </div>
          <Box>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              {props.getMainContent ? props.getMainContent.title : ''}
            </Typography>
            <Box sx={{ padding: 2 }}>
              {props.getMainContent ? props.getMainContent.description : ''}
            </Box>
          </Box>
          <Box sx={{ padding: 2 }}>
            <ul>
              {
                props.getMainContent && props.getMainContent.sub_list ?
                props.getMainContent.sub_list.map((items: any, index?: any) => (
                    <li key={index}>{items.content}</li>
                  ))
                  : null
              }
            </ul>
          </Box>
        </div>
      </div>
    </section>
  </React.Fragment>
  )
}

export default InformationTechnology;
