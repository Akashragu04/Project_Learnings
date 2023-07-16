import React, { ReactNode } from "react";
import { BiAlignLeft } from "react-icons/bi";
import { RoutePermittedRole } from "../../shared/constants/AppConst";


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

const routesLandingPageConfig: RouterConfigData[] = [
    {
        id: "homePage",
        title: "Home",
        messageId: "sidebar.homePage",
        type: "item",
        url: "/home",
        permittedRole: RoutePermittedRole.Common
    },
    {
        id: "aboutUs",
        title: "About Us",
        messageId: "sidebar.aboutUs",
        type: "item",
        url: "/about-us",
        permittedRole: RoutePermittedRole.Common
    },
    {
        id: "gccVerticals",
        title: "GCC Verticals",
        messageId: "sidebar.gccVerticals",
        type: "item",
        url: "/gcc-verticals",
        permittedRole: RoutePermittedRole.Common
    },
    {
        id: "dashboard",
        title: "Dashboard",
        messageId: "sidebar.myGcc",
        type: "item",
        url: "/dashboard",
        permittedRole: RoutePermittedRole.Common
    },
    {
        id: "enquiryLead",
        title: "Enquiry",
        messageId: "sidebar.enquiry",
        type: "item",
        url: "/dashboard",
        permittedRole: RoutePermittedRole.Common
    },
]

export default routesLandingPageConfig;