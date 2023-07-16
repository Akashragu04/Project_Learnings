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
// import Iframe from 'react-iframe'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const downloadFile = (getURL: any) => {
    window.open(getURL, '_blank')
}

const ViewNewsLetter = (props?: any) => {
    const [geDownloadFile, setDownloadFiles] = React.useState<any>('')
    // let classes: any = useStyles();
    const [getViewPDFFile, setViewPDFFile] = React.useState<any>('')

    React.useEffect(() => {
        if (props.openNewsLetterDetails && props.openNewsLetterDetails.newsletter_file) {
            setDownloadFiles(props.openNewsLetterDetails.newsletter_file.supporting_file_view_url)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(()=>{
        if(props.getViewBrochureData){
            const test = new Blob([props.getViewBrochureData], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(test);
        setViewPDFFile(fileURL)
        }
    },[props.getViewBrochureData])

    return (
        <React.Fragment>
            <Dialog
                open={props.onOpen}
                fullScreen
                maxWidth="xl"
                onClose={props.onCloseNewsLetterDetails}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', background: '#00677f' }}>
                    <Toolbar>
                        <Typography sx={{ flex: 1 }} variant="h3" component="div">
                            Newsletter Details
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.onCloseNewsLetterDetails}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ margin: 2 }}>
                    <Typography sx={{ ml: 2, flex: 1, mt: 2, mb:2 }} variant="h2" component="div">
                    {props.openNewsLetterDetails ? props.openNewsLetterDetails.title : '-'}
                    </Typography>

                    <Box sx={{ paddingLeft: 2, mb:2 }}>
                        {props.openNewsLetterDetails ? props.openNewsLetterDetails.description : '-'}
                    </Box>
                    <Box sx={{marginTop:2}}>
                    {
                        getViewPDFFile ?
                        <React.Fragment>
                          <iframe src={getViewPDFFile}
                        width="100%"
                        height="600"
                        title='text'
                       />
                        </React.Fragment>
                   
                        :null
                    }
                    </Box>
                    <Typography sx={{ ml: 2, flex: 1, mt: 2, fontSize: 18 }} variant="h4" component="div">
                        Download Newsletter
                    </Typography>
                    <Box sx={{ paddingLeft: 2 }}>
                        <Box onClick={() => downloadFile(geDownloadFile)} className="pointer">
                            <SystemUpdateAltIcon sx={{ mt: 2 }} />
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}

export default ViewNewsLetter;