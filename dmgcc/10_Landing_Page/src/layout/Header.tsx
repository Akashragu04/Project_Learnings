import React from 'react'
import { Link } from 'react-router-dom';
// import Spinner from '../common/Spinner';
import { LandingPageURL } from '../router/Roles';
import { useLocation } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Box } from '@mui/material';

const Header = (props?:any) => {
    const location = useLocation(); 

    const onOpenNewTab = () =>{        
              window.open('https://dmg3c-dev.landing-demo2.izserver8.in/dmcc-admin/');
    }
  return (
    <React.Fragment>
        {/* <Spinner/> */}
        {/* <!-- Navbar Start --> */}
    <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s" style={{background:'#ffffff'}}>
        {/* <div className="top-bar text-white-50 row gx-0 align-items-center d-none d-lg-flex">
            <div className="col-lg-6 px-5 text-start">
                <small><i className="fa fa-map-marker-alt me-2"></i>123 Street, New York, USA</small>
                <small className="ms-4"><i className="fa fa-envelope me-2"></i>info@example.com</small>
            </div>
            <div className="col-lg-6 px-5 text-end">
                <small>Follow us:</small>
                <Link className="text-white-50 ms-3" to={"#"}><i className="fab fa-facebook-f"></i></Link>
                <Link className="text-white-50 ms-3" to={"#"}><i className="fab fa-twitter"></i></Link>
                <Link className="text-white-50 ms-3" to={"#"}><i className="fab fa-linkedin-in"></i></Link>
                <Link className="text-white-50 ms-3" to={"#"}><i className="fab fa-instagram"></i></Link>
            </div>
        </div> */}

        <nav className="navbar navbar-expand-lg navbar-dark py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
            <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
                {/* <h1 className="fw-bold text-primary m-0">D<span className="text-white">AIMLER</span></h1> */}
                <img src="img/dt-logotype-1line-black-cmyk-comp.png" alt='' style={{width:250}}/>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <Box>
                <DehazeIcon color='primary'/>                    
                </Box>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to={LandingPageURL.homepage} className={`nav-item nav-link ${location && location.pathname ===LandingPageURL.homepage?'active':''}`}>Home</Link>
                    <Link to={LandingPageURL.aboutusPage} className={`nav-item nav-link ${location && location.pathname ===LandingPageURL.aboutusPage?'active':''}`}>About</Link>
                    <Link to={LandingPageURL.GccVertical} className={`nav-item nav-link ${location && location.pathname ===LandingPageURL.GccVertical?'active':''}`}>G3C Verticals</Link>
                    <Link to={'#'} target="_block" className="nav-item nav-link" onClick={()=>onOpenNewTab()}>My GCC</Link>
                    <div className="nav-item dropdown">
                        <Link to={"#"} className={`nav-link dropdown-toggle ${location.pathname ===LandingPageURL.brochurePage || location.pathname ===LandingPageURL.newsletterPage || location.pathname ===LandingPageURL.contentPage?'active':''}`} data-bs-toggle="dropdown">Other</Link>
                        <div className="dropdown-menu m-0">
                            <Link to={LandingPageURL.brochurePage} className="dropdown-item">Brochure</Link>
                            <Link to={LandingPageURL.newsletterPage} className="dropdown-item">Newletter</Link>
                            <Link to={LandingPageURL.contentPage} className="dropdown-item">Content</Link>
                        </div>
                    </div>
                    <Link to={'#'} target="_block" className="nav-item nav-link" onClick={()=>onOpenNewTab()}>Enquiry</Link>
                </div>
                <div className="d-none d-lg-flex ms-2">

                </div>
            </div>
        </nav>
    </div>
    {/* <!-- Navbar End --> */}
        </React.Fragment>
  )
}

export default Header;
