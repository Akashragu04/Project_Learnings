import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import ViewProvisionsMaster from './ViewProvisionsMaster';

const CommonProvision = () => {
  return (
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues} />
    <Card variant='outlined' className="marginTop">
        <CardContent>
        <ViewProvisionsMaster />
    </CardContent>
    </Card>
</React.Fragment>
  )
}

const breadCrumbValues = {
    title: 'Provision',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
}
export default CommonProvision;
