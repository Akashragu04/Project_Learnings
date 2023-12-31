import React from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { AppSuspense } from "../../index";
import AppFooter from "../AppLayout/components/AppFooter";
import AppErrorBoundary from "../AppErrorBoundary";
import Box from "@mui/material/Box";
import AppContentViewWrapper from "./AppContentViewWrapper";
import { SxProps } from "@mui/system";
// import { useAuthUser } from "../../utility/AuthHooks";
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from "../../../pages";
import generateRoutes from "../../utility/RouteGenerator";
import { initialUrl, guestRole } from "../../../shared/constants/AppConst";
import { AppState } from "../../../saga/store";
import { useSelector  } from "react-redux";

interface AppContentViewProps {
  sxStyle?: SxProps;
}

const AppContentView: React.FC<AppContentViewProps> = ({ sxStyle }) => {
  // const { user, isAuthenticated } = useAuthUser();
  const authData:any  = useSelector<AppState, AppState["auth"]>(
    ({ auth }) => auth
  );
  
  const routes = useRoutes(
    generateRoutes({
      isAuthenticated: authData.isAuthenticated,
      userRole: (authData.profileDetails?.roles) ? authData.profileDetails?.roles : guestRole,
      unAuthorizedStructure,
      authorizedStructure,
      anonymousStructure,
    })
  );
  return (
    <AppContentViewWrapper>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: { xs: 5, md: 7.5, xl: 12.5 },
          ...sxStyle,
        }}
        className="app-content"
      >
        <AppSuspense>
          <AppErrorBoundary>
            {routes}
            <Routes>
            <Route path="/" element={<Navigate to={initialUrl} />} />            
            </Routes>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </AppContentViewWrapper>
  );
};

export default AppContentView;
