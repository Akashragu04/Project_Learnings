import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import IODumpView from './IODumpView';

const CommonViewIODump = () => {
  return (
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues} />
    <Card variant='outlined' className="marginTop">
        <CardContent>
            <IODumpView />
        </CardContent>
    </Card>
</React.Fragment>
  )
}

const breadCrumbValues = {
    title: 'IO Dump',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
}

export default CommonViewIODump;