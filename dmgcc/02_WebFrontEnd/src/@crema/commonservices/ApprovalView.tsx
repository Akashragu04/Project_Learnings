import React from 'react'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "../../pages/Business/BusinessSetup/TableHeading";
import TableItem from "../../pages/Business/BusinessSetup/TableItem";
import AppTableContainer from "@crema/core/AppTableContainer";
import { Grid, Typography, Box, TextField, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const ApprovalView = (props?: any) => {
  const downloadFile = (getURL: any) => {
    window.open(getURL, '_blank')
  }
  return (
    <>
      {
        props.viewApproval.approval_type && props.viewApproval.approval_type !== null ?
          props.viewApproval.approval_type === 'Multi' ?
            <AppTableContainer>
              <Table className="table">
                <TableHead>
                  <TableHeading />
                </TableHead>
                <TableBody>
                  {props.viewApproval && props.viewApproval !== null ?
                    props.viewApproval.approvals.map((data) => (
                      <TableItem data={data} key={data.id} />
                    )
                    ) : null}
                </TableBody>
              </Table>
            </AppTableContainer>
            : <>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <Typography sx={{ flex: 1, marginBottom: 5 }} variant='h4' component='div'>
                    MOM Upload Files
                  </Typography>
                </Grid>
                {props.viewApproval && props.viewApproval !== null ?
                  props.viewApproval.approvals.map((data?: any, index?: any) => {
                    return (
                      <React.Fragment key={index} >
                        {data.supporting_files && data.supporting_files !== null ?
                          data.supporting_files.map((items: any, index: any) => {
                            return (
                              <Box sx={{ marginLeft: 4, marginRight: 2 }}>

                                <Link to={'#'} target="_blank" onClick={() => downloadFile(items.supporting_files_url)}>
                                  <SystemUpdateAltIcon sx={{ fontSize: 35 }} />
                                  {/* <img src={items.supporting_files_url} alt="" /> */}
                                </Link>
                              </Box>
                            )
                          }
                          ) : null
                        }
                        <Grid item xs={12} >
                          <Box>
                            <FormControl variant='outlined' fullWidth margin='dense'>
                              <TextField
                                id='short_description'
                                name="short_description"
                                label='Approver Description'
                                multiline
                                variant='outlined'
                                rows={5}
                                disabled
                                value={data.approver_description ? data.approver_description : ''}
                              />
                            </FormControl>
                          </Box>
                        </Grid>
                      </React.Fragment>
                    )

                  }) : null}

              </Grid>
            </> : <>
            <Typography sx={{ flex: 1 }} variant='h5' component='div'> No Data</Typography>
          </>}
    </>
  )
}

export default ApprovalView;