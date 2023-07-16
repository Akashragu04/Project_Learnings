import React from "react";
import { Box } from "@mui/material";
interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ color }) => {
  // const { theme } = useThemeContext();
  return (
    <Box>
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        "& svg": {
          height: { xs: 40, sm: 45 },
        },
      }}
      className="app-logo"
    >
      {/* <Logo fill={theme.palette.primary.main} /> */}
      <Box
      component="img"
      sx={{
        // height: 100,
        width: 230,
        // maxHeight: { xs: 233, md: 167 },
        // maxWidth: { xs: 350, md: 250 },
      }}
        alt="Daimler Truck - logo"
        src="../../logo-black.png"
      >
        {/* <LogoText fill={alpha(theme.palette.text.primary, 0.8)} /> */}
      </Box>      
    </Box>      
      {/* <Box sx={{marginBottom:2}}>Global Capability Centre (GCC)</Box> */}
    </Box>
  );
};

export default AppLogo;
