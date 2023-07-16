import React from "react";
const UserManagement = React.lazy(() => import("./userManagement")); 

export const UserManagementConfig = [
    {
      path: "/usermanagement",
      element: <UserManagement />,
    }
]
