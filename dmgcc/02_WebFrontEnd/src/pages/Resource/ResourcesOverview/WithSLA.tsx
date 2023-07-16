import React from 'react'
import { Box, Grid } from '@mui/material';
import DisplayCountList from '../commonComponent/DisplayCountList';
// import CommonTable from '../commonComponent/CommonTable';
import CommonGridView from '../commonComponent/CommonGridView';

const WithSLA = (props?: any) => {
    return (
        <Box sx={{ display: props.ShowWithSLA ? 'block' : 'none' }}>
            <Grid container spacing={2}>
                {/* This part is used display total count start*/}
                {props.getApprovedResourceData ?
                    <Grid item xs={12}>
                        <DisplayCountList getTitle={'Total SLA'} getCountValues={parseInt(props.getApprovedResourceData.with_sla)} />
                    </Grid>
                    : null}
                {/* This part is used display total count end*/}
                {
                    props.getApprovedResourceData ?
                        <React.Fragment>
                            <Grid item xs={12}>
                                {/* <CommonTable tableData={props.getApprovedResourceData.fullFTERequirement} /> */}
                                <CommonGridView approvedTable={props.getApprovedResourceData.with_sla_info} />

                            </Grid>
                        </React.Fragment>
                        : null}
            </Grid>



        </Box>
    )
}

export default WithSLA;