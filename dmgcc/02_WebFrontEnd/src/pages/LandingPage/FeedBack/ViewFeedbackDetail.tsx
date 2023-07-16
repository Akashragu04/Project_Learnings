import React from 'react'
import FeedBackForm from './FeedBackForm';
import { TransitionProps } from '@mui/material/transitions';
import { AppBar, Box, Button, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewFeedbackDetail = (props:any) => {
  return (
    <Dialog
    fullScreen
    open={props.onOpen}
    onClose={props.onClose}
    TransitionComponent={Transition}
>
    <AppBar sx={{ position: 'relative', background: '#00677f' }}>
        <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                Feedback
            </Typography>
            <Button autoFocus color="inherit" onClick={props.onClose}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.onClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Button>
        </Toolbar>
    </AppBar>
    <Box sx={{margin:4}}>
    {
        props.getInitilValues?
        <FeedBackForm getInitilValues={props.getInitilValues} handleClose={props.onClose} onSubmit={props.onSubmit} 
        getUserDetails={props.getUserDetails} showViewContent={true} getProjectList={props.getProjectList}/>    
        :null
    }
    </Box>  
    </Dialog>
  )
}

export default ViewFeedbackDetail