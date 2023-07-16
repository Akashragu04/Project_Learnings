import React from 'react'
import AppCard from "@crema/core/AppCard"; //NOSONAR
import { Box, Grid, Typography } from "@mui/material";
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress'; //NOSONAR
import { AppGridContainer } from '@crema';

const BizCaseSetupChart = (props?: any) => {
  const { bgColor } = props.data;
  return (
    <AppGridContainer>
    <Grid item xs={12} sm={6} md={4} >
      <AppCard
        sxStyle={{ height: 1, backgroundColor: bgColor, border: '1px solid #ccc' }} className="card-hover">
        <Box
          sx={{ display: "flex", alignItems: "center",}}>
          <Box
            sx={{ mr: 4, alignSelf: "flex-start", }}>
            <CircularProgressWithLabel value={props.data && props.data.manpower_precentage?props.data.manpower_precentage:0} />
          </Box>
          <Box
            sx={{
              width: "calc(100% - 70px)",
            }}
          >
            <Typography
              component="h5" variant="inherit" color="inherit" sx={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",  width: "100%",}}>
              {props.data && props.data.manpower_precentage?props.data.manpower_precentage:0}
            </Typography>
            <Box
              component="p"
              sx={{ pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%",}}>
              Manpower
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Grid>
    <Grid item xs={12} sm={6} md={4} >
      <AppCard
        sxStyle={{ height: 1, backgroundColor: bgColor, border: '1px solid #ccc' }} className="card-hover">
        <Box
          sx={{ display: "flex", alignItems: "center",}}>
          <Box
            sx={{ mr: 4, alignSelf: "flex-start", }}>
            <CircularProgressWithLabel value={props.data && props.data.it_infra_precentage?props.data.it_infra_precentage:0} />
          </Box>
          <Box
            sx={{
              width: "calc(100% - 70px)",
            }}
          >
            <Typography
              component="h5" variant="inherit" color="inherit" sx={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",  width: "100%",}}>
              {props.data && props.data.it_infra_precentage?props.data.it_infra_precentage:0}
            </Typography>
            <Box
              component="p"
              sx={{ pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%",}}>
              IT Infra
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Grid>
    <Grid item xs={12} sm={6} md={4} >
      <AppCard
        sxStyle={{ height: 1, backgroundColor: bgColor, border: '1px solid #ccc' }} className="card-hover">
        <Box
          sx={{ display: "flex", alignItems: "center",}}>
          <Box
            sx={{ mr: 4, alignSelf: "flex-start", }}>
            <CircularProgressWithLabel value={props.data && props.data.facility_precentage?props.data.facility_precentage:0} />
          </Box>
          <Box
            sx={{
              width: "calc(100% - 70px)",
            }}
          >
            <Typography
              component="h5" variant="inherit" color="inherit" sx={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",  width: "100%",}}>
              {props.data && props.data.facility_precentage?props.data.facility_precentage:0}
            </Typography>
            <Box
              component="p"
              sx={{ pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%",}}>
              Facility
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Grid>
    <Grid item xs={12} sm={6} md={4} >
      <AppCard
        sxStyle={{ height: 1, backgroundColor: bgColor, border: '1px solid #ccc' }} className="card-hover">
        <Box
          sx={{ display: "flex", alignItems: "center",}}>
          <Box
            sx={{ mr: 4, alignSelf: "flex-start", }}>
            <CircularProgressWithLabel value={props.data && props.data.third_party_cost_precentage?props.data.third_party_cost_precentage:0} />
          </Box>
          <Box
            sx={{
              width: "calc(100% - 70px)",
            }}
          >
            <Typography
              component="h5" variant="inherit" color="inherit" sx={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",  width: "100%",}}>
              {props.data && props.data.third_party_cost_precentage?props.data.third_party_cost_precentage:0}
            </Typography>
            <Box
              component="p"
              sx={{ pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%",}}>
              3rd party manpower - Cost
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Grid>
    <Grid item xs={12} sm={6} md={4} >
      <AppCard
        sxStyle={{ height: 1, backgroundColor: bgColor, border: '1px solid #ccc' }} className="card-hover">
        <Box
          sx={{ display: "flex", alignItems: "center",}}>
          <Box
            sx={{ mr: 4, alignSelf: "flex-start", }}>
            <CircularProgressWithLabel value={props.data && props.data.third_party_services_precentage?props.data.third_party_services_precentage:0} />
          </Box>
          <Box
            sx={{
              width: "calc(100% - 70px)",
            }}
          >
            <Typography
              component="h5" variant="inherit" color="inherit" sx={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",  width: "100%",}}>
              {props.data && props.data.third_party_services_precentage?props.data.third_party_services_precentage:0}
            </Typography>
            <Box
              component="p"
              sx={{ pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%",}}>
              3rd party Services - Business
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Grid>
    <Grid item xs={12} sm={6} md={4} >
      <AppCard
        sxStyle={{ height: 1, backgroundColor: bgColor, border: '1px solid #ccc' }} className="card-hover">
        <Box
          sx={{ display: "flex", alignItems: "center",}}>
          <Box
            sx={{ mr: 4, alignSelf: "flex-start", }}>
            <CircularProgressWithLabel value={props.data && props.data.system_access_precentage?props.data.system_access_precentage:0} />
          </Box>
          <Box
            sx={{
              width: "calc(100% - 70px)",
            }}
          >
            <Typography
              component="h5" variant="inherit" color="inherit" sx={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap",  width: "100%",}}>
              {props.data && props.data.system_access_precentage?props.data.system_access_precentage:0}
            </Typography>
            <Box
              component="p"
              sx={{ pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%",}}>
             System Access
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Grid>
          </AppGridContainer>
  )
}

export default BizCaseSetupChart;
