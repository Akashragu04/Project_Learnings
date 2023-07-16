import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { AddCircle } from "@mui/icons-material";
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import AddInformationTech from './AddInformationTech';
import { EditInfomationTech } from './EditInfomationTech';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { ConfigAPI } from 'services/config';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete } from 'saga/Actions/aboutus.action';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsInformationTechnology = (props: any) => {
  const classes = useStyles();
  const [getOpenAddForm, setOpenAddForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)

  React.useEffect(() => {
    onGetInformationTech()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      onCloseEditForm()
      onCloseForm()
      props.reqClearState()
      onGetInformationTech()
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      onCloseEditForm()
      props.reqClearState()
      onGetInformationTech()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  const onGetInformationTech = () => {
    props.reqCommonGet(`${ConfigAPI.getITMainContentURL}`)
  }
  const onOpenForm = () => {
    setOpenAddForm(true)
  }

  const onCloseForm = () => {
    setOpenAddForm(false)
  }

  const onOpenEditForm = () => {
    setOpenEditForm(true)
  }

  const onCloseEditForm = () => {
    setOpenEditForm(false)
  }

  const onSubmit = (getPostData?: any) => {
    if (getPostData) {
      let postValues: any = {
        url: `${ConfigAPI.postITMainContentURL}`,
        data: getPostData
      }
      props.reqCommonPost(postValues)
    }
  }
const onDeleteSubLine = (getData?:any) =>{
  if(getData){
    let postURL:any = `${ConfigAPI.deleteITMainContent}${getData.id}`
    props.reqCommonDelete(postURL)
  }
}

  return (
    <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {
        getOpenAddForm ?
          <AddInformationTech openAddForm={getOpenAddForm} closeOpenAddForm={onCloseForm} onSubmit={onSubmit} />
          : null
      }
      {getOpenEditForm && props.restCommonGet?
        <EditInfomationTech getInitilValues={props.restCommonGet} openAddForm={getOpenEditForm}
          closeOpenAddForm={onCloseEditForm} onSubmit={onSubmit} onDeleteSubLine={onDeleteSubLine}/>
        : null
      }
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            props.restCommonGet ?
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenEditForm} className="hideoption">
                Update Information Technolory
              </Button>
              :
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenForm} className="hideoption">
                Add Information Technolory
              </Button>
          }

        </Box>
        <Grid container spacing={3}>
          {
            props.restCommonGet ?
              <React.Fragment>
                <Grid item xs={12} md={12} >
                  <Typography
                    component="h2"
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 20
                    }}
                  >
                    {props.restCommonGet.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} >
                  <Box sx={{ lineHeight: 2 }}>
                    {props.restCommonGet.description}</Box>
                </Grid>
                <Grid item xs={12} md={12} >
                  <Box sx={{ lineHeight: 2, paddingLeft: 5 }}>
                    <ul>
                      {props.restCommonGet && props.restCommonGet.sub_list ?
                        props.restCommonGet.sub_list.map((items: any, index?: any) => (
                          <li>{items.content}</li>
                        ))

                        : null}
                    </ul>
                  </Box>
                </Grid>
              </React.Fragment>
              : null
          }

        </Grid>
      </Box>
    </React.Fragment>
  )
}
const breadCrumbValues = {
  title: 'Information Technology',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}

const mapStateToProps = (state) => {
  return {
    restCommonGet: state.othersReducer.resCommonViewData,
    resCommonPost: state.aboutUsDetails.resCommonPost,
    resCommonPut: state.aboutUsDetails.resCommonPut,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resCommonDelete: state.aboutUsDetails.resCommonDelete,
  }
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqCommonUpload: (getPostURL?: any) => dispatch(reqCommonUpload(getPostURL)),
    reqCommonPost: (getPostURL?: any) => dispatch(reqCommonPost(getPostURL)),
    reqCommonPut: (getPostURL?: any) => dispatch(reqCommonPut(getPostURL)),
    reqCommonGet: (getPostURL?: any) => dispatch(reqCommonGet(getPostURL)),
    reqClearState: () => dispatch(reqClearState()),
    reqCommonDelete: (getPostURL?: any) => dispatch(reqCommonDelete(getPostURL)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutUsInformationTechnology)
