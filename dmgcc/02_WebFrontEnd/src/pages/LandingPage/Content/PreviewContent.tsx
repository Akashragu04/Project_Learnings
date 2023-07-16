import { AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PreviewContent = (props?:any) => {
  return (
   <React.Fragment>
      <Dialog
        fullScreen
        open={props.onOpen}
        onClose={props.onClose}
        TransitionComponent={Transition}
    >
        <AppBar sx={{ position: 'relative', background: '#00677f' }}>
            <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                    Preview Content
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
    <Box sx={{marginTop:5, padding:5}} dangerouslySetInnerHTML={{ __html: props.previewContentData }}></Box>
    </Dialog>
   </React.Fragment>
  )
}

export default PreviewContent