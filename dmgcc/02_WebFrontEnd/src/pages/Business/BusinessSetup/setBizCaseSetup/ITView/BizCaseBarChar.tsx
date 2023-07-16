import { AppGridContainer } from '@crema';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useThemeContext } from '@crema/utility/AppContextProvider/ThemeContextProvider';
import RenderLegend from '@crema/commonservices/RenderLegend';
import RecruitmentStatus from '../BizCaseSetupChart/RecruitmentStatus';

export const BizCaseBarChar = (props?: any) => {
    const { theme } = useThemeContext();
    return (
        <React.Fragment>
            {
                props.data && props.data.plan_acutal_report && props.data.mtd_plan_actual_report?
            <AppGridContainer>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginBottom: 3
                                }}>Plan Vs Actual</Typography>
                                {
                                    props.data && props.data.plan_acutal_report?
                                    <React.Fragment>
                                    <ResponsiveContainer width='100%' height={270}>
                                    <BarChart data={props.data && props.data.plan_acutal_report ? props.data.plan_acutal_report : []} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                        <XAxis dataKey='conversion_name' />
                                        <YAxis 
                             tickFormatter={(value) =>
                                new Intl.NumberFormat("en-US", {
                                  notation: "compact",
                                  compactDisplay: "short",
                                }).format(value)
                              }
                            />
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <Tooltip />
                                        {/* <Legend content={RenderLegend} /> */}
                                        <Bar dataKey='count' barSize={75} fill={theme.palette.primary.main}>
                                            {props.data && props.data.plan_acutal_report ?
                                                props.data.plan_acutal_report.map((entry, index) => {
                                                    return (
                                                        <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                                    )
                                                }) : null
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                <Box sx={{ marginTop: 2 }}>Backlog​</Box>
                                <Box sx={{ marginLeft: 3, background: '#f04f47', padding: "5px", borderRadius: "50px", width: "30px", height: "30px", textAlign: "center", color: "#fff" }}>{props.data ? props.data.plan_acutal_backlog : 0}</Box>
                            </Box>
                                </React.Fragment>
                                    :<Box>No Data</Box>
                                }
                          
                            
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginBottom: 3
                                }}>Recruitment Status</Typography>

                            <RecruitmentStatus data={props.data && props.data.recruitment_status ? props.data.recruitment_status : []} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginBottom: 3
                                }}>YTD Plan Vs Actual</Typography>
                                {
                                props.data && props.data.mtd_plan_actual_report?
                                <ResponsiveContainer width='100%' height={300}>
                                <LineChart data={props.data && props.data.mtd_plan_actual_report ? props.data.mtd_plan_actual_report : []}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis 
                             tickFormatter={(value) =>
                                new Intl.NumberFormat("en-US", {
                                  notation: "compact",
                                  compactDisplay: "short",
                                }).format(value)
                              }
                            />
                                    <Tooltip />
                                    <Legend content={RenderLegend} />
                                    <Line type="monotone" dataKey="plan" stroke="#000000" />
                                    <Line type="monotone" dataKey="actual" stroke="#06a1c5" />
                                </LineChart>
                            </ResponsiveContainer>
                                :<Box>No Data</Box>}
                           
                        </CardContent>
                    </Card>
                </Grid>
            </AppGridContainer>                
                :null
            }
        </React.Fragment>
    )
}
