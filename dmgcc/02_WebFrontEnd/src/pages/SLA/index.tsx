import React from "react";

const BizCaseSLA = React.lazy(() => import("./BizCaseSLA"));
const SLACreation = React.lazy(() => import("./SLACreation"));
const UpdateSLA = React.lazy(() => import("./SLAUpdate"));
const Projects = React.lazy(() => import("../Operation/projectmodules"));

export const SLAConfig = [  
  {
    path: "/SLA/projects",
    element: <Projects />,
  },
  {
    path: "/SLA/biz-case-sla",
    element: <BizCaseSLA />,
  },
  {
    path: "/SLA/sla-creation/:projectId",
    element: <SLACreation />,
  },
  {
    path: "/SLA/sla-update/:slaid",
    element: <UpdateSLA />,
  },
]