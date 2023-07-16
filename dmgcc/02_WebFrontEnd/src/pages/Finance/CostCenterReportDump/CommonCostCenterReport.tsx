import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import CostCenterReportGrid from './CostCenterReportGrid';

const CommonCostCenterReport = () => {
  return (
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues} />
    <Card variant='outlined' className="marginTop">
        <CardContent>
            <CostCenterReportGrid />
        </CardContent>
    </Card>
</React.Fragment>
  )
}

const breadCrumbValues = {
    title: 'View Cost Centre Report Dump',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
}

export default CommonCostCenterReport;