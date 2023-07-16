import React from 'react'
import { Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import AppLoader from '@crema/core/AppLoader';

const ResourceView = (props?: any) => {
  return (
    // <Box sx={{ display: props.showResourceView ? 'block' : 'none', padding: '10px' }}>
    <React.Fragment>
      {
        props.getCapacityResource && props.showResourceView ?
          props.getCapacityResource.resourceview.map((resourceItems: any, index: any) => {
            return (
              <Grid item xs={12} style={{ marginTop: 0, marginBottom: 10 }}>
                <Card variant='outlined'>
                  <CardContent>
                    <Box sx={{marginBottom:5, background:'rgba(0, 103, 127, 1)', color:'#fff', padding:2, borderRadius:2}}>
                      <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
                        <Grid item xs={6} style={{ marginTop: 0 }}>
                          <Box>
                            <Typography
                              component="h6"
                              variant="inherit"
                              color="inherit"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "100%",
                              }}
                            >
                              HR ID: {resourceItems.hr_id ? resourceItems.hr_id : '-'}
                            </Typography>
                            
                          </Box>
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: 0 }}>
                          <Box>
                            <Typography
                              component="h6"
                              variant="inherit"
                              color="inherit"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "100%",
                              }}
                            >
                              Name:  {resourceItems.emp_name ? resourceItems.emp_name : '-'}
                            </Typography>
                            
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>

                      <Grid item xs={12} style={{ marginTop: 0, }}>
                        <Box sx={{ marginRight: 2 }}>
                          <React.Fragment >
                            <Box className="mobileView">
                            <TableContainer component={Paper} sx={{  marginRight: 20 }}>
                              <Table sx={{ minWidth: 250 }} aria-label='simple table'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Project Code</TableCell>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell>SLA#</TableCell>
                                    <TableCell>Allocated Capacity</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {
                                    resourceItems.projectinfo.map((projectItem: any, index: any) => {
                                      return (
                                        <TableRow
                                          // key={resIndex}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        // onClick={() => props.getProjectData(resourceItem)}
                                        >
                                          <TableCell component='th' scope='row' className='pointer'>
                                            {projectItem.project_code}
                                          </TableCell>
                                          <TableCell className='pointer'>
                                            {projectItem.project_name}
                                          </TableCell>
                                          <TableCell className='pointer'>
                                            {projectItem.sla_code}
                                          </TableCell>
                                          <TableCell className='pointer'>
                                            <CircularProgressWithLabel value={projectItem.resource_capacity ? projectItem.resource_capacity : 0} />
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })
                                  }
                                </TableBody>
                              </Table>
                            </TableContainer>
                            </Box>
                           

                          </React.Fragment>
                        </Box>
                        {/* )
                              })
                            }  */}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          })
          :  <AppLoader/>
      }
    </React.Fragment>
    // </Box>
  )
}

export default ResourceView;