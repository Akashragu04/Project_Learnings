import { ReactNode } from "react";
import { RoutePermittedRole } from "../shared/constants/AppConst";
import CommonStore from '../@crema/services/commonstore';
import routesBusinessConfig from './rolebasedmenulist/BusinessMenuList';
import routesCustomerConfig from './rolebasedmenulist/CustomerMenuList';
import routesHRConfig from './rolebasedmenulist/HRMenuList';
import routesEmployeeConfig from './rolebasedmenulist/EmployeeMenuList';
import routesFinanceConfig from './rolebasedmenulist/FinanceManuList';
import routesAdminConfigfrom from './rolebasedmenulist/AdminMenuList';
import routesITConfig from "./rolebasedmenulist/ItMenuList";

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesConfig = () => {
  let menuList: any = null;
  //  start
  // This is function use validation on user role based bind menu list
  if (CommonStore() && CommonStore().userRoleType !== null && CommonStore().userRoleType !== undefined && CommonStore().userRoleType) { // validation user types
    if (RoutePermittedRole.Admin === CommonStore().userRoleType) { // validation Admin & super admin
      menuList = routesAdminConfigfrom;
    } else if (RoutePermittedRole.Superadmin === CommonStore().userRoleType) { // validation Admin & super admin
      menuList = routesBusinessConfig;
    } else if (RoutePermittedRole.Business === CommonStore().userRoleType) { // validation Admin & super admin
      menuList = routesBusinessConfig;
    } else if (RoutePermittedRole.Customer === CommonStore().userRoleType || RoutePermittedRole.Facility === CommonStore().userRoleType
      || RoutePermittedRole.Operation === CommonStore().userRoleType) {  // validation facility, finance, operation, hr, and it
      menuList = routesCustomerConfig;
    } else if (RoutePermittedRole.HR === CommonStore().userRoleType) {  // validation facility, finance, operation, hr, and it
      menuList = routesHRConfig;
    } else if (RoutePermittedRole.EMPLOYEE === CommonStore().userRoleType) {  // validation facility, finance, operation, hr, and it
      menuList = routesEmployeeConfig;
    } else if (RoutePermittedRole.Finance === CommonStore().userRoleType ) {  // validation facility, finance, operation, hr, and it
      menuList = routesFinanceConfig;
    }  else if (RoutePermittedRole.IT === CommonStore().userRoleType) {  // validation facility, finance, operation, hr, and it
      menuList = routesITConfig;
    }
  } else {
    menuList = routesBusinessConfig
  }
  // End
  return (menuList) // bind menu list
}


export default routesConfig;
