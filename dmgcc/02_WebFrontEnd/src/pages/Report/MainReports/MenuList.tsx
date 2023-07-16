import IntlMessages from "@crema/utility/IntlMessages";
import ForkRightIcon from '@mui/icons-material/ForkRight';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PixIcon from '@mui/icons-material/Pix';
import Diversity2Icon from '@mui/icons-material/Diversity2';


export const tabs = [
  {
    id: 1,
    icon: <BusinessCenterIcon />,
    name: <IntlMessages id="sidebar.report.business" />,
  },
  {
    id: 2,
    icon: <ForkRightIcon />,
    name: <IntlMessages id="sidebar.report.sla" />,
  },
  {
    id: 3,
    icon: <AccountTreeIcon />,
    name: <IntlMessages id="sidebar.report.operations" />,
  },
  {
    id: 4,
    icon: <PixIcon />,
    name: <IntlMessages id="sidebar.report.finance" />,
  },
  {
    id: 5,
    icon: <Diversity2Icon />,
    name: <IntlMessages id="sidebar.report.resource" />,
  }
];