import BreadcrumbsData from '@crema/core/Breadcrumbs';
import React from 'react'
import ViewFeedBack from './ViewFeedBack';
import { Card, CardContent } from '@mui/material';

const FeedBackView = (props: any) => {

  return (
    <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues} />
      <Card variant='outlined'>
        <CardContent>
          <ViewFeedBack getLeadData={props.getLeadData} getUserDetails={props.getUserDetails} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

const breadCrumbValues = {
  title: 'Feedback',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default FeedBackView;
