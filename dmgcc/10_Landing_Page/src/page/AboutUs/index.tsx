import React from 'react'
import CommonHeader from '../../layout/CommonHeader';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import { reqAboutUsData, reqMissionVisionData, reqServicesData, reqServicesSubContentData, 
  reqTeamMembersData, reqTestimonialData, reqVisionData } from '../../saga/actions';
import AboutUsDetails from './AboutUsView';
import TestimonialsView from './TestimonialsView';
import ViewContacts from './ViewContacts';
import ViewServices from './ViewServices';
import ViewVisionMission from './ViewVisionMission';
import { connect } from "react-redux";

const AboutUsView = (props:any) => {

  React.useEffect(()=>{
    window.scrollTo(0, 0);
    props.reqAboutUsData()
    props.reqServicesData()
    props.reqServicesSubContentData()
    props.reqTestimonialData()
    props.reqTeamMembersData()
    props.reqMissionVisionData()
    props.reqVisionData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <React.Fragment>
        <Header/>
        <CommonHeader bannerDetails={BannerDetails}/>
        <AboutUsDetails resAboutViewData={props.resAboutViewData}/>
        <ViewServices resServicesData={props.resServicesData} getSubContent={props.resServicesSubContentData}/>
        <ViewVisionMission resMissionVisionData={props.resMissionVisionData} resVisionDetails={props.resVisionDetails}/>
        <TestimonialsView resTestimonialData={props.resTestimonialData}/>
        <ViewContacts resTeamMembersData={props.resTeamMembersData}/>
        <Footer/>
    </React.Fragment>
  )
}

const BannerDetails:any = {
    title:'About Us',
    homeurl:'/',
    homeTitle:'Home'
}
const mapStateToProps = (state: any) => {
  
  return {
    resAboutViewData:state.aboutUsDetails.resAboutViewData,
    resTeamMembersData:state.aboutUsDetails.resTeamMembersData,
    resServicesData:state.aboutUsDetails.resServicesData,
    resTestimonialData:state.aboutUsDetails.resTestimonialData,
    resMissionVisionData:state.aboutUsDetails.resMissionVisionData,
    resVisionDetails:state.aboutUsDetails.resVisionDetails,
    resServicesSubContentData:state.aboutUsDetails.resServicesSubContentData

    // statuscode: state.auth.profileDetails,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqAboutUsData: () => dispatch(reqAboutUsData()),
    reqServicesData: () => dispatch(reqServicesData()), 
    reqTestimonialData: () => dispatch(reqTestimonialData()), 
    reqTeamMembersData: () => dispatch(reqTeamMembersData()), 
    reqMissionVisionData: () => dispatch(reqMissionVisionData()),   
    reqVisionData: () => dispatch(reqVisionData()),
    reqServicesSubContentData:()=>dispatch(reqServicesSubContentData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutUsView);
// export default AboutUsView;