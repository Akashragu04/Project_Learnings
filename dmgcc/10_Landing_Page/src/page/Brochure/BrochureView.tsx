import React from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';


//Set the styles
// const useStyles = makeStyles(() => ({
//     paper: { minWidth: "100%" },
//   }));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BrochureViewDetails = (props: any) => {
    const [geDownloadFile, setDownloadFiles] = React.useState<any>('')
    const [getViewPDFFile, setViewPDFFile] = React.useState<any>('')
    // let classes:any =useStyles();
    React.useEffect(()=>{
        if(props.openBrochureDetails && props.openBrochureDetails.brochureFile){
            setDownloadFiles(props.openBrochureDetails.brochureFile.supporting_files_url)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

React.useEffect(()=>{
    // console.log(props.getViewBrochureData)
    if(props.getViewBrochureData){
        const test = new Blob([props.getViewBrochureData], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(test);
    setViewPDFFile(fileURL)
    }
},[props.getViewBrochureData])
        
const downloadFile = (getURL: any) => {
    window.open(getURL, '_blank')
  }

    return (
        <React.Fragment>                     
            <Dialog
                // classes={{ paper: classes.paper}}
                open={props.openBrochure}
                fullScreen
                maxWidth="xl"
                onClose={props.onCloseBrochureDetails}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', background:'#00677f' }}>
                    <Toolbar>
                        <Typography sx={{ flex: 1 }} variant="h6" component="div">
                            Brochure Details
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onCloseBrochureDetails}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{margin:2}}>
                    <Typography sx={{ ml: 2, flex: 1, mt: 2, fontSize:18 }} variant="h6" component="div">
                        Brochure Title
                    </Typography>
                    <Box sx={{paddingLeft:2, mt:2}}>
                        {props.openBrochureDetails ? props.openBrochureDetails.title : '-'}
                    </Box>

                    
                    <Typography sx={{ ml: 2, flex: 1, mt: 2, fontSize:18 }} variant="h6" component="div">
                        Brochure Description
                    </Typography>
                    <Box sx={{paddingLeft:2, mt:2}}>
                        {props.openBrochureDetails ? props.openBrochureDetails.description : '-'}
                    </Box>
                    <Box sx={{marginTop:2}}>
                    {
                        getViewPDFFile ?
                        <iframe src={getViewPDFFile}
                        width="100%"
                        height="600"
                        title='text'
                       />
                        :null
                    }
                    </Box>
                   
                  
                    <Typography sx={{ ml: 2, flex: 1, mt: 2, fontSize:18 }} variant="h6" component="div">
                       Download Newsletter
                    </Typography>
                    <Box sx={{  paddingLeft: 2 }}>                 
                        <Box onClick={()=>downloadFile(geDownloadFile)} className="pointer">
                            <SystemUpdateAltIcon  sx={{mt:2, mb:2}}/>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}

export default BrochureViewDetails;
