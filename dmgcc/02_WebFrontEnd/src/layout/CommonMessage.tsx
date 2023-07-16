import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';
// import Iframe from 'react-iframe'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CommonMessage = (props: any) => {
    return (
        <React.Fragment>
            <Dialog
                open={props.onOpen}
                onClose={props.onClose}
                TransitionComponent={Transition}
                PaperProps={{
                    sx: {
                        width: "100%",
                        maxWidth: "720px!important",
                    },
                }}
            >
                <AppBar sx={{ position: 'relative', background: '#00677f' }}>
                    <Toolbar>
                        <Typography sx={{ flex: 1 }} variant="h3" component="div">
                            {props.BannerDetails.title} Download
                        </Typography>
                        <Button autoFocus color="inherit" onClick={props.onClose}>
                            <CloseIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ padding: 2, marginTop:4, marginBottom:4 }}>
                    Are you sure want to {props.BannerDetails.title} Download?
                    <Box
                        sx={{
                            pt: 3,
                            textAlign: "right",
                            mt: 2
                        }}
                    >
                        <Button
                            sx={{
                                position: "relative",
                                minWidth: 100,
                                marginRight: 2,
                                background:'#00677f'
                            }}
                            variant="contained"
                            type="submit"
                        onClick={()=>props.onConfirmDownload()}
                        >
                            Okay
                        </Button>
                        <Button
                            sx={{
                                position: "relative",
                                minWidth: 100,
                                marginRight: 2
                            }}
                            variant="contained"
                            color="inherit"
                            type="button"
                            onClick={() => {
                                props.onClose()
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>

            </Dialog>
        </React.Fragment>
    )
}

export default CommonMessage;