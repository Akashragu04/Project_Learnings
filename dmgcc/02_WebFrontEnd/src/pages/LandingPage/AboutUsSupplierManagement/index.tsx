import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Grid, Typography, } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { makeStyles } from '@mui/styles';
import { CommonDataTable } from '../CommonFile/CommonDataTable';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import AddMainContentSupplierManagement from './AddMainContentSupplierManagement';
import AddSubContentSupplierManagement from './AddSubContentSupplierManagement';
import CommonSubContent from '../CommonFile/CommonSubContent';
import { ActionTypes } from 'saga/sagas/Types';
import EditSubContentSupplierMng from './EditSubContentSupplierMng';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ConfigAPI } from 'services/config';
import EditMainContentSupplierManagement from './EditMainContentSupplierManagement';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions/aboutus.action';
// import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsSupplierManagement = (props:any) => {
  const [getOpenForm, setOpenForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const classes = useStyles();
  const [getProductInfo, setProductInfo] = React.useState(null)
  const [getSupplierTableDetails, setSupplierTableDetails] = React.useState(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)

  React.useEffect(()=>{
onGetSupplierManageDetails()
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenEditForm()
      closeOpenAddForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      onGetSupplierManageDetails()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      generalCloseEditAction()
      props.reqClearState()
      onGetSupplierManageDetails()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      onGetSupplierManageDetails()

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
        url: `${ConfigAPI.postSupplierURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }
  
  const onSubmitAddSubContent = (getProjectDetails?: any) => {
    if(getProjectDetails){
      let postValues: any = {
        url: ConfigAPI.postSubCntSupplier,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    } 
  }

  const onSubmitEditproduct = (getProjectDetails?: any) => {
    if(getProjectDetails){
      let postValues: any = {
        url: ConfigAPI.putSubCntSupplier,
        data: [getProjectDetails]
      }
      props.reqCommonPost(postValues)
    } 
  }


  const onConfirmDelete = () => {

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
    setSupplierTableDetails(brochureColumns)
  }
  const onGetSupplierManageDetails = () =>{
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getSupplierDetailsURL}`)
    props.reqCommonSubContentGet(`${ConfigAPI.getSubCntSupplier}`)
  }
  return (
    <React.Fragment>
           {
        getOpenForm ?
          <AddMainContentSupplierManagement openAddForm={getOpenForm} closeOpenAddForm={closeOpenAddForm} onSubmit={onSubmiAdd} />
          : null
      }
      {openEditContentForm && getProductInfo?
        <EditSubContentSupplierMng showViewContent={openEditContentForm} getInitilValues={getProductInfo} 
        onClose={closeOpenEditForm} onSubmit={onSubmitEditproduct} />
        :null
      }
      {getOpenEditForm &&  props.restCommonGet?
        <EditMainContentSupplierManagement openEditForm={getOpenEditForm} getInitilValues={ props.restCommonGet} 
        onCloseEditAction={closeOpenEditForm} onSubmit={onSubmiAdd}/>
        :null
      }
      {openAddContentForm ?
        <AddSubContentSupplierManagement openSubContentForm={openAddContentForm} closeOpenAddContentForm={closeOpenAddContentForm}  
        showViewContent={false} onSubmit={onSubmitAddSubContent} title="Add Supplier Management"/>
        : null
      }
      {openViewContentForm && getProductInfo ?
        <CommonSubContent getInitilValues={getProductInfo} openSubContentForm={openViewContentForm} showViewContent={true} 
        title="View Supplier Management" onCloseSubContentAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <CommonSubContent getInitilValues={getProductInfo} openSubContentForm={openEditContentForm} showViewContent={false} 
          onCloseSubContentAction={generalCloseEditAction} onSubmit={onSubmitEditproduct}  title="Edit Supplier Management"/>
          : null
      }

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }
      
    <BreadcrumbsData menuList={breadCrumbValues}/>
<Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            props.restCommonGet?
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenEditForm} className="hideoption">
            Update Supplier Management Main Content
          </Button>
            :
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
            Create Supplier Management Main Content
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
            Add Supplier Management Sub Content
          </Button>
        </Box>
            <CommonDataTable generalViewAction={generalViewAction} generalEditAction={generalEditAction} 
            generalDeleteAction={generalDeleteAction} putTableData={props.restCommonSubContentGet} putTableHeader={getSupplierTableDetails}/>
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
  title: 'Supplier Management',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description:''
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutUsSupplierManagement)
