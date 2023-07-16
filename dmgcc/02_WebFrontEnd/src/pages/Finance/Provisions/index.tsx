import React from 'react'
import ViewProvisionsMaster from './ViewProvisionsMaster'
import { Grid } from '@mui/material';
const Provisions = (props?: any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 5 }}>
      <ViewProvisionsMaster />
    </Grid>
  )
}

export default Provisions;