import React, { ReactNode } from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import AutoModeIcon from '@mui/icons-material/AutoMode';
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

  const routesHRConfig: RouterConfigData[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      messageId: "sidebar.dashboard",
      type: "item",
      url: "/dashboard",
      permittedRole: RoutePermittedRole.Common
    },
    {
      id: "business",
      title: "Business",
      messageId: "sidebar.business",
      type: "group",
      permittedRole: RoutePermittedRole.HR,
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
      permittedRole: RoutePermittedRole.HR,
      children: [
        {
          id: "ResourcesOverview",
          title: "Resources Overview",
          messageId: "sidebar.resource.ResourcesOverview",
          type: "item",
          icon: <GroupIcon />,
          url: "/resource/resources-overviewTable",
        },
        {
          id: "ResourcesRecord",
          title: "Resources Record",
          messageId: "sidebar.resource.ResourcesRecord",
          type: "item",
          icon: <GroupIcon />,
          url: "/resource/resources-record",
        },
        {
          id: "utilization",
          title: "Utilization",
          messageId: "sidebar.resource.Utilzation",
          type: "item",
          icon: <AutoModeIcon />,
          url: "/resource/utilization",
        },
        {
          id: "ExternalResource",
          title: "External Resource",
          messageId: "sidebar.resource.ExternalResource",
          type: "item",
          icon: <GroupIcon />,
          url: "/resource/external_resource",
  
        }
      ],
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

  export default routesHRConfig;