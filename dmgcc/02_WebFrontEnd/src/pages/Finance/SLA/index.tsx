import React from 'react'
import { Grid } from '@mui/material';
import BizCaseSLAGrid from 'pages/SLA/BizCaseSLA/BizCaseSLAGrid';

const FinanceSLA = (props: any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 5 }}>
      <BizCaseSLAGrid />
    </Grid>
  )
}

export default FinanceSLA;