import React from 'react'
import IntlMessages from "@crema/utility/IntlMessages";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MapIcon from '@mui/icons-material/Map';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import HailIcon from '@mui/icons-material/Hail';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const tabs = [
  { id: 1, icon: <MonetizationOnIcon />, name: <IntlMessages id="sidebar.finance.CostCentreMaster" /> },
  {
    id: 2,
    icon: <RateReviewIcon />,
    name: <IntlMessages id="sidebar.finance.RateCardMaster" />,
  },
  {
    id: 3,
    icon: <RateReviewIcon />,
    name: <IntlMessages id="sidebar.finance.ForexRates" />,
  },
  {
    id: 4,
    icon: <MapIcon />,
    name: <IntlMessages id="sidebar.finance.IOMapping" />,
  },
  {
    id: 5,
    icon: <ReceiptIcon />,
    name: <IntlMessages id="sidebar.finance.SLA" />,
  },
  {
    id: 6,
    icon: <DescriptionIcon />,
    name: <IntlMessages id="sidebar.finance.PreInvoice" />,
  },
  {
    id: 7,
    icon: <DescriptionIcon />,
    name: <IntlMessages id="sidebar.finance.Invoice" />,
  },
  {
    id: 8,
    icon: <AccountBalanceWalletIcon />,
    name: <IntlMessages id="sidebar.finance.Accruals" />,
  },
  {
    id: 9,
    icon: <BrandingWatermarkIcon />,
    name: <IntlMessages id="sidebar.finance.EntityMaster" />,
  }, 
  {
    id: 10,
    icon: <LandscapeIcon />,
    name: <IntlMessages id="sidebar.finance.materialMaster" />,
  },
  {
    id: 11,
    icon: <HailIcon />,
    name: <IntlMessages id="sidebar.finance.vendorMaster" />,
  },
  {
    id: 12,
    icon: <FolderOpenIcon />,
    name: <IntlMessages id="sidebar.finance.ioDump" />,
  },
  {
    id: 13,
    icon: <MonetizationOnIcon />,
    name: <IntlMessages id="sidebar.finance.costCenterReportDump" />,
  },
  {
    id: 14,
    icon: <MoveUpIcon />,
    name: <IntlMessages id="sidebar.finance.Provisions" />,
  },
  {
    id: 15,
    icon: <StorefrontIcon />,
    name: <IntlMessages id="sidebar.finance.Market" />,
  },
];