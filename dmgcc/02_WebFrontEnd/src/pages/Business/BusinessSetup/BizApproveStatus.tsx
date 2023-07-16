import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { ActionTypes } from "saga/sagas/Types"; //NOSONAR
import AppLoader from '@crema/core/AppLoader'; //NOSONAR

const BizApproveStatus = (props?:any) => {
  const { Biz_Case_ID, Approval_ID, receiver, token } = useParams();
  useEffect(()=>{
const putValues:any = {
  Biz_Case_ID:Biz_Case_ID,
  Approval_ID:Approval_ID,
  receiver:receiver,
  token:token
}
if(putValues){
  props.mailBusinessApproval(putValues)
}
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <AppLoader/>
  )
}

const mapStateToProps = (state) => 
  {
    return {
      businessGridData: state.businessProcess
    }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
  mailBusinessApproval: (getValues?: any) => dispatch({ type: ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_REQUEST, value: getValues }),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BizApproveStatus);
