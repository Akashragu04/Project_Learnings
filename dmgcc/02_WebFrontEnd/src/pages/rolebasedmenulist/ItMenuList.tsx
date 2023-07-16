import React, { ReactNode } from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';

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

  const routesITConfig: RouterConfigData[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      messageId: "sidebar.dashboard",
      type: "item",
      url: "/dashboard",
      permittedRole: RoutePermittedRole.IT,
    },
    {
      id: "business",
      title: "Business",
      messageId: "sidebar.business",
      type: "group",
      permittedRole: RoutePermittedRole.IT,
      children: [
        {
          id: "leads",
          title: "Leads",
          messageId: "sidebar.business.leads",
          type: "item",
          icon: <BusinessCenterIcon />,
          url: "/business/leads-monitoring",
        },
        {
          id: "page-2",
          title: "Page 2",
          messageId: "sidebar.business.bizrequest",
          type: "item",
          icon: <BusinessCenterIcon />,
          url: "/business/business-setup",
        },
        {
          id: "viewbusinesscase",
          title: "Business Case",
          messageId: "sidebar.business.viewbizcase",
          type: "item",
          icon: <BusinessCenterIcon />,
          url: "/view-business-case",
        }
      ],
    },
    {
      id: "resource",
      title: "Resource",
      messageId: "sidebar.resource",
      type: "group",
      permittedRole: RoutePermittedRole.IT,
      children: [  
        {
          id: "ResourcesRecord",
          title: "Resources Record",
          messageId: "sidebar.resource.ResourcesRecord",
          type: "item",
          icon: <GroupIcon />,
          url: "/resource/resources-record",
        },
      ]
    },
  ];

  export default routesITConfig;