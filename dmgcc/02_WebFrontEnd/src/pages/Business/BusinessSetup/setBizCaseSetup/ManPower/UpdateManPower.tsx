import React from 'react';
import TaleoView from './TaleoView';
import BizCaseManavel from './BizCaseManavel';
import { connect } from 'react-redux'
import { reqJDMappingDetails, reqPutJDMappingData } from '../../../../../saga/Actions/resources.actions';
import { Box } from '@mui/material';
import { BizCaseBarChar } from '../ITView/BizCaseBarChar';
import { RoutePermittedRole } from 'shared/constants/AppConst';

const UpdateManPower = (props?: any) => {
  React.useEffect(() => {
    if (props.getBizDetails) {
      props.reqJDMappingDetails(props.getBizDetails.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (props.postResJDMapping) {
      if (props.postResJDMapping.status === true) {
        if (props.getBizDetails) {
          props.reqJDMappingDetails(props.getBizDetails.id)
          props.onChangeCostDetails()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.postResJDMapping])

  const onSubmitInternalJDMappingData = (getJDData?: any) => {
    props.reqPutJDMappingData(getJDData)
  }
  return (
    <React.Fragment>
      {/* <TaleoView TaleoData={hrMappinglist}/> */}
      {
                    props.userDetails.roles === RoutePermittedRole.HR ?
      <Box sx={{ marginBottom: 5, marginTop:5 }}>
        <BizCaseBarChar data={props.data}/>

      </Box>
      :null}
      {
        props.getJDMappingDetails ?
          <TaleoView TaleoData={props.getJDMappingDetails} />
          : null
      }
      {
        props.getJDMappingDetails ?
          <BizCaseManavel TaleoData={props.getJDMappingDetails} onSubmitInternalJDMappingData={onSubmitInternalJDMappingData} />
          : null}
    </React.Fragment>
  )
}


const mapStateToProps = (state: any) => {
  return {
    userDetails: state.auth.profileDetails,
    loading: state.resourceProcess.loading,
    getJDMappingDetails: state.resourceProcess.getJDMappingDetails,
    postResJDMapping: state.resourceProcess.postResJDMapping
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqJDMappingDetails: (getBizId?: any) => dispatch(reqJDMappingDetails(getBizId)),
    reqPutJDMappingData: (getBizId?: any) => dispatch(reqPutJDMappingData(getBizId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateManPower)
