import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import BrochureForm from './BrochureForm';

const ViewBrochure = (props:any) => {
    const [showViewContent, setViewContent] = React.useState(false)

    React.useEffect(()=>{
        setViewContent(true)
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
    open={props.onOpenView}
    onClose={() => props.onCloseViewAction()}
    title={"View Main Content"}
>
    {
        props.getInitilValues?
        <BrochureForm getInitilValues={ props.getInitilValues} handleClose={props.onCloseViewAction} 
        onSubmit={props.onSubmit} showViewContent={showViewContent}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default ViewBrochure