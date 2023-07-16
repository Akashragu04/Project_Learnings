import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
import {Grid} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import TaskManagement from './TaskManagement';  

const TaskManagementView = (props?:any) => {
  return (
    <>
    <BreadcrumbsData menuList={breadCrumbValues} />
      {/* <AppAnimate animation="transition.fadeIn" delay={200}> */}
        <AppGridContainer className="marginTop">
          <Grid item xs={12} style={{ marginTop: 0 }}>
            <Card variant='outlined'>
              <CardContent>
                  <TaskManagement/>  
              </CardContent>
            </Card>
          </Grid>
        </AppGridContainer>
      {/* </AppAnimate> */}
    </>
  )
}


const breadCrumbValues = {
    title: 'Tasks Overview',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
  }

  export default TaskManagementView;