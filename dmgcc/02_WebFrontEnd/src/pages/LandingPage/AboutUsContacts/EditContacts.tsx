import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import ContectsForm from './ContectsForm';

const EditContacts = (props:any) => {
    
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
      title={"Update Employee Details"}
  >
      {
          props.getInitilValues?
          <ContectsForm getInitilValues={props.getInitilValues} handleClose={props.generalCloseEditAction}
          reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit} showViewContent={false}/>    
          :null
      }
      
      </AppDialog>
  )
}

export default EditContacts