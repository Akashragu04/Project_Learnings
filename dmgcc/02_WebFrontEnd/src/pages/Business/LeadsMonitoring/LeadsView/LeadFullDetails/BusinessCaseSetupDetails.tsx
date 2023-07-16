import React from 'react'
import { Typography, Grid, Button } from '@mui/material';

const BusinessCaseSetupDetails = (props?: any) => {
    
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    {<Button variant="contained" color="primary"
                        disabled={props.bizCaseRequirementDetails.isbizcasesetup ? false : true}
                        onClick={props.onSetupBusinessMapping}>View Biz.Setup Status</Button>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        IT Average
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    : {props.bizCaseSetupDetails.it_average}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Facility Average
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} >
                    : {props.bizCaseSetupDetails.facility_average}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        HR Average
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    : {props.bizCaseSetupDetails.hr_average}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Total Average
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    : {props.bizCaseSetupDetails.total_average}
                </Grid>


            </Grid>
        </>
    )
}

export default BusinessCaseSetupDetails;