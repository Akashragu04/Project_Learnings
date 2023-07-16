import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { AddCircle } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import AddMission from './AddMission';
import EditMission from './EditMission';
import { connect } from 'react-redux';
import { reqMissionVisionData, reqCommonUpload, reqClearState, reqPostMissionVisionData } from 'saga/Actions/aboutus.action';
// import { reqClearState, reqCommonUpload, reqMissionVisionData, reqPostMissionVisionData } from 'saga/Actions';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});
const AboutUsMission = (props:any) => {
  const classes = useStyles();
  const [openAddForm, setOpenAddForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [openMissionInfo, setOpenMissionInfo] = React.useState<any>(null)
  
  
  React.useEffect(()=>{
    if(props.resPostMissionVisionData && props.resPostMissionVisionData.status === true){
      props.reqClearState()
      onCloseAddForm()
      onCloseEditForm()
      props.reqMissionVisionData('MISSION')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.resPostMissionVisionData])

  React.useEffect(()=>{
props.reqMissionVisionData('MISSION')
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const onOpenAddForm = () =>{
    setOpenAddForm(true)
  }

  const onCloseAddForm = () =>{
    setOpenAddForm(false)
  }
  
  const onOpenEditForm = (getEditData?:any) =>{
    setOpenMissionInfo(getEditData)
    setOpenEditForm(true)
  }

  const onCloseEditForm = () =>{
    setOpenEditForm(false)
  }

  const onSubmitMission = (getData?:any) =>{
    if(getData){
      props.reqPostMissionVisionData(getData)
    }
  }
  
  const onSubmitEditMission = (getData?:any) =>{
    if(getData){
      props.reqPostMissionVisionData(getData)
    }    
  }

  return (
    <React.Fragment> 
      {openAddForm?
        <AddMission openAddForm={openAddForm} onCloseAddForm={onCloseAddForm} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitMission}/>:null
      }   
        
      {openEditForm && openMissionInfo?
        <EditMission openEditForm={openEditForm} onCloseEditForm={onCloseEditForm} reqCommonUpload={props.reqCommonUpload} 
        resCommonUpload={props.resCommonUpload} onSubmit={onSubmitEditMission} getInitilValues={openMissionInfo}/>:null
      }
      <BreadcrumbsData menuList={breadCrumbValues}/>
      {(props.resMissionVisionData && props.resMissionVisionData.length)?null:  
    <Box sx={{ textAlign: "right", marginBottom: 5 }}>
        <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
          Create New Vission
        </Button>
      </Box>}
      {
        props.resMissionVisionData && props.resMissionVisionData.length?
        props.resMissionVisionData.map((items:any, index?:any)=>(
          <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root} key={index}>
          <Box sx={{ textAlign: "right", marginBottom: 5 }}>
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={()=>onOpenEditForm(items)} className="hideoption">
              Update Mission
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} >
              <Box sx={{ lineHeight: 2 }}>{items.description}</Box>
            </Grid>
            <Grid item xs={12} md={12} >
                  <Box sx={{ width: '100%', height: '400px' }}>
                  <img style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: 10, marginTop: 3 }} 
                src={items.supporting_files?items.supporting_files.supporting_files_url:'../assets/images/bg.jpg'} alt="" />
                  </Box>
                </Grid>
            </Grid>
            </Box>
        ))       
        :null
      }
   
      </React.Fragment>
  )
}
const breadCrumbValues = {
  title: 'Mission',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description:''
}

const mapStateToProps = (state) => {
  return {
    resMissionVisionData: state.aboutUsDetails.resMissionVisionData,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resPostMissionVisionData:state.aboutUsDetails.resPostMissionVisionData
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqMissionVisionData: (postURL?: any) => dispatch(reqMissionVisionData(postURL)),
    reqCommonUpload: (getUpload?: any) => dispatch(reqCommonUpload(getUpload)),
    reqClearState: () => dispatch(reqClearState()),
    reqPostMissionVisionData:(postValues?:any)=>dispatch(reqPostMissionVisionData(postValues))
    
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsMission)
// export default AboutUsMission
