import React from "react";

const BusinessSetupforRunningProjects = React.lazy(() => import("./BusinessSetup/index"));
const CapacityManagement = React.lazy(() => import("./CapacityManagement/index"));
const Capniti = React.lazy(() => import("./capniti/index"));
const Overview = React.lazy(() => import("./overview"));
const Projects = React.lazy(() => import("./projectmodules"));
const ResourceAllocation = React.lazy(() => import("./ResourceAllocation/index"));
const TaskManagement = React.lazy(() => import("./TaskManagement/index"));

export const OperationConfig = [
    {
        path: "/operation/business-setupfor-runningProjects",
        element: <BusinessSetupforRunningProjects />,
      },
      {
        path: "/operation/capacity-management",
        element: <CapacityManagement />,
      },
      {
        path: "/operation/capniti",
        element: <Capniti />,
      },
      {
        path: "/operation/overview",
        element: <Overview />,
      },
      {
        path: "/operation/projects",
        element: <Projects />,
      },
      {
        path: "/operation/resource-allocation",
        element: <ResourceAllocation />,
      },
      {
        path: "/operation/task-management",
        element: <TaskManagement />,
      },
    ]