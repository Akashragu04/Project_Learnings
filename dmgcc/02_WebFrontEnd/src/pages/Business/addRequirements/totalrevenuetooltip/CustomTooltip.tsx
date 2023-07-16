import React from 'react'
import { TooltipProps } from 'recharts';

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="Text"> {label} </p>
                <p className="Text"> Markup: {payload[1] && payload[1].name === "markup" ? parseInt(payload[1].value) : 0}</p>
                <p className="Text"> Revenue: {payload[0] && payload[0].name === "total_revenue" ? parseInt(payload[0].value) : 0}</p>
            </div>
        );
    }
    return null;
}

export default CustomTooltip;
