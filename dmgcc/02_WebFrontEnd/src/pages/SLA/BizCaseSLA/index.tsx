import React from 'react'
import { AppGridContainer } from '@crema';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { Grid, Card, CardContent } from '@mui/material';
import BizCaseSLAGrid from './BizCaseSLAGrid';

const BizCaseSla = () => {

  return (
    <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues} />
      <AppGridContainer>
        <Grid item xs={12} className="marginTop">
          <Card variant='outlined'>
            <CardContent>
              <BizCaseSLAGrid />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </React.Fragment>
  )
}

const breadCrumbValues = {
  title: 'Business Case SLA',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default BizCaseSla;