import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import IOMappingForm from './IOMappingForm';

const EditIOMapping = (props?: any) => {
    const getFieldData: any = {
        ionumbermapped: [{
        year: "",
        order_id: '',
    }]}
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
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
            onClose={() => props.closeOpenEditForm()}
            title={`Add IO Number - ${props.resData?.project_name}`}
        >
            <IOMappingForm projectResponse={props.resData} getFieldData={getFieldData} handleClose={props.closeOpenEditForm} onSubmit={props.onEditSubmitIOMapping} />
        </AppDialog>
    )
}

export default EditIOMapping;