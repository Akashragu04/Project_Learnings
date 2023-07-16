import React from 'react'
import { Card, CardContent, Grid } from "@mui/material";
import { AppGridContainer } from "@crema";
import AccuralsGrid from './AccuralsGrid';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import CommonStore from '@crema/services/commonstore';
import { RoutePermittedRole } from 'shared/constants/AppConst';

const Accruals = (props?: any) => {

  const userRole = CommonStore().userRoleType;
  return (
    <React.Fragment>
      {(userRole === RoutePermittedRole.Business) ?
        <React.Fragment>
          <BreadcrumbsData menuList={breadCrumbValues} />
          <AppGridContainer className="marginTop">
            <Grid item xs={12} style={{ marginTop: 0 }}>
              <Card variant='outlined'>
                <CardContent>
                  <AccuralsGrid />
                </CardContent>
              </Card>
            </Grid>
          </AppGridContainer>
        </React.Fragment>
        :
        <React.Fragment>
          <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
                <CardContent>
            <AccuralsGrid />
                </CardContent>
              </Card>
          </Grid>
        </React.Fragment>
      }

    </React.Fragment>
  )
}

const breadCrumbValues = {
  title: 'Finance Accruals',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default Accruals;