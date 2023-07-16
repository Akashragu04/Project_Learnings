import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { AddCircle } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { connect } from 'react-redux';
import { ActionTypes } from 'saga/sagas/Types';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import AddFormManuFacturing from './AddFormManuFacturing';
import AddSubContentManufacturing from './AddSubContentManufacturing';
import EditSubContentManufacturing from './EditSubContentManufacturing';
import ViewSubContentManufacturing from './ViewSubContentManufacturing';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { ConfigAPI } from 'services/config';
import EditMainContentManufacturing from './EditMainContentManufacturing';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonSubContentGet } from 'saga/Actions/aboutus.action';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const AboutUsManufacturingEngineering = (props:any) => {
  const [getOpenForm, setOpenForm] = React.useState(false)
  const [getOpenEditForm, setOpenEditForm] = React.useState(false)
  const [openAddContentForm, setOpenAddContentForm] = React.useState(false)
  const [getBrochureColumns, setBrochureColumns] = React.useState([]);
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getManufacturingEngTableData, setManufacturingEngTableData] = React.useState<any>([]);

  
  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeOpenEditForm()
      closeOpenAddForm()
      generalCloseEditAction()
      closeOpenAddContentForm()
      props.reqClearState()
      onGetManufacturing()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      generalCloseEditAction()
      props.reqClearState()
      onGetManufacturing()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      onGetManufacturing()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  React.useEffect(()=>{
if(props.restCommonSubContentGet){
  setManufacturingEngTableData(props.restCommonSubContentGet)
}
  },[props.restCommonSubContentGet])
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
    onGetManufacturing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onGetManufacturing = () =>{
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getManufacturingURL}`)
    props.reqCommonSubContentGet(`${ConfigAPI.getManufacturingSubContentURL}`)
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
        url: `${ConfigAPI.postManufacturingMainContentURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmiAddproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postManufacturingMainContentURL}`,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitSubContentEditproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.postManufacturingSubContentURL}`,
        data: [getProjectDetails]
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitSubContentAddproduct = (getProjectDetails?: any) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: `${ConfigAPI.getManufacturingSub}`,
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
    if (searchValue && searchValue !== "") {
      setSearchText(searchValue);
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = props.restCommonSubContentGet.filter((row: any) => {
        return Object.keys(row).some((field: any) => {

          return searchRegex.test(row[field] ? row[field].toString() : "");
        });
      });
      setManufacturingEngTableData(filteredRows);
    } else {
      setSearchText("");
      setManufacturingEngTableData(props.restCommonSubContentGet);
    }
  };


  const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.deleteManufacturingSubContentURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }
  
  return (
    <React.Fragment>
    <BreadcrumbsData menuList={breadCrumbValues}/>
    {
      getOpenForm ?
        <AddFormManuFacturing openAddForm={getOpenForm} closeOpenAddForm={closeOpenAddForm} onSubmit={onSubmiAddproduct} />
        : null
    }
    {getOpenEditForm && props.restCommonGet?
      <EditMainContentManufacturing onOpenEditForm={getOpenEditForm} getInitilValues={props.restCommonGet} 
      closeOpenEditForm={closeOpenEditForm} onSubmit={onSubmitEditproduct} />
      :null
    }
    {openAddContentForm ?
      <AddSubContentManufacturing openAddContentForm={openAddContentForm} 
      closeOpenAddContentForm={closeOpenAddContentForm} onSubmit={onSubmitSubContentAddproduct} />
      : null
    }
    {openViewContentForm && getProductInfo ?
      <ViewSubContentManufacturing getInitilValues={getProductInfo} openEditForm={openViewContentForm} 
      generalCloseEditAction={generalCloseViewAction} /> : null
    }
    {
      getProductInfo && openEditContentForm ?
        <EditSubContentManufacturing getInitilValues={getProductInfo} openEditForm={openEditContentForm} 
        generalCloseEditAction={generalCloseEditAction} onSubmit={onSubmitSubContentEditproduct} />
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
        Update Manufacturing Main Content
      </Button>       
        : <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
        Create Manufacturing Main Content
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
          <Box sx={{ lineHeight: 2 }}>
            {props.restCommonGet?props.restCommonGet.description:null}</Box>
        </Grid>
        <Grid item xs={12} md={12} >
          <Box sx={{ marginTop: 5 }}>
          <Box sx={{ textAlign: "right", marginBottom: 5 }}>
        <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddContentForm} className="hideoption">
          Add Manufacturing Sub Content
        </Button>
      </Box>
            {getManufacturingEngTableData && getBrochureColumns ?

              <DataGrid
                autoHeight
                rowHeight={64}
                rows={getManufacturingEngTableData}
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
  title: 'Manufacturing Engineering',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description:''
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsManufacturingEngineering)
// export default AboutUsManufacturingEngineering;
