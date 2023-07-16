import React from 'react'
import MarketForm from './MarketForm';
import { connect } from "react-redux";
import { reqClearStatus, reqMarketData, reqPutMarketData } from 'saga/Actions';
import { Typography } from '@mui/material';

const MarketView = (props: any) => {
    const [getInitilValue, setInitileValue] = React.useState<any>(null)

    React.useEffect(() => {
        props.reqMarketData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (props.resMarketData) {
            let postValues = {
                markup_value: props.resMarketData.markup_value,
                india_wht_value: props.resMarketData.india_wht_value,
                non_india_wht_value: props.resMarketData.non_india_wht_value,
                gst_value: props.resMarketData.gst_value,
                fx_value: props.resMarketData.fx_value
            }
            setInitileValue(postValues)
        }

        if (props.putResMarketData && props.putResMarketData.status === true) {
            props.reqMarketData()
            props.reqClearStatus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.loading, props.putResMarketData])

    const onPutMarketValues = (getMarketValues?: any) => {
        props.reqPutMarketData(getMarketValues)
    }
    return (
        <React.Fragment>
            <Typography
                component="h5"
                variant="inherit"
                color="inherit"
                sx={{
                    fontSize: 16,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    marginBottom: 3
                }}
            >
                Market
            </Typography>
            {
                getInitilValue ?
                    <MarketForm resMarketData={props.resMarketData} getInitilValue={getInitilValue} onPutMarketValues={onPutMarketValues} />
                    : null
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.FinanceMaster.loading,
        resMarketData: state.FinanceMaster.resMarketData,
        putResMarketData: state.FinanceMaster.putResMarketData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        reqMarketData: () => dispatch(reqMarketData()),
        reqPutMarketData: (getIOMappingData?: any) => dispatch(reqPutMarketData(getIOMappingData)),
        reqClearStatus: () => dispatch(reqClearStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketView);
// export default MarketView;
