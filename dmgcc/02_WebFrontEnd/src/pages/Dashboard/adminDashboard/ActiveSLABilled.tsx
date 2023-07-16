import { AppCard } from '@crema';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'

const ActiveSLABilled = (props?: any) => {
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 3, marginBottom: 1 }} >
                <AppCard
                    sxStyle={{
                        height: 1,
                        backgroundColor: "#fff"
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
                                {props.data ? props.data.active_sla_count : "0"}
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
                                    marginBottom:1,
                                    marginTop:2
                                }}
                            >
                                {'Active SLAs​'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 3, marginBottom: 1 }} >
                <AppCard
                    sxStyle={{
                        height: 1,
                        backgroundColor: "#fff"
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
                                {props.data ? props.data.billed : "0"}
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
                                    marginBottom:1,
                                    marginTop:2
                                }}
                            >
                                {'Billed​'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 3, marginBottom: 1 }} >
                <AppCard
                    sxStyle={{
                        height: 1,
                        backgroundColor: "#fff"
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
                                {props.data ? props.data.billable_hours : "0"}
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
                                    marginBottom:1,
                                    marginTop:2
                                }}
                            >
                                {'Billable hours​​'}
                            </Box>
                        </Box>
                    </Box>
                </AppCard>
            </Grid>
        </React.Fragment>
    )
}

export default ActiveSLABilled;