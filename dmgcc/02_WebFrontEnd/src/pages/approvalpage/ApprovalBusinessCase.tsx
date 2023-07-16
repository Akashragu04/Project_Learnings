import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ActionTypes } from "saga/sagas/Types";
import AppLoader from '@crema/core/AppLoader'
// import { AppAnimate } from '@crema';
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from "react-router-dom";

const ApprovalBusinessCase = (props?: any) => {
    const { emailApprovalStatus } = props;
    const location = useLocation();
    useEffect(() => {
        if (location && location.pathname) {
            let splitUrl = location.pathname.split('/');
            if (splitUrl && splitUrl[1] === 'business-approvel') {
                const putValues: any = {
                    Biz_Case_ID: splitUrl[2],
                    Approval_ID: splitUrl[3],
                    receiver: splitUrl[4],
                    token: splitUrl[5]
                }
                if (putValues) {
                    props.mailBusinessApproval(putValues)
                }
            }

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {emailApprovalStatus ?
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
                                    Business Requirement Approved Successfully
                                </Box>
                            </Grid>
                        </Grid>

                    </Card>
                </Box>
                // </AppAnimate>
                : <AppLoader />}
        </>


    )
}

const mapStateToProps = (state) => {
    return {
        emailApprovalStatus: state.businessProcess.emailApprovalStatus,
        errorsCheckToken: state.businessProcess.errors
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        mailBusinessApproval: (getValues?: any) => dispatch({ type: ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_REQUEST, value: getValues }),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalBusinessCase);