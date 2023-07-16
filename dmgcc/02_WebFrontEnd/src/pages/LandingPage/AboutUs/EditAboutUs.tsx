import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import AboutUsAddForm from './AboutUsAddForm';

const EditAboutUs = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{   
        setInitilvalues(props.getAboutUsDetails)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    open={props.openEditForm}
    onClose={() => props.onCloseEditForm()}
    title={"Update About Us"}
>
    {
        getInitilValues?
        <AboutUsAddForm getInitilValues={getInitilValues} handleClose={props.onCloseEditForm} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
    )
}

export default EditAboutUs;