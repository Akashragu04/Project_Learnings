import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import { Card,  Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import ExternalResource from './ExternalResource';
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {reqUpdateThirdpartyResource, addReqThirdpartyResource, reqThirdpartyResource, reqRestInitialData} from 'saga/Actions/resources.actions';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import UploadExternalFileUpload from './UploadExternalFileUpload';
import { reqClearStatus, reqDownloadFileObjectCommon, reqUploadFinanceCostCentre } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import { saveAs } from 'file-saver';

const ExternalResourceView = (props?:any) => {
  const [openUploadFile, setUploadFile] = React.useState(false)

    const navigate = useNavigate();
    React.useEffect(()=>{
        getExternalResourceData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(() => {
      if (props.resFileObject) {
          // resFileObject
          var blob = new Blob([props.resFileObject], { type: "text/xlsx" });
          saveAs.saveAs(blob, "externalResource.xlsx");
          props.reqClearStatus()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resFileObject])

  React.useEffect(()=>{

    if(props.resEditThirdpartData && props.resEditThirdpartData.status === true){
      props.reqRestInitialData()
      getExternalResourceData()
    }
    
    
    if(props.resAddThirdpartData && props.resAddThirdpartData.status === true){
      props.reqRestInitialData()
      getExternalResourceData()
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.resEditThirdpartData, props.resAddThirdpartData])
    const getExternalResourceData = () =>{
      const postValues: any = {
            size: 10,
            page: 0,
            sort: '',
            Serachkeyword: ''
          }       
        props.getThirdpartyResource(postValues)
    }

    const onCreateNewResource = () => {
        navigate('/resource/add_external_resource')
    }

    // const onUpdateResource = () => {
    //     navigate('/resource/update_external_resource')
    // }
const onUploadFileExternalResource = () =>{
  setUploadFile(true)
}

const onCloseUploadFileExternalResource = () =>{
  setUploadFile(false)
}

const onDownloadExternalResource = () =>{
// props.reqDownloadFileObjectCommon(ConfigAPI.downloadThirdPartyResource) 
window.open(`${process.env.REACT_APP_API_URL}${'api/employees/downloadthirdpartyresource'}`, '_blank')
}

const onUploadFileSubmit = (getFileDetail?:any) => {
let postValues:any = {
  url: ConfigAPI.uploadThirdPartyResource,
  file: getFileDetail.file
}
props.reqUploadFinanceCostCentreData(postValues)
setUploadFile(false)
getExternalResourceData()
}

  return (
      <React.Fragment>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {
        openUploadFile?
        <UploadExternalFileUpload  openUploadFile={openUploadFile} closeOpenUploadFile={onCloseUploadFileExternalResource} onUploadFileSubmit={onUploadFileSubmit}/>
        :null
      }
      
        <AppGridContainer>
          <Grid item xs={12} style={{ marginTop: 0 }}>
                <Grid item xs={12} sx={{textAlign:'right', marginBottom:5, marginTop:2}}>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onCreateNewResource} className="hideoption">
                Create Resource
              </Button>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileExternalResource} className="hideoption">
                    Upload Resources
                </Button>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadExternalResource}>
                    Download Template
                </Button>
                </Grid>
            <Card variant='outlined'>
              <CardContent>
                {/* {
                  props.getThirdPartResource? */}
                  <ExternalResource />                  
                  {/* :null
                } */}
              </CardContent>
            </Card>
          </Grid>
        </AppGridContainer>

      </React.Fragment>
  )
}


const breadCrumbValues = {
    title: 'External Resource',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
  }

  

const mapStateToProps = (state: any) => {
    return {
        loading: state.resourceProcess.loading,
        getCostCentreList: state.resourceProcess.getCostCentreList,
        getResourceRecordList: state.resourceProcess.getResourceRecordList,
        getThirdPartResource:state.resourceProcess.getThirdPartResource,
        resFileObject: state.FinanceMaster.resFileObject,
        resEditThirdpartData:state.resourceProcess.resEditThirdpartData,
        resAddThirdpartData:state.resourceProcess.resAddThirdpartData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        addThirdpartyResource: (postCostCentreId?: any) => dispatch(addReqThirdpartyResource(postCostCentreId)),
        getThirdpartyResource: (postCostCentreId?: any) => dispatch(reqThirdpartyResource(postCostCentreId)),
        UpdateThirdpartyResource: (postCostCentreId?: any) => dispatch(reqUpdateThirdpartyResource(postCostCentreId)),
        reqDownloadFileObjectCommon: (downloadURL?: any) => dispatch(reqDownloadFileObjectCommon(downloadURL)),
        reqUploadFinanceCostCentreData: (uploadCostCentre?: any) => dispatch(reqUploadFinanceCostCentre(uploadCostCentre)),
        reqRestInitialData:()=>dispatch(reqRestInitialData()),
        reqClearStatus: () => dispatch(reqClearStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalResourceView);

// export default ExternalResourceView;