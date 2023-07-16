import React from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Button, Typography } from '@mui/material';
import ContentForm from './ContentForm';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddContent = (props:any) => {
    const [getInitialValue, setInitialValue] = React.useState(null);

    React.useEffect(()=>{
let postvalues:any = { title: '', description: '', coverImage: '', newsletter: '' }
setInitialValue(postvalues)
    },[])
  return (
    <React.Fragment>
    <Dialog
        fullScreen
        open={props.onOpenContent}
        onClose={props.onCloseContent}
        TransitionComponent={Transition}
    >
        <AppBar sx={{ position: 'relative', background: '#00677f' }}>
            <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                    Add Content
                </Typography>
                <Button autoFocus color="inherit" onClick={props.onCloseContent}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.onCloseContent}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Button>
            </Toolbar>
        </AppBar>
        {
            getInitialValue?
            <ContentForm initialValues={getInitialValue} reqCommonUpload={props.reqCommonUpload} 
            resCommonUpload={props.resCommonUpload} onClose={props.onCloseContent} onSubmit={props.onSubmit} showViewContent={false}/>
            
            :null
        }
        </Dialog>

</React.Fragment>
  )
}

export default AddContent