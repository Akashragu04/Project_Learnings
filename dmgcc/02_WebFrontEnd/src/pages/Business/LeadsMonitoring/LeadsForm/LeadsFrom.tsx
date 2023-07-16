import React from 'react'
import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { Form } from 'formik';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormHelperText from '@mui/material/FormHelperText';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';
import { commonInformationDetails } from 'services/Constants';

 const LeadsFrom = (props?:any) => {
     const selectUserData = (getValues?:any) => {

     }
     const onDeleteUploadFile = (getValues?:any) => {

     }
     const goBack = () => {
         
     }
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
    <Box sx={{ flexGrow: 1, width: '100%', padding: 5 }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={8}> */}
        <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Request Date'
                value={props.values.request_date}
                minDate={props.addLeadDate}
                onChange={reqDate => props.setFieldValue("request_date", reqDate)}
                renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} onKeyDown={onKeyDown}/>}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense' error={!!props.errors.receiver_contact_name}>
              <InputLabel htmlFor="receiver-name">Service Receiver Contact Name</InputLabel>
          <Input id="receiver-name" name="receiver_contact_name" value={props.values.receiver_contact_name} onChange={props.handleChange} />
          <FormHelperText> {props.errors.receiver_contact_name ? (
              <span> {props.errors.receiver_contact_name}</span>
            ) : null}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense' error={!!props.errors.receiver_email_id}>
              <InputLabel htmlFor="receiver-email">Service Receiver Email ID</InputLabel>
              <Input id="receiver-email" name="receiver_email_id" value={props.values.receiver_email_id} onChange={props.handleChange} />
              <FormHelperText> {props.errors.receiver_email_id ? (
              <span> {props.errors.receiver_email_id}</span>
            ) : null}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense' error={!!props.errors.receiver_department}>
              <InputLabel htmlFor="receiver-department">Service Receiver Department</InputLabel>
              <Input id="receiver-department" name="receiver_department" value={props.values.receiver_department} onChange={props.handleChange} />
              <FormHelperText> {props.errors.receiver_department ? (
              <span> {props.errors.receiver_department}</span>
            ) : null}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense' error={!!props.errors.receiver_entity}>
              <InputLabel htmlFor="receiver-entry">Service Receiver Entity</InputLabel>
              <Input id="receiver-entry" name="receiver_entity" value={props.values.receiver_entity} onChange={props.handleChange} />
              <FormHelperText> {props.errors.receiver_entity ? (
              <span> {props.errors.receiver_entity}</span>
            ) : null}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense' error={!!props.errors.project_name}>
              <InputLabel htmlFor="project-name">Project Name</InputLabel>
              <Input id="project-name" name="project_name" value={props.values.project_name} onChange={props.handleChange} />
              <FormHelperText> {props.errors.project_name ? (
              <span> {props.errors.project_name}</span>
            ) : null}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant='standard' fullWidth margin='dense'>
              <InputLabel id='provider_short_id'>Service Provider Short Id</InputLabel>
              <Select
                labelId='provider_short_id'
                id='provider_short_id'
                name="provider_short_id"
                value={props.values.provider_short_id}
                onChange={(e:any) => {
                    props.setFieldValue('provider_short_id', e.target.value)
                  selectUserData(e);
                }}   
                label='Short Id'
              >
                {props.leadRespones.getUserDateList&& props.leadRespones.getUserDateList !== null ?
                props.leadRespones.getUserDateList.map((items:any, index:any)=> <MenuItem value={items.shortid} key={index}>{items.shortid}</MenuItem>)
                :null}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense'>
              <InputLabel htmlFor="provider-name">Service Provider Name</InputLabel>
              <Input id="provider-name" name="provider_name" value={props.values.provider_name} onChange={props.handleChange} readOnly />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense'>
              <InputLabel htmlFor="provider-email">Service Provider Email</InputLabel>
              <Input id="provider-email" name="provider_email" value={props.values.provider_email} onChange={props.handleChange} readOnly />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth margin='dense'>
              <InputLabel htmlFor="provider-department">Service Provider Department</InputLabel>
              <Input id="provider-department" name="provider_department" value={props.values.provider_department} onChange={props.handleChange} readOnly />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl variant="standard" fullWidth margin='dense'>
              <TextField
                id='short-description'
                name="short_description"
                label='Short Description'
                multiline
                variant='standard'
                value={props.values.short_description}
                onChange={props.handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
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
                    onDeleteUploadFile={onDeleteUploadFile}
                  />
                )}
              />
            </aside>
          </Grid>

        </Grid>
      </Grid>
    </Box>

    <Box
      sx={{
        pt: 3,
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
        onClick={()=>{
          goBack()
        }}
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
      >
        Submit
      </Button>
    </Box>
  </Form>
  )
}


export default LeadsFrom;