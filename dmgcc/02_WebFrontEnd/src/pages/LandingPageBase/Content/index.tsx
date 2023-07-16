import { Box } from '@mui/material';
import React from 'react'
import { ViewContent } from './ViewContent';
import ViewContentPost from './ViewContentPost';
import AddContentData from './AddContentData';
import { connect } from 'react-redux';
import CommonHeader from 'layout/CommonHeader';
import CommonMessage from 'layout/CommonMessage';
import { reqContentDetailsData, reqCommonGet } from 'saga/Actions';
import { ConfigAPI } from 'services/config';

const ContentView = (props?:any) => {
  const [openContent, setContent] = React.useState(false)
  const [openAlterMessage, setAlterMessage] = React.useState(false)
  const [openAddContentData, setAddContentData] = React.useState(false)
  // const [openNewsletterDetails, setNewsletterDetails] = React.useState<any>(null)

  React.useEffect(()=>{
    window.scrollTo(0, 0);
    props.reqContentDetailsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

      const onOpenContentDetails = (getContentDetails?:any) =>{
        setContent(true)
          // setContentDetails(getContentDetails)
          props.reqCommonGet(`${ConfigAPI.getSingleContentDetails}/${getContentDetails.id}`)
      }
  
      const onCloseContentDetails = () =>{
        setContent(false)
          // setContentDetails(null)
      }


      const onOpenAlterMessage = (getValues?: any) => {
        setAlterMessage(true)
        // setNewsletterDetails(getValues)
    }

    const onCloseAlterMessage = () => {
        setAlterMessage(false)
        // setNewsletterDetails(null)
    }

    const onConfirmDownload = () => {
        // if (openContentDetails && openContentDetails.brochureFile) {
        //     setAlterMessage(false)
        //     window.open(openBrochureDetails.brochureFile.supporting_file_view_url, '_block')
        // }
    }


  const onEditorStateChange =(getValues:any) =>{
  }

const onCloseAddContent = () =>{
  setAddContentData(false)
}

  return (
    <React.Fragment>
       {
           props.resCommonViewData && openContent?
            <ViewContent onOpen={openContent} onCloseContentDetails={onCloseContentDetails} openNewsLetterDetails={props.resCommonViewData}/>            
            :null
        }

        {
            openAlterMessage?
            <CommonMessage onOpen={openAlterMessage} onClose={onCloseAlterMessage} BannerDetails={BannerDetails} onConfirmDownload={onConfirmDownload} />
            :null
        }

        {
          openAddContentData?
          <AddContentData openAddContentData={openAddContentData} onEditorStateChange={onEditorStateChange} onCloseAddContent={onCloseAddContent}/>          
          :null
        }

        <CommonHeader bannerDetails={BannerDetails}/>
        <div className="container-xxl py-5">
        <div className="container">
        <div className="row g-4">
            {
                props.resContentDetails?
                props.resContentDetails.map((item?:any, index?:any)=>(
                    <ViewContentPost data={item} key={index} onOpenContentDetails={onOpenContentDetails} onOpenAlterMessage={onOpenAlterMessage}/>
                ))
                :<Box>No Data</Box>
            }
          
            </div>
            </div>
            </div>
    </React.Fragment>
  )
}
const BannerDetails:any = {
    title:'Content',
    homeurl:'/',
    homeTitle:'Home'
}
const mapStateToProps = (state: any) => {
  return {
    resContentDetails:state.othersReducer.resContentDetails,
    resCommonViewData:state.othersReducer.resCommonViewData
  }
  }
const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqContentDetailsData: () => dispatch(reqContentDetailsData()),
    reqCommonGet: (postURL:any) => dispatch(reqCommonGet(postURL)),
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ContentView);
// export default ContentView; 