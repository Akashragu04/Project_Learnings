import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import ContectsForm from './ContectsForm';

const AddContacts = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            name:'',
            department :'',
            coverImage:'',
            email:'',
            mobileno:''
        }
        setInitilvalues(getFieldData)
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
      open={props.openAddContentForm}
      onClose={() => props.closeOpenAddContentForm()}
      title={"Create New Employee"}
  >
      {
          getInitilValues?
          <ContectsForm getInitilValues={getInitilValues} handleClose={props.closeOpenAddContentForm} 
          reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit} showViewContent={false}/>    
          :null
      }
      
      </AppDialog>
  )
}

export default AddContacts