import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux'
import AppLoader from '@crema/core/AppLoader'
// import { AppAnimate } from '@crema';
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { reqSentApprovalSla } from 'saga/Actions';

const SLAApproval = (props:any) => {
    const { slaApprovalSuccess } = props;
    const location = useLocation();
    useEffect(() => {
        if (location && location.pathname) {
            let splitUrl = location.pathname.split('/');
            if (splitUrl && splitUrl[1] === 'sla-approvals') {
                const putValues: any = {
                    Approval_ID: splitUrl[2],
                    receiver: splitUrl[3],
                    token: splitUrl[4]
                }
                if (putValues) {
                    props.mailSentApprovalSla(putValues)
                }
            }

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <React.Fragment>
    {slaApprovalSuccess?
    // <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box
            sx={{
                pb: 6,
                paddingTop:'10%',
                py: { xl: 8 },
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Card
                sx={{
                    maxWidth: 1024,
                    width: "100%",
                    height: 200,
                    padding: 8,
                    paddingLeft: { xs: 8, md: 2 },
                    overflow: "hidden",
                    boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#ffffff"
                }}
            >
                <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",

                        }}
                    >
                        <Box>
                            <CheckCircleIcon color='success' sx={{
                                width: "10%",
                                height: "10%",
                                display: "inline-block",
                                paddingRight: { xs: 0, lg: 10 }
                            }} />
                        </Box>
                        <Box sx={{ width: "100%", textAlign: "center", fontSize: 25 }}>
                            {/* {emailApprovalStatus.message} */}
                            SLA Approved Successfully
                        </Box>
                    </Grid>
                </Grid>

            </Card>
        </Box>
    // </AppAnimate>
    :<AppLoader/>}
</React.Fragment>
  )
}

const mapStateToProps = (state) => {
    return {
        slaApprovalSuccess: state.bizCaseSLAProcess.slaApprovalSuccess,
        errorsCheckToken: state.bizCaseSLAProcess.errors
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        mailSentApprovalSla: (getValues?: any) => dispatch(reqSentApprovalSla(getValues)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SLAApproval);
