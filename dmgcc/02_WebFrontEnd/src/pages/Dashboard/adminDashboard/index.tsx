import { Grid, Typography } from '@mui/material';
import React from 'react'
import LeadCoversionDays from './LeadCoversionDays';
import ManagementKPI from './ManagementKPI';
import ManagementReport from './managementReport';
import OperatinalNewBizKPI from './OperatinalNewBizKPI';

const AdminDashboard = (props?: any) => {
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 2 }} >
            <Typography
                component="h5"
                variant="inherit"
                color="inherit"
                sx={{
                    fontSize: 16,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                }}
            >
                Management KPI – In Cr INR
            </Typography>
            </Grid>
           
            <ManagementKPI data={props.data} />
            <ManagementReport data={props.data}/>

            <OperatinalNewBizKPI data={props.data}/> 
            <Grid item xs={12} sm={12} md={12} >
            <Typography
                component="h5"
                variant="inherit"
                color="inherit"
                sx={{
                    fontSize: 16,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    marginTop:3
                }}
            >
                Leads conversion (in days)​
            </Typography> 
            </Grid>            
            <LeadCoversionDays data={props.data}/>
        </React.Fragment>
    )
}

export default AdminDashboard;