import React from 'react'
import { Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
// import { projectViewDetails } from '@crema/commonservices/Types';
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AppGridContainer from "@crema/core/AppGridContainer";


const ResourceProjectView = (props?:any) => {
  const [expanded, setExpanded] = React.useState(null);
  
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
           <Grid item xs={12} md={6}>
                <Card variant='outlined' >
                  <CardContent className="autoscroll">
                    <Box sx={{marginBottom:10, background:'rgba(0, 103, 127, 1)', color:'#fff', padding:2, paddingTop:3 ,borderRadius:2}}>
                      <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
                      <Grid item xs={12} style={{ marginTop: 0 }}>
                        <Box className="mobileView">
                          <Typography
                            component="h5"
                            variant="inherit"
                            color="inherit"
                            sx={{
                              fontSize: 12,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              width: "100%",
                              paddingBottom: 1
                            }}
                          >
                            
                            Project Code & Name: {props.projectItem.project_code} - {props.projectItem.project_name} 
                          </Typography>
                         
                        </Box>
                      </Grid>
                        </Grid>
                        </Box>
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
                     
                      <Grid item xs={12} className="capacityBox">
                        {
                          props.projectItem.sla.map((slaItem: any, index: any) => {
                            return (
                              <React.Fragment key={index}>
                               
                                <Accordion key={index}  expanded={expanded === `projectcode${index}`} onChange={handleExpandChange(`projectcode${index}`)}>
                                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                    aria-controls='hr-content' id='hr-header' sx={{ backgroundColor: "#f5f3f3" }} >
                                    <Typography variant={'h6'} sx={{ textTransform: 'capitalize' }}>{slaItem.slaname} ({slaItem.slaid})</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Box className="mobileView">
                                    <TableContainer component={Paper} sx={{ maxHeight: 150 }}>
                                      <Table sx={{ minWidth: 250 }} aria-label='simple table'>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>HR ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Allocated Capacity</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {
                                            slaItem.resources ?
                                              slaItem.resources.map((resourceItem?: any, resIndex?: any) => {
                                                return (
                                                  <TableRow
                                                    key={resIndex}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={() => props.getProjectData(resourceItem)}
                                                  >
                                                    <TableCell component='th' scope='row' className='pointer'>
                                                      {resourceItem.hrid}
                                                    </TableCell>
                                                    <TableCell className='pointer'>{resourceItem.resource_name}</TableCell>
                                                    <TableCell className='pointer'><CircularProgressWithLabel value={resourceItem.capcity} /></TableCell>
                                                  </TableRow>
                                                )
                                              })
                                              : null
                                          }
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                    </Box>
                                  </AccordionDetails>
                                </Accordion>
                              </React.Fragment>
                            )
                          })
                        }
                      </Grid>                   
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
        </React.Fragment>
  )
}

export default ResourceProjectView;