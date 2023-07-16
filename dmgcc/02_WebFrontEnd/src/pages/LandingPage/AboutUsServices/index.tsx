import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { AddCircle } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { connect } from 'react-redux';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import AddServicesForm from './AddServicesForm';
import { AddSubContent } from './AddSubContent';
import { ViewSubContent } from './ViewSubContent';
import { EditSubContent } from './EditSubContent';
// import { reqClearState, reqCommonDelete, reqCommonGet, reqCommonPost, reqCommonPut, reqCommonSubContentGet, reqCommonUpload, reqServicesData } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import EditServicesForm from './EditServicesForm';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import { reqCommonGet } from 'saga/Actions';
import { reqServicesData, reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions/aboutus.action';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsServices = (props: any) => {
  const [getOpenForm, setOpenForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const [getBrochureColumns, setBrochureColumns] = React.useState([]);
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [openEditMainContentForm, setOpenEditMainContentForm] = React.useState(false)
  const [getServicesTableData, setServicesTableData] = React.useState<any>([]);

  const onOpenAddForm = () => {
    setOpenForm(true)
  }

  const closeOpenAddForm = () => {
    setOpenForm(false)
  }

  const onOpenEditMainForm = () => {
    setOpenEditMainContentForm(true)
  }

  const closeOpenEditMainForm = () => {
    setOpenEditMainContentForm(false)
  }

  const closeOpenAddContentForm = () => {
    setOpenAddContentForm(false)
  }

  const onOpenAddContentForm = () => {
    setOpenAddContentForm(true)
  }

  React.useEffect(() => {
    getServicesDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (props.restCommonSubContentGet) {
      setServicesTableData(props.restCommonSubContentGet)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.restCommonSubContentGet])


  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenEditMainForm()
      closeOpenAddForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      getServicesDetails()
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      generalCloseEditAction()
      props.reqClearState()
      getServicesDetails()
    }

    if (props.resCommonDelete && props.resCommonDelete.status === true) {
      generalCloseDeleteAction()
      props.reqClearState()
      getServicesDetails()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

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

  const onSubmitEditMainContentproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.postServicesURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }
  const onSubmitAddSubContent = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.postServicesSubContentURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitEditproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.updateSubContentURL,
        data: [getProjectDetails]
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmiAddproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.postServicesURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const getServicesDetails = () => {
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getServicesURL}?ModelName=Services`)
    props.reqCommonSubContentGet(`${ConfigAPI.getServicesSubContentURL}?ModelName=Services`)
  }

  const getRoleBased = () => {
    const brochureColumns: any = [
      {
        field: 'title',
        headerName: 'Title',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 350,
        roleTypes: "common"
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 350,
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
    setBrochureColumns(brochureColumns)
  }

  const requestSearch = (searchValue: string) => {
    if (searchValue && searchValue !== "") {
      setSearchText(searchValue);
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = props.restCommonSubContentGet.filter((row: any) => {
        return Object.keys(row).some((field: any) => {

          return searchRegex.test(row[field] ? row[field].toString() : "");
        });
      });
      setServicesTableData(filteredRows);
    } else {
      setSearchText("");
      setServicesTableData(props.restCommonSubContentGet);
    }
  };

  const onConfirmDelete = () => {
    if (getProductInfo) {
      let postURL: any = `${ConfigAPI.deleteSubServicesURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }

  const getFileUploadData = (getFileData?: any) => {
    props.reqCommonUpload(getFileData)
  }

  return (
    <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {
        getOpenForm ?
          <AddServicesForm openAddForm={getOpenForm} closeOpenAddForm={closeOpenAddForm} onSubmit={onSubmiAddproduct} />
          : null
      }
      {openAddContentForm ?
        <AddSubContent openAddContentForm={openAddContentForm} closeOpenAddContentForm={closeOpenAddContentForm}
          reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitAddSubContent} />
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewSubContent getInitilValues={getProductInfo} openEditForm={openViewContentForm}
          generalCloseEditAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditSubContent getInitilValues={getProductInfo} openEditForm={openEditContentForm}
            generalCloseEditAction={generalCloseEditAction} onSubmit={onSubmitEditproduct}
            reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} />
          : null
      }

      {props.restCommonGet && openEditMainContentForm ?
        <EditServicesForm getInitilValues={props.restCommonGet} openEditForm={openEditMainContentForm}
          generalCloseEditAction={closeOpenEditMainForm} onSubmit={onSubmitEditMainContentproduct} />
        : null
      }
      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }


      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            props.restCommonGet ?
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenEditMainForm} className="hideoption">
                Update Services Main Content
              </Button>
              :
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
                Add Services Main Content
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
              {props.restCommonGet ? props.restCommonGet.title : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} >
            <Box sx={{ lineHeight: 2 }}>
              {props.restCommonGet ? props.restCommonGet.description : '-'}</Box>
          </Grid>
          <Grid item xs={12} md={12} >
            <Box sx={{ marginTop: 5 }}>
              <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
                  Add Services Sub Content
                </Button>
              </Box>
              {getServicesTableData && getBrochureColumns ?

                <DataGrid
                  autoHeight
                  rowHeight={64}
                  rows={getServicesTableData}
                  columns={getBrochureColumns}
                  components={{ Toolbar: QuickSearchToolbar }}
                  componentsProps={{
                    toolbar: {
                      value: searchText,
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                        requestSearch(event.target.value),
                      clearSearch: () => requestSearch(""),
                    },
                  }}
                  getRowHeight={() => 'auto'}
                  sx={{
                    [`& .${gridClasses.cell}`]: {
                      py: 2,
                    },
                  }}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}

                />
                : <Box>No Data</Box>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.profileDetails,
    resServicesData: state.aboutUsDetails.resServicesData,
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
    reqServicesData: (getValues?: any) => dispatch(reqServicesData(getValues)),

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
  title: 'Services',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutUsServices)
// export default AboutUsServices;