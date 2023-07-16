import React from 'react'
import CommonSubContent from '../CommonFile/CommonSubContent'

const EditSubContentSupplierMng = (props:any) => {
  return (
    <React.Fragment>
    {
        props.getInitilValues?
        <CommonSubContent getInitilValues={props.getInitilValues} openSubContentForm={props.openSubContentForm} 
        onCloseSubContentAction={props.onClose} 
   showViewContent={props.showViewContent} title={props.title}/>
        :null
    }
   
        </React.Fragment>
  )
}

export default EditSubContentSupplierMng