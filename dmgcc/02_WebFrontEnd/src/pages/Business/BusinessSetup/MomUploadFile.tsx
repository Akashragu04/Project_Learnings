import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern'; //NOSONAR
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AppList } from '@crema'; //NOSONAR
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow'; //NOSONAR
import { TextField } from "@mui/material";
import { commonInformationDetails } from 'services/Constants';

export const MomUploadFile = (props?:any) => {
  return (
    <Formik
    innerRef={res => props.formikData = res}
    initialValues={props.initialValues}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      let postValue: any = {};
      if (values.assign_sla === 'MOMUpload') {
        const formData = new FormData();
        formData.append("approver_description", values.approver_description);
        formData.append("biz_case_id", props.approvalId);
        for (let i = 0; i < props.uploadedFiles.length; i++) {
          formData.append("supporting_files", props.uploadedFiles[i]);
        }
        postValue = {
          url: props.ConfigAPI.bizSingalProv,
          formData: formData,
          assign_sla: values.assign_sla
        }

      } else {
        postValue = {
          url: props.ConfigAPI.bizMultiProv,
          biz_case_id: props.approvalId,
          formData: values.approvel,
          assign_sla: values.assign_sla
        }
      }
      if (postValue) {
        props.bizCaseApprovel(postValue)
      }
      props.handleClose()
      setSubmitting(false);
    }}>
    {({ isSubmitting, values, errors,  isValidating, dirty, isValid, touched, setFieldValue, handleChange }) => {
      return (
        <Form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <FormControl component='fieldset'>
              <RadioGroup row
                aria-label='gender'
                name='assign_sla'
                value={props.aprroveType}
                onChange={(e: any) => {
                  setFieldValue('assign_sla', e.target.value)
                  props.handleChangeValues(e);
                }}>
                <FormControlLabel value="MOMUpload" onChange={handleChange} control={<Radio />} label='MOM Upload' />
                <FormControlLabel value="ApproveOnline" onChange={handleChange} control={<Radio />} label='Approve Online' />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ p: 1, mt: 5 }}>
            <Grid container spacing={3}>
              {/* <Grid item xs={2} md={2}></Grid> */}
              <Grid item xs={12} md={12} style={{ display: props.showMomUpload ? 'block' : 'none' }}>
                <UploadModern
                  uploadText={commonInformationDetails.drapanddrop}
                  dropzone={props.dropzone}
                />
                <aside>
                  <AppList
                    data={props.uploadedFiles}
                    renderRow={(file, index) => (
                      <FileRow
                        key={index + file.path}
                        file={file}
                        onDeleteUploadFile={props.onDeleteUploadFile}
                      />
                    )}
                  />
                </aside>
                <FormControl variant="standard" fullWidth margin='dense'>
                  <TextField sx={{ width: "100%" }} id="approver_description" onChange={handleChange} name="approver_description" label="Description" />
                </FormControl>

              </Grid>

              {/* <Grid item xs={2} md={2}></Grid> */}
            </Grid>
          </Box>

          <Box
            sx={{
              p: 5,
              mt: 5,
              mb: 5,
              textAlign: "right",
            }}
          >

            <Button
              sx={{
                position: "relative",
                minWidth: 100,
                marginRight: 2
              }}
              variant="contained"
              color="inherit"
              type="button"
              onClick={props.handleClose}
            >
              Cancel
            </Button>

            <Button
              sx={{
                position: "relative",
                minWidth: 100,
                marginRight: 2
              }}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              {props.showApproveOnline ? 'Send Mail for Approval' : 'Submit'}

            </Button>
          </Box>
        </Form>
      )
    }}
  </Formik>
  )
}


export default MomUploadFile;
