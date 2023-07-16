import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reqAboutUsData } from 'saga/Actions/aboutus.action';

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
                <div className="col-lg-4 col-md-6">
                    {/* <h1 className="fw-bold text-primary mb-4">D<span className="text-white">AIMLER</span></h1> */}
                    <Box sx={{marginBottom:2}}>
                    <img src="img/logo-white.png" alt='' style={{width:250}}/>
                    </Box>
                    {/* <p>{props.resAboutViewData?props.resAboutViewData.description:''}</p> */}
                    <div className="d-flex pt-2">
                        <Link className="btn btn-square me-1" to={'#'}><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                        <Link className="btn btn-square me-1" to={'#'}><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                        <Link className="btn btn-square me-1" to={'#'}><i className="fa fa-youtube-play" aria-hidden="true"></i></Link>
                        <Link className="btn btn-square me-0" to={'#'}><i className="fa fa-linkedin" aria-hidden="true"></i></Link>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5 className="text-light mb-4">Address</h5>
                    <p><i className="fa fa-map-marker me-3" aria-hidden="true"></i> 123 Street, New York, USA</p>
                    <p><i className="fa fa-phone me-3" aria-hidden="true"></i> +012 345 67890</p>
                    <p><i className="fa fa-envelope me-3"></i>info@example.com</p>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5 className="text-light mb-4">Quick Links</h5>
                    <Link className="btn btn-link" to={'/about_us'}>About Us</Link>
                    <Link className="btn btn-link" to={'/gcc_vertical'}>GCC Verticals</Link>
                    <Link className="btn btn-link" to={'/brochure'}>Brochure</Link>
                    <Link className="btn btn-link" to={'/newsletter'}>Newslatter</Link>
                    <Link className="btn btn-link" to={'/content'}>Content</Link>
                </div>
                {/* <div className="col-lg-3 col-md-6">
                    <h5 className="text-light mb-4">Newsletter</h5>
                    <div className="position-relative mx-auto">
                        <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Send</button>
                    </div>
                </div> */}
            </div>
        </div>
        <div className="container-fluid copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <Link to={'#'}>Daimler - G3C</Link>, Copyrights All Rights.
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End --> */}


    {/* <!-- Back to Top --> */}
    <Link to={''} onClick={onUpperGo} className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-circle-up" aria-hidden="true"></i></Link>
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

