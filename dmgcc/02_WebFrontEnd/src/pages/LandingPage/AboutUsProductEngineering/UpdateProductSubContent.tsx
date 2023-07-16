import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import SubContentForm from './SubContentForm';

const UpdateProductSubContent = (props: any) => {
    const [getInitilContentValues, setInitilContentvalues] = React.useState<any>(null)

    React.useEffect(() => {
        const getFieldData: any = {
            title: '',
            sub_list: [
                {
                    content: ''
                }
            ]
        }
        setInitilContentvalues(getFieldData)
    }, [])

    const goBack = () =>{
props.closeOpenAddContentForm()
    } 
    
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
        title={"Create Product Engineering - Sub Content"}
    >
       <SubContentForm getInitilContentValues={getInitilContentValues} goBack={goBack} showViewContent={false} onSubmit={props.onSubmit}/>
            </AppDialog>
            )
}

            export default UpdateProductSubContent;