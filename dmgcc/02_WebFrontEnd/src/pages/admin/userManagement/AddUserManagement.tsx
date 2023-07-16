import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import AddUserManagementForm from './AddUserManagementForm';

export const AddUserManagement = (props?:any) => {
    const getFieldData:any = {      
        role_id: "",
        user_id:''      
    }
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 900,
            width: "100%",
            height:350
        },
        "& .MuiTypography-h6": {
            fontWeight: Fonts.SEMI_BOLD,
            backgroundColor: "#00677F",
            color: "#ffffff"
        },
    }}
    dividers
    open={props.openAddForm}
    onClose={() => props.closeOpenAddForm()}
    title={"Map User Role"}
>
    <AddUserManagementForm getFieldData={getFieldData} handleClose={props.closeOpenAddForm} 
    onSubmit={props.onSubmitUserManagement} getNonUserList={props.getNonUserList} getUserRoleData={props.getUserRoleData}/>
</AppDialog>
  )
}

export default AddUserManagement;