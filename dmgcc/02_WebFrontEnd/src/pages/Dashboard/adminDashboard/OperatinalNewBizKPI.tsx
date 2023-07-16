import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ActiveSLABilled from './ActiveSLABilled';
import { useThemeContext } from '@crema/utility/AppContextProvider/ThemeContextProvider';
import RenderActiveShape from '@crema/commonservices/RenderActiveShape';

const OperatinalNewBizKPI = (props?:any) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const onPieEnter = (data, index) => {
        setActiveIndex(index)
    };
    const { theme } = useThemeContext();
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12}>
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
                Operational & New Biz. KPI
            </Typography>
            </Grid>
       
            <Grid item xs={12} sm={6} md={5}>
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
                            }}>Manpower Utilization</Typography>
                 
                 <ResponsiveContainer width='100%' height={300}>
                            <PieChart>
                                <Pie
                                    dataKey='count'
                                    activeIndex={activeIndex}
                                    activeShape={RenderActiveShape}
                                    onMouseEnter={onPieEnter}
                                    data={props.data?props.data.manpower_utilization:[]}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill='#8884d8'
                                >
                                    {
                                        props.data.manpower_utilization.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
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
                            }}>Invoice Status (Number of Invoices)​</Typography>
                            {
                                props.data?
                                <ResponsiveContainer width='100%' height={300}>
                                <BarChart data={props.data.invoice_status} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                                    {
                                        props.data.invoice_status.map((entry, index) => {
                                            return(
                                            <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                        )})
                                    }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                                :null
                            }
         
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card variant='outlined'>
                    <CardContent>
                    <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 3, marginBottom: 3 }} >
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
                            }}>Current SLA Status</Typography>
                          
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 3, marginBottom: 3 }} >
                        {
                            props.data?
                            <ActiveSLABilled data={props.data}/>                            
                            :null
                        }
                    </Grid> 
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )
}

export default OperatinalNewBizKPI;