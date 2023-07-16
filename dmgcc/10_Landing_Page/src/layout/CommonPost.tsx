import React from 'react'
import { Link } from 'react-router-dom';

const CommonPost = (props:any) => {
  return (
    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
    <div className="team-item position-relative rounded overflow-hidden">
        <div className="overflow-hidden">
            <img className="img-fluid" style={{width:"100%", height:230}} src={props.data && props.data.coverImage?props.data.coverImage.supporting_files_url:'../img/unpost.png'} alt=""/>
        </div>
        <div className="team-text bg-light text-center p-4">
            <h5>{props.data?props.data.title:'-'}</h5>
            <p className="text-primary postpra">{props.data?props.data.description:'-'}</p>
            <div className="team-social text-center">
                                <Link className="btn btn-square"  to={"#"} onClick={props.onOpenAlterMessage}><i className="fa fa-download"></i></Link>
                                <Link className="btn btn-square"  to={"#"} onClick={()=>props.onOpenBrochureDetails(props.data)}><i className="fa fa-eye"></i></Link>
                            </div>
        </div>
    </div>
</div>
  )
}

export default CommonPost;
