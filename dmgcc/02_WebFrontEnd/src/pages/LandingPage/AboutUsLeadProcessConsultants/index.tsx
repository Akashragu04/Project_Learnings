import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Grid, Typography, } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { makeStyles } from '@mui/styles';
import { CommonDataTable } from '../CommonFile/CommonDataTable';
import { ActionTypes } from 'saga/sagas/Types';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import AddMainContentLeanProcess from './AddMainContentLeanProcess';
import AddSubContentLeanProcess from './AddSubContentLeanProcess';
import ViewLeanProcess from './ViewLeanProcess';
import EditSubContentLeanProcess from './EditSubContentLeanProcess';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditMainContentLeanProcess from './EditMainContentLeanProcess';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions/aboutus.action';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsLeadProcessConsultants = (props:any) => {
  const [getOpenForm, setOpenForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const classes = useStyles();
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getLeadProcessTable, setLeadProcessTable] = React.useState<any>(null)

  React.useEffect(()=>{
    onGetLeadProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenEditForm()
      closeOpenAddForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      onGetLeadProcess()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      generalCloseEditAction()
      props.reqClearState()
      onGetLeadProcess()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      onGetLeadProcess()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  const onOpenAddForm = () => {
    setOpenForm(true)
  }

  const closeOpenAddForm = () => {
    setOpenForm(false)
  }

  const onOpenEditForm = () => {
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
  const onSubmiAdd = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postLeadProcessURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }
 
  const onSubmitSubCntEdit = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.putLeadProcessSubcntURL}`,
        data: [getProjectDetails]
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitSubCntAdd = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postLeadProcessSubCntURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

   const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.deleteLeadProcessSubCntURL}${getProductInfo.id}`
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
    setLeadProcessTable(brochureColumns)
  }

  const onGetLeadProcess = () =>{
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getLeadProcessURL}`)
    props.reqCommonSubContentGet(`${ConfigAPI.getLeadProcessSubCntURL}`)
  }
  
  return (
    <React.Fragment>
           {
        getOpenForm ?
          <AddMainContentLeanProcess openAddForm={getOpenForm} closeOpenAddForm={closeOpenAddForm} onSubmit={onSubmiAdd} />
          : null
      }
      {getOpenEditForm && props.restCommonGet?
        <EditMainContentLeanProcess openEditForm={getOpenEditForm} getInitilValues={props.restCommonGet} 
        onCloseEdit={closeOpenEditForm} onSubmit={onSubmiAdd}/>
        :null
      }
      {openAddContentForm ?
        <AddSubContentLeanProcess openAddContentForm={openAddContentForm} 
        closeOpenAddContentForm={closeOpenAddContentForm} onSubmit={onSubmitSubCntAdd} />
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewLeanProcess getInitilValues={getProductInfo} openEditForm={openViewContentForm} 
        generalCloseEditAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditSubContentLeanProcess getInitilValues={getProductInfo} openEditForm={openEditContentForm} 
          generalCloseEditAction={generalCloseEditAction} onSubmit={onSubmitSubCntEdit} />
          : null
      }

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} 
        generalCloseDeleteAction={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }
      
    <BreadcrumbsData menuList={breadCrumbValues}/>
<Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            props.restCommonGet?
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenEditForm} className="hideoption">
            Update Lead Process Main Content
          </Button>
            :
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
            Create Lead Process Main Content
          </Button>
          }
         
        </Box>
        <Grid container spacing={3}>
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
            <Box sx={{ lineHeight: 2 }}>{props.restCommonGet?props.restCommonGet.description:null}</Box>
          </Grid>
          <Grid item xs={12} md={12} >
          <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
            Add Lead Process Sub Content
          </Button>
        </Box>
        {
          props.restCommonSubContentGet?
          <CommonDataTable generalViewAction={generalViewAction} generalEditAction={generalEditAction} 
            generalDeleteAction={generalDeleteAction} putTableData={props.restCommonSubContentGet} putTableHeader={getLeadProcessTable}/>
          :null
        }
          </Grid>
          </Grid>
          </Box>
          
 </React.Fragment>
)
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
  reqCommonSubContentGet: (getPostURL?: any) => dispatch(reqCommonSubContentGet(getPostURL)),
}
}
const breadCrumbValues = {
  title: 'Lead Process Consultants',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description:''
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsLeadProcessConsultants)