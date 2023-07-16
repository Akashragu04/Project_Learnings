import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@mui/material';
import { Formik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { ActionTypes } from "saga/sagas/Types"; //NOSONAR
import { Fonts } from "shared/constants/AppEnums"; //NOSONAR
import AppDialog from "@crema/core/AppDialog"; //NOSONAR
import { ConfigAPI } from '../../../services/config';
import { validationBiz } from './BizApproveValidation';
import BizApproveForm from './BizApproveForm';

const BizApprovePage = (props?: any) => {
  let formikData: any;
  const { getUserDateList } = props;
  const [aprroveType, setValue] = React.useState('MOMUpload');
  const [showMomUpload, setMomUpload] = React.useState(true);
  const [showApproveOnline, setApproveOnline] = React.useState(false);
  const [addUserStatus, setUserStatusList] = React.useState([]);
  const [fieldValidation, setFieldValidation] = React.useState(null)

  /** File upload */
  const dropzone = useDropzone({
    accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
    maxFiles: 5,
    maxSize:10000000
  });
  
  const { acceptedFiles } = dropzone;
  const [uploadedFiles, setUploadedFiles]: any = React.useState([]);
  
  React.useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
    getUserDetailInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles])

  // This is function used to add status key on user list
  const getUserDetailInit = () => {
    const userList: any = [];
    if (getUserDateList.length) {
      getUserDateList.forEach((items: any) => {
        items["disable"] = false;
        userList.push(items)
      })
      setUserStatusList(userList);
    }

  }

  // This is function called onchange time
  const getUserDetails = (getUser?: any, getIndex?: any) => {
    const userListData: any = [];
    addUserStatus.forEach((items: any, index: any) => {
      if (items.shortid === getUser) {
        items["disable"] = true;
      }
      userListData.push(items)
    })
    setUserStatusList(userListData);
  }

  // This is function called removed function
  const removeUserList = (userIndex?: any) => {
    const removeUserList: any = [];
    addUserStatus.forEach((items: any, index: any) => {
      if (index === userIndex) {
        items["disable"] = false;
      }
      removeUserList.push(items)
    })
    setUserStatusList(removeUserList);
  }

  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };
  const handleChangeValues = (event) => {
    setValue(event.target.value);
    if (event.target.value === "MOMUpload") {
      setMomUpload(true)
      setApproveOnline(false)
      setFieldValidation(null)

    } else {
      setMomUpload(false)
      setApproveOnline(true)
      setFieldValidation(validationBiz)
    }
  };

  // This is a function used to clear the form values
  const handleClose = () => {
    props.closeBusinessApprovel(false);
    setUploadedFiles([])
  }
  const initialValues: any = {
    assign_sla: aprroveType,
    approver_description: '',
    approvel: [
      {
        short_id: "",
        approver_email: "",
        sequence_level: "",
        approver_name: "",
      }
    ]
  }

  const handleShortIdChange = (event, getIndex) => {
    if (getUserDateList && getUserDateList !== null) {
      getUserDateList.forEach((items: any, i: any) => {
        if (items.shortid === event.target.value) {
          formikData.setFieldValue(`approvel.${getIndex}.approver_email`, items.email)
          formikData.setFieldValue(`approvel.${getIndex}.approver_name`, items.emp_name)
        }
      })
      getUserDetails(event.target.value, getIndex)
    }
  };
  return (
    <AppDialog
      sxStyle={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: 800,
          width: "100%",
          height: "auto"
        },
        "& .MuiTypography-h6": {
          fontWeight: Fonts.SEMI_BOLD,
          backgroundColor: "#00677F",
          color: "#ffffff"
        },
      }}
      dividers
      open={props.showpage}
      onClose={handleClose}
      title={"Business Case Approval"}
    >
      <Box sx={{
        pt: 10,
      }}>
        {/* {initialFields? */}
        <Formik
          innerRef={res => formikData = res}
          initialValues={initialValues}
          validationSchema={fieldValidation}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            let postValue: any = {};
            if (values.assign_sla === 'MOMUpload') {
              const formData = new FormData();
              formData.append("approver_description", values.approver_description);
              formData.append("biz_case_id", props.approvalId);
              for (const approvalFile of uploadedFiles) {
                formData.append("supporting_files", approvalFile);
              }
              postValue = {
                url: ConfigAPI.bizSingalProv,
                formData: formData,
                assign_sla: values.assign_sla
              }

            } else {
              postValue = {
                url: ConfigAPI.bizMultiProv,
                biz_case_id: props.approvalId,
                formData: values.approvel,
                assign_sla: values.assign_sla
              }
            }
            if (postValue) {
              props.bizCaseApprovel(postValue)
            }
            handleClose()
            setSubmitting(false);
          }}>
          {({ isSubmitting, values, errors, isValidating, dirty, isValid, touched, setFieldValue, handleChange }) => {
            return (
              <BizApproveForm showMomUpload={showMomUpload} handleChangeValues={handleChangeValues} values={values} 
              setFieldValue={setFieldValue} handleChange={handleChange} handleShortIdChange={handleShortIdChange} 
              onDeleteUploadFile={onDeleteUploadFile} removeUserList={removeUserList} 
              showApproveOnline={showApproveOnline} isValid={isValid} uploadedFiles={uploadedFiles} 
              dropzone={dropzone} aprroveType={aprroveType} addUserStatus={addUserStatus} handleClose={handleClose}/>
            )
          }}
        </Formik>
        {/* :null} */}
      </Box>
    </AppDialog>
  )
}


const mapStateToProps = (state: any) => {
  return {
    loading: state.businessProcess.loading,
    leadRespones: state.businessProcess,
    getUserDateList: state.businessProcess.getUserDateList,
    getLeadDetails: state.businessProcess.getLeadsEditResponse,
    errorsCheckToken: state.businessProcess.errors
    
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    bizCaseApprovel: (getValues?: any) => dispatch({ type: ActionTypes.BUSINESS_CASE_APPROVEL_REQUEST, getValues })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BizApprovePage)
