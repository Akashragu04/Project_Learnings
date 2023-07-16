import React from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Grid } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ViewContent = (props?:any) => {
    
  return (
    <React.Fragment>    
         <Dialog
                fullScreen
                open={props.onOpen}
                onClose={props.onCloseContentDetails}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', background:'#00677f' }}>
                    <Toolbar>
                        <Typography sx={{  flex: 1 }} variant="h3" component="div">
                            Content Details
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onCloseContentDetails}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{paddingLeft:4, paddingRight:4}}>
                    <Typography sx={{ ml: 2, flex: 1, mt: 2 }} variant="h4" component="div">
                    Content Title
                    </Typography>
                    <Box sx={{paddingLeft:2}}>
                        {props.openNewsLetterDetails ? props.openNewsLetterDetails.title : '-'}
                    </Box>

                    
                    <Typography sx={{ ml: 2, flex: 1, mt: 2 }} variant="h4" component="div">
                    Content Description
                    </Typography>
                    <Box sx={{paddingLeft:2}}>
                        {props.openNewsLetterDetails ? props.openNewsLetterDetails.description : '-'}
                    </Box>   
                    <Grid item xs={12} md={12} sx={{ padding: 1 }}>
                        <Typography sx={{ flex: 1, marginTop:4 }} variant="h4" component="div">
                                   View Content
                                </Typography>
                                <Box sx={{marginTop:2, border:'1px solid #ccc', padding:2, margin:2, borderRadius:2}} dangerouslySetInnerHTML={{ __html: props.openNewsLetterDetails ? props.openNewsLetterDetails.newsletter : '' }}></Box>
                        </Grid>      
                </Box>
            </Dialog>
        </React.Fragment>
  )
}
