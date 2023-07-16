import { Box, Typography } from '@mui/material';
import React from 'react'

const QualityManagement = (props:any) => {
  return (
    <React.Fragment>
    <section>
    <div className="container-xxl py-5">
    <div className="container">
        <div className="text-center mx-auto mb-3 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px;"}}>
            {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Supplier Management</div> */}
            <h3 className="mb-5">Quality Management</h3>
        </div>
        <Box>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
                       {props.getMainContent?props.getMainContent.title:null}
                    </Typography>
                    <Box sx={{padding:2}}>
                    {props.getMainContent?props.getMainContent.description:null}
                    </Box>
        </Box>
        <div className="row g-4 justify-content-center">
                {
                    props.getSubContent && props.getSubContent.length?
                    props.getSubContent.map((items:any, index?:any)=>(
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                        <div className="service-item bg-white h-100 p-4 p-xl-5">
                            <h4 className="mb-1">{items.title}</h4>
                            <ul>
                            {
                                items && items.sub_list?
                                items.sub_list.map((item:any, i:any)=>(
                                    <li className="mb-2" key={i}>{item.content}</li>
                                ))
                                :null
                            }
                            </ul>
                          
                        </div>
                    </div>
                    ))
                    :null
                }               
            </div>
    </div>
</div>
    </section>
       
</React.Fragment>
  )
}

export default QualityManagement;
