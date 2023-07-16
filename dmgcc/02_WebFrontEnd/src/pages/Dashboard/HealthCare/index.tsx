import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppInfoView from "@crema/core/AppInfoView";
import AppGridContainer from "@crema/core/AppGridContainer";
import { ActionTypes, BizCaseSLATypes } from "saga/sagas/Types";
import { RoutePermittedRole } from "shared/constants/AppConst";
import AdminDashboard from "../adminDashboard";
import { reqClearStatusDashboard, reqDashboardDetails, reqTokenResonse } from "saga/Actions";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import AppLoader from "@crema/core/AppLoader";

const DaimlerG3c = (props?: any) => {
  const [getCostCenterDetails, setCostCenterDetails] = React.useState('')

  useEffect(() => {
    getInitialValuesDashboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // This is function used to get intialValues 
  const getInitialValuesDashboard = () => {
    props.reqDashboardDetails('all')
    setCostCenterDetails('')
    props.getCostcenterList()
  }
  const onGetCostCenterDetails = (getCostCenter?: any) => {
    if (getCostCenter) {
      setCostCenterDetails(getCostCenter)
      props.reqDashboardDetails(getCostCenter.costcenter)
    } else {
      setCostCenterDetails('')
      props.reqDashboardDetails('all')

    }
  }

  return (
    <React.Fragment>
      {
        (props.loader)&&<AppLoader/>
      }
      <AppInfoView />
      <AppGridContainer>

        <Grid item xs={12} sm={9} md={9} ></Grid>
        <Grid item xs={12} sm={3} md={3} >
          {
            props.statuscode && RoutePermittedRole.Admin === props.statuscode.roles  && props.loader !== true?
              <Autocomplete
                onChange={(event: any, value: any) => {
                  // setFieldValue("costcenter", value);
                  onGetCostCenterDetails(value)
                }}
                getOptionLabel={(option: any) => (option ? option.costcenter : "")}
                id='costcenter'
                options={props.getCostCenterListDetail ?
                  props.getCostCenterListDetail : []}
                filterSelectedOptions
                value={getCostCenterDetails}
                renderInput={(params) => <TextField {...params} label='Cost Centre' />}
              />
              : null
          }

        </Grid>
        
        {
          props.dashboardDetails && props.loader !== true?
            <AdminDashboard data={props.dashboardDetails} />
            : <Box sx={{display:!props.dashboardDetails?'none':'block'}}>No Project</Box>
        }
      </AppGridContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loader: state.dashboardDetails.loading,
    checkTokenStatus: state.auth.tokenValidationStatus,
    dashboardDetails: state.dashboardDetails.getResponseDashboard,
    getCostCenterListDetail: state.bizCaseSLAProcess.getCostcenterList,
    statuscode: state.auth.profileDetails,
    errorsCheckToken: state.dashboardDetails.errors
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    checkTokenValidation: () => dispatch({ type: ActionTypes.TOKEN_VALIDATION_REQUEST }),
    reqDashboardDetails: (postBizCase?: any) => dispatch(reqDashboardDetails(postBizCase)),
    getCostcenterList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS }),
    reqTokenResonse: () => dispatch(reqTokenResonse()),
    reqClearStatusDashboard: () => dispatch(reqClearStatusDashboard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaimlerG3c);;
