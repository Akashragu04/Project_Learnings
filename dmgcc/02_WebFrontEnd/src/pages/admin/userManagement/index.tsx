import React from 'react'
// import { AppGridContainer } from '@crema';
// import BreadcrumbsData from '@crema/core/Breadcrumbs';
// import { Grid, Card, CardContent } from '@mui/material';
// import ViewUserManagementDetails from './ViewUserManagementDetails';
import Overview from 'pages/settingsModule/Overview';

export const UserManagement = () => {
  return (
    <React.Fragment>
                 <Overview/>
    {/* <BreadcrumbsData menuList={breadCrumbValues} />
    <AppGridContainer>
      <Grid item xs={12} style={{ marginTop: 0 }}>
        <Card variant='outlined'>
          <CardContent>
            <ViewUserManagementDetails />
          </CardContent>
        </Card>
      </Grid>
    </AppGridContainer> */}
  </React.Fragment>
  )
}

// const breadCrumbValues = {
//     title: 'User Management',
//     subTitle: '',
//     SubUrl: '',
//     homeTitle: "Home",
//     homeLink: '/dashboard',
//     description: ''
//   }

export default UserManagement;