import React, { ReactNode } from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import CreditCardIcon from '@mui/icons-material/CreditCard';

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

  const routesCustomerConfig: RouterConfigData[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      messageId: "sidebar.dashboard",
      type: "item",
      url: "/dashboard",
      permittedRole: RoutePermittedRole.Customer || RoutePermittedRole.Facility || RoutePermittedRole.IT || RoutePermittedRole.Operation,
    },
    {
      id: "business",
      title: "Business",
      messageId: "sidebar.business",
      type: "group",
      permittedRole: RoutePermittedRole.Customer || RoutePermittedRole.Facility || RoutePermittedRole.IT || RoutePermittedRole.Operation,
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
        }
      ],
    },
    {
      id: "resource",
      title: "Resource",
      messageId: "sidebar.resource",
      type: "group",
      permittedRole: RoutePermittedRole.Customer || RoutePermittedRole.Facility || RoutePermittedRole.IT || RoutePermittedRole.Operation,
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
    {
      id: "finance",
      title: "Finance",
      messageId: "sidebar.finance",
      type: "group",
      permittedRole: RoutePermittedRole.Customer,
      children: [        {
            id: "ForexRates",
            title: "Forex Rates",
            messageId: "sidebar.finance.ForexRates",
            type: "item",
            icon: <CreditCardIcon />,
            url: "/finance/forexrates",
          },
      ],
    },
    {
      id: "shareFeedback",
      title: "Share Feedback",
      messageId: "sidebar.feedback",
      type: "item",
      url: "/feedback",
      permittedRole: RoutePermittedRole.Admin
    }
  ];

  export default routesCustomerConfig;