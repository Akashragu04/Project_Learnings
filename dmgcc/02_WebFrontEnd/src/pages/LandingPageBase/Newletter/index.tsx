import { Box } from '@mui/material';
import React from 'react'
import ViewNewsLetter from './ViewNewsLetter';
import { connect } from 'react-redux';
import CommonHeader from 'layout/CommonHeader';
import CommonMessage from 'layout/CommonMessage';
import CommonPost from 'layout/CommonPost';
import { reqNewsletterData, reqCommonGet, reqCommonGetBrochure } from 'saga/Actions';
import { ConfigAPI } from 'services/config';

const NewsLatterView = (props?: any) => {
  const [openNewsLetter, setNewsLetter] = React.useState(false)
  const [openNewsLetterDetails, setNewsLetterDetails] = React.useState(null)
  const [openAlterMessage, setAlterMessage] = React.useState(false)
  const [openContentDetails, setContentDetails] = React.useState<any>(null)

  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.reqNewsletterData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setNewsLetterDetails(null)
  }, [])
  const onOpenNewsLetterDetails = (getNewsLetterDetails?: any) => {
    setNewsLetter(true)
    setNewsLetterDetails(getNewsLetterDetails)
    props.reqCommonGet(`${ConfigAPI.getSingleNewsletterDetails}/${getNewsLetterDetails.id}`)
    if(getNewsLetterDetails.newsletter_file && getNewsLetterDetails.newsletter_file.supporting_file_view_url){
        props.reqCommonGetBrochure(getNewsLetterDetails.newsletter_file.supporting_file_view_url)
    }
  }

  const onCloseNewsLetterDetails = () => {
    setNewsLetter(false)
    setNewsLetterDetails(null)
  }

  const onOpenAlterMessage = (getValues?: any) => {
    setAlterMessage(true)
    setContentDetails(getValues)
}

const onCloseAlterMessage = () => {
    setAlterMessage(false)
    setContentDetails(null)
}

const onConfirmDownload = () => {
    if (openContentDetails && openContentDetails.newsletter_file) {
        setAlterMessage(false)
        window.open(openContentDetails.newsletter_file.supporting_file_view_url, '_block')
    }
}
  
  return (
    <React.Fragment>
      {
        openNewsLetter ?
          <ViewNewsLetter onOpen={openNewsLetter} onCloseNewsLetterDetails={onCloseNewsLetterDetails} 
          openNewsLetterDetails={openNewsLetterDetails} getViewBrochureData={props.resCommonViewBrochureData}/>
          : null
      }
      {
        openAlterMessage ?
          <CommonMessage onOpen={openAlterMessage} onClose={onCloseAlterMessage} BannerDetails={BannerDetails} onConfirmDownload={onConfirmDownload} />
          : null
      }
      <CommonHeader bannerDetails={BannerDetails} />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            {
              props.resNewsLetterDetails ?
                props.resNewsLetterDetails.map((item?: any, index?: any) => (
                  <CommonPost data={item} key={index} onOpenBrochureDetails={onOpenNewsLetterDetails} onOpenAlterMessage={()=>onOpenAlterMessage(item)} />
                ))
                : <Box>No Data</Box>
            }

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const BannerDetails: any = {
  title: 'Newsletter',
  homeurl: '/',
  homeTitle: 'Home'
}

const mapStateToProps = (state: any) => {
  return {
    resNewsLetterDetails: state.othersReducer.resNewsLetterDetails,
    resCommonViewData:state.othersReducer.resCommonViewData,
    resCommonViewBrochureData:state.othersReducer.resCommonViewBrochureData
  }
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqNewsletterData: () => dispatch(reqNewsletterData()),
    reqCommonGet: (postURL:any) => dispatch(reqCommonGet(postURL)),
    reqCommonGetBrochure:(postURL:any) =>dispatch(reqCommonGetBrochure(postURL))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsLatterView);
