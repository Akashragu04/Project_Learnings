import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import CostCenterForm from './CostCenterForm';

const EditCostCenterMaster = (props?:any) => {
    const getFieldData:any = {
        id:props.resData.id,
        costcenter:props.resData.costcenter,
        team:props.resData.team,
        team_group:props.resData.team_group
    }
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
            title={"Edit Cost Centre"}
        >
            <CostCenterForm getFieldData={getFieldData} handleClose={props.closeOpenEditForm} onSubmit={props.onEditSubmitCostCentre}/>
        </AppDialog>
  )
}

export default EditCostCenterMaster;