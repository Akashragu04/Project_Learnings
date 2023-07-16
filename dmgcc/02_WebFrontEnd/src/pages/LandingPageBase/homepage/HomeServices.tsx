
import React from 'react'
import { Link } from 'react-router-dom';
import { LandingPageURL } from 'services/Constants';
// import { LandingPageURL } from '../../router/Roles';

export const HomeServices = () => {
  return (
   <React.Fragment>
       
    {/* <!-- Team Start --> */}
    <section className='sectionBg'>
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px"}}>
                {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Our Services</div> */}
                <h2 className="mb-5">Media & Content</h2>
            </div>
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item position-relative rounded overflow-hidden boxshadow">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="../../../img/service-1.jpg" alt=""/>
                        </div>
                        <div className="team-text bg-light text-center p-4">
                            <h5>Brochure</h5>
                            <p className="text-primary">All Details</p>
                            <div className="team-social text-center">
                                <Link className="btn btn-primary py-2 px-3 me-3" to={LandingPageURL.brochurePage} >
                                    Learn More
                                    <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item position-relative rounded overflow-hidden boxshadow">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="../../../img/service-2.jpg" alt=""/>
                        </div>
                        <div className="team-text bg-light text-center p-4">
                            <h5>Newsletter</h5>
                            <p className="text-primary">All Details</p>
                            <div className="team-social text-center">
                                <Link className="btn btn-primary py-2 px-3 me-3"  to={LandingPageURL.newsletterPage}>
                                    Learn More
                                    <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item position-relative rounded overflow-hidden boxshadow">
                        <div className="overflow-hidden">
                            <img className="img-fluid" src="../../../img/service-3.jpg" alt=""/>
                        </div>
                        <div className="team-text bg-light text-center p-4">
                            <h5>Content</h5>
                            <p className="text-primary">All Details</p>
                            <div className="team-social text-center">
                                <Link className="btn btn-primary py-2 px-3 me-3"  to={LandingPageURL.contentPage}>
                                    Learn More
                                    <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
    {/* <!-- Team End --> */}
   </React.Fragment>
  )
}

export default HomeServices;
