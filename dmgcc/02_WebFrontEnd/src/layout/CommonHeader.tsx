import React from 'react'
import { Link } from 'react-router-dom';

const CommonHeader = (props:any) => {
  return (    
    // <!-- Page Header Start -->
    <div className="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center">
            <h1 className="display-4 text-white animated slideInDown mb-4">{props.bannerDetails?props.bannerDetails.title:''}</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link className="text-white" to={props.bannerDetails?props.bannerDetails.homeurl:'#'}>{props.bannerDetails?props.bannerDetails.homeTitle:''}</Link></li>
                    <li className="breadcrumb-item text-primary active" aria-current="page">{props.bannerDetails?props.bannerDetails.title:''}</li>
                </ol>
            </nav>
        </div>
    </div>
    // <!-- Page Header End -->
  )
}

export default CommonHeader;
