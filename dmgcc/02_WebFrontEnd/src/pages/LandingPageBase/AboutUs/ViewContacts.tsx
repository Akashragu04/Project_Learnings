import React from 'react'

const ViewContacts = (props:any) => {
  return (
      <React.Fragment>
           {/* <!-- Service Start --> */}
           <section>
           <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px;"}}>
                {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Contacts</div> */}
                <h3 className="mb-5">Our Team Members</h3>
            </div>
            <div className="row g-4 justify-content-center">
                {
                    props.resTeamMembersData?
                    props.resTeamMembersData.map((items:any, index?:any)=>(
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                        <div className="service-item bg-white text-center h-100 p-4 p-xl-5">
                            <img className="img-fluid mb-4 ourTeamImage" 
                            src={items.coverImage && items.coverImage.supporting_files_url? items.coverImage.supporting_files_url :".../../../img/unpost.png"} alt=""/>
                            <h4 className="mb-1">{items.name}</h4>
                            <h6 className="mb-1">{items.department}</h6>
                            <p className="mb-2">{items.email}</p>
                            <p className="mb-2">{items.mobileno}</p>
                        </div>
                    </div>
                    ))
                    :null
                }               
            </div>
        </div>
    </div>
           </section>
   
    {/* <!-- Service End --> */}
      </React.Fragment>
  )
}

export default ViewContacts;

