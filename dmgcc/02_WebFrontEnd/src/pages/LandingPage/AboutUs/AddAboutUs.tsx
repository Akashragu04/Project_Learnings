import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import AboutUsAddForm from './AboutUsAddForm';

const AddAboutUs = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            title:'',
            description:'',
            supporting_file:'',
            sub_content: [
                {
                    content:''
                }
            ],
            sub_list: [
                {
                    content:''
                }
            ]
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
    open={props.openAddForm}
    onClose={() => props.closeOpenAddForm()}
    title={"Create About Us"}
>
    {
        getInitilValues?
        <AboutUsAddForm getInitilValues={getInitilValues} handleClose={props.closeOpenAddForm} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default AddAboutUs;