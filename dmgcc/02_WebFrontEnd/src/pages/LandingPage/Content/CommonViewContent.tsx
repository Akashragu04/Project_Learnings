import BreadcrumbsData from '@crema/core/Breadcrumbs';
import React from 'react'
import { Card, CardContent } from '@mui/material';
import ContentView from './index';

const CommonViewContent = (props:any) => {
    return (
        <React.Fragment>
            <BreadcrumbsData menuList={breadCrumbValues} />
            <Card variant='outlined'>
                <CardContent>
                    <ContentView/>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

const breadCrumbValues = {
    title: 'Content',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/',
    description: ''
}

export default CommonViewContent