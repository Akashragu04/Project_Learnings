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
import AddBrochure from './AddBrochure';
import EditBrochure from './EditBrochure';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import ViewBrochure from './ViewBrochure';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
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
const BrochureView = (props?:any) => {
  const [getBrochureColumns, setBrochureColumns] = React.useState([]);
  const classes = useStyles();
  const [onOpenAddForm, setOpenAddForm] = React.useState(false);
  const [onOpenEdidForm, setOpenEditForm] = React.useState(false);
  const [onOpenViewDetails, setOpenViewDetails] = React.useState(false);
  const [onOpenApprovalInfo, setOpenApprovalInfo] = React.useState(false);
  const [getProductInfo, setProductInfo] = React.useState<any>(null)
  const [openDeleteContentForm, setOpenDeleteContentForm] = React.useState(false)
  const getBroucherURL:any = ConfigAPI.broucherURL;
  const [searchText, setSearchText] = React.useState("");
  const [tableData, setTableData] = React.useState<any>([]);

  const onOpenAddPage = () =>{
    setOpenAddForm(true)
  }

  const onCloseAddPage = () =>{
    setOpenAddForm(false)
  }
  
  const onCloseEditPage = () =>{
    setOpenEditForm(false)
  }
 
  const onCloseViewPage = () =>{
    setOpenViewDetails(false)
  }

  useEffect(()=>{
    getRoleBased()
    getLeadDeta()
    props.reqClearState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      onCloseAddPage()
      onCloseEditPage()
      setOpenApprovalInfo(false)
      props.reqClearState()
      getLeadDeta()
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      onCloseEditPage()
      props.reqClearState()
      getLeadDeta()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      getLeadDeta()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])
  
  const generalEditAction = (getEditValues?: any) => {
    setProductInfo(getEditValues)
    setOpenEditForm(true)
  }

React.useEffect(()=>{
  if(props.restCommonGet){
    setTableData(props.restCommonGet)
  }
},[props.restCommonGet])
  const generalViewAction = (getEditValues?: any) => {
    setProductInfo(getEditValues)
    setOpenViewDetails(true)
  }

  const generalDeleteAction = (getEditValues?: any) => {
    setProductInfo(getEditValues)
    setOpenDeleteContentForm(true)
  }

  const generalCloseDeleteAction = () => {
    setOpenDeleteContentForm(false)
  }

  const openApprovelBox = (getValues:any) =>{
    setProductInfo(getValues)  
    setOpenApprovalInfo(true)
  }

  const closeApprovelBox = () =>{
    setProductInfo(null)  
    setOpenApprovalInfo(false)
  }

  const onConfirmSubmit = () =>{
    if(getProductInfo){
      let getApprovalData:any ={
        id:getProductInfo.id,
        is_approved:true
      }
      if(getApprovalData){
        let postValues: any = {
          url: ConfigAPI.brochureApproval,
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
        width: 250,
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
            <Tooltip title="View Brochure">
          <PreviewIcon />
          </Tooltip>}
          label='View'
          onClick={() => generalViewAction(params.row)}
        />,
        <GridActionsCellItem
          key={`${params.row}_edit`}
          icon={
            <Tooltip title="Edit Brochure">
          <EditIcon />
          </Tooltip>}
          label='Edit'
          disabled={params && params.row && params.row.is_approved ? true:false }
          onClick={() => generalEditAction(params.row)}
        />,
        <GridActionsCellItem
          key={`${params.row}_delete`}
          icon={
            <Tooltip title="Delete Brochure">
          <DeleteIcon />
          </Tooltip>}
          label='Delete'
          disabled={params && params.row && params.row.is_approved ? true:false }
          onClick={() => generalDeleteAction(params.row)}
        />,

        ]
      }
    ];
    setBrochureColumns(brochureColumns)
  }


  const getLeadDeta = () => {
    props.reqCommonGet(getBroucherURL)
  }

  const onConfirmDelete = () => {
    if(getProductInfo){
      let postURL:any = `${ConfigAPI.addBroucherURL}/${getProductInfo.id}`
      props.reqCommonDelete(postURL)
    }
  }

  const onSubmitBroucher = (getProjectDetails) =>{
    if(getProjectDetails){
      let postValues: any = {
        url: ConfigAPI.addBroucherURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    } 
  }

  const onSubmitEditBroucher = (getProjectDetails) =>{
    if(getProjectDetails){
      let postValues: any = {
        url: ConfigAPI.addBroucherURL,
        data: getProjectDetails
      }
      props.reqCommonPut(postValues)
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

  return (
   <React.Fragment>
     {onOpenApprovalInfo?
       <CommonApproval onOpenAlert={onOpenApprovalInfo} onCloseAlert={closeApprovelBox} onConfirmApproval={onConfirmSubmit}/>
       :null
     }
     {onOpenAddForm?
       <AddBrochure onOpenBrochure={onOpenAddForm} onCloseBrochure={onCloseAddPage} 
       reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitBroucher}/>
       :null
     }

     {onOpenEdidForm && getProductInfo?
       <EditBrochure openEditForm={onOpenEdidForm} getInitilValues={getProductInfo} generalCloseEditAction={onCloseEditPage} 
       reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitEditBroucher}/>
       :null
     }

{openDeleteContentForm ?
        <CommonDeleteAlert openDeleteContentForm={openDeleteContentForm} generalCloseDeleteAction={generalCloseDeleteAction} 
        onConfirmDelete={onConfirmDelete} />
        : null
      }  
{onOpenViewDetails && getProductInfo?
  <ViewBrochure getInitilValues={getProductInfo} onOpenView={onOpenViewDetails} onCloseViewAction={onCloseViewPage}/>:null
}

   {/* <BreadcrumbsData menuList={breadCrumbValues}/> */}
       <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
       <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddPage} className="hideoption">
                    Create New Brochure
                </Button>
            </Box>
        {getBrochureColumns && tableData ?

          <DataGrid
            autoHeight
            rowHeight={64}
            rows={tableData}
            columns={getBrochureColumns}
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

// const breadCrumbValues = {
//   title: 'Brochure',
//   subTitle: '',
//   SubUrl: '',
//   homeTitle: "Home",
//   homeLink: '/landing-page',
//   description:''
// }

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

export default connect(mapStateToProps, mapDispatchToProps)(BrochureView)  
