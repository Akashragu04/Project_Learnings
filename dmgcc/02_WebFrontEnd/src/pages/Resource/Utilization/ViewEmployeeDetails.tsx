import React from 'react'
import { Grid } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import AppTableContainer from "@crema/core/AppTableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import UtilizationHeader from './UtilizationHeader';
import UtilizationItems from './UtilizationItems';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { pdata, data, COLORS } from './Types';

const ViewEmployeeDetails = (props?: any) => {

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <Dialog
            fullScreen
            open={props.showEmployeeDetails}
            onClose={props.handleEmployeeDetailsClose}
        // TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                        Utilization
                    </Typography>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={props.handleEmployeeDetailsClose}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 8 }}>
                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ ml: 2, flex: 1, marginBottom: 5 }} variant='h4' component='div'>
                            Current utilization
                        </Typography>
                        <AppTableContainer>
                            <Table className="table" sx={{ border: '1px solid #ccc' }}>
                                <TableHead>
                                    <UtilizationHeader />
                                </TableHead>
                                <TableBody>
                                    {
                                        props.UtilizationData.current_projects ?
                                            props.UtilizationData.current_projects.map((items: any, index: any) => (
                                                <UtilizationItems data={items} key={index} />
                                            ))

                                            : null
                                    }
                                </TableBody>
                            </Table>
                        </AppTableContainer>
                    </Grid>
                </Grid>
            </Box>
            
            <Box sx={{ padding: 8 }}>
                <Grid container spacing={3} sx={{ marginTop: 2 }}>

                    <Grid item xs={12}>
                        <Typography sx={{ ml: 2, flex: 1, marginBottom: 5 }} variant='h4' component='div'>
                            YTD utilization
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart data={pdata} >
                                <CartesianGrid />
                                <XAxis dataKey="name"
                                    interval={'preserveStartEnd'} />
                                 <YAxis 
                             tickFormatter={(value) =>
                                new Intl.NumberFormat("en-US", {
                                  notation: "compact",
                                  compactDisplay: "short",
                                }).format(value)
                              }
                            />
                                <Legend />
                                <Tooltip />
                                <Line dataKey="YTD"
                                    stroke="black" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={3}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>

            </Box>
        </Dialog>
    )
}

export default ViewEmployeeDetails;