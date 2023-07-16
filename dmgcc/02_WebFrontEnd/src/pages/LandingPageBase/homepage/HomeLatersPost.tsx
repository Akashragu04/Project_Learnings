// import ItemList from '@crema/commonservices/ItemList'
import React from 'react'
// import Carousel from 'react-material-ui-carousel'
// import ItemList from '../../common/ItemList'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ItemList from '@crema/commonservices/ItemList';

export const HomeLatersPost = (props:any) => {
    return (
        <React.Fragment>
      {/* <!-- Testimonial Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px;"}}>
                <h2 className="mb-5">Testimonial</h2>
            </div>
            <Carousel autoPlay>
            {props.resTestimonialData?
                props.resTestimonialData.map( (item:any, i:any) => <ItemList key={i} item={item} testimonialBgColor={'#fff'}/> )
                :null
            }
            </Carousel>
        </div>
    </div>
    {/* <!-- Testimonial End --> */}
        </React.Fragment>
    )
}
