import { Box } from '@mui/material';
import React from 'react'
import { TooltipProps } from 'recharts';

const CommonTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{background:"#fff", padding:2, border:'1px solid #ccc', borderRadius:2}}>
                <p className="Text"> Capacity: {payload[0]&& payload[0].payload?`${payload[0].payload.capacity} %`:`${0} %`}</p>
                <p className="Text"> Month: {payload[0]&& payload[0].payload?payload[0].payload.month:'-'}</p>
            </Box>
        );
    }
    return null;
}

export const onValidateEmail = (values:any) => {
    const errors:any = {}
  
    if (!values) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
      errors.email = 'Invalid email address'
    }
  
    return errors
  }

export default CommonTooltip;
