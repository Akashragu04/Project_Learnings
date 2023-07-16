import React from 'react'
import BusinessCaseRequirement from './BusinessCaseRequirement';
import AppGridContainer from "@crema/core/AppGridContainer"; //NOSONAR
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs"; //NOSONAR

const BizSetup = () => {
  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      <AppGridContainer>
        <Grid item xs={12}  className="marginTop">
          <Card variant='outlined'>
            <CardContent>
              <BusinessCaseRequirement />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>
  )
}
const breadCrumbValues = {
  title: 'Business Case',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}
export default BizSetup;
