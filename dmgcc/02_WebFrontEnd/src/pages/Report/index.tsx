import React from "react";
import MainReports from "./MainReports";

const Page1 = React.lazy(() => import("./Page1"));

export const ReportConfig = [
  {
    path: "/report/report-master",
    element: <MainReports />,
  },
  {
    path: "/report/page",
    element: <Page1 />,
  },
]