import BreadcrumbsData from '@crema/core/Breadcrumbs';
import React from 'react'

const CustomerServices = (props:any) => {
  return (
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues}/>
        </React.Fragment>
  )
}

const breadCrumbValues = {
    title: 'Customer Services',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/landing-page',
    description:''
  }
export default CustomerServices;