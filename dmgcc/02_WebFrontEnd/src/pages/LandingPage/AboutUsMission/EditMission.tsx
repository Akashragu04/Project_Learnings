import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import MissionForm from './MissionForm';

const EditMission = (props:any) => {
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
    onClose={() => props.onCloseEditForm()}
    title={"Update Mission"}
>
    {
        props.getInitilValues?
        <MissionForm getInitilValues={ props.getInitilValues} handleClose={props.onCloseEditForm} 
        onSubmit={props.onSubmit} showViewContent={false} reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditMission;