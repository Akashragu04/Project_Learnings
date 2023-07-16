import React from "react";

const AboutUsView = React.lazy(() => import("./AboutUs"));
const Brochure = React.lazy(() => import("./Brochure"));
const Content = React.lazy(() => import("./Content"));
const GccVertical = React.lazy(() => import("./GccVertical"));
const Newletter = React.lazy(() => import("./Newletter"));
const Homepage = React.lazy(() => import("./homepage"));
const AzureAuth = React.lazy(() => import("./azureAuth/TestPage"));


export const LandingPageBaseConfig = [
    {
        path: "/about_us",
        element: <AboutUsView />,
      },
      {
        path: "/brochure",
        element: <Brochure />,
      },
      {
        path: "/content",
        element: <Content />,
      },
      {
        path: "/gcc_vertical",
        element: <GccVertical />,
      },
      {
        path: "/newsletter",
        element: <Newletter />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/g3c-admin",
        element: <AzureAuth />,
      }
]