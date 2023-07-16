import { Box } from '@mui/system';
import React from 'react'

const RenderLegend = () => {
  return (
    <React.Fragment>
    <Box sx={{display:'flex', justifyContent:"center", marginTop:2}}  className="custom-legend" >
    <Box sx={{marginRight:2, color:'#000000', display:'flex'}}> 
    <Box sx={{background:"#000000", width:15, height:15, borderRadius:10, marginRight:2}}></Box>Plan</Box>
    <Box sx={{marginRight:2, color:'#06a1c5', display:'flex'}}> 
    <Box sx={{background:"#06a1c5", width:15, height:15, borderRadius:10, marginRight:2}}></Box>Actual</Box>
    </Box>            
</React.Fragment>
  )
}

export default RenderLegend;
