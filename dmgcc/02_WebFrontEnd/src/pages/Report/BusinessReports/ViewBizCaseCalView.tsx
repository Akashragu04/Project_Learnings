import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import { getBizProfitLossCalculationDetailRequst, getBizProfitLossCalculationListAction, 
    getBizProfitLossIterationDetailsAction, initBizProfitLossIterationDetailnAction } from 'saga/Actions';

// import RequirementDetails from './RequirementDetails';

const ViewBizCaseCalView = (props:any) => {
    useEffect(()=>{
        if(props.requirementId){
            props.getBizCalculationIterationList({ biz_id: props.requirementId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>ViewBizCaseCalView <Button onClick={props.onClose()}>Clear</Button></div>
  )
}

const mapStateToProps = (state: any) => ({
    calculationIsloading: state.businessCalculations.isLoading,
    calculationError: state.businessCalculations.errors,
    bizCalculationResponse: state.businessCalculations.bizCalculationResponse,
    bizCalculationIterationResponse: state.businessCalculations.bizCalculationIterationResponse,
})

const mapDispatchToProps = (dispatch: any) => ({
    initBizProfitLossIterationDetail: () => {
        dispatch(initBizProfitLossIterationDetailnAction())
    },
    getBizProfitCalculationDetail: (data: any) => {
        dispatch(getBizProfitLossCalculationDetailRequst(data))
    },
    getBizProfitIterationCalculationDetail: (data: any) => {
        dispatch(getBizProfitLossIterationDetailsAction(data))
    },
    getBizCalculationIterationList: (data: any) => {
        dispatch(getBizProfitLossCalculationListAction(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewBizCaseCalView);