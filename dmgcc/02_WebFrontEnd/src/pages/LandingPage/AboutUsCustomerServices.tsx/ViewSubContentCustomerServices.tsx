import React from 'react'
import AppDialog from '@crema/core/AppDialog'
import { Fonts } from "shared/constants/AppEnums";
import CommonSubContentForm from '../CommonFile/CommonSubContentForm';

const ViewSubContentCustomerServices = (props:any) => {
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
        <CommonSubContentForm getInitilContentValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} 
        onSubmit={props.onSubmit} showViewContent={showViewContent}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default ViewSubContentCustomerServices;