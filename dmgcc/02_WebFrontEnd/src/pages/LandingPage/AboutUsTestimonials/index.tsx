import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Grid, } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { makeStyles } from '@mui/styles';
import { CommonDataTable } from '../CommonFile/CommonDataTable';
import { ActionTypes } from 'saga/sagas/Types';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import AddTestimonical from './AddTestimonical';
import ViewTestimonical from './ViewTestimonical';
import EditTestimonical from './EditTestimonical';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ConfigAPI } from 'services/config';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete } from 'saga/Actions/aboutus.action';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete } from 'saga/Actions';
// import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsTestimonials = (props: any) => {
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const classes = useStyles();
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getTestimonialTable, setTestimonialTable] = React.useState<any>(null)

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      onGetTestimonialDetails()
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      generalCloseEditAction()
      props.reqClearState()
      onGetTestimonialDetails()
    }

    if (props.resCommonDelete && props.resCommonDelete.status === true) {
      generalCloseDeleteAction()
      props.reqClearState()
      onGetTestimonialDetails()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  React.useEffect(() => {
    onGetTestimonialDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRoleBased = () => {
    const brochureColumns: any = [
      {
        field: 'customername',
        headerName: 'Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        roleTypes: "common"
      },
      {
        field: 'description',
        headerName: 'Description',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        roleTypes: "common"
      },
      {
        field: 'rating',
        headerName: 'Rating',
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
    setTestimonialTable(brochureColumns)
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
        url: `${ConfigAPI.postTestimonialURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onConfirmDelete = () => {
    if (getProductInfo) {
      let postURL: any = `${ConfigAPI.deleteTestmonialURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }

  const getFileUploadData = (getFileData?: any) => {
    props.reqCommonUpload(getFileData)
  }

  const onGetTestimonialDetails = () => {
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getTestimonialsDetailsURL}`)
  }

  return (
    <React.Fragment>
      {openAddContentForm ?
        <AddTestimonical openAddContentForm={openAddContentForm} closeOpenAddContentForm={closeOpenAddContentForm}
          reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onSubmit={onSubmiAddproduct} />
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewTestimonical getInitilValues={getProductInfo} openEditForm={openViewContentForm} generalCloseEditAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditTestimonical getInitilValues={getProductInfo} openEditForm={openEditContentForm}
            generalCloseEditAction={generalCloseEditAction} reqCommonUpload={getFileUploadData}
            resCommonUpload={props.resCommonUpload} onSubmit={onSubmiAddproduct} />
          : null
      }

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }
      <BreadcrumbsData menuList={breadCrumbValues} />
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
            Create New Testimonical
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} >
            {
              props.restCommonGet && props.restCommonGet.length ?
                <CommonDataTable generalViewAction={generalViewAction} generalEditAction={generalEditAction}
                  generalDeleteAction={generalDeleteAction} putTableData={props.restCommonGet} putTableHeader={getTestimonialTable} />
                : <Box>No Data</Box>
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
  }
}

const breadCrumbValues = {
  title: 'Testimonials',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsTestimonials)
