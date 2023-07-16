import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ItemList from '../../common/ItemList'

const TestimonialsView = (props:any) => {
  return (
   <React.Fragment>
        {/* <!-- Testimonial Start --> */}
        <section className='sectionBg'>
        <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px;"}}>
                {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Testimonial</div> */}
                <h1 className="display-6 mb-5">Testimonial</h1>
            </div>
            <Carousel>
            {props.resTestimonialData?
                props.resTestimonialData.map( (item:any, i:any) => <ItemList key={i} item={item} testimonialBgColor={'#fff'}/> )
                :null
            }
        </Carousel>
        </div>
    </div>
        </section>
   
    {/* <!-- Testimonial End --> */}
   </React.Fragment>
  )
}

export default TestimonialsView;
