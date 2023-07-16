import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Grid, Typography, } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { makeStyles } from '@mui/styles';
import { CommonDataTable } from '../CommonFile/CommonDataTable';
import { ActionTypes } from 'saga/sagas/Types';
import AddMainContentCostEngineering from './AddMainContentCostEngineering';
import AddSubContentCostEngineering from './AddSubContentCostEngineering';
import ViewCostEngineering from './ViewCostEngineering';
import EditSubContentCostEngineering from './EditSubContentCostEngineering';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ConfigAPI } from 'services/config';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete, reqCommonSubContentPost, reqCommonSubContentPut, reqCommonSubContentGet, reqCommonSubContentDelete } from 'saga/Actions';
import EditMainContentCostEngineering from './EditMainContentCostEngineering';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonSubContentPost, reqCommonSubContentPut, reqCommonSubContentGet, reqCommonSubContentDelete } from 'saga/Actions/aboutus.action';


const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsCostEngineering = (props: any) => {
  const [getOpenForm, setOpenForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const classes = useStyles();
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getGridTableData, setGridTableData] = React.useState<any>(null)
  const [getEditMainContent, setEditMainContent] = React.useState<any>(null)
  let postURL: any = `${ConfigAPI.getCostEngineeringMainContentURL}`
  let postSubContentURL:any =`${ConfigAPI.getCostSubContentURL}`

  React.useEffect(() => {
    getRoleBased()
    props.reqCommonGet(postURL)
    props.reqCommonSubContentGet(postSubContentURL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenAddForm()
      closeOpenEditForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      getRoleBased()
      props.reqCommonGet(postURL)
      props.reqCommonSubContentGet(postSubContentURL)
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      generalCloseEditAction()
      props.reqClearState()
      getRoleBased()
      props.reqCommonGet(postURL)
      props.reqCommonSubContentGet(postSubContentURL)
    }

    if (props.resCommonDelete && props.resCommonDelete.status === true) {
      generalCloseDeleteAction()
      props.reqClearState()
      getRoleBased()
      props.reqCommonGet(postURL)
      props.reqCommonSubContentGet(postSubContentURL)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  const onOpenAddForm = () => {
    setOpenForm(true)
  }

  const closeOpenAddForm = () => {
    setOpenForm(false)
  }

  const onOpenEditForm = (getData?:any) => {
    setEditMainContent(getData)
    setOpenEditForm(true)
  }

  const closeOpenEditForm = () => {
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
  const onSubmiAddproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.costEngineeringMainContentURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitEditproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.costEngineeringMainContentURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.costEngineeringDeleteSubcontentURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }
  const getRoleBased = () => {
    const brochureColumns: any = [
      {
        field: 'title',
        headerName: 'Title',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
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
            key={`${params.row}_edit`}
            icon={<EditIcon />}
            label='Edit'
            onClick={() => generalEditAction(params.row)}
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
    setGridTableData(brochureColumns)
  }
  
  const onSubmitSubContent = (getData?:any) =>{
    if (getData) {
      let postValues: any = {
        url: `${ConfigAPI.postCostEngineerSubContentURL}`,
        data: getData
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitEditSubContent = (getData?:any) =>{
    if (getData) {
      let postValues: any = {
        url: `${ConfigAPI.costEngineeringUpdateURL}`,
        data: [getData]
      }
      props.reqCommonPost(postValues)
    }
  }

  return (
    <React.Fragment>
      {
        getOpenForm ?
          <AddMainContentCostEngineering openAddForm={getOpenForm} closeOpenAddForm={closeOpenAddForm} onSubmit={onSubmiAddproduct} />
          : null
      }
      {getOpenEditForm && getEditMainContent?
        <EditMainContentCostEngineering getInitilValues={getEditMainContent} onSubmit={onSubmitEditproduct} openEditForm={getEditMainContent} onCloseEditAction={closeOpenEditForm}/>
        :null
      }
      {openAddContentForm ?
        <AddSubContentCostEngineering openAddContentForm={openAddContentForm} closeOpenAddContentForm={closeOpenAddContentForm} onSubmit={onSubmitSubContent}/>
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewCostEngineering getInitilValues={getProductInfo} openEditForm={openViewContentForm} generalCloseEditAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditSubContentCostEngineering getInitilValues={getProductInfo} openEditForm={openEditContentForm} generalCloseEditAction={generalCloseEditAction} onSubmit={onSubmitEditSubContent} />
          : null
      }

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }

      <BreadcrumbsData menuList={breadCrumbValues} />
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
      {
            props.restCommonGet?null: <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
            Add Cost Engineering Main Content
          </Button>}
          {
            props.restCommonGet?
          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={()=>onOpenEditForm(props.restCommonGet)} className="hideoption">
            Update Cost Engineering Main Content
          </Button>:null
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
                    {props.restCommonGet?props.restCommonGet.title:null}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} >
                  <Box sx={{ lineHeight: 2 }}> {props.restCommonGet?props.restCommonGet.description:null}</Box>
                </Grid>
              </React.Fragment>
              : null
          }

          <Grid item xs={12} md={12} >
            <Box sx={{ textAlign: "right", marginBottom: 5 }}>
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
                Add Cost Engineering Sub Content
              </Button>
            </Box>
            {
              getGridTableData && props.restCommonSubContentGet ?
                <CommonDataTable generalViewAction={generalViewAction} generalEditAction={generalEditAction}
                  generalDeleteAction={generalDeleteAction} putTableData={props.restCommonSubContentGet} putTableHeader={getGridTableData} />
                : null
            }

          </Grid>
        </Grid>
      </Box>

    </React.Fragment>
  )
}


const mapStateToProps = (state) => {
  return {
    restCommonGet: state.othersReducer.resCommonViewData,
    resCommonPost: state.aboutUsDetails.resCommonPost,
    resCommonPut: state.aboutUsDetails.resCommonPut,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resCommonDelete: state.aboutUsDetails.resCommonDelete,
    restCommonSubContentGet:state.aboutUsDetails.restCommonSubContentGet
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
    reqCommonSubContentPost: (getPostURL?: any) => dispatch(reqCommonSubContentPost(getPostURL)),
    reqCommonSubContentPut: (getPostURL?: any) => dispatch(reqCommonSubContentPut(getPostURL)),
    reqCommonSubContentGet: (getPostURL?: any) => dispatch(reqCommonSubContentGet(getPostURL)),
    reqCommonSubContentDelete: (getPostURL?: any) => dispatch(reqCommonSubContentDelete(getPostURL))
  }
}
const breadCrumbValues = {
  title: 'Cost Engineering',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsCostEngineering)
