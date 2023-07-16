import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import NewsLetterForm from './NewsLetterForm';

const EditNewsLetter = (props:any) => {
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
    open={props.onOpen}
    onClose={() => props.onClose()}
    title={"Update Newsletter"}
>
    {
        props.getInitilValues?
        <NewsLetterForm getInitilValues={props.getInitilValues} handleClose={props.onClose} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload}  onSubmit={props.onSubmit} showViewContent={false}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditNewsLetter