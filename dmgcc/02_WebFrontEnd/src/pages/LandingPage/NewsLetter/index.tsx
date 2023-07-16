import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Chip, Tooltip, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { ActionTypes } from "saga/sagas/Types"; //NOSONAR
import { AddCircle } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import AddNewsLetter from './AddNewsLetter';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import EditNewsLetter from './EditNewsLetter';
import ViewNewsLetter from './ViewNewsLetter';
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

const NewLetter = (props:any) => {
  const [getNewsLetterColumns, setNewsLetterColumns] = React.useState([]);
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [openNewsLetter, setOpenNewsLetter] = React.useState(false)
  const [editNewsLetter, setEditNewsLetter] = React.useState(false)
  const [viewNewsLetter, setViewNewsLetter] = React.useState(false)
  const [deleteNewsLetter, setDeleteNewsLetter] = React.useState(false)
  const [infoNewsLetter, setinfoNewsLetter] = React.useState<any>(null)
  const [onOpenApprovalInfo, setOpenApprovalInfo] = React.useState(false);
  const [tableData, setTableData] = React.useState<any>([]);


  useEffect(()=>{
    onGetNewsletterDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  React.useEffect(()=>{
    if(props.restCommonGet){
      setTableData(props.restCommonGet)
    }
  },[props.restCommonGet])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeNewsletter()
      closeNewsEditletter()
      props.reqClearState()
      onGetNewsletterDetails()
      setOpenApprovalInfo(false)
    }
    if(props.resCommonPut && props.resCommonPut.status === true){
      closeNewsEditletter()
      props.reqClearState()
      onGetNewsletterDetails()
    }

    if(props.resCommonDelete && props.resCommonDelete.status === true){
      generalCloseDeleteAction()
      props.reqClearState()
      onGetNewsletterDetails()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete])

const openNewsletter = () =>{
  setOpenNewsLetter(true)
}

const closeNewsletter = () =>{
  setOpenNewsLetter(false)
}

const closeNewsEditletter = () =>{
  setEditNewsLetter(false)
}
const generalEditAction = (getEditValues?:any) =>{
  setEditNewsLetter(true)
  setinfoNewsLetter(getEditValues)
}

const generalViewAction = (getViewValue?:any) =>{
  setViewNewsLetter(true)
  setinfoNewsLetter(getViewValue)
}

const generalCloseViewAction = () =>{
  setViewNewsLetter(false)
}

const generalDeleteAction = (getDeleteValue?:any) =>{
  setDeleteNewsLetter(true)
  setinfoNewsLetter(getDeleteValue)
}

const generalCloseDeleteAction = () => {
  setDeleteNewsLetter(false)
}

const openApprovelBox = (getValues:any) =>{
  setinfoNewsLetter(getValues)  
  setOpenApprovalInfo(true)
}

const closeApprovelBox = () =>{
  setinfoNewsLetter(null)  
  setOpenApprovalInfo(false)
}

const onConfirmSubmit = () =>{
  if(infoNewsLetter){
    let getApprovalData:any ={
      id:infoNewsLetter.id,
      is_approved:true
    }
    if(getApprovalData){
      let postValues: any = {
        url: ConfigAPI.newsletterApproval,
        data: getApprovalData
      }
      props.reqCommonPost(postValues)
    }
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

  const getRoleBased = () => {
    const newsLetterColumns: any = [
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
                :null
              }
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
            <Tooltip title="View Newsletter">
          <PreviewIcon />
          </Tooltip>}
          label='View'
          onClick={() => generalViewAction(params.row)}
        />,
        <GridActionsCellItem
          key={`${params.row}_edit`}
          icon={
            <Tooltip title="Edit Newsletter">
          <EditIcon />
          </Tooltip>}
          label='Edit'
          disabled={params && params.row && params.row.is_approved ? true:false }
          onClick={() => generalEditAction(params.row)}
        />,
        <GridActionsCellItem
          key={`${params.row}_delete`}
          icon={
            <Tooltip title="Delete Newsletter">
          <DeleteIcon />
          </Tooltip>}
          label='Delete'
          disabled={params && params.row && params.row.is_approved ? true:false }
          onClick={() => generalDeleteAction(params.row)}
        />,

        ]
      }
    ];
    setNewsLetterColumns(newsLetterColumns)
  }

 


  const onGetNewsletterDetails = () =>{    
    getRoleBased()
    props.reqCommonGet(`${ConfigAPI.getNewLetterURL}`)
    // props.reqCommonSubContentGet(`${ConfigAPI.getSubCntQualityManagementURL}`)
  }

  const onSubmitNewsletter = (getPostData?:any) =>{
    if(getPostData){
      let postValues: any = {
        url: ConfigAPI.postNewsletterURL,
        data: getPostData
      }
      props.reqCommonPost(postValues)
    } 
  }

  
  const onSubmitEditletter = (getPostData?:any) =>{
    if(getPostData){
      let postValues: any = {
        url: ConfigAPI.postNewsletterURL,
        data: getPostData
      }
      props.reqCommonPut(postValues)
    } 
  }

  const onConfirmDelete = () => {
    if(infoNewsLetter){
      let postURL:any = `${ConfigAPI.deleteNewsLetterURL}/${infoNewsLetter.id}`
      props.reqCommonDelete(postURL)
    }
  }
  
  return (
   <React.Fragment>  
       {onOpenApprovalInfo?
       <CommonApproval onOpenAlert={onOpenApprovalInfo} onCloseAlert={closeApprovelBox} onConfirmApproval={onConfirmSubmit}/>
       :null
     }
     {openNewsLetter?
       <AddNewsLetter onOpen={openNewsLetter} onClose={closeNewsletter} 
       reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitNewsletter}/>
       :null
     }

     {editNewsLetter && infoNewsLetter?
       <EditNewsLetter onOpen={editNewsLetter} getInitilValues={infoNewsLetter} onClose={closeNewsEditletter} 
       reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={onSubmitEditletter}/>
       :null
     }

     {viewNewsLetter && infoNewsLetter?
       <ViewNewsLetter onOpen={viewNewsLetter} getInitilValues={infoNewsLetter} onClose={generalCloseViewAction}/>
       :null
     }

     
{deleteNewsLetter ?
        <CommonDeleteAlert openDeleteContentForm={deleteNewsLetter} generalCloseDeleteAction={generalCloseDeleteAction} 
        onConfirmDelete={onConfirmDelete} />
        : null
      }
      
     {/* <BreadcrumbsData menuList={breadCrumbValues}/> */}
       <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
       <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={openNewsletter} className="hideoption">
                    Create Newsletter
                </Button>
            </Box>
        {getNewsLetterColumns && tableData ?

          <DataGrid
            autoHeight
            rowHeight={64}
            rows={tableData}
            columns={getNewsLetterColumns}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewLetter)  
