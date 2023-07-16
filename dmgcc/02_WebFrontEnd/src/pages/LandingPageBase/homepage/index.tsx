import React from 'react'
import BannerSection from './BannerSection';
import HomeAboutUs from './HomeAboutUs';
import { HomeLatersPost } from './HomeLatersPost';
import HomeServices from './HomeServices';
import { connect } from 'react-redux';
import { reqLatestNewsletterData } from 'saga/Actions';
import { reqAboutUsData, reqTestimonialData } from 'saga/Actions/aboutus.action';
// import { reqAboutUsData, reqLatestNewsletterData, reqTestimonialData } from 'saga/Actions';

const HomeLandingPage = (props: any) => {

  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.reqLatestNewsletterData()
    props.reqAboutUsData()
    props.reqTestimonialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <BannerSection />
      <HomeAboutUs resAboutViewData={props.resAboutViewData} />
      <HomeServices />
      <HomeLatersPost resTestimonialData={props.resTestimonialData} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => {
  return {
    resAboutViewData: state.aboutUsDetails.resAboutViewData,
    resLatestNewsLetterDetails: state.othersReducer.resLatestNewsLetterDetails,
    resTestimonialData: state.aboutUsDetails.resTestimonialData,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqAboutUsData: () => dispatch(reqAboutUsData()),
    reqLatestNewsletterData: () => dispatch(reqLatestNewsletterData()),
    reqTestimonialData: () => dispatch(reqTestimonialData()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeLandingPage);


