import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { LandingPageURL } from '../router/Roles';
import { connect } from 'react-redux';
import { reqAboutUsData } from '../saga/actions';

const Footer = (props:any) => {
    const onUpperGo = () =>{        
    window.scrollTo(0, 0);
    }

  return (
  <React.Fragment>
      

    {/* <!-- Footer Start --> */}
    <div className="container-fluid text-white-50 footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s" style={{background:'#001D23'}}>
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    {/* <h1 className="fw-bold text-primary mb-4">D<span className="text-white">AIMLER</span></h1> */}
                    <Box sx={{marginBottom:2}}>
                    <img src="img/dt-logotype-1line-white-cmyk-comp.png" alt='' style={{width:250}}/>
                    </Box>
                    <p>{props.resAboutViewData?props.resAboutViewData.description:''}</p>
                    <div className="d-flex pt-2">
                        <Link className="btn btn-square me-1" to={'#'}><i className="fab fa-twitter"></i></Link>
                        <Link className="btn btn-square me-1" to={'#'}><i className="fab fa-facebook-f"></i></Link>
                        <Link className="btn btn-square me-1" to={'#'}><i className="fab fa-youtube"></i></Link>
                        <Link className="btn btn-square me-0" to={'#'}><i className="fab fa-linkedin-in"></i></Link>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Address</h5>
                    <p><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                    <p><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p><i className="fa fa-envelope me-3"></i>info@example.com</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Quick Links</h5>
                    <Link className="btn btn-link" to={LandingPageURL.aboutusPage}>About Us</Link>
                    <Link className="btn btn-link" to={LandingPageURL.GccVertical}>GCC Verticals</Link>
                    <Link className="btn btn-link" to={LandingPageURL.brochurePage}>Brochure</Link>
                    <Link className="btn btn-link" to={LandingPageURL.newsletterPage}>Newlatter</Link>
                    <Link className="btn btn-link" to={LandingPageURL.contentPage}>Content</Link>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Newsletter</h5>
                    {/* <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p> */}
                    <div className="position-relative mx-auto">
                        <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Send</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <Link to={'#'}>Daimler - G3C</Link>, All Right Reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End --> */}


    {/* <!-- Back to Top --> */}
    <Link to={''} onClick={onUpperGo} className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></Link>
      </React.Fragment>
  )
}
const mapStateToProps = (state: any) => {
  
  return {
    resAboutViewData:state.aboutUsDetails.resAboutViewData,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqAboutUsData: () => dispatch(reqAboutUsData()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);

