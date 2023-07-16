import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Tooltip, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import { AddCircle } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import AddFeedBack from './AddFeedBack';
// import { reqCommonUpload, reqCommonPost, reqCommonPut, reqCommonGet, reqClearState, reqCommonDelete, reqUserDetail, reqProjectList, reqCommonDownload } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import EditFeedBack from './EditFeedBack';
import ViewFeedbackDetail from './ViewFeedbackDetail';
import CommonDeleteAlert from '../CommonFile/CommonDeleteAlert';
import GetAppIcon from '@mui/icons-material/GetApp';
import ExportFeedbackMessage from './ExportFeedbackMessage';
import { donwloadXlsxFiles } from '@crema/commonservices/CommonFileDownload';
import { reqUserDetail, reqCommonGet, reqProjectList } from 'saga/Actions';
import { reqCommonUpload, reqCommonPost, reqCommonPut, reqClearState, reqCommonDelete, reqCommonDownload, reqSendMail } from 'saga/Actions/aboutus.action';
import CommonStore from '@crema/services/commonstore';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TriggerCustomerSendMail from './TriggerCustomerSendMail';
import AppLoader from '@crema/core/AppLoader';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const ViewFeedBack = (props: any) => {
  const userDetails: any = CommonStore().profileDetails;
  const userRole = CommonStore().userRoleType;
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [getOpenFeedBack, setOpenFeedBack] = React.useState(false)
  const [editFeedBack, setEditFeedBack] = React.useState(false)
  const [viewFeedBack, setViewFeedBack] = React.useState(false)
  const [deleteFeedBack, setDeleteFeedBack] = React.useState(false)
  const [getExportFeedBack, setExportFeedBack] = React.useState(false)
  const [infoFeedBack, setinfoFeedBack] = React.useState<any>(null)
  const [getFeedBackColumns, setFeedBackColumns] = React.useState<any>(null)
  const [getUserInformation, setUserInformation] = React.useState<any>(null)
  const [getSendMail, setSendMail] = React.useState<any>(null)
  const [getFeedbackTableData, setFeedbackTableData] = React.useState<any>([]);

  useEffect(() => {
    props.reqClearState()
    onGetFeedback()
    props.reqProjectList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(()=>{
if(props.restCommonGet){
  setFeedbackTableData(props.restCommonGet)
}
  },[props.restCommonGet])

  React.useEffect(() => {
    if (props.resCommonPost && props.resCommonPost.status === true) {
      closeFeedBack()
      generalCloseEditAction()
      props.reqClearState()
      onGetFeedback()
    }
    if (props.resCommonPut && props.resCommonPut.status === true) {
      generalCloseEditAction()
      props.reqClearState()
      onGetFeedback()
    }

    if (props.resCommonDelete && props.resCommonDelete.status === true) {
      generalCloseDeleteAction()
      props.reqClearState()
      onGetFeedback()
    }

    if (props.resCommonDownload) {
      // resFileObject
      donwloadXlsxFiles(props.resCommonDownload, 'feedback.xlsx', "text/xlsx")
      props.reqClearState()
      setExportFeedBack(false)
    }

    if (props.getUserDetails && props.getUserDetails.length && userDetails && userDetails.shortid) {
      let getUserInfo: any = props.getUserDetails.find((items: any) => items.shortid === userDetails.shortid)
      setUserInformation(getUserInfo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCommonPost, props.resCommonPut, props.resCommonDelete, props.resCommonDownload, props.getUserDetails])


  const openFeedBack = () => {
    setOpenFeedBack(true)
  }

  const closeFeedBack = () => {
    setOpenFeedBack(false)
  }

  const generalEditAction = (getEditValues?: any) => {
    setEditFeedBack(true)
    setinfoFeedBack(getEditValues)
  }

  const generalViewAction = (getViewValue?: any) => {
    setViewFeedBack(true)
    setinfoFeedBack(getViewValue)
  }

  const generalDeleteAction = (getDeleteValue?: any) => {
    setDeleteFeedBack(true)
    setinfoFeedBack(getDeleteValue)
  }

  const generalCloseEditAction = (getEditValues?: any) => {
    setEditFeedBack(false)
  }

  const generalCloseViewAction = (getViewValue?: any) => {
    setViewFeedBack(false)
  }

  const generalCloseDeleteAction = (getDeleteValue?: any) => {
    setDeleteFeedBack(false)
  }

  const getRoleBased = () => {
    const FeedBackColumns: any = [
      {
        field: 'short_id',
        headerName: 'Short Id',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'department',
        headerName: 'Department',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'designation_level',
        headerName: 'Designation Level',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'suggestions_improvement_areas',
        headerName: 'Suggestions Improvement Areas',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        type: 'actions',
        roleTypes: RoutePermittedRole.Business,
        getActions: (params) => [
          <GridActionsCellItem
            key={`${params.row}_view`}
            icon={
              <Tooltip title="View Feedback">
                <PreviewIcon />
              </Tooltip>}
            label='View'
            onClick={() => generalViewAction(params.row)}
          />,
          <GridActionsCellItem
            key={`${params.row}_edit`}
            icon={
              <Tooltip title="Edit Feedback">
                <EditIcon />
              </Tooltip>}
            label='Edit'
            onClick={() => generalEditAction(params.row)}
          />,
          <GridActionsCellItem
            key={`${params.row}_delete`}
            icon={
              <Tooltip title="Delete Feedback">
                <DeleteIcon />
              </Tooltip>}
            label='Delete'
            onClick={() => generalDeleteAction(params.row)}
          />,

        ]
      }
    ];
    setFeedBackColumns(FeedBackColumns)
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
      setFeedbackTableData(filteredRows);
    } else {
      setSearchText("");
      setFeedbackTableData(props.restCommonGet);
    }
  };

  const onGetFeedback = () => {
    getRoleBased()
    props.reqUserDetail()
    props.reqCommonGet(`${ConfigAPI.feedbackURL}`)

  }

  const onConfirmDelete = () => {
    if (infoFeedBack) {
      let postURL: any = `${ConfigAPI.feedbackURL}/${infoFeedBack.id}`
      props.reqCommonDelete(postURL)
    }
  }

  const onSubmitAdd = (getProjectDetails) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.feedbackURL,
        data: getProjectDetails
      }
      props.reqCommonPost(postValues)
    }
  }

  const onSubmitEdit = (getProjectDetails) => {
    if (getProjectDetails) {
      let postValues: any = {
        url: ConfigAPI.feedbackURL,
        data: [getProjectDetails]
      }
      props.reqCommonPut(postValues)
    }
  }

  const onExportFeedBack = () => {
    setExportFeedBack(true)
  }


  const onCloseExportFeedBack = () => {
    setExportFeedBack(false)
  }

  const onConfirmExportDownload = () => {
    // ConfigAPI.exportExcelFileFeedback
    props.reqCommonDownload(ConfigAPI.exportExcelFileFeedback)
  }
  const onConfirmSendMail = () => {
    props.reqSendMail()
    setSendMail(false)
  }

  const onOpenSendMail = () => {
    setSendMail(true)
  }
  const onCloseSendMail = () => {
    setSendMail(false)
  }
  
  return (
    <React.Fragment>
      {
        getOpenFeedBack && props.getProjectList && getUserInformation ?
          <AddFeedBack onOpen={getOpenFeedBack} onClose={closeFeedBack} getUserDetails={props.getUserDetails}
            onSubmit={onSubmitAdd} getProjectList={props.getProjectList} getUserInformation={getUserInformation} />
          : null
      }

      {editFeedBack && infoFeedBack && props.getProjectList && getUserInformation ?
        <EditFeedBack onOpen={editFeedBack} getInitilValues={infoFeedBack} onClose={generalCloseEditAction}
          getUserDetails={props.getUserDetails} onSubmit={onSubmitEdit} getProjectList={props.getProjectList} getUserInformation={getUserInformation} />
        : null
      }

      {viewFeedBack && infoFeedBack && props.getProjectList ?
        <ViewFeedbackDetail onOpen={viewFeedBack} getInitilValues={infoFeedBack} onClose={generalCloseViewAction}
          getUserDetails={props.getUserDetails} getProjectList={props.getProjectList} />
        : null
      }

      {deleteFeedBack ?
        <CommonDeleteAlert openDeleteContentForm={deleteFeedBack} generalCloseDeleteAction={generalCloseDeleteAction}
          onConfirmDelete={onConfirmDelete} />
        : null
      }
      {
        getExportFeedBack ?
          <ExportFeedbackMessage onOpen={getExportFeedBack} onClose={onCloseExportFeedBack} onConfirmExport={onConfirmExportDownload} />
          : null
      }
      {
        getSendMail ?
          <TriggerCustomerSendMail onOpen={getSendMail} onClose={onCloseSendMail} onConfirmSendMail={onConfirmSendMail} />
          : null
      }


      <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
        <Box sx={{ textAlign: "right", marginBottom: 5 }}>
          {
            (userRole === RoutePermittedRole.Admin) ?
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<MailOutlineIcon />} onClick={onOpenSendMail} className="hideoption">
                Trigger Feedback
              </Button>
              : null
          }
          {
            (userRole === RoutePermittedRole.Admin || userRole === RoutePermittedRole.Business) ?
              <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<GetAppIcon />} onClick={onExportFeedBack} className="hideoption">
                Export Feedback
              </Button>
              : null
          }

          <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={openFeedBack} className="hideoption">
            Share Feedback
          </Button>
        </Box>
        {getFeedbackTableData && getFeedBackColumns ?

          <DataGrid
            autoHeight
            rowHeight={64}
            rows={getFeedbackTableData}
            columns={getFeedBackColumns}
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
          : <AppLoader />}

      </Box>
    </React.Fragment>
  )
}


const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.profileDetails,
    getUserDetails: state.businessProcess.getUserDateList,
    businessGridData: state.businessProcess,
    restCommonGet: state.othersReducer.resCommonViewData,
    resCommonPost: state.aboutUsDetails.resCommonPost,
    resCommonPut: state.aboutUsDetails.resCommonPut,
    resCommonUpload: state.aboutUsDetails.resCommonUpload,
    resCommonDelete: state.aboutUsDetails.resCommonDelete,
    getProjectList: state.operationProcess.getProjectList,
    resCommonDownload: state.aboutUsDetails.resCommonDownload,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqUserDetail: () => dispatch(reqUserDetail()),
    reqCommonUpload: (getPostURL?: any) => dispatch(reqCommonUpload(getPostURL)),
    reqCommonPost: (getPostURL?: any) => dispatch(reqCommonPost(getPostURL)),
    reqCommonPut: (getPostURL?: any) => dispatch(reqCommonPut(getPostURL)),
    reqCommonGet: (getPostURL?: any) => dispatch(reqCommonGet(getPostURL)),
    reqClearState: () => dispatch(reqClearState()),
    reqCommonDelete: (getPostURL?: any) => dispatch(reqCommonDelete(getPostURL)),
    reqProjectList: () => dispatch(reqProjectList()),
    reqCommonDownload: (getPostURL?: any) => dispatch(reqCommonDownload(getPostURL)),
    reqSendMail: () => dispatch(reqSendMail())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFeedBack)
// export default ViewFeedBack