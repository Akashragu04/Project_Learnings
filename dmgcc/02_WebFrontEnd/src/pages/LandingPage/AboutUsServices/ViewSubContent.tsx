import React from 'react'
import AppDialog from '@crema/core/AppDialog'
import { Fonts } from "shared/constants/AppEnums";
import { SubContentForm } from './SubContentForm';

export const ViewSubContent = (props:any) => {
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
    open={props.openEditForm}
    onClose={() => props.generalCloseEditAction()}
    title={"View Main Content"}
>
    {
        props.getInitilValues?
        <SubContentForm getInitilValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} 
        onSubmit={props.onSubmit} showViewContent={showViewContent}/>    
        :null
    }
    
    </AppDialog>
  )
}
