import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Grid } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { makeStyles } from '@mui/styles';
import { CommonDataTable } from '../CommonFile/CommonDataTable';
import { ActionTypes } from 'saga/sagas/Types';
import AddContacts from './AddContacts';
import ViewContacts from './ViewContacts';
import EditContacts from './EditContacts';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
// import { reqClearState, reqCommonDelete, reqCommonGet, reqCommonPost, reqCommonPut, reqCommonUpload } from 'saga/Actions';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { GridActionsCellItem } from "@mui/x-data-grid";
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
const AboutUsContacts = (props: any) => {
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const classes = useStyles();
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getGridTableData, setGridTableData] = React.useState<any>(null)
  let postURL: any = `/landingpage/contacts?Searchkeyword=a`

  React.useEffect(() => {
    getUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenAddContentForm()
      generalCloseEditAction()
      props.reqClearState()
      getUserDetails()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      generalCloseEditAction()
      props.reqClearState()
      getUserDetails()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      getUserDetails()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  const getUserDetails = () =>{    
    getRoleBased()
    props.reqCommonGet(postURL)
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
    if(getProjectDetails){
      let postValues: any = {
        url: ConfigAPI.contactsURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }   
  }

  const onSubmitEditproduct = (getProjectDetails?: any) => {
    if(getProjectDetails){
      let postValues: any = {
        url: `${ConfigAPI.contactsURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }

  }
  const getRoleBased = () => {
    const brochureColumns: any = [
      {
        field: 'name',
        headerName: 'Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        roleTypes: "common"
      },
      {
        field: 'department',
        headerName: 'Department',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        roleTypes: "common"
      },
      {
        field: 'email',
        headerName: 'Email Id',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        roleTypes: "common"
      },
      {
        field: 'mobileno',
        headerName: 'Mobile No',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
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

  const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.contactsURL}/${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }

  const getFileUploadData = (getFileData?: any) => {
    props.reqCommonUpload(getFileData)
  }
  return (
    <React.Fragment>
      {openAddContentForm ?
        <AddContacts openAddContentForm={openAddContentForm} closeOpenAddContentForm={closeOpenAddContentForm} 
        reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onSubmit={onSubmiAddproduct} />
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewContacts getInitilValues={getProductInfo} openViewDetails={openViewContentForm}
        onClose={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditContacts getInitilValues={getProductInfo} openEditForm={openEditContentForm}
            generalCloseEditAction={generalCloseEditAction} reqCommonUpload={getFileUploadData} 
            resCommonUpload={props.resCommonUpload} onSubmit={onSubmitEditproduct} />
          : null
      }

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction}
          onConfirmDelete={onConfirmDelete} />
        : null
      }
      <BreadcrumbsData menuList={breadCrumbValues} />
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
            Create New Employee
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} >
            {
              getGridTableData?
              <CommonDataTable generalViewAction={generalViewAction} generalEditAction={generalEditAction}
                generalDeleteAction={generalDeleteAction} putTableData={props.restCommonGet} putTableHeader={getGridTableData} />              
              :<Box>No Data</Box>
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
    resCommonDelete: state.aboutUsDetails.resCommonDelete
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
    reqCommonDelete: (getPostURL?: any) => dispatch(reqCommonDelete(getPostURL))
  }
}

const breadCrumbValues = {
  title: 'Contacts',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsContacts)
// export default AboutUsContacts;
