import React from 'react'
import { Box, Button } from '@mui/material';

const ResourceButtonOption = (props?:any) => {
  return (
    <Box sx={{marginTop:5, paddingLeft:2}}>
    {/* <ButtonGroup variant='outlined' aria-label='outlined button group'> */}
        <Button variant={props.showTotalPositions?"contained":'outlined'} color="primary" onClick={()=>props.getChangeTotalPositions()} sx={{margin:1}}>Total Positions</Button>
        <Button variant={props.showApprovedPositions?"contained":'outlined'} color="primary" onClick={()=>props.getChangeApprovedPositions()} sx={{margin:1}}>Approved Positions</Button>
        <Button variant={props.showOpenPositions?"contained":'outlined'} color="primary" onClick={()=>props.getChangeOpenPositions()} sx={{margin:1}}>Open Positions</Button>
        <Button variant={props.ShowWithSLA?"contained":'outlined'} color="primary" onClick={()=>props.getChangeWithSLA()} sx={{margin:1}}>With SLA</Button>
        <Button variant={props.ShowWithOutSLA?"contained":'outlined'} color="primary" onClick={()=>props.getChangeWithOutSLA()} sx={{margin:1}}>Without SLA</Button>
        <Button variant={props.ShowUtilization?"contained":'outlined'} color="primary" onClick={()=>props.getChangeUtilization()} sx={{margin:1}}>Utilization</Button>
    {/* </ButtonGroup> */}
    </Box>
  )
}

export default ResourceButtonOption;