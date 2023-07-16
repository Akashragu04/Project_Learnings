import React from 'react'
import ForerRatesView from './ForerRatesView';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";

const CommonForexRates = () => {
    return (
        <React.Fragment>
            <BreadcrumbsData menuList={breadCrumbValues} />
            <Card variant='outlined' className="marginTop">
                <CardContent>
                    <ForerRatesView />
                </CardContent>
            </Card>
        </React.Fragment>

    )
}

const breadCrumbValues = {
    title: 'Forex Rate',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
}

export default CommonForexRates;