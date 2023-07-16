import { Box } from '@mui/material';
import React from 'react'
import BrochureViewDetails from './BrochureView';
import { connect } from 'react-redux';
import CommonHeader from 'layout/CommonHeader';
import CommonMessage from 'layout/CommonMessage';
import CommonPost from 'layout/CommonPost';
import { reqBrochureData, reqCommonGet, reqCommonGetBrochure } from 'saga/Actions';
import { ConfigAPI } from 'services/config';

const BrochureView = (props?: any) => {
    const [openBrochure, setBrochure] = React.useState(false)
    const [openAlterMessage, setAlterMessage] = React.useState(false)
    const [openBrochureDetails, setBrochureDetails] = React.useState<any>(null)

    React.useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        props.reqBrochureDetails()
        // setBrochureDetails(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onOpenBrochureDetails = (getBrochureDetails?: any) => {
        setBrochure(true)
        if (getBrochureDetails) {
            // setBrochureDetails(getBrochureDetails)
            props.reqCommonGet(`${ConfigAPI.getSingleBrochureDetails}/${getBrochureDetails.id}`)
            if (getBrochureDetails.brochureFile && getBrochureDetails.brochureFile.supporting_file_view_url) {
                props.reqCommonGetBrochure(getBrochureDetails.brochureFile.supporting_file_view_url)
            }
        }
    }

    const onCloseBrochureDetails = () => {
        setBrochure(false)
        // setBrochureDetails(null)
    }

    const onOpenAlterMessage = (getValues?: any) => {
        setAlterMessage(true)
        setBrochureDetails(getValues)
    }

    const onCloseAlterMessage = () => {
        setAlterMessage(false)
        setBrochureDetails(null)
    }

    const onConfirmDownload = () => {
        if (openBrochureDetails && openBrochureDetails.brochureFile) {
            setAlterMessage(false)
            window.open(openBrochureDetails.brochureFile.supporting_file_view_url, '_block')
        }
    }

    return (
        <React.Fragment>
            {
                props.resCommonViewData && openBrochure ?
                    <BrochureViewDetails openBrochure={openBrochure} onCloseBrochureDetails={onCloseBrochureDetails}
                        openBrochureDetails={props.resCommonViewData} getViewBrochureData={props.resCommonViewBrochureData} />
                    : null
            }
            {
                openAlterMessage ?
                    <CommonMessage onOpen={openAlterMessage} onClose={onCloseAlterMessage} BannerDetails={BannerDetails} onConfirmDownload={onConfirmDownload} />
                    : null
            }

            {/* <Header /> */}
            <CommonHeader bannerDetails={BannerDetails} />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        {
                            props.resBrochureDetails && props.resBrochureDetails.length ?
                                props.resBrochureDetails.map((item?: any, index?: any) => (
                                    <CommonPost data={item} key={index} onOpenBrochureDetails={onOpenBrochureDetails} onOpenAlterMessage={() => onOpenAlterMessage(item)} />
                                ))
                                : <Box>No Data</Box>
                        }

                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </React.Fragment>
    )
}
const BannerDetails: any = {
    title: 'Brochure',
    homeurl: '/',
    homeTitle: 'Home'
}

const mapStateToProps = (state: any) => {
    return {
        resBrochureDetails: state.othersReducer.resBrochureDetails,
        resCommonViewData: state.othersReducer.resCommonViewData,
        resCommonViewBrochureData: state.othersReducer.resCommonViewBrochureData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        reqBrochureDetails: () => dispatch(reqBrochureData()),
        reqCommonGet: (postURL: any) => dispatch(reqCommonGet(postURL)),
        reqCommonGetBrochure: (postURL: any) => dispatch(reqCommonGetBrochure(postURL))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BrochureView);