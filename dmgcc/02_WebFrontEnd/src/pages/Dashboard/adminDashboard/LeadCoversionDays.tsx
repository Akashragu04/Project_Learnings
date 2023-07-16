import { AppCard } from '@crema';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'

const LeadCoversionDays = (props?:any) => {
  return (
    <React.Fragment>      
         <Grid item xs={12} sm={6} md={4}>
         <AppCard
                    sxStyle={{
                        height: 1,
                        backgroundColor: "#fff",
                    }}
                    className="card-hover"
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                mr: 4,
                                alignSelf: "flex-start",
                            }}
                        >
                            {/* <img src={"/assets/images/dashboard/1_revenue_icon.svg"} alt="icon" /> */}
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 70px)",
                            }}
                        >
                            <Typography
                                component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {props.data ? props.data.leads_count : "0"}
                            </Typography>
                            <Box
                                component="p"
                                sx={{
                                    pt: 0.5,
                                    color: "text.secondary",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {'Leads'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
         </Grid>
         <Grid item xs={12} sm={6} md={4}>
         <AppCard
                    sxStyle={{
                        height: 1,
                        backgroundColor: "#fff",
                    }}
                    className="card-hover"
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                mr: 4,
                                alignSelf: "flex-start",
                            }}
                        >
                            {/* <img src={"/assets/images/dashboard/1_revenue_icon.svg"} alt="icon" /> */}
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 70px)",
                            }}
                        >
                            <Typography
                                component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {props.data ? props.data.biz_req_count : "0"}
                            </Typography>
                            <Box
                                component="p"
                                sx={{
                                    pt: 0.5,
                                    color: "text.secondary",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {'Business Requirement'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
             </Grid>
             <Grid item xs={12} sm={6} md={4}>
             <AppCard
                    sxStyle={{
                        height: 1,
                        backgroundColor: "#fff",
                    }}
                    className="card-hover"
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                mr: 4,
                                alignSelf: "flex-start",
                            }}
                        >
                            {/* <img src={"/assets/images/dashboard/1_revenue_icon.svg"} alt="icon" /> */}
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 70px)",
                            }}
                        >
                            <Typography
                                component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {props.data ? props.data.biz_req_count : "0"}
                            </Typography>
                            <Box
                                component="p"
                                sx={{
                                    pt: 0.5,
                                    color: "text.secondary",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                {'SLA App​'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
             </Grid>
        </React.Fragment>
  )
}

export default LeadCoversionDays;