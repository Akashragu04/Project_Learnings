import { AppScrollbar } from '@crema'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Zoom } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { RoutePermittedRole } from "shared/constants/AppConst";
import CapacityCircularProgressWithLabel from './CapacityCircularProgressWithLabel'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddResourceAllocation from './AddResourceAllocation';

const AllocateSidebar = (props:any) => {
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
   <React.Fragment>
       {getEmployeeDetails && showResourceAllocate ?
        <AddResourceAllocation showResourceAllocate={showResourceAllocate} closeAvailableResource={closeAvailableResource} getCapacityManagement={props.getCapacityManagement} getEmployeeDetails={getEmployeeDetails} postMapAllocateResource={props.postMapAllocateResource} />
        : null

      }

    <Box sx={{ px: { xs: 4, md: 5 }, pt: { xs: 4, md: 5 }, pb: 2.5, background:"#00677f", color:'#fff' }}>
        <Zoom in style={{ transitionDelay: "300ms" }}>
   <Box>Available Resources</Box>
        </Zoom>
      </Box>
      <AppScrollbar
        sx={{
          height: "calc(100% - 76px)",
        }}
      >
        <Box
          sx={{
            pr: 4,
            pb: { xs: 4, md: 5, lg: 6.2 },
          }}
        >
   <TableContainer component={Paper} sx={{overflow:'hidden', marginLeft:2}}>
            <Table  aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight:'bold'}}>Name</TableCell>
                  <TableCell sx={{fontWeight:'bold'}}>Available</TableCell>
                  <TableCell sx={{fontWeight:'bold'}}>Action</TableCell>
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
                       
                          <TableCell >{avaItems.emp_name}</TableCell>
                          <TableCell ><CapacityCircularProgressWithLabel value={avaItems.capacity} /></TableCell>
                          <TableCell component='th' scope='row' className='pointer'>
                        <Box sx={{display:'flex'}}>
                            {/* <Box>{avaItems.hr_id ? avaItems.hr_id : '-'}</Box> */}
                            <Box sx={{paddingLeft:2}}>{RoutePermittedRole.Business === props.useInfo.roles ?<Tooltip title="Allocate">
                            <GroupAddIcon fontSize={'small'} onClick={() => getAvailableResource(avaItems)}/></Tooltip> : null}</Box>
                        </Box>     
                          </TableCell>
                          
                            {/* <TableCell className='pointer'><Button variant='outlined' color={'primary'}
                              sx={{ marginRight: 2 }} onClick={() => getAvailableResource(avaItems)}>Allocate</Button></TableCell>
                            : null} */}


                        </TableRow>
                      )
                    })
                    : null
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AppScrollbar>
    </React.Fragment>
  )
}

export default AllocateSidebar