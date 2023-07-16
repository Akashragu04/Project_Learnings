import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { VisionForm } from './VisionForm';

const AddVission = (props:any) => {
    const [getInitilContentValues, setInitilContentvalues] = React.useState<any>(null)

    React.useEffect(() => {
        const getFieldData: any = {
            title: '',
            description:'',
            model_name: "VISION",
            supporting_files: {}
        }
        setInitilContentvalues(getFieldData)
    }, [])
   
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
    open={props.openAddForm}
    onClose={() => props.onCloseAddForm()}
    title={"Add Vision"}
>
    {
        getInitilContentValues?
        <VisionForm getInitilValues={getInitilContentValues} handleClose={props.onCloseAddForm} onSubmit={props.onSubmit} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} showViewContent={false}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default AddVission;