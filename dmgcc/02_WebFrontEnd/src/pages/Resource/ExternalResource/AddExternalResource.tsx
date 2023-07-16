import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import ExternalResourceForm from './ExternalResourceForm';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {addReqThirdpartyResource} from 'saga/Actions/resources.actions';

const AddExternalResource = (props?:any) => {
  const navigate = useNavigate();
  const addFieldData:any ={
    shortid: '',
    hrid: '',
    emp_name: '',
    designation: '',
    functions: '',
    department_id: '',
    date_of_join: moment(new Date()).format('YYYY-MM-DD'),
    email: '',
    }
    const onSubmitData = (getUserInfoData?:any) => {
      props.postThirdpartyResource(getUserInfoData)
      navigate('/resource/external_resource')
      }

      const closeFormDetails = ()=>{
        navigate('/resource/external_resource')
      }

  return (   
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues} />
      <AppGridContainer>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
                <ExternalResourceForm getFieldData={addFieldData} getDateStatus={true} onSubmitData={onSubmitData} handleClose={closeFormDetails} editForm={false}/>
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>

    </React.Fragment>
  )
}


const breadCrumbValues = {
  title: 'Add Resource',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}



const mapStateToProps = (state: any) => {
  return {
      loading: state.resourceProcess.loading,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    postThirdpartyResource: (postUserInfo?: any) => dispatch(addReqThirdpartyResource(postUserInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExternalResource);
// export default AddExternalResource;