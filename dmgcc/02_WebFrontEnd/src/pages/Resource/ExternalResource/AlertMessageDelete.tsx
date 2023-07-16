import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Box, Typography, Button } from '@mui/material';

const AlertMessageDelete = (props?: any) => {
    const goBack = () => {
        props.closeResourceView()
    }
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 600,
                    width: "100%",
                    height: 180
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.showDeleteResource}
            onClose={() => props.closeResourceView()}
            title={"Delete Resource"}
        >
            <Box>
                <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant='h4' component='div'>
                    Are you sure want to Delete?
                </Typography>
                <Box sx={{ pt: 8, textAlign: "center", }} >

                    <Button sx={{
                        position: "relative",
                        minWidth: 100,
                        marginRight: 2
                    }}
                        variant="contained"
                        color="inherit"
                        type="button"
                        onClick={() => {
                            goBack()
                        }}
                    >  Cancel </Button>
                    <Button sx={{
                        position: "relative",
                        minWidth: 100,
                        marginRight: 2
                    }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={props.confirmDeleteResource}
                    >  Submit </Button>
                </Box>
            </Box>
        </AppDialog>
    )
}

export default AlertMessageDelete;