import React from 'react'
import { AppGridContainer } from '@crema';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { Grid, Card, CardContent } from '@mui/material';
import PreInvoiceGrid from './PreInvoiceGrid';

const PreInvoiceAllGrid = () => {

  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {/* <AppAnimate animation="transition.fadeIn" delay={200}> */}
      <AppGridContainer>
        <Grid item xs={12} className="marginTop">
          <Card variant='outlined'>
            <CardContent>
              <PreInvoiceGrid />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>
  )
}

const breadCrumbValues = {
  title: 'Pre-Invoice',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default PreInvoiceAllGrid;