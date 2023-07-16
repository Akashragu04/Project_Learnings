import React, { ReactNode } from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArticleIcon from '@mui/icons-material/Article';

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

  
  const routesEmployeeConfig: RouterConfigData[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      messageId: "sidebar.dashboard",
      type: "item",
      url: "/dashboard",
      permittedRole: RoutePermittedRole.EMPLOYEE
    },
    {
      id: "operation",
      title: "Operation",
      messageId: "sidebar.operation",
      type: "group",
      permittedRole: RoutePermittedRole.EMPLOYEE,
      children: [   
  
        {
          id: "operation6",
          title: "Task Management",
          messageId: "sidebar.operation.operation6",
          type: "item",
          icon: <ListAltIcon />,
          url: "/operation/task-management",
        }, 
        {
          id: "operation5",
          title: "Capniti",
          messageId: "sidebar.operation.operation5",
          type: "item",
          icon: <CalendarMonthIcon />,
          url: "/operation/capniti",
        },
      ],
    },
    {
      id: "finance",
      title: "Finance",
      messageId: "sidebar.finance",
      type: "group",
      permittedRole: RoutePermittedRole.EMPLOYEE,
      children: [        {
            id: "ForexRates",
            title: "Forex Rates",
            messageId: "sidebar.finance.ForexRates",
            type: "item",
            icon: <CreditCardIcon />,
            url: "/finance/forexrates",
          },
          {
            id: "provision",
            title: "Provisions",
            messageId: "sidebar.finance.Provisions",
            type: "item",
            icon: <ListAltIcon />,
            url: "/finance/viewprovision",
          },
          {
            id: "Accruals",
            title: "Accruals",
            messageId: "sidebar.finance.Accruals",
            type: "item",
            icon: <CreditCardIcon />,
            url: "/finance/accruals",
          },
      ],
    },
    {
      id: "resource",
      title: "Resource",
      messageId: "sidebar.resource",
      type: "group",
      permittedRole: RoutePermittedRole.EMPLOYEE,
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
      id: "other",
      title: "Others",
      messageId: "landing.others",
      type: "group",
      permittedRole: RoutePermittedRole.Business,
      children: [
        {
          id: "brochures",
          title: "Brochures",
          messageId: "landing.viewBrochures",
          type: "item",
          icon: <SummarizeIcon />,
          url: "/brochure-view",
        },
        {
          id: "newsletter",
          title: "Newsletter",
          messageId: "landing.viewNewsletter",
          type: "item",
          icon: <NewspaperIcon />,
          url: "/newsletter-view",
        },
        {
          id: "content",
          title: "Content",
          messageId: "landing.viewContent",
          type: "item",
          icon: <ArticleIcon />,
          url: "/content-view",
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

  export default routesEmployeeConfig;