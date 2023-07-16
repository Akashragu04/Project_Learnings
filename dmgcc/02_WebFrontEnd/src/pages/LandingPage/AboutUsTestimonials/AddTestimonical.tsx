import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import TestimanicalForm from './TestimanicalForm';

const AddTestimonical = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            customername:'',
            description:'',
            cover_image:'',
            rating:''
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
      title={"Add Testimonical"}
  >
      {
          getInitilValues?
          <TestimanicalForm getInitilValues={getInitilValues} handleClose={props.closeOpenAddContentForm} 
          reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit}/>    
          :null
      }
      
      </AppDialog>
  )
}

export default AddTestimonical