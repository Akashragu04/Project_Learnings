import React from "react";
import CommonProvision from "./Provisions/CommonProvision";

const FinanceRateCard = React.lazy(() => import("./FinanceRateCard"));
const RateCardCreation = React.lazy(() => import("./FinanceRateCard/RateCardCreation"));
const Accruals = React.lazy(() => import("./Accruals"));
const CostCentreMaster = React.lazy(() => import("./CostCentreMaster"));
const Invoice = React.lazy(() => import("./Invoice"));
const ForexRates = React.lazy(() => import("./ForexRates"));
const IOMapping = React.lazy(() => import("./IOMapping"));
const PreInvoice = React.lazy(() => import("./PreInvoice"));
const SLA = React.lazy(() => import("./SLA"));
const OtherMasters = React.lazy(() => import("./OtherMasters"));
const EntityMaster = React.lazy(() => import("./EntityMaster"));
const RateCardMaster = React.lazy(() => import("./RateCardMaster"))
const MainFinance = React.lazy(() => import("./MainFinance"))
const CommonForexRates = React.lazy(() => import("./ForexRates/CommonForexRates"))
const Provisions = React.lazy(() => import("./Provisions"))
const IODump = React.lazy(() => import("./IODump"))
const CostCenterReportYTD =  React.lazy(() => import("./CostCenterReportDump"))
const CommonViewIODump =  React.lazy(() => import("./IODump/CommonViewIODump"))
const CommonCostCenterReport =  React.lazy(() => import("./CostCenterReportDump/CommonCostCenterReport"))

export const FinanceConfig = [
  {
    path: "/finance/provisions",
    element: <Provisions />,
  },
  {
    path: "/finance/ratecard",
    element: <FinanceRateCard />,
  },
  {
    path: "/finance/addratecard",
    element: <RateCardCreation />,
  },
  {
    path: "/finance/accruals",
    element: <Accruals />,
  },
  {
    path: "/finance/cost-centre-master",
    element: <CostCentreMaster />,
  },
  {
    path: "/finance/io-mapping",
    element: <IOMapping />,
  },
  {
    path: "/finance/invoice",
    element: <Invoice />,
  },
  {
    path: "/finance/forex-rates",
    element: <ForexRates />,
  },
  {
    path: "/finance/pre-invoice",
    element: <PreInvoice />,
  },
  {
    path: "/finance/sla",
    element: <SLA />,
  },
  {
    path: "/finance/other-masters",
    element: <OtherMasters />,
  },
  {
    path: "/finance/entity-master",
    element: <EntityMaster />,
  },
  {
    path: "/finance/rate-card-master",
    element: <RateCardMaster />,
  },
  {
    path: "/finance/finance-master",
    element: <MainFinance />,
  },
  {
    path: "/finance/forexrates",
    element: <CommonForexRates />,
  },
  {
    path: "/finance/iodump",
    element: <IODump />,
  },
  {
    path: "/finance/costcenterreportdump",
    element: <CostCenterReportYTD />,
  },
  {
    path: "/finance/viewiodump",
    element: <CommonViewIODump />,
  },
  {
    path: "/finance/viewcostcenterdump",
    element: <CommonCostCenterReport />,
  },
  {
    path: "/finance/viewprovision",
    element: <CommonProvision />,
  },

  
]