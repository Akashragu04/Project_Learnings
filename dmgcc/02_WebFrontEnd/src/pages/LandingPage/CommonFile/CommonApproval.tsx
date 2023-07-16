import AppDialog from '@crema/core/AppDialog'
import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";

const CommonApproval = (props:any) => {
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 500,
            width: "100%",
            height: 200
        },
        "& .MuiTypography-h6": {
            fontWeight: Fonts.SEMI_BOLD,
            backgroundColor: "#00677F",
            color: "#ffffff"
        },
    }}
    dividers
    open={props.onOpenAlert}
    onClose={() => props.onCloseAlert()}
    title={"Confirm Approval"}
>
    <Typography
        component="h2"
        sx={{
            color: (theme) => theme.palette.text.primary,
            fontSize: 20
        }}
    >
        Are you sure want to approval?
    </Typography>
    <Box sx={{ pt: 10, textAlign: "right", marginBottom: 3 }} >

        <Button sx={{
            position: "relative",
            minWidth: 100,
            marginRight: 2
        }}
            variant="contained"
            color="inherit"
            type="button"
            onClick={() => {
                props.onCloseAlert()
            }}
        >  Cancel </Button>
        <Button sx={{
            position: "relative",
            minWidth: 100,
            marginRight: 2
        }}
            variant="contained"
            color="primary"
            onClick={() => {
                props.onConfirmApproval()
            }}
        >  Okay </Button>
    </Box>
</AppDialog>
  )
}

export default CommonApproval