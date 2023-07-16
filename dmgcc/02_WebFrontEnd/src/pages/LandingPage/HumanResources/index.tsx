import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { AddCircle } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { GridActionsCellItem } from "@mui/x-data-grid";
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import PreviewIcon from '@mui/icons-material/Preview';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import AddMainContentHumanResources from './AddMainContentHumanResources';
import EditMainContentHumanResources from './EditMainContentHumanResources';
import { CommonDataTable } from '../CommonFile/CommonDataTable';
import { ActionTypes } from 'saga/sagas/Types';
import AddSubContentHumanResources from './AddSubContentHumanResources';
import ViewSubContentHumanResources from './ViewSubContentHumanResources';
import EditSubContentHumanResources from './EditSubContentHumanResources';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions/aboutus.action';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const HumanResources = (props: any) => {
  const classes = useStyles();
  const [getOpenAddForm, setOpenAddForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getHumanResourceHeader, setHumanResourceHeader] = React.useState<any>(null)
  const [getHumanResourceData, setHumanResourceData] = React.useState<any>(null)

  React.useEffect(() => {
    onGetHumanResourceData()
    getHumanSubCnt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      onCloseEditForm()
      onCloseForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      onGetHumanResourceData()
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      generalCloseEditAction()
      props.reqClearState()
      onGetHumanResourceData()
      getHumanSubCnt()
    }

    if (props.resCommonDelete && props.resCommonDelete.status === true) {
      generalCloseDeleteAction()
      props.reqClearState()
      onGetHumanResourceData()
      getHumanSubCnt()
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  const getHumanSubCnt = ()=>{
    if (props.restCommonSubContentGet && props.restCommonSubContentGet.length) {
      let getHumanResource: any = []
      props.restCommonSubContentGet.forEach((items: any) => {
        if (items && items.sub_list) {
          items.sub_list.forEach((item: any) => {
            getHumanResource.push(item)
          })
        }
      })
      setHumanResourceData(getHumanResource)
    }
  }
  const onGetHumanResourceData = () => {
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getHumanResourceMainCntURL}`)
    props.reqCommonSubContentGet(`${ConfigAPI.getHumanResourceSubCntURL}`)
  }
  const getRoleBased = () => {
    const brochureColumns: any = [
      {
        field: 'content',
        headerName: 'Title',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 450,
        roleTypes: "common"
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        type: 'actions',
        roleTypes: RoutePermittedRole.Business,
        getActions: (params) => [
          <GridActionsCellItem
            key={`${params.row}_view`}
            icon={<PreviewIcon />}
            label='View'
            onClick={() => generalViewAction(params.row)}
          />,
          <GridActionsCellItem
            key={`${params.row}_delete`}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => generalDeleteAction(params.row)}
          />,

        ]
      }
    ];
    setHumanResourceHeader(brochureColumns)
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

  const closeOpenAddContentForm = () => {
    setOpenAddContentForm(false)
  }

  const onOpenAddContentForm = () => {
    setOpenAddContentForm(true)
  }

  const generalEditAction = (getEditValues?: any) => {
    setProductInfo(getEditValues)
    setOpenEditContentForm(true)
  }


  const generalViewAction = (getEditValues?: any) => {
    setProductInfo(getEditValues)
    setOpenViewContentForm(true)
  }

  const generalDeleteAction = (getEditValues?: any) => {
    setProductInfo(getEditValues)
    setOpenDeleteContentForm(true)
  }


  const generalCloseEditAction = () => {
    setOpenEditContentForm(false)
  }


  const generalCloseViewAction = () => {
    setOpenViewContentForm(false)
  }

  const generalCloseDeleteAction = () => {
    setOpenDeleteContentForm(false)
  }
  const onSubmiAddMainCnt = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.postHumanResourceURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitSubCntEdit = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.putHumanResourceSubCntURL,
        data: [getProjectDetails]
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitSubCntAdd = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.postSubcntHumanResourceURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onConfirmDelete = () => {
    if (getProductInfo) {
      let postURL: any = `${ConfigAPI.deleteSubCntHumanResourceURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }
  
  return (
    <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {
        getOpenAddForm ?
          <AddMainContentHumanResources openAddForm={getOpenAddForm} closeOpenAddForm={onCloseForm} onSubmit={onSubmiAddMainCnt} />
          : null
      }
      {getOpenEditForm && props.restCommonGet ?
        <EditMainContentHumanResources getInitilValues={props.restCommonGet} openAddForm={getOpenEditForm}
          closeOpenAddForm={onCloseEditForm} onSubmit={onSubmiAddMainCnt} />
        : null
      }
      {openAddContentForm ?
        <AddSubContentHumanResources openAddContentForm={openAddContentForm}
          closeOpenAddContentForm={closeOpenAddContentForm} onSubmit={onSubmitSubCntAdd} />
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewSubContentHumanResources getInitilValues={getProductInfo} openEditForm={openViewContentForm}
          generalCloseEditAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditSubContentHumanResources getInitilValues={getProductInfo} openEditForm={openEditContentForm}
            generalCloseEditAction={generalCloseEditAction} onSubmit={onSubmitSubCntEdit} />
          : null
      }

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm}
          generalCloseDeleteAction={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            props.restCommonGet ?
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenEditForm} className="hideoption">
                Update Human Resources Main Content
              </Button>
              :
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenForm} className="hideoption">
                Add Human Resources Main Content
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

          <Grid item xs={12} md={12} >
            <Box sx={{ textAlign: "right", marginBottom: 5 }}>
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
                Add Human Resources Sub Content
              </Button>
            </Box>
{
  getHumanResourceData && getHumanResourceData.length?
  <CommonDataTable generalViewAction={generalViewAction} generalEditAction={generalEditAction}
              generalDeleteAction={generalDeleteAction} putTableData={getHumanResourceData} putTableHeader={getHumanResourceHeader} />
  :null
}
            
          </Grid>

        </Grid>
      </Box>
    </React.Fragment>
  )
}

const breadCrumbValues = {
  title: 'Human Resources',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}



const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.profileDetails,
    businessGridData: state.businessProcess,
    restCommonGet: state.othersReducer.resCommonViewData,
    resCommonPost: state.aboutUsDetails.resCommonPost,
    resCommonPut: state.aboutUsDetails.resCommonPut,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resCommonDelete: state.aboutUsDetails.resCommonDelete,
    restCommonSubContentGet: state.aboutUsDetails.restCommonSubContentGet
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    // getBusinessCaseSetup: (getBizId?: any) => dispatch(getBusinessSetupInfo(getBizId)),
    getLeadData: (getValues?: any) => dispatch({ type: ActionTypes.GET_LEADS_REQUEST, value: getValues }),
    reqCommonUpload: (getPostURL?: any) => dispatch(reqCommonUpload(getPostURL)),
    reqCommonPost: (getPostURL?: any) => dispatch(reqCommonPost(getPostURL)),
    reqCommonPut: (getPostURL?: any) => dispatch(reqCommonPut(getPostURL)),
    reqCommonGet: (getPostURL?: any) => dispatch(reqCommonGet(getPostURL)),
    reqClearState: () => dispatch(reqClearState()),
    reqCommonDelete: (getPostURL?: any) => dispatch(reqCommonDelete(getPostURL)),
    reqCommonSubContentGet: (getPostURL?: any) => dispatch(reqCommonSubContentGet(getPostURL)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HumanResources)
