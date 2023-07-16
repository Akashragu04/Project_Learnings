import React from 'react'
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import BannerSection from './BannerSection';
import HomeAboutUs from './HomeAboutUs';
import { HomeLatersPost } from './HomeLatersPost';
import HomeServices from './HomeServices';
import { connect } from 'react-redux';
import { reqAboutUsData, reqTestimonialData } from '../../saga/actions';
import { reqLatestNewsletterData } from '../../saga/actions/other.actions';

const HomePage = (props: any) => {

  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.reqLatestNewsletterData()
    props.reqAboutUsData()
    props.reqTestimonialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <Header />
      <BannerSection />
      <HomeAboutUs resAboutViewData={props.resAboutViewData} />
      <HomeServices />
      <HomeLatersPost resTestimonialData={props.resTestimonialData} />
      <Footer />
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


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


