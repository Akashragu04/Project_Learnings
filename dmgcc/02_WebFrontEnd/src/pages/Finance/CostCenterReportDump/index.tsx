import { Grid } from '@mui/material';
import React from 'react'
import CostCenterReportGrid from './CostCenterReportGrid';

const CostCenterReportYTD = (props:any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 5 }}>
      <CostCenterReportGrid />
    </Grid>
  )
}

export default CostCenterReportYTD;