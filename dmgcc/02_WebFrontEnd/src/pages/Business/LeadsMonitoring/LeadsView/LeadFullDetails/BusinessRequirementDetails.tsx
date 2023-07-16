import React from 'react'
import { Button, Typography, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CommonStore from '@crema/services/commonstore';
import { RoutePermittedRole } from 'shared/constants/AppConst';

const BusinessRequirementDetails = (props?: any) => {
    const navigate = useNavigate();
    const userRole = CommonStore().userRoleType;
    const openBizRequirement = (getValues?: any) => {
        navigate('/business/update-business-request', { state: { leadId: props.leadId, bizId: getValues.id } })
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    {((userRole !== RoutePermittedRole.Finance)) && <Button variant="contained" color="primary"
                        disabled={!props.businessRequirementDetails.sla_business_case}
                        onClick={() => openBizRequirement(props.businessRequirementDetails)} className="hideoption">View Business Requirement</Button>
                        }
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Business Case Start Date
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    :  {props.businessRequirementDetails.business_case_start_date}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Business Case End Date
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    : {props.businessRequirementDetails.business_case_end_date}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Rate Card
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    : {props.businessRequirementDetails.business_availability}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ flex: 1 }} variant='h4' component='div'>
                        Status
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    : {props.businessRequirementDetails.status}
                </Grid>


            </Grid>
        </>
    )
}

export default BusinessRequirementDetails;