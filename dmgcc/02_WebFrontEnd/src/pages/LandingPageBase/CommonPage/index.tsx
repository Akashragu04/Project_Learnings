import Footer from 'layout/Footer';
import Header from 'layout/Header';
import React from 'react'
import UnAuthContent from '../azureAuth';
import HomeLandingPage from '../homepage';
import ContentView from '../Content';
import NewsLatterView from '../Newletter';
import BrochureView from '../Brochure';
import GccVertical from '../GccVertical';
import AboutUsView from '../AboutUs'
import { connect } from "react-redux";
import { reqClearBizSLADetails, reqClearLoginDetails } from 'saga/Actions';
import { reqClearStatus } from 'saga/Actions/admin.action';
import { useLocation, useNavigate } from "react-router-dom";
import ApprovalBusinessCase from 'pages/approvalpage/ApprovalBusinessCase';
import SLAApproval from 'pages/approvalpage/SLAApproval';

const CommonPageAuth = (props?: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [getParamsStatus, setParamsStatus] = React.useState(false);
  const [getNameParamsStatus, setNameParamsStatus] = React.useState<any>(null);
  const [getSLAParamsStatus, setSLAParamsStatus] = React.useState(false);
  const [getSLANameParamsStatus, setSLANameParamsStatus] = React.useState<any>(null);
  React.useEffect(() => {
    props.reqClearLoginDetails()
    props.reqClearBizSLADetails()
    props.reqClearStatus()
    
    if(location && location.pathname){
      let splitUrl = location.pathname.split('/');
      if(splitUrl && splitUrl[1] === 'business-approvel'){
        setSLANameParamsStatus("business-approvel")
        setNameParamsStatus(null)
        setSLAParamsStatus(false)
        setParamsStatus(true)
      }else if(splitUrl && splitUrl[1] === 'sla-approvals'){
        setSLANameParamsStatus(null)
        setNameParamsStatus('sla-approvals')
        setSLAParamsStatus(true)
        setParamsStatus(false)
      }else if(location && location.pathname === '/signin'){
        setSLAParamsStatus(false)
        setParamsStatus(false)
        setSLANameParamsStatus(null)
        setNameParamsStatus(null)
        navigate("/");
      }else {
        setSLAParamsStatus(false)
        setParamsStatus(false)
        setSLANameParamsStatus(null)
        setNameParamsStatus(null)
      }
    }
    if(props.errorsToken && props.errorsToken.message === "Token Expired"){
      navigate("/");
      setParamsStatus(false)
      setSLAParamsStatus(false)
    }else if(props.errorsSLACheckToken &&(props.errorsSLACheckToken.message === "Token Expired" || props.errorsSLACheckToken.message === "SLA is already approved")){
      navigate("/");
      setParamsStatus(false)
      setSLAParamsStatus(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <React.Fragment>
      {
        location && getParamsStatus === false && location.pathname !== '/g3c-admin' && getNameParamsStatus !== 'business-approvel' && getSLANameParamsStatus !== 'sla-approvals'?
      <Header />:null}
      {
        location  && getParamsStatus === false &&  location.pathname === '/' ?
          <HomeLandingPage />
          : null
      }
      {
        location && getParamsStatus === false &&  location.pathname === '/about_us' ?
          <AboutUsView />
          : null
      }
      {
        location  && getParamsStatus === false &&  location.pathname === '/gcc_vertical' ?
          <GccVertical />
          : null
      }
      {
        location  && getParamsStatus === false &&  location.pathname === '/g3c-admin' ?
          <UnAuthContent />
          : null
      }
      {
        location  && getParamsStatus === false &&  location.pathname === '/content' ?
          <ContentView />
          : null
      }
      {
        location  && getParamsStatus === false &&  location.pathname === '/newsletter' ?
          <NewsLatterView />
          : null
      }
      {
        location  && getParamsStatus === false &&  location.pathname === '/brochure' ?
          <BrochureView />
          : null
      }
           {
        location  && getParamsStatus === true  ?
        <React.Fragment>
          {/* {
        props.emailApprovalStatus && props.emailApprovalStatus.status === true ?
      <Header />:null} */}
          <ApprovalBusinessCase />
          {/* {
        props.emailApprovalStatus && props.emailApprovalStatus.status === true ?
      <Footer />:null} */}
          </React.Fragment>
          : null
      }

{
        location  && getSLAParamsStatus === true  ?
        <React.Fragment>
          {/* {
        props.slaApprovalSuccess && props.slaApprovalSuccess.status === true ?
      <Header />:null} */}
          <SLAApproval/>
          {/* {
        props.slaApprovalSuccess && props.slaApprovalSuccess.status === true ?
      <Footer />:null} */}
          </React.Fragment>
          : null
      }


      {
        location  && getParamsStatus === false &&  location.pathname !== '/g3c-admin' && getNameParamsStatus !== 'business-approvel' && getSLANameParamsStatus !== 'sla-approvals'?
      <Footer />:null}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {    
    emailApprovalStatus: state.businessProcess.emailApprovalStatus,
    errorsToken:state.businessProcess.errors,
    slaApprovalSuccess: state.bizCaseSLAProcess.slaApprovalSuccess,
    errorsSLACheckToken: state.bizCaseSLAProcess.errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reqClearLoginDetails: () => dispatch(reqClearLoginDetails()),
    reqClearStatus: () => dispatch(reqClearStatus()),
    reqClearBizSLADetails:()=>dispatch(reqClearBizSLADetails()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonPageAuth)