import { Grid } from '@mui/material';
import React from 'react'
import EntityMasterGrid from './EntityMasterGrid';

const EntityMaster = (props:any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 5 }}>
      <EntityMasterGrid />
    </Grid>
  )
}

export default EntityMaster;