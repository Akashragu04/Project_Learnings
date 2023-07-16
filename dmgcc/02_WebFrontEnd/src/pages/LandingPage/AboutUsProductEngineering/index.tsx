import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { AddCircle } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import UpdateProductData from './AddMainContent';
import UpdateProductSubContent from './UpdateProductSubContent';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { connect } from 'react-redux';
import { ActionTypes } from 'saga/sagas/Types';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import EditSubContentForm from './EditSubContentForm';
import { ViewSubContent } from './ViewSubContent';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import { ConfigAPI } from 'services/config';
import { EditMainContent } from './EditMainContent';
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

const AboutUsproductEngineering = (props: any) => {
  const [getOpenForm, setOpenForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const [getBrochureColumns, setBrochureColumns] = React.useState([]);
  const classes = useStyles();
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)

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

  React.useEffect(() => {
    onGetProductEng()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
   
  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenEditForm()
      closeOpenAddForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      onGetProductEng()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      generalCloseEditAction()
      props.reqClearState()
      onGetProductEng()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      onGetProductEng()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

const onGetProductEng = () =>{
  props.reqCommonGet(`${ConfigAPI.getProductMaincontentURL}`)
  props.reqCommonSubContentGet(`${ConfigAPI.getProductSubContentURL}`)
  getRoleBased()
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

  const onSubmitEditproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postProductMainConterURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmiAddproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postProductMainConterURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitSubEditproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.putProductSubContentURL}`,
        data: [getProjectDetails]
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmiAddSubproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postProductSubContentURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
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
    setSearchText(searchValue);
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getLeadData(postValues)
  };

  const handleSortModelChange = (sortField) => {
    let postValues: any;
    if (sortField.length) {
      postValues = {
        size: pageSize,
        page: pageNext,
        sort: `${sortField[0].field},${sortField[0].sort}`,
        Serachkeyword: searchText
      }
    } else {
      postValues = {
        size: pageSize,
        page: pageNext,
        sort: '',
        Serachkeyword: searchText
      }
    }

    setSortItem(sortField)
    props.getLeadData(postValues)
  };

  const generalPaging = (paging) => {
    const postValues: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageNext(paging)
    props.getLeadData(postValues)

  }
  const generalPageSizing = (showPageNo) => {
    const postValues: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getLeadData(postValues)
    setPageSize(showPageNo)
  }

  const generalGridChange = (event) => {
  }

 
  const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.deletesubcontentProductionURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }
  
  // const classes = useStyles();
  return (
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues}/>
      {
        getOpenForm ?
          <UpdateProductData openAddForm={getOpenForm} closeOpenAddForm={closeOpenAddForm} onSubmit={onSubmiAddproduct} />
          : null
      }
      {props.restCommonGet && getOpenEditForm?
        <EditMainContent getInitilValues={props.restCommonGet} openEditForm={getOpenEditForm} 
        onCloseForm={closeOpenEditForm} onSubmit={onSubmitEditproduct} />
        :null
      }
      {openAddContentForm ?
        <UpdateProductSubContent openAddContentForm={openAddContentForm} closeOpenAddContentForm={closeOpenAddContentForm} onSubmit={onSubmiAddSubproduct}/>
        : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewSubContent getInitilValues={getProductInfo} openEditForm={openViewContentForm} generalCloseEditAction={generalCloseViewAction} /> : null
      }
      {
        getProductInfo && openEditContentForm ?
          <EditSubContentForm getInitilValues={getProductInfo} openEditForm={openEditContentForm} 
          generalCloseEditAction={generalCloseEditAction} onSubmit={onSubmitSubEditproduct} />
          : null
      }
{openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction} 
        onConfirmDelete={onConfirmDelete} />
        : null
      } 

      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            props.restCommonGet?
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenEditForm} className="hideoption">
            Update Product Engineering - Main Content
          </Button>
            :
            <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
            Create Product Engineering - Main Content
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
            <Box sx={{ marginTop: 5 }}>
            <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
            Add Product Engineering Sub Content
          </Button>
        </Box>
              {props.restCommonSubContentGet && props.restCommonSubContentGet !== undefined && props.restCommonSubContentGet.length > 0 ?

                <DataGrid
                  autoHeight
                  rowHeight={64}
                  rows={props.restCommonSubContentGet}
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
                  paginationMode="server"
                  page={pageNext}
                  // rowCount={businessGridData.totalElements}
                  pageSize={pageSize}
                  rowsPerPageOptions={[10, 25, 50]}
                  // checkboxSelection
                  disableSelectionOnClick
                  disableColumnMenu
                  // loading={loading}
                  sortingMode='server'
                  onSortModelChange={handleSortModelChange}
                  onPageChange={(paging) => generalPaging(paging)}
                  onPageSizeChange={(size) => generalPageSizing(size)}
                  onStateChange={(event) => generalGridChange(event)}

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
  title: 'Product Engineering',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description:''
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsproductEngineering)
// export default AboutUsproductEngineering;