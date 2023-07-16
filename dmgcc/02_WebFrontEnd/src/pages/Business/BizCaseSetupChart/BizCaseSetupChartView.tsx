import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const BizCaseSetupChartView = (props?:any) => {
  return (
    <BarChart width={300} height={250} data={props.leadConversion}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="conversion_period" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar
        dataKey="average"
        fill="#00a0fc"
    >
        {props.leadConversion && props.leadConversion.length?
            props.leadConversion.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
            )):null
        }
    </Bar>
</BarChart>
  )
}

export default BizCaseSetupChartView;
