import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import BrochureForm from './BrochureForm';

const AddBrochure = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)
    const [showViewContent, setViewContent] = React.useState(false)

    React.useEffect(()=>{
        const getFieldData:any = {
            title:'',
            description:'',
            supporting_file:'',
            brochureFile:''
        }
        setInitilvalues(getFieldData)
        setViewContent(false)
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
      open={props.onOpenBrochure}
      onClose={() => props.onCloseBrochure()}
      title={"Add Brochure"}
  >
      {
          getInitilValues?
          <BrochureForm getInitilValues={getInitilValues} handleClose={props.onCloseBrochure} 
          reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit} showViewContent={showViewContent}/>    
          :null
      }
      
      </AppDialog>
  )
}

export default AddBrochure