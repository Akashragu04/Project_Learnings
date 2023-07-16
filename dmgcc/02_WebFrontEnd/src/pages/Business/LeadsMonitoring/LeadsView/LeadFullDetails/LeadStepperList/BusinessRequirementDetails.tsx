import React from 'react'
import {  Button, Typography, Grid } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ItGridDetails from './ItGridDetails';
// import ManpowerHiringcost from './ManpowerHiringcost';
import { useNavigate } from "react-router-dom";

const BusinessRequirementDetails = (props?: any) => {
    const navigate = useNavigate();
    const openBizRequirement = (getValues?:any) =>{
        navigate('/business/update-business-request', { state: { leadId: props.leadId, bizId: getValues.id } })
    }
    return (
        <>
            <Grid container spacing={3}>
            <Grid item xs={12} sx={{textAlign:'right'}}>
                <Button  variant="contained" color="primary"  onClick={()=>openBizRequirement(props.businessRequirementDetails)}>View Business Requirement</Button>
                </Grid>
                <Grid item xs={6} >
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Business Case Start Date
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                  :  {props.businessRequirementDetails.business_case_start_date}
                </Grid>
                <Grid item xs={6} >
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                    Business Case End Date
                    </Typography>
                </Grid>
                <Grid item xs={6} >
               : {props.businessRequirementDetails.business_case_end_date}
                </Grid>
                <Grid item xs={6} >
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                    Rate Card
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                : {props.businessRequirementDetails.business_availability}
                </Grid>
                <Grid item xs={6} >
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                    Status
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                : {props.businessRequirementDetails.status}
                </Grid>

                
            </Grid>
        </>
    )
}

export default BusinessRequirementDetails;