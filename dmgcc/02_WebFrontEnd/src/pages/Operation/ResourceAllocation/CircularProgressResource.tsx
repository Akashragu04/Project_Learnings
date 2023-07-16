import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

export const CircularProgressResource = (props) => {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
        <CircularProgress className="loaderborder"  variant='determinate' {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='caption' component='div' color='text.secondary'>
            {`${Math.round(props.availableResources)}%`}
          </Typography>
        </Box>
      </Box>
  )
}

  export default CircularProgressResource;