import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ItemList from '../../common/ItemList'

export const HomeLatersPost = (props:any) => {
    return (
        <React.Fragment>
      {/* <!-- Testimonial Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px;"}}>
                <h1 className="display-6 mb-5">Testimonial</h1>
            </div>
            <Carousel>
            {props.resTestimonialData?
                props.resTestimonialData.map( (item:any, i:any) => <ItemList key={i} item={item}  testimonialBgColor={'#f5f5f5'}/> )
                :null
            }
        </Carousel>
        </div>
    </div>
    {/* <!-- Testimonial End --> */}
        </React.Fragment>
    )
}
