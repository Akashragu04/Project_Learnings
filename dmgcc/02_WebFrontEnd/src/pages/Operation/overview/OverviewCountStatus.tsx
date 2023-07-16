import React from 'react'
import AppCard from "@crema/core/AppCard";
import { Box, Typography } from "@mui/material";
import MovingIcon from '@mui/icons-material/Moving';

const OverviewCountStatus = (props?:any) => {
    const {name, value} = props.data;
  return (
    <AppCard
    sxStyle={{
      height: 1,
      border:'1px solid #ccc'
      // backgroundColor: bgColor,
    }}
    // className="card-hover"
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          mr: 4,
          alignSelf: "flex-start",
        }}
      >
        <MovingIcon/>
        {/* <img src={icon} alt="icon" /> */}
      </Box>
      <Box
        sx={{
          width: "calc(100% - 70px)",
        }}
      >
        <Typography
          component="h5"
          variant="inherit"
          color="inherit"
          sx={{
            fontSize: 16,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        > 
          {value}
        </Typography>
        <Box
          component="p"
          sx={{
            pt: 0.5,
            color: "text.secondary",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {name}
        </Box>
      </Box>
    </Box>
  </AppCard>
  )
}

export default OverviewCountStatus;