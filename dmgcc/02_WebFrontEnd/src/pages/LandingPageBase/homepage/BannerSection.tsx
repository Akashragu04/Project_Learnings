import React from 'react'
import { Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <React.Fragment>
        
    {/* <!-- Carousel Start --> */}
    <section>
    <div className="container-fluid p-0 mb-5">
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="../../../img/carousel-1.png" alt=''/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 pt-5">
                                    <h1 className="display-4 text-white mb-3 animated slideInDown">Daimler Truck</h1>
                                    <p className="fs-5 text-white-50 mb-5 animated slideInDown">About 125 years ago, we founded the modern transport industry with our trucks and buses. Today we are one of the world's largest commercial vehicle manufacturers. </p>
                                    <Link className="btn btn-primary py-2 px-3 animated slideInDown" to={"/about_us"}>
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
                <div className="carousel-item">
                    <img className="w-100" src={`../../../img/carousel-1.png`} alt=''/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 pt-5">
                                    <h1 className="display-4 text-white mb-3 animated slideInDown">Global Capability Centre (GCC)</h1>
                                    <p className="fs-5 text-white-50 mb-5 animated slideInDown">About 125 years ago, we founded the modern transport industry with our trucks and buses. Today we are one of the world's largest commercial vehicle manufacturers. </p>
                                    <Link className="btn btn-primary py-2 px-3 animated slideInDown" to={"/gcc_vertical"}>
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
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
        
        </section>
    {/* <!-- Carousel End --> */}
    </React.Fragment>
  )
}

export default BannerSection;
