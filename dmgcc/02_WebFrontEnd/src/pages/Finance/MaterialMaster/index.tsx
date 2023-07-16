import { Grid } from '@mui/material';
import React from 'react'
import MaterialMasterGrid from './MaterialMasterGrid';

const MaterialMaster = (props:any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 5 }}>
      <MaterialMasterGrid />
    </Grid>
  )
}

export default MaterialMaster;