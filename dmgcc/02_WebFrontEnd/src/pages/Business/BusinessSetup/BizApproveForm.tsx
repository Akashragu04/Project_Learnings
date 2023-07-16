import React from 'react'
import {Button, Grid, Box, Radio, RadioGroup, FormControlLabel, FormControl, 
  Select, InputLabel, MenuItem, Input, TextField } from '@mui/material';
  import { Form, FieldArray } from 'formik';
  import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern'; //NOSONAR
  import { AppList } from '@crema'; //NOSONAR
  import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow'; //NOSONAR
  import { commonInformationDetails, sequenceList } from '../../../services/Constants';

const BizApproveForm = (props?:any) => {
  return (
    <Form
    style={{ width: "100%",  display: "flex", flexDirection: "column", }}
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
            props.setFieldValue('assign_sla', e.target.value)
            props.handleChangeValues(e);
          }}>
          <FormControlLabel value="MOMUpload" onChange={props.handleChange} control={<Radio />} label='MOM Upload' />
          <FormControlLabel value="ApproveOnline" onChange={props.handleChange} control={<Radio />} label='Approve Online' />
        </RadioGroup>
      </FormControl>
    </Box>
    <Box sx={{ p: 1, mt: 5 }}>
      <Grid container spacing={3}>
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
            <TextField sx={{ width: "100%" }} id="approver_description" onChange={props.handleChange} 
            name="approver_description" label="Description" />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} style={{ display: props.showApproveOnline ? 'block' : 'none' }}>
          <FieldArray
            name="approvel"
            render={({ insert, remove, push }) => (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Button
                        variant="contained"
                        sx={{ mt: 5, ml: 1, p: 1, width: '20px' }}
                        color="primary" type="button"
                        onClick={() =>
                          push({
                            short_id: "",
                            approver_email: "",
                            sequence_level: ""
                          })
                        }
                      > <i className="material-icons">add</i>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                {props.values.approvel.length > 0 &&
                  props.values.approvel.map(
                    (fieldItem: any, index: any) => (
                      <Box sx={{ p: 5 }} key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={4} md={4}>
                            <FormControl variant='standard' sx={{ m: 1, width: '100%' }}>
                              <InputLabel id={`approvel.${index}.short_id`}>Short ID</InputLabel>
                              <Select
                                labelId={`approvel.${index}.short_id`}
                                id={`approvel.${index}.short_id`}
                                name={`approvel.${index}.short_id`}
                                value={fieldItem.short_id}
                                onChange={(e: any) => {
                                  props.setFieldValue(`approvel.${index}.short_id`, e.target.value)
                                  props.handleShortIdChange(e, index);
                                }}
                                label='Short Id'
                                variant="standard"
                                disabled={!!fieldItem.short_id}
                              >
                                {props.addUserStatus && props.addUserStatus !== null ?
                                  props.addUserStatus.map((items: any, index: any) => 
                                  <MenuItem value={items.shortid} key={index} disabled={items.disable}>{items.shortid}</MenuItem>)
                                  : null}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <Box sx={{ pt: 1, ml: 6 }}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor={`approvel.${index}.approver_email`}>Email Id*</InputLabel>
                                <Input id={`approvel.${index}.approver_email`} name={`approvel.${index}.approver_email`} 
                                value={fieldItem.approver_email} disabled />
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <FormControl variant='standard' sx={{ m: 1, width: '100%' }}>
                              <InputLabel id={`approvel.${index}.sequence_level`}>Sequence</InputLabel>
                              <Select
                                labelId={`approvel.${index}.sequence_level`}
                                id={`approvel.${index}.sequence_level`}
                                name={`approvel.${index}.sequence_level`}
                                value={fieldItem.sequence_level}
                                onChange={(e: any) => {
                                  props.setFieldValue(`approvel.${index}.sequence_level`, e.target.value)
                                }}
                                label='Short Id'
                                variant="standard"
                              >
                                {sequenceList && sequenceList !== null ?
                                  sequenceList.map((items: any, index: any) => <MenuItem value={items} key={index}>{items}</MenuItem>)
                                  : null}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={1} md={1}>
                            <Box sx={{ textAlign: "right" }}>
                              <Button
                                variant="outlined"
                                sx={{ mt: 5, ml: 1, p: 1 }}
                                color="inherit" type="button"
                                onClick={() => {
                                  remove(index)
                                  props.removeUserList(index)
                                }
                                }
                                disabled={props.values.approvel.length <= 1 ? true : false}
                              > -
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
              </>
            )} />
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ p: 5, mt: 5, mb: 5, textAlign: "right", }} >
      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained" color="inherit"
        type="button" onClick={props.handleClose}> Cancel </Button>

      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained" color="primary"
        type="submit" disabled={!props.isValid}> {props.showApproveOnline ? 'Send Mail for Approval' : 'Submit'} </Button>
    </Box>
  </Form>
  )
}

export default BizApproveForm;
