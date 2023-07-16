import React from 'react'
import IntlMessages from "@crema/utility/IntlMessages";
import BookIcon from '@mui/icons-material/Book';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import PaymentsIcon from '@mui/icons-material/Payments';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CameraIcon from '@mui/icons-material/Camera';

export const LandingMenuList = [
  {
    id: 0, icon: <InfoIcon />,
    name: <IntlMessages id="landing.about" />
  },
  {
    id: 1,
    icon: <RoomServiceIcon />,
    name: <IntlMessages id="landing.AboutUsServices" />,
  },
  {
    id: 2,
    icon: <RemoveRedEyeIcon />,
    name: <IntlMessages id="landing.AboutUsVisions" />,
  },
  {
    id: 3,
    icon: <CameraIcon />,
    name: <IntlMessages id="landing.AboutUsMission" />,
  },
  {
    id: 4,
    icon: <ContentPasteIcon />,
    name: <IntlMessages id="landing.ourCapabilities" />,
  },
  {
    id: 5,
    icon: <ContentPasteIcon />,
    name: <IntlMessages id="landing.ManufacturingEngineering" />,
  },
  {
    id: 6,
    icon: <EngineeringIcon />,
    name: <IntlMessages id="landing.AboutUsproductEngineering" />,
  },
  {
    id: 7,
    icon: <DesignServicesIcon />,
    name: <IntlMessages id="landing.AboutUsCustomerServices" />,
  },
  {
    id: 8,
    icon: <ImportContactsIcon />,
    name: <IntlMessages id="landing.AboutUsInformationTechnology" />,
  },
  {
    id: 9,
    icon: <AccountBalanceIcon />,
    name: <IntlMessages id="landing.AboutUsFinanceControl" />,
  },
  {
    id: 10,
    icon: <PaymentsIcon />,
    name: <IntlMessages id="landing.AboutUsCostEngineering" />,
  },   
  {
    id: 11,
    icon: <ManageAccountsIcon />,
    name: <IntlMessages id="landing.humanResources" />,
  },
  {
    id: 12,
    icon: <ManageAccountsIcon />,
    name: <IntlMessages id="landing.AboutUsQualityManagement" />,
  },
  {
    id: 13,
    icon: <ManageAccountsIcon />,
    name: <IntlMessages id="landing.leanProcessConsultants" />,
  },
  {
    id: 14,
    icon: <ManageAccountsIcon />,
    name: <IntlMessages id="landing.AboutUsSupplierManagement" />,
  },
  {
    id: 15,
    icon: <ManageAccountsIcon />,
    name: <IntlMessages id="landing.AboutUsTestimonials" />,
  },
  {
    id: 16,
    icon: <ContactsIcon />,
    name: <IntlMessages id="landing.AboutUsContacts" />,
  },
  {
    id: 17,
    icon: <BookIcon />,
    name: <IntlMessages id="landing.brochure" />,
  },
  {
    id: 18,
    icon: <NewspaperIcon />,
    name: <IntlMessages id="landing.newsletter" />,
  },
  // {
  //   id: 19,
  //   icon: <FeedbackIcon />,
  //   name: <IntlMessages id="landing.feedBack" />,
  // },
  {
    id: 19,
    icon: <ContentPasteIcon />,
    name: <IntlMessages id="landing.content" />,
  },
];