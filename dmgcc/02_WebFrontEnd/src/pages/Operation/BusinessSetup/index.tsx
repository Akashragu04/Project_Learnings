import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import { Card, ButtonGroup, Button, Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import BusinessSetupforRunningProjects from './BusinessSetupforRunningProjects';
import {projectData} from '@crema/commonservices/Types';

const BusinessSetup = (props?: any) => {
  // const [getSelectBizValues, setSelectBizValues ] = React.useState([])
  const getSelectBusinessSetup = (getSelectValues?: any) => {
    const pushBusinessValues:any = [];
    getSelectValues.forEach((items:any, i:any)=>{
      const getBizSelectDatat:any = projectData.find((bizList:any, Index:any)=>Index === items-1)
      pushBusinessValues.push(getBizSelectDatat)
    })
    // setSelectBizValues(pushBusinessValues)
  }
  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      <AppGridContainer>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <BusinessSetupforRunningProjects getSelectBusinessSetup={getSelectBusinessSetup} />
              <Box sx={{ marginBottom: 5, textAlign: 'right', marginTop: 5 }}>
                <ButtonGroup variant='outlined' aria-label='outlined button group'>
                  <Button >Create Biz Setup</Button>
                </ButtonGroup>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>
  )

}

const breadCrumbValues = {
  title: 'Business Setup for Running Project',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default BusinessSetup;