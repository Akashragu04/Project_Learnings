
import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
// import { loginRequest, msalConfig } from './AuthConfig';
import { Box, Typography } from "@mui/material";
import { loginRequest } from "AuthConfig";

const UnAuthContent = () => {
    const { instance } = useMsal();
  
    useEffect(() => {
      instance.loginRedirect(loginRequest).catch(e => {
        console.log(e);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
      <>
        <Box sx={{ width: '100%' }}>
          <Typography variant={'h5'} component={'div'} sx={{ 'margin': 'auto 0' }}>Please wait signing-in to G3C Application.</Typography>       
        </Box>
      </>
    );
  };

  export default UnAuthContent;