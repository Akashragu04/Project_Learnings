import React from 'react'
import { Grid, Box, Typography } from '@mui/material';

const DisplayCountList = (props?:any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 1 }}>
    <Box sx={{position:'relative', float:'right'}}>
        <Typography
            component="h6"
            variant="inherit"
            color="inherit"
            sx={{
                // fontSize: 12,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: 220,
                paddingBottom: 1,
                textAlign: 'center',
                // fontSize:18,
                marginBottom: 5, background: '#2196F3', color: '#fff', padding: 2, borderRadius: 2, 
            }}
        >
            {props.getTitle}: {props.getCountValues ? props.getCountValues : '-'}
        </Typography>

    </Box>
  </Grid>
  )
}

export default DisplayCountList;