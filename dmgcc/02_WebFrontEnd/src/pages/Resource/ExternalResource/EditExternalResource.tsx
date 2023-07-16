import React from 'react'
import ExternalResourceForm from './ExternalResourceForm';
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import { Card, Box, Dialog, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { reqUpdateThirdpartyResource } from 'saga/Actions/resources.actions';
import moment from 'moment';

const EditExternalResource = (props?: any) => {
  const [getUserData, setUserInfo] = React.useState(null)
  React.useEffect(() => {
    getUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getUserDetails = () => {
    if (props.getUserInfo) {
      const editFieldData: any = {
        id: props.getUserInfo.id,
        shortid: props.getUserInfo.shortid,
        hrid: props.getUserInfo.hrid,
        emp_name: props.getUserInfo.emp_name,
        designation: props.getUserInfo.designation,
        functions: props.getUserInfo.functions,
        department_id: props.getUserInfo.department_id,
        date_of_join: moment(props.getUserInfo.date_of_join).format('YYYY-MM-DD'),
        email: props.getUserInfo.email,
      }

      setUserInfo(editFieldData)
    }
  }

  const closeFormDetails = () => {
    props.handleClose()
  }
  const onSubmitData = (getUserInfoData?: any) => {
    props.putThirdpartyResource(getUserInfoData)
    props.handleClose();
  }
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={props.showpage}
        onClose={closeFormDetails}
      // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>

            <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
            Update Resource
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={props.handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppGridContainer>
          <Grid item xs={12} md={12}>
            <Box sx={{ padding: 10 }}>
              <Card variant='outlined'>
                <CardContent>
                  {getUserData ?
                    <ExternalResourceForm getFieldData={getUserData} handleClose={closeFormDetails} onSubmitData={onSubmitData} editForm={true} />
                    : null

                  }
                </CardContent>
              </Card>
            </Box>
          </Grid>

        </AppGridContainer>
      </Dialog>
    </React.Fragment>
  )
}



const mapStateToProps = (state: any) => {
  return {
    loading: state.resourceProcess.loading,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    putThirdpartyResource: (postUserInfo?: any) => dispatch(reqUpdateThirdpartyResource(postUserInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExternalResource);
// export default EditExternalResource;