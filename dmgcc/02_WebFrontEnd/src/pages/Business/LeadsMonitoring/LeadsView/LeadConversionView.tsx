import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { Box, Grid } from "@mui/material";

export const LeadConversionView = (props?: any) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
                <Box sx={{
                    paddingBottom: 4
                }}>Leads Conversion (avg. days)</Box>
                {props.getleadConversion.leadconversionreport ?
                    <ResponsiveContainer width='100%' height={250}>
                        <BarChart data={props.getleadConversion.leadconversionreport}>
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
                                dataKey="delay_days"
                                fill="#00a0fc"
                                maxBarSize={30}
                            >
                                {
                                    props.getleadConversion.leadconversionreport.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    : null}

            </Grid>
        </Grid>
    )
}


export default LeadConversionView;