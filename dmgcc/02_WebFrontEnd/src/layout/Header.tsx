import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Box } from '@mui/material';
import { LandingPageURL } from 'services/Constants';
import { useNavigate } from "react-router-dom";

const Header = (props?:any) => {
    const location = useLocation();
    const navigate = useNavigate(); 

    const onOpenNewTab = () =>{  
        navigate('/g3c-admin')      
    }
  return (
    <React.Fragment>
        {/* <Spinner/> */}
        {/* <!-- Navbar Start --> */}
    <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s" style={{background:'#ffffff'}}>

        <nav className="navbar navbar-expand-lg navbar-dark py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
            <a href="/" className="navbar-brand ms-4 ms-lg-0">
                {/* <h1 className="fw-bold text-primary m-0">D<span className="text-white">AIMLER</span></h1> */}
         
                <img src='img/g3c_ logo.png' alt='' style={{width:125}}/>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <Box>
                <DehazeIcon color='primary'/>                    
                </Box>
            </button>
            <div className='col-md-5 logoalign'>                    
                <img src="img/logo-black.png" alt='' style={{width:250}}/>
                </div>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to={'/'} className={`nav-item nav-link ${location && location.pathname ===LandingPageURL.homepage?'active':''}`}>Home</Link>
                    <Link to={'/about_us'} className={`nav-item nav-link ${location && location.pathname ===LandingPageURL.aboutusPage?'active':''}`}>About</Link>
                    <Link to={'/gcc_vertical'} className={`nav-item nav-link ${location && location.pathname ===LandingPageURL.GccVertical?'active':''}`} >GCC Verticals</Link>
                    <Link to={'/g3c-admin'} className="nav-item nav-link" onClick={()=>onOpenNewTab()}>G3C</Link>
                    <div className="nav-item dropdown">
                        <Link to={"#"} className={`nav-link dropdown-toggle ${location.pathname ===LandingPageURL.brochurePage || location.pathname ===LandingPageURL.newsletterPage || location.pathname ===LandingPageURL.contentPage?'active':''}`} data-bs-toggle="dropdown">Other</Link>
                        <div className="dropdown-menu m-0">
                            <Link to={LandingPageURL.brochurePage} className="dropdown-item">Brochure</Link>
                            <Link to={LandingPageURL.newsletterPage} className="dropdown-item">Newsletter</Link>
                            <Link to={LandingPageURL.contentPage} className="dropdown-item">Content</Link>
                        </div>
                    </div>
                    <Link to={'/g3c-admin'} className="nav-item nav-link">Enquiry</Link>
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
