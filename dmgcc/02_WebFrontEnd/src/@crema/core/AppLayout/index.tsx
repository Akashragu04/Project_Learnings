import React, { useEffect } from "react";
import AppContentView from "@crema/core/AppContentView";
// import { useAuthUser } from "../../utility/AuthHooks";
import {
  useLayoutActionsContext,
  useLayoutContext,
} from "../../utility/AppContextProvider/LayoutContextProvider";
import Layouts from "./Layouts";
import AuthWrapper from "./AuthWrapper";
import { useUrlSearchParams } from "use-url-search-params";
import { useSidebarActionsContext } from "../../utility/AppContextProvider/SidebarContextProvider";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onNavCollapsed } from "../../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../saga/store";
import { useIsAuthenticated } from "@azure/msal-react";

const AppLayout = () => {
  const { navStyle } = useLayoutContext();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const { isAuthenticated } = useAuthUser();
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const AppLayout = Layouts[navStyle];
  const [params] = useUrlSearchParams({}, {});
  const authData: any = useSelector<AppState, AppState["auth"]>(
    ({ auth }) => auth
  );
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout as string);
    if (params.menuStyle) updateMenuStyle(params.menuStyle as string);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, [params, setSidebarBgImage, updateNavStyle, updateMenuStyle]);

  useEffect(() => {
    dispatch(onNavCollapsed());
  }, [dispatch, pathname]);


  return (
    <>
      {(authData.isAuthenticated && isAuthenticated) ? (
        <React.Fragment>
          <AppLayout />
        </React.Fragment>
      ) : (
        <AuthWrapper>
          <AppContentView />
        </AuthWrapper>
      )}
    </>
  );
};

export default React.memo(AppLayout);
