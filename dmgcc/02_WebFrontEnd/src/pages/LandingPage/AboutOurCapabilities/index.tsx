import { Box, Button } from '@mui/material';
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
import AddOurCapabilities from './AddOurCapabilities';
import EditOurCapabilities from './EditOurCapabilities';
// import { reqClearState, reqCommonDelete, reqCommonGet, reqCommonPost, reqCommonPut, reqCommonUpload } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import ViewOurCapabilities from './ViewOurCapabilities';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import { useNavigate } from "react-router-dom";
import { reqCommonGet } from 'saga/Actions';
import { reqCommonPost, reqCommonUpload, reqClearState, reqCommonPut, reqCommonDelete } from 'saga/Actions/aboutus.action';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const OurCapabilities = (props: any) => {
  const classes = useStyles();
  const [getBrochureColumns, setBrochureColumns] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openAddForm, setOpenAddForm] = React.useState(false)
  const [openEditContentForm, setOpenEditContentForm] = React.useState(false)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const [openViewContentForm, setOpenViewContentForm] = React.useState(false)
  const [getOurCapabilitiesTableData, setOurCapabilitiesTableData] = React.useState<any>([]);

  let postURL: any = `/landingpage/capabilities/getmaincntnt?ModelName=Our Capabilities`
  const navigate = useNavigate();

  const onOpenAddForm = () => {
    setOpenAddForm(true)
  }

  const onCloseAddForm = () => {
    setOpenAddForm(false)
  }

  React.useEffect(() => {
    getRoleBased()
    getLeadDeta()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  React.useEffect(() => {
    if(props.restCommonGet){
      setOurCapabilitiesTableData(props.restCommonGet)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      onCloseAddForm()
      props.reqClearState()
      getLeadDeta()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      generalCloseEditAction()
      props.reqClearState()
      getLeadDeta()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      getLeadDeta()

    }
    if (props.errorTokenValidation && props.errorTokenValidation?.message === appConstants.invalidToken) {
      navigate('/dashboard')
      props.reqClearState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete, props.errorTokenValidation])

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
    let postValues: any = {
      url: ConfigAPI.capabilitiesSubCantentURL,
      data: [getProjectDetails]
    }
    props.reqCommonPut(postValues)
  }

  const onSubmiAddproduct = (getProjectDetails?: any) => {
    let postValues: any = {
      url: ConfigAPI.capabilitiesMainCantentURL,
      data: getProjectDetails
    }
    props.reqCommonPost(postValues)
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
        field: 'description',
        headerName: 'Description',
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
      const filteredRows = props.restCommonGet.filter((row: any) => {
        return Object.keys(row).some((field: any) => {

          return searchRegex.test(row[field] ? row[field].toString() : "");
        });
      });
      setOurCapabilitiesTableData(filteredRows);
    } else {
      setSearchText("");
      setOurCapabilitiesTableData(props.restCommonGet);
    }
  };

  const getLeadDeta = () => {     
    props.reqCommonGet(postURL)
  }

  const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.capabilitiesDeleteURL}${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }

  return (
    <React.Fragment>
      {openAddForm ?
        <AddOurCapabilities openAddForm={openAddForm} onCloseAddForm={onCloseAddForm}
          onSubmit={onSubmiAddproduct} reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} /> : null
      }

      {openEditContentForm && getProductInfo ?
        <EditOurCapabilities openEditForm={openEditContentForm} getInitilValues={getProductInfo} onClose={generalCloseEditAction}
          onSubmit={onSubmitEditproduct} reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} /> : null
      }
      {openViewContentForm && getProductInfo ?
        <ViewOurCapabilities openViewDetails={openViewContentForm} getInitilValues={getProductInfo} onClose={generalCloseViewAction} />
        : null
      }      

      {openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} goBack={generalCloseDeleteAction} onConfirmDelete={onConfirmDelete} />
        : null
      }
      <BreadcrumbsData menuList={breadCrumbValues} />
      <Box sx={{ textAlign: "right", marginBottom: 5 }}>
        <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={() => onOpenAddForm()} >
          Create Capabilities
        </Button>
      </Box>
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>

        <Box>
          {getOurCapabilitiesTableData && getBrochureColumns ?

            <DataGrid
              autoHeight
              rowHeight={64}
              rows={getOurCapabilitiesTableData}
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
      </Box>
    </React.Fragment>
  )
}
const breadCrumbValues = {
  title: 'Our Capabilities',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/landing-page',
  description: ''
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.profileDetails,
    restCommonGet: state.othersReducer.resCommonViewData,
    resCommonPost: state.aboutUsDetails.resCommonPost,
    resCommonPut: state.aboutUsDetails.resCommonPut,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resCommonDelete: state.aboutUsDetails.resCommonDelete,
    errorTokenValidation:state.aboutUsDetails.errors
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqCommonGet: (postURL?: any) => dispatch(reqCommonGet(postURL)),
    reqCommonPost: (postURL?: any) => dispatch(reqCommonPost(postURL)),
    reqCommonUpload: (getUpload?: any) => dispatch(reqCommonUpload(getUpload)),
    reqClearState: () => dispatch(reqClearState()),
    reqCommonPut: (postURL?: any) => dispatch(reqCommonPut(postURL)),
    reqCommonDelete: (postURL?: any) => dispatch(reqCommonDelete(postURL)),
    
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(OurCapabilities)
// export default OurCapabilities;
