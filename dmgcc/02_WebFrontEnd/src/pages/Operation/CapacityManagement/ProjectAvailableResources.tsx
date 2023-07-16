import React from 'react'
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button } from "@mui/material";
// import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import AddResourceAllocation from './AddResourceAllocation';
import CapacityCircularProgressWithLabel from './CapacityCircularProgressWithLabel';
import { RoutePermittedRole } from "shared/constants/AppConst";

export const ProjectAvailableResources = (props?: any) => {
  const [showResourceAllocate, setResourceAllocate] = React.useState(false)
  const [getEmployeeDetails, setEmployeeDetails] = React.useState(null)

  const getAvailableResource = (getResourceData?: any) => {
    setEmployeeDetails(getResourceData)
    setResourceAllocate(true)
  }

  const closeAvailableResource = () => {
    setResourceAllocate(false)
  }

  return (
    <Box className='allocationresource' sx={{paddingBottom:5}}>
      {getEmployeeDetails && showResourceAllocate ?
        <AddResourceAllocation showResourceAllocate={showResourceAllocate} closeAvailableResource={closeAvailableResource} getCapacityManagement={props.getCapacityManagement} getEmployeeDetails={getEmployeeDetails} postMapAllocateResource={props.postMapAllocateResource} />
        : null

      }

      <Card variant='outlined' >
        <CardContent>
          <Box sx={{ marginBottom: 5, background: 'rgba(0, 103, 127, 1)', color: '#fff', padding: 2, borderRadius: 2 }} className="mobileView">
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
              Available Resources
            </Typography>
          </Box>
          <Box>
          <TableContainer component={Paper} sx={{ maxHeight: "100vh" }}>
            <Table  aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>HR Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Available</TableCell>
                  {RoutePermittedRole.Business === props.useInfo.roles ?
                    <TableCell>Action</TableCell>
                    : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.getCapacityResource ?
                    props.getCapacityResource.availableresource.map((avaItems: any, index: any) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        // onClick={() => props.getProjectData(resourceItem)}
                        >
                          <TableCell component='th' scope='row' className='pointer'>
                            {avaItems.hr_id ? avaItems.hr_id : '-'}
                          </TableCell>
                          <TableCell className='pointer'>{avaItems.emp_name}</TableCell>
                          <TableCell className='pointer'><CapacityCircularProgressWithLabel value={avaItems.capacity} /></TableCell>
                          {RoutePermittedRole.Business === props.useInfo.roles ?
                            <TableCell className='pointer'><Button variant='outlined' color={'primary'}
                              sx={{ marginRight: 2 }} onClick={() => getAvailableResource(avaItems)}>Allocate</Button></TableCell>
                            : null}


                        </TableRow>
                      )
                    })
                    : null
                }
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>

  )
}

export default ProjectAvailableResources;