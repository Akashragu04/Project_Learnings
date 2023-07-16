import { AppCard } from '@crema';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ManagementKPI = ({ data }) => {
    return (
        <React.Fragment>
            <Grid item xs={12} sm={6} md={3}>
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
                            <img src={"/assets/images/dashboard/1_revenue_icon.svg"} style={{width:75}} alt="icon" />
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 70px)",
                            }}
                        >
                            <Typography
                                component="h4"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                               <Box sx={{display:'flex'}}>
                               <CurrencyRupeeIcon sx={{fontSize:24, marginTop:1}}/>    {data.revenue_count}
                               </Box>
                            
                            </Typography>
                            {/* <Box>{data.revenue_count_inr}</Box> */}
                            <Box
                               component="h5"
                                sx={{
                                    pt: 0.5,
                                    fontSize: 16,
                                    color: "text.secondary",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >                              
                              {'Revenue'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
                            <img src={"/assets/images/dashboard/1_monthly_sales.svg"} style={{width:75}} alt="icon" />
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 70px)",
                            }}
                        >
                                <Typography
                                component="h4"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                    <Box sx={{display:'flex'}}>
                               <CurrencyRupeeIcon sx={{fontSize:24, marginTop:1}}/>    {data.expense_count}
                               </Box>
                                
                            </Typography>
                            <Box
                                component="h5"
                                sx={{
                                    pt: 0.5,
                                    fontSize: 16,
                                    color: "text.secondary",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >                              
                              {'Expense'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
                            <img src={"/assets/images/dashboard/icon-available-staff.svg"} style={{width:75}} alt="icon" />
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 70px)",
                            }}
                        >
                            
                            <Typography
                                component="h4"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >
                                      <Box sx={{display:'flex'}}>
                               <CurrencyRupeeIcon sx={{fontSize:24, marginTop:1}}/>    {data.ebit_count}
                               </Box>
                                
                                {/* {data.ebit_count} */}
                            </Typography>
                            {/* <Box>{data.ebit_count_inr}</Box> */}
                            <Box
                                component="h5"
                                sx={{
                                    pt: 0.5, 
                                    fontSize: 16,
                                    color: "text.secondary",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                }}
                            >                              
                              {'EBIT'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
            </Grid>
        </React.Fragment>
    )
}

export default ManagementKPI;