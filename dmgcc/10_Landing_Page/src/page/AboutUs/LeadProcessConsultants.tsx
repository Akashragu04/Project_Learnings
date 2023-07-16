import { Box, Typography } from '@mui/material';
import React from 'react'

const LeadProcessConsultants = (props: any) => {
    return (
        <React.Fragment>
            <section className="sectionBg">
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-3 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
                        {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Supplier Management</div> */}
                        <h1 className="display-6 mb-5">Lean/ Process Consultants (CI Connect HUB India)</h1>
                    </div>
                    <Box>
                        {
                            props.getMainContent ?
                                <React.Fragment>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
                                        {props.getMainContent.title}
                                    </Typography>
                                    <Box sx={{ padding: 2 }}>
                                        {props.getMainContent.description}
                                    </Box>
                                </React.Fragment>
                                : null}
                    </Box>
                    <div className="row g-4 justify-content-center">
                        {
                            props.getSubContent && props.getSubContent ?
                                props.getSubContent.map((items: any, index?: any) => (
                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                                        <div className="service-item bg-white text-left h-100 p-4 p-xl-5">
                                            <h4 className="mb-1">{items.title}</h4>
                                            <ul>
                                                {items && items.sub_list?
                                                    items.sub_list.map((subItems: any, subIndex: any) => (
                                                        <li className="mb-2" key={subIndex}>{subItems.content}</li>
                                                    ))
                                                    :null
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
        </React.Fragment>
    )
}

export default LeadProcessConsultants;
