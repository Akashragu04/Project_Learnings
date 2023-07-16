import RenderLegend from '@crema/commonservices/RenderLegend'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const ManagementReport = (props:any) => {
    return (
        <React.Fragment>
             <Grid item xs={12} sm={6} md={4}>
             <Card variant='outlined'>
                <CardContent>
                <Typography    component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginBottom:3
                                }}>Revenue​  Trend</Typography>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart data={props.data ? props.data.revenue_report : []}
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
                </CardContent>
            </Card>
             </Grid>
             <Grid item xs={12} sm={6} md={4}>
             <Card variant='outlined'>
                <CardContent>
                <Typography    component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginBottom:3
                                }}>Expense Trend</Typography>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart data={props.data ? props.data.expense_report : []}
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
                </CardContent>
            </Card>
             </Grid>
             <Grid item xs={12} sm={6} md={4}>
             <Card variant='outlined'>
                <CardContent>
                <Typography    component="h5"
                                variant="inherit"
                                color="inherit"
                                sx={{
                                    fontSize: 16,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginBottom:3
                                }}>EBIT Trend</Typography>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart data={props.data ? props.data.ebit_report : []}
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
                </CardContent>
            </Card>
             </Grid>
        </React.Fragment>
    )
}

export default ManagementReport;