import React from 'react'
import { connect } from 'react-redux'
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import QuickFilteringGrid from "./QuickFilteringGrid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import { ActionTypes } from 'saga/sagas/Types';

export const LeadView = (props?:any) => {
  React.useEffect(()=>{ 
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.checkTokenStatus, props.loading])
  return (
    <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues}/>
      <AppGridContainer sx={{marginTop:2}}>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <QuickFilteringGrid />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
      </React.Fragment>
  )
}
const breadCrumbValues = {
  title: 'Leads',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description:''
}
const mapStateToProps = (state) => {
  return {
    checkTokenStatus: state.auth.tokenValidationStatus,
    loading: state.auth.loading,   
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch({ type: ActionTypes.GET_USERDETAILS_REQUEST })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeadView)
