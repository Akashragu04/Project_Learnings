import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { ActionTypes } from "saga/sagas/Types";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Stepper, StepLabel } from '@mui/material';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import AppLoader from '@crema/core/AppLoader'
import LeadDetails from './LeadDetails';
import BusinessRequirementDetails from './BusinessRequirementDetails';
import ApprovalView from '@crema/commonservices/ApprovalView';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BusinessCaseSetupDetails from './BusinessCaseSetupDetails';
import { getBusinessSetupInfo } from 'saga/Actions';
import SetBizCaseSetup from 'pages/Business/BusinessSetup/setBizCaseSetup/SetBizCaseSetup';


const ViewBusinessLeadDetails = (props?: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [showBizSetup, setShowBizSetup] = React.useState(false);
  const { getLeadDetails, loading } = props;
  
  useEffect(() => {
    if (props.viewIdDetails) {
      props.getLeadData(props.viewIdDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (getLeadDetails && getLeadDetails.biz_id && getLeadDetails.biz_id.id) {
      props.getBusinessCaseSetup(getLeadDetails.biz_id.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLeadDetails])


  const onSetupBusinessMapping = () => {
    setShowBizSetup(true)
  }

  const closeSetupBusinessMapping = () => {
    setShowBizSetup(false);
  }

  const handleClose = () => {
    props.closeBusinessLeadDetails(false);
  }

  const totalSteps = () => {
    return props.getStepperInfo.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        props.getStepperInfo.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  // };

  const leadsDetails = () => {
    return (
      <>
        {loading ? <AppLoader />
          : <Typography sx={{ mt: 2, mb: 1, marginTop: 10 }}>
            <Box sx={{
              display: 'flex', flexDirection: 'row',
              margin: 'auto',
              borderRadius: 4,
            }}>
              <Card variant='outlined' sx={{ padding: 5 }}>
                <CardContent>
                  {getLeadDetails ?
                    <LeadDetails getLeadDetails={getLeadDetails} />
                    : null}
                </CardContent>
              </Card>

            </Box>
          </Typography>
        }
      </>
    )
  }

  const businessRequirements = () => {
    let businessRequirementDetails: any;
    let leadId: any
    // getLeadDetails && getLeadDetails !== null &&  getLeadDetails !== undefined ?

    // :null
    if (getLeadDetails && getLeadDetails !== null && getLeadDetails !== undefined) {
      businessRequirementDetails = getLeadDetails.biz_id;
      leadId = getLeadDetails.id
    }

    return (<Typography sx={{ mt: 2, mb: 1, marginTop: 10 }}>
      <Card variant='outlined' sx={{ padding: 2 }}>
        <CardContent>
          <Box sx={{
            display: 'flex', flexDirection: 'row',
            margin: 'auto',
            borderRadius: 4,
          }}>

            {businessRequirementDetails && businessRequirementDetails !== null && businessRequirementDetails !== undefined ?
              <BusinessRequirementDetails businessRequirementDetails={businessRequirementDetails} leadId={leadId} />
              : <>
                <Typography sx={{ flex: 1 }} variant='h5' component='div'> No Data</Typography>
              </>}

            {/* Business Requirements */}
          </Box>

        </CardContent>
      </Card>
    </Typography>)
  }
  const businessApprovals = () => {
    let businessRequirementDetails: any;
    // :null
    if (getLeadDetails && getLeadDetails !== null && getLeadDetails !== undefined) {
      businessRequirementDetails = getLeadDetails.biz_id;
    }
    return (<Typography sx={{ mt: 2, mb: 1, marginTop: 10 }}>
      <Card variant='outlined' sx={{ padding: 2 }}>
        <CardContent>
          <Box sx={{
            display: 'flex', flexDirection: 'row',
            margin: 'auto',
            borderRadius: 4,
          }}>

            {businessRequirementDetails ?
              <ApprovalView viewApproval={businessRequirementDetails} />
              : null}

          </Box>
        </CardContent>
      </Card>
    </Typography>)
  }
  const businessSetup = () => {
    let bizCaseSetupDetails: any;
    let bizCaseRequirementDetails: any;

    if (getLeadDetails && getLeadDetails.biz_id) {
      bizCaseSetupDetails = getLeadDetails.biz_id?getLeadDetails.biz_id.bizcasesetup:{};
      bizCaseRequirementDetails = getLeadDetails.biz_id;
    }

    return (
      <Typography sx={{ mt: 2, mb: 1, marginTop: 10 }}>
        <Box sx={{
          display: 'flex', flexDirection: 'row', border: 1,
          padding:5,          
          margin: 'auto',
          borderRadius: 4,
          borderColor: "#D9DBE3",
        }}>

          {bizCaseSetupDetails ?
            <BusinessCaseSetupDetails bizCaseRequirementDetails={bizCaseRequirementDetails}
              bizCaseSetupDetails={bizCaseSetupDetails} onSetupBusinessMapping={onSetupBusinessMapping} />
            : <>
              <Typography sx={{ flex: 1 }} variant='h5' component='div'> No Data</Typography>
            </>}
        </Box>
      </Typography>)
  }
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      {props.getLeadDetailsList && props.getStepperInfo.length ?
        <Dialog
          fullScreen
          open={props.showpage}
          onClose={handleClose}
        // TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              {loading ? <AppLoader /> :
                <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                  Project Name: {getLeadDetails ?
                    <>
                      {getLeadDetails.project_name}
                    </> : null}
                </Typography>
              }
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ width: '100%', marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {props.getStepperInfo.map((label, index) => {
                return (
                  <Step key={index} completed={completed[index]}>
                    <StepLabel icon={label.status === 'Completed' ? <CheckCircleIcon sx={{ color: label.color }} /> : <RestartAltIcon sx={{ color: label.color }} />}
                      style={{ color: 'primary' }} >{label.title}</StepLabel>
                    {/* <StepLabel style={{ color: label.color }}>{label.title}</StepLabel> */}
                  </Step>
                )
              })}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 ? leadsDetails() : null}
                  {activeStep === 1 ? businessRequirements() : null}
                  {activeStep === 2 ? businessApprovals() : null}
                  {activeStep === 3 ? businessSetup() : null}
                  {activeStep === 4 ? businessSetup() : null}
                  <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 5, marginBottom:5 }}>
                    <Button
                      variant="contained" color="primary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button variant="contained" color="primary" onClick={handleNext} sx={{ mr: 1 }}
                      disabled={activeStep === 3}
                    >
                      Next
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </Dialog>
        : null}
      {(showBizSetup && getLeadDetails) && <SetBizCaseSetup bizSetupResponse={getLeadDetails.biz_id} show={showBizSetup}
        closeSetupBusinessMapping={closeSetupBusinessMapping} getBizCaseSetupData={props.getBizCaseSetupData}
        getBizId={getLeadDetails.biz_id} />}
    </>
  )
}


const mapStateToProps = (state: any) => {
  return {
    loading: state.businessProcess.loading,
    leadRespones: state.businessProcess,
    getLeadDetails: state.businessProcess.getLeadsEditResponse,
    getStepperInfo: state.businessProcess.getStepperData,
    getBizCaseSetupData: state.BizCaseSetup.getBizCaseData,
    errorsCheckToken: state.businessProcess.errors
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getLeadData: (getValues?: any) => dispatch({ type: ActionTypes.GET_LEADS_DATA_REQUEST, getValues }),
    getBusinessCaseSetup: (getBizId?: any) => dispatch(getBusinessSetupInfo(getBizId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBusinessLeadDetails)