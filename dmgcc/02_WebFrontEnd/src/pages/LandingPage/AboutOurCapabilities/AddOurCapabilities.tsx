import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import OurCapabilitiesForm from './OurCapabilitiesForm';

const AddOurCapabilities = (props:any) => {
    const [getInitilContentValues, setInitilContentvalues] = React.useState<any>(null)

    React.useEffect(() => {
        const getFieldData: any = {
            title: '',
            description:'',
            supporting_file: {}
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
    title={"Add Capabilities"}
>
    {
        getInitilContentValues?
        <OurCapabilitiesForm getInitilValues={getInitilContentValues} handleClose={props.onCloseAddForm} 
        onSubmit={props.onSubmit} reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default AddOurCapabilities;