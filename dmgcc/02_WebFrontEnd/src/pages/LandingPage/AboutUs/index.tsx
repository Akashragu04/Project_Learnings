import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Grid, Typography, } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AddAboutUs from './AddAboutUs';
import EditAboutUs from './EditAboutUs';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { reqAboutUsData, reqCommonUpload, reqPostAboutUsData, reqClearState, reqPutAboutUsData } from 'saga/Actions/aboutus.action';


const AboutUs = (props: any) => {
  const [openAddForm, setOpenAddForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState(false)
  const [getAboutUsDetails, setAboutUsDetails] = React.useState(null)

  React.useEffect(() => {
    props.reqAboutUsData()
    if(props.resPostAboutViewData || props.resPutAboutViewData){
      props.reqClearState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resPutAboutViewData, props.resPostAboutViewData])

  const onOpenAddForm = () => {
    setOpenAddForm(true)
  }

  const onOpenEditForm = () =>{
    setOpenEditForm(true)
    setAboutUsDetails(props.resAboutViewData)
  }

  
  const onCloseEditForm = () =>{
    setOpenEditForm(false)
    setAboutUsDetails(null)
  }

  const getFileUploadData = (getFileData?: any) => {
    props.reqCommonUpload(getFileData)
  }
  const closeOpenAddForm = () => {
    setOpenAddForm(false)
  }

  const onSubmit = (getSubmitValues?: any) => {
    props.reqPostAboutUsData(getSubmitValues)
    setOpenAddForm(false)
  }
  
  const onSubmitEdit = (getSubmitValues?: any) => {
    props.reqPutAboutUsData(getSubmitValues)
    setOpenEditForm(false)
  }

  return (
    <React.Fragment>
       <BreadcrumbsData menuList={breadCrumbValues}/>
      {
        openAddForm ?
          <AddAboutUs openAddForm={openAddForm} closeOpenAddForm={closeOpenAddForm} 
          reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onSubmit={onSubmit} />
          : null
      }
      { openEditForm && getAboutUsDetails?
        <EditAboutUs getAboutUsDetails={getAboutUsDetails} openEditForm={openEditForm} reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onCloseEditForm={onCloseEditForm} onSubmit={onSubmitEdit}/>
        :null
      }
      <Box sx={{ textAlign: "right", marginBottom: 5 }}>
        {
           props.resAboutViewData?
           <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<BrowserUpdatedIcon />} onClick={() => onOpenEditForm()} className="hideoption">
          Update About Us
        </Button>          
           : <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={() => onOpenAddForm()} className="hideoption" >
           Create About Us
         </Button>
        }
    
        
      </Box>
      {
        props.resAboutViewData && props.resAboutViewData !== null ?
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} >
              <Typography
                component="h2"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontSize: 20
                }}
              >
                {props.resAboutViewData ? props.resAboutViewData.title : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} >
              <Box sx={{}}>{props.resAboutViewData ? props.resAboutViewData.description : ""}</Box>
            </Grid>
            <Grid item xs={12} md={12} >
              <Box sx={{ width: '100%', height: '400px' }}>
                <img style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: 10, marginTop: 3 }} src={props.resAboutViewData && props.resAboutViewData.supporting_file ? props.resAboutViewData.supporting_file.supporting_files_url : '../assets/images/bg.jpg'} alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} >
              <Typography
                component="h3"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontSize: 18,
                  marginTop:2
                }}
              >
                Daimler Plant Details
              </Typography>
              <Box sx={{ borderRadius: 10, marginTop: 3, paddingLeft: 5 }}>
                <ul>
                  {
                    props.resAboutViewData && props.resAboutViewData.sub_content ?
                      props.resAboutViewData.sub_content.map((itemSubContent: any, i?: any) => (
                        <React.Fragment>
                          <li>{itemSubContent.content}</li>
                        </React.Fragment>
                      ))
                      : <Box>No Data</Box>
                  }
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} >
              <Typography
                component="h3"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontSize: 18,
                  marginTop:2
                }}
              >
                Daimler History
              </Typography>
              <Box sx={{ borderRadius: 10, marginTop: 3, paddingLeft: 5 }}>
                <ul>
                  {
                    props.resAboutViewData && props.resAboutViewData.sub_list ?
                      props.resAboutViewData.sub_list.map((itemSubList: any, i?: any) => (
                        <React.Fragment>
                          <li>{itemSubList.content}</li>
                        </React.Fragment>
                      ))
                      : <Box>No Data</Box>
                  }
                </ul>
              </Box>
            </Grid>
          </Grid>
          : <Box>No Data</Box>
      }

    </React.Fragment>
  )
}


const mapStateToProps = (state) => {
  return {
    resAboutViewData: state.aboutUsDetails.resAboutViewData,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resPostAboutViewData:state.aboutUsDetails.resPostAboutViewData,
    resPutAboutViewData:state.aboutUsDetails.resPutAboutViewData
  }
}
const breadCrumbValues = {
  title: 'About Us',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description:''
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqAboutUsData: () => dispatch(reqAboutUsData()),
    reqCommonUpload: (getUpload?: any) => dispatch(reqCommonUpload(getUpload)),
    reqPostAboutUsData: (getData?: any) => dispatch(reqPostAboutUsData(getData)),
    reqClearState: () => dispatch(reqClearState()),
    reqPutAboutUsData: (postData?:any) => dispatch(reqPutAboutUsData(postData)),
    // getLeadData: (getValues?: any) => dispatch({ type: ActionTypes.GET_LEADS_REQUEST, value: getValues }),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)
