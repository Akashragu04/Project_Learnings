import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
// import AppAnimate from "@crema/core/AppAnimate";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import Projects from './Projects';

const Project = () => {
  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {/* <AppAnimate animation="transition.fadeIn" delay={200}> */}
        <AppGridContainer>
          <Grid item xs={12} className="marginTop">
            <Card variant='outlined'>
              <CardContent>
                  <Projects/>
              </CardContent>
            </Card>
          </Grid>
        </AppGridContainer>
      {/* </AppAnimate> */}
    </>
  )

}

const breadCrumbValues = {
  title: 'Project',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default Project;