import React from 'react'
import { Link } from 'react-router-dom';

export const HomeAboutUs = (props:any) => {
  return (
    <React.Fragment>
          {/* <!-- About Start --> */}
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="position-relative overflow-hidden h-100" style={{minHeight: "400px"}}>
                        <img className="position-absolute w-100 h-100 pt-5 pe-5" src="../../../img/carousel-2.png" alt="" style={{objectFit: "cover"}}/>
                        <img className="position-absolute top-0 end-0 bg-white ps-2 pb-2" src="img/about-2.jpg" alt="" style={{width: "200px", height: "200px"}}/>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="h-100">
                        <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">About Us</div>
                        <h1 className="display-6 mb-5">Global Capability Centre (GCC)</h1>
                        {/* <!-- <div className="bg-light border-bottom border-5 border-primary rounded p-4 mb-4">
                            <p className="text-dark mb-2">Aliqu diam amet diam et eos. Clita erat ipsum et lorem sed stet lorem sit clita duo justo erat amet</p>
                            <span className="text-primary">Jhon Doe, Founder</span>
                        </div> --> */}
                        <p className="mb-5">{props.resAboutViewData?props.resAboutViewData.description:null}</p>
                        <Link className="btn btn-primary py-2 px-3 me-3" to={"/about_us"}>
                            Learn More
                            <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                                <i className="fa fa-arrow-right"></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- About End --> */}
    </React.Fragment>
  )
}

export default HomeAboutUs;