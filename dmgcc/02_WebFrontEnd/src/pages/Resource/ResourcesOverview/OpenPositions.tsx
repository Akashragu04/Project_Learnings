import React from 'react'
import { Box, Grid } from '@mui/material';
import DisplayCountList from '../commonComponent/DisplayCountList';
// import CommonTable from '../commonComponent/CommonTable';
import CommonGridView from './commonGrid/CommonGridView';

const OpenPositions = (props?: any) => {
  return (
    <Box sx={{ display: props.showOpenPositions ? 'block' : 'none' }}>
      <Grid container spacing={2}>
 {/* This part is used display total count start*/}
 {props.getApprovedResourceData ?
  <Grid item xs={12}>
        <DisplayCountList getTitle={'Total Open Positions'} getCountValues={parseInt(props.getApprovedResourceData.open_positions)} />
        </Grid>
        : null}
      {/* This part is used display total count end*/}

      {
        props.getApprovedResourceData ?
          <React.Fragment>
             <Grid item xs={12}>
            {/* <CommonTable tableData={props.getApprovedResourceData.fullFTERequirement} /> */}
            <CommonGridView approvedTable={props.getApprovedResourceData.open_positions_info} />

             </Grid>
          </React.Fragment>

          : null}
      </Grid>
     
    </Box>
  )
}

export default OpenPositions;