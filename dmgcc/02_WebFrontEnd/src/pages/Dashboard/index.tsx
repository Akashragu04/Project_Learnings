import React from "react";

// const CustomerDashboard = React.lazy(() => import("./CustomerDashboard"));
const DaimlerG3c = React.lazy(() => import("./HealthCare"));
export const DashboardConfig = [
    {
        path: "/dashboard",
        element: <DaimlerG3c />,
      },
]