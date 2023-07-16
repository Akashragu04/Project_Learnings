import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Chip, Tooltip } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { ActionTypes } from "saga/sagas/Types"; //NOSONAR
import { AddCircle } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import AddContent from './AddContent';
import EditContent from './EditContent';
import ViewContent from './ViewContent';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import CommonApproval from '../CommonFile/CommonApproval';
import CommonStore from '@crema/services/commonstore';
import { reqCommonGet } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete } from 'saga/Actions/aboutus.action';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});
const ContentView = (props?: any) => {
  const [getContentColumns, setContentColumns] = React.useState([]);
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [getContentInfo, setContentInfo] = React.useState<any>(null);
  const [getContentAdd, setContentAdd] = React.useState(false);
  const [getContentEdit, setContentEdit] = React.useState(false);
  const [getContentView, setContentView] = React.useState(false);
  const [getContentDelete, setContentDelete] = React.useState(false);
  const [onOpenApprovalInfo, setOpenApprovalInfo] = React.useState(false);
  const [tableData, setTableData] = React.useState<any>([]);

  useEffect(() => {
    onGetContentDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  React.useEffect(()=>{
    if(props.restCommonGet){
      setTableData(props.restCommonGet)
    }
  },[props.restCommonGet])

  const onGetContentDetails = () => {
    getRoleBased()
    props.reqCommonGet(ConfigAPI.getContentURL)

  }

  const onSubmitAdd = (getPostData?: any) => {
    if (getPostData) {
      let postValues: any = {
        url: ConfigAPI.contentURL,
        data: getPostData
      }
      props.reqCommonPost(postValues)
    }
  }

   
const requestSearch = (searchValue: string) => {
  if(searchValue && searchValue !==""){
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = props.restCommonGet.filter((row: any) => {
      return Object.keys(row).some((field: any) => {

        return searchRegex.test(row[field] ? row[field].toString() : "");
      });
    });
    setTableData(filteredRows);
  }else{
    setSearchText("");    
    setTableData(props.restCommonGet);
  }
};

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      onCloseAction()
      generalCloseEditAction()
      props.reqClearState()
      onGetContentDetails()
      setOpenApprovalInfo(false)
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      generalCloseEditAction()
      props.reqClearState()
      onGetContentDetails()
    }

    if (props.resCommonDelete && props.resCommonDelete.status === true) {
      generalCloseDeleteAction()
      props.reqClearState()
      onGetContentDetails()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

  const onSubmitEdit = (getPostData?: any) => {
    if (getPostData) {
      let postValues: any = {
        url: ConfigAPI.contentURL,
        data: [getPostData]
      }
      props.reqCommonPut(postValues)
    }
  }

  const onConfirmDelete = () => {
    if (getContentInfo) {
      let postURL: any = `${ConfigAPI.deleteNewsLetterURL}/${getContentInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }
  const onAddAction = () => {
    setContentAdd(true)
  }

  const onCloseAction = () => {
    setContentAdd(false)

  }

  const generalEditAction = (getEditValues?: any) => {
    setContentInfo(getEditValues)
    setContentEdit(true)
  }

  const generalViewAction = (getViewValue?: any) => {
    setContentInfo(getViewValue)
    setContentView(true)

  }

  const generalDeleteAction = (getDeleteValue?: any) => {
    setContentInfo(getDeleteValue)
    setContentDelete(true)

  }
  const generalCloseEditAction = () => {
    setContentEdit(false)
  }

  const generalCloseViewAction = (getViewValue?: any) => {
    setContentView(false)

  }

  const generalCloseDeleteAction = () => {
    setContentDelete(false)

  }

  const openApprovelBox = (getValues:any) =>{
    setContentInfo(getValues)  
    setOpenApprovalInfo(true)
  }

  const closeApprovelBox = () =>{
    setContentInfo(null)  
    setOpenApprovalInfo(false)
  }

  const onConfirmSubmit = () =>{
    if(getContentInfo){
      let getApprovalData:any ={
        id:getContentInfo.id,
        is_approved:true
      }
      if(getApprovalData){
        let postValues: any = {
          url: ConfigAPI.contentApproval,
          data: getApprovalData
        }
        props.reqCommonPost(postValues)
      }
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
        field: 'description',
        headerName: 'Description',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 350,
        roleTypes: "common"
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
               {
                RoutePermittedRole.Admin === CommonStore().userRoleType?
               <Button sx={{ position: "relative", minWidth: 100 }} variant="outlined"
                          color={params && params.row && params.row.is_approved ? "success":"info" } type="button"
                          onClick={() => openApprovelBox(params.row)}
                          disabled={params && params.row && params.row.is_approved ? true:false }
                          > Approve
                        </Button>
                        :null}
                                  {
                RoutePermittedRole.Admin === CommonStore().userRoleType?null:
                <Chip color={`${params.row.is_approved?'success':'error'}`} label={`${params.row.is_approved?'Approved':'Pending'}`} variant='outlined' size='small' sx={{ textTransform: 'capitalize' }} />
                }
            </React.Fragment>
          )
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        type: 'actions',
        roleTypes: RoutePermittedRole.Business,
        getActions: (params) => [
          <GridActionsCellItem
            key={`${params.row}_view`}
            icon={
              <Tooltip title="View Content">
            <PreviewIcon />
            </Tooltip>}
            label='View'
            onClick={() => generalViewAction(params.row)}
          />,
          <GridActionsCellItem
            key={`${params.row}_edit`}
            icon={
              <Tooltip title="Edit Content">
            <EditIcon />
            </Tooltip>}
            label='Edit'
            disabled={params && params.row && params.row.is_approved ? true:false }
            onClick={() => generalEditAction(params.row)}
          />,
          <GridActionsCellItem
            key={`${params.row}_delete`}
            icon={
              <Tooltip title="Delete Content">
            <DeleteIcon />
            </Tooltip>}
            label='Delete'
            disabled={params && params.row && params.row.is_approved ? true:false }
            onClick={() => generalDeleteAction(params.row)}
          />,

        ]
      }
    ];
    setContentColumns(brochureColumns)
  }


  const getFileUploadData = (getFileData?: any) => {
    props.reqCommonUpload(getFileData)
  }
  return (
    <React.Fragment>
    {onOpenApprovalInfo?
      <CommonApproval onOpenAlert={onOpenApprovalInfo} onCloseAlert={closeApprovelBox} onConfirmApproval={onConfirmSubmit}/>
      :null
    }
      {getContentAdd ?
        <AddContent onOpenContent={getContentAdd} onCloseContent={onCloseAction}
          reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitAdd} />
        : null
      }

      {getContentEdit && getContentInfo ?
        <EditContent onOpenContent={getContentEdit} getInitialValue={getContentInfo} onCloseContent={generalCloseEditAction}
          reqCommonUpload={getFileUploadData} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitEdit} />
        : null
      }

      {getContentView && getContentInfo ?
        <ViewContent onOpenContent={getContentView} getInitialValue={getContentInfo} onCloseContent={generalCloseViewAction} />
        : null
      }

      {getContentDelete ?
        <CommonDeleteAlert openDeleteContentForm={getContentDelete} generalCloseDeleteAction={generalCloseDeleteAction}
          onConfirmDelete={onConfirmDelete} />
        : null
      }
      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        {/* <BreadcrumbsData menuList={breadCrumbValues} /> */}
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onAddAction} className="hideoption">
            Create Content
          </Button>
        </Box>
        {tableData && getContentColumns ?

          <DataGrid
            autoHeight
            rowHeight={64}
            rows={tableData}
            columns={getContentColumns}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value),
                clearSearch: () => requestSearch("")
              }
            }}
            getRowHeight={() => 'auto'}
           sx={{
             [`& .${gridClasses.cell}`]: {
               py: 2,
             },
           }}
              components={{ Toolbar: QuickSearchToolbar }}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}

          />
          : <Box>No Data</Box>}

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

export default connect(mapStateToProps, mapDispatchToProps)(ContentView)
