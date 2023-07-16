import BreadcrumbsData from '@crema/core/Breadcrumbs';
import React from 'react'
import { Card, CardContent } from '@mui/material';
import NewLetter from './index';

const CommonNewsletterView = (props:any) => {
    return (
        <React.Fragment>
            <BreadcrumbsData menuList={breadCrumbValues} />
            <Card variant='outlined'>
                <CardContent>
                    <NewLetter/>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

const breadCrumbValues = {
    title: 'Newsletter',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/',
    description: ''
}


export default CommonNewsletterView