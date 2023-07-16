import BreadcrumbsData from '@crema/core/Breadcrumbs';
import React from 'react'
import { Card, CardContent } from '@mui/material';
import BrochureView from './index';

const CommonViewBrochures = (props: any) => {
    return (
        <React.Fragment>
            <BreadcrumbsData menuList={breadCrumbValues} />
            <Card variant='outlined'>
                <CardContent>
                    <BrochureView/>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

const breadCrumbValues = {
    title: 'Brochure',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/',
    description: ''
}

export default CommonViewBrochures