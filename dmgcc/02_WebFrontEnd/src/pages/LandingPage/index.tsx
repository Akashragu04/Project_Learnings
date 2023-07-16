import React from "react";
import AboutUsContacts from "./AboutUsContacts";
import AboutUsCostEngineering from "./AboutUsCostEngineering";
import AboutUsCustomerServices from "./AboutUsCustomerServices.tsx";
import AboutUsFinanceControl from "./AboutUsFinanceControlling";
import AboutUsInformationTechnology from "./AboutUsInformationTechnology";
import AboutUsMission from "./AboutUsMission";
import AboutUsproductEngineering from "./AboutUsProductEngineering";
import AboutUsQualityManagement from "./AboutUsQualityManagement";
import AboutUsServices from "./AboutUsServices";
import AboutUsSupplierManagement from "./AboutUsSupplierManagement";
import AboutUsTestimonials from "./AboutUsTestimonials";
import AboutUsVisions from "./AboutUsVisions";

// const HomePage = React.lazy(() => import("./Home"));
const AboutUs = React.lazy(() => import("./AboutUs"));
const ContentView = React.lazy(() => import("./Content"));
const FeedBackView = React.lazy(() => import("./FeedBack"));
const NewLetter = React.lazy(() => import("./NewsLetter"));
const BrochureView = React.lazy(() => import("./Brochure"));
const LandingPageHome = React.lazy(() => import("./LandingPageHome"));
const AboutUsManufacturingEngineering = React.lazy(() => import("./AboutUsManufacturingEngineering"));
const CommonNewsletterView = React.lazy(() => import("./NewsLetter/CommonNewsletterView"));
const CommonBrochureView = React.lazy(() => import("./Brochure/CommonViewBrochures"));
const CommonContentView = React.lazy(() => import("./Content/CommonViewContent"));

export const landingPageRouteConfig = [
    // {
    //   path: "/home",
    //   element: <HomePage />,
    // },
    {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/content",
        element: <ContentView />,
      },
      {
        path: "/feedback",
        element: <FeedBackView />,
      },
      {
        path: "/newletter",
        element: <NewLetter />,
      },
      {
        path: "/brochure",
        element: <BrochureView />,
      },
      {
        path: "/landing-page",
        element: <LandingPageHome />,
      },
      {
        path: "/about-visions",
        element: <AboutUsVisions />,
      },
      {
        path: "/about-testimonials",
        element: <AboutUsTestimonials />,
      },
      {
        path: "/about-supplier-management",
        element: <AboutUsSupplierManagement />,
      },
      {
        path: "/about-services",
        element: <AboutUsServices />,
      },
      {
        path: "/about-quality-management",
        element: <AboutUsQualityManagement />,
      },
      {
        path: "/about-sproduct-engineering",
        element: <AboutUsproductEngineering />,
      },
      {
        path: "/about-quality-management",
        element: <AboutUsInformationTechnology />,
      },
      {
        path: "/about-finance-control",
        element: <AboutUsFinanceControl />,
      },
      {
        path: "/about-customer-services",
        element: <AboutUsCustomerServices />,
      },
      {
        path: "/about-cost-engineering",
        element: <AboutUsCostEngineering />,
      },
      {
        path: "/about-contact",
        element: <AboutUsContacts />,
      },
      {
        path: "/about-mission",
        element: <AboutUsMission />,
      },
      {
        path: "/manufacturing_engineering",
        element: <AboutUsManufacturingEngineering />,
      },
      {
        path: "/brochure-view",
        element: <CommonBrochureView />,
      },
      {
        path: "/newsletter-view",
        element: <CommonNewsletterView />,
      },
      {
        path: "/content-view",
        element: <CommonContentView />,
      }
]