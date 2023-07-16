import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import IOMappingForm from './IOMappingForm';

const BizCaseAddIOMapping = (props:any) => {
    const getFieldData: any = {
        id: props.resData?.id,
        activeIoNumber: '',
    }
  return (
    <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%",
                    height: 250
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.onOpen}
            onClose={() => props.handleClose()}
            title={`Update IO Number - ${props.resData?.project_name}`}
        >
            <IOMappingForm projectResponse={props.resData} getFieldData={getFieldData} handleClose={props.handleClose} onSubmit={props.onSubmitIOMapping} />
        </AppDialog>
  )
}

export default BizCaseAddIOMapping