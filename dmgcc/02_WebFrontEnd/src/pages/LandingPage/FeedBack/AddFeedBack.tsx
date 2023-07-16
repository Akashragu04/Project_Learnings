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


const AddFeedBack = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            short_id:'',
            designation_level:'',
            department:'',
            project_name:'',
            project_id:'',
            cost_center:'',
            orgranization:'',
            quality_status:'',
            adherence_status:'',
            quality_timeLine_status:'',
            knowledge_status:'',
            responsiveness_status:'',
            communication_skills_status:'',
            overall_plan_status:'',
            sustainability_status:'',
            quality_remark:'',
            adherence_remark:'',
            quality_timeLine_remark:'',
            knowledge_remark:'',
            responsiveness_remark:'',
            communication_skills_remark:'',
            overall_plan_remark:'',
            sustainability_remark:'',
            recommend_counterpart_state:'',
            recommend_counterpart:'',
            suggestions_improvement_areas:''
        }
        setInitilvalues(getFieldData)
    },[])
    
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
        getInitilValues?
        <FeedBackForm getInitilValues={getInitilValues} handleClose={props.onClose} onSubmit={props.onSubmit} 
        getUserDetails={props.getUserDetails} showViewContent={false} getProjectList={props.getProjectList} getUserInformation={props.getUserInformation}/>    
        :null
    }
    </Box>  
    </Dialog>
  )
}

export default AddFeedBack