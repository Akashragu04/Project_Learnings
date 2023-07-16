import React from "react";
// import AssignRoleToUsers from "./RoleManagement/assignRoleToUsers";


const Overview = React.lazy(() => import("./Overview"));
const AssignRoleToUsers = React.lazy(() => import("./RoleManagement/assignRoleToUsers"));
const AssignProjectOwner = React.lazy(() => import("./ProjectOwnership/assignProjectOwner"));

export const SettingsConfigPage = [
  {
    path: "/settings",
    element: <Overview />,
  },
  {
    path: "/settings/createRoles",
    element: <AssignRoleToUsers />,
  },
  {
    path: "/settings/update-project-owner",
    element: <AssignProjectOwner />
  }
];
