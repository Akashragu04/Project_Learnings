import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { SubContentForm } from './SubContentForm';

export const AddSubContent = (props:any) => {
    const [getInitilContentValues, setInitilContentvalues] = React.useState<any>(null)

    React.useEffect(() => {
        const getFieldData: any = {
            title: '',
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
        open={props.openAddContentForm}
        onClose={() => props.closeOpenAddContentForm()}
        title={"Add Services - Sub Content"}
    >
       <SubContentForm getInitilValues={getInitilContentValues} handleClose={props.closeOpenAddContentForm} showViewContent={false} 
       reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit}/>
            </AppDialog>
            )
}
