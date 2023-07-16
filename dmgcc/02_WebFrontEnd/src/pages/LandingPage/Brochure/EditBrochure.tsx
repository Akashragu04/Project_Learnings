import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import BrochureForm from './BrochureForm';

const EditBrochure = (props:any) => {
    const [showViewContent, setViewContent] = React.useState(false)

    React.useEffect(()=>{
        setViewContent(false)
    },[])
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 900,
            width: "100%"
        },
        "& .MuiTypography-h6": {
            fontWeight: Fonts.SEMI_BOLD,
            backgroundColor: "#00677F",
            color: "#ffffff"
        },
    }}
    dividers
    open={props.openEditForm}
    onClose={() => props.generalCloseEditAction()}
    title={"Update Broucher"}
>
    {
        props.getInitilValues?
        <BrochureForm getInitilValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload}  onSubmit={props.onSubmit} showViewContent={showViewContent}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditBrochure