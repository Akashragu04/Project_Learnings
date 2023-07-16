import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { Box, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import LeadConTableHeading from './LeadConTableHeading';
import AppTableContainer from "@crema/core/AppTableContainer";
import LeadConTableItem from './LeadConTableItem';

const LeadConversionRollBased = (props?: any) => {
    
    return (
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6} md={6}>
                <Box sx={{
                    paddingBottom: 4
                }}>Leads Conversion (avg. days)</Box>
                {props.leadConversion ?
                    <ResponsiveContainer width='100%' height={250}>
                        <BarChart data={props.leadConversion}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="conversion_period" />
                            <YAxis
                                tickFormatter={(value) =>
                                    new Intl.NumberFormat("en-US", {
                                        notation: "compact",
                                        compactDisplay: "short",
                                    }).format(value)
                                }
                            />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="average"
                                fill="#00a0fc"
                                maxBarSize={30}
                            >
                                {
                                    props.leadConversion.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    : null}

            </Grid>
            {/* <Grid item xs={12} sm={4} md={4}>
                <Box sx={{
                    paddingBottom: 4
                }}>Leads conversion Ratio</Box>
                {props.leadConversion ?
                   
                    <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                        <Pie
                            dataKey='average'
                            activeIndex={activeIndex}
                            activeShape={RenderActiveShape}
                            onMouseEnter={onPieEnter}
                            data={props.leadConversion}
                            innerRadius={80}
                            outerRadius={100}
                            fill='#8884d8'
                        >
                            {
                                props.leadConversion.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                    : null}

            </Grid> */}
            <Grid item xs={12} sm={6} md={6}>
                <Box sx={{
                    paddingBottom: 4
                }}>Project List</Box>
                <AppTableContainer>
                    <Table className="table">
                        <TableHead>
                            <LeadConTableHeading />
                        </TableHead>
                        <TableBody>
                            {props.leadsData.map((data?: any) => (
                                <LeadConTableItem data={data} key={data.id} />
                            )
                            )}
                        </TableBody>
                    </Table>
                </AppTableContainer>
            </Grid>
        </Grid>
    )
}

export default LeadConversionRollBased;