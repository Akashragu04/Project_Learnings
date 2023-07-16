import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import EditUserManagerForm from './EditUserManagerForm';

export const EditUserManagement = (props?:any) => {
    const [getUserRoleMapping, setUserRole]= React.useState<any>(null);
    const [getUserInfoData, setUserInfoData]= React.useState({});

React.useEffect(()=>{
    if(props.getUserRoleData && props.userMngInfo){
      let getUserInfo:any =  props.getUserRoleData.find((items)=> items.name === props.userMngInfo.rolename);
      if(getUserInfo && props.userMngInfo){
        setUserInfoData(props.userMngInfo)
          let postValues:any = {
            role_id:getUserInfo.id,
            user_id:props.userMngInfo.shortid
          }
          setUserRole(postValues)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
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
    open={props.openEditForm}
    onClose={() => props.closeOpenEditForm()}
    title={"Map User Role"}
>
    {
        getUserRoleMapping?
        <EditUserManagerForm getFieldData={getUserRoleMapping} handleClose={props.closeOpenEditForm} 
        onSubmit={props.onSubmitEditUserManagement} getNonUserList={props.getNonUserList} getUserRoleData={props.getUserRoleData} 
        getUserInfoData={getUserInfoData}/>    
        :null
    }
    
</AppDialog>
  )
}
