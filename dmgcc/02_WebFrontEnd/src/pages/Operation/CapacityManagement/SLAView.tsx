import React from 'react'
// import ResourceProjectView from './ResourceProjectView';
import { Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
// import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewProjectSLADetails from './ViewProjectSLADetails';

const SLAView = (props?:any) => {
  const [getCapacityUpdate, setCapacityUpdate] = React.useState(null)
  const [openSLADetails, setOpenSLADetails] = React.useState(false)

  const getProjectData = (getValues?: any) => {
    setCapacityUpdate(getValues)
    setOpenSLADetails(true)
  }
  const closeDialogBox = () => {
    setOpenSLADetails(false)
  }
  return (
<React.Fragment>
{
        getCapacityUpdate && openSLADetails?
        <ViewProjectSLADetails openSLADetails={openSLADetails} closeDialogBox={closeDialogBox} 
        getCapacityUpdate={getCapacityUpdate} reqUpdateAllocateResourceData={props.reqUpdateAllocateResourceData}  useInfo={props.useInfo}/>
        :null
      }
  {
    props.getCapacitySLA?
    props.getCapacitySLA.slaview.map((capacityItems:any, i:any)=>{
      return(
        <Grid item xs={12} md={6} key={i}>
        <Card variant='outlined' sx={{ height: 500, marginRight:3 }}>
          <CardContent>
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
                   SLA Code & Name: {capacityItems.slaid} -  {capacityItems.slaname}
                    
                  </Typography>
                 
                </Box>
              </Grid>
                </Grid>
                </Box>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
              <Grid item xs={12} style={{ marginTop: 0, height: 410 }}>
                      <React.Fragment>
                        <Box className="mobileView">
                        <TableContainer component={Paper} sx={{ maxHeight: 400, paddingBottom:"25px" }}>
                              <Table sx={{ minWidth: 250 }} aria-label='simple table'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>HR ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Available</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {
                                    capacityItems.resources ?
                                    capacityItems.resources.map((resourceItem?: any, resIndex?: any) => {
                                        return (
                                          <TableRow
                                            key={resIndex}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            onClick={() => getProjectData(resourceItem)}
                                          >
                                            <TableCell component='th' scope='row' className='pointer'>
                                              {resourceItem.resource_shortid}
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
                            
                          {/* </AccordionDetails>
                        </Accordion> */}

                      </React.Fragment>
              </Grid>    
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      )
    })
    :null
  }
         
        </React.Fragment>
  )
}

export default SLAView;