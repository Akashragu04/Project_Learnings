import React from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AppAnimate } from "@crema";
import TabsWrapper from './TabsWrapper';
import { tabs } from './MenuList';
import CostCentreMaster from '../CostCentreMaster'
import RateCardMaster from '../RateCardMaster';
import ViewIOMapping from '../IOMapping';
import ForexRatesView from '../ForexRates';
import Accruals from '../Accruals';
import EntityMaster from '../EntityMaster';
import VendorMaster from '../VendorMaster';
import MaterialMaster from '../MaterialMaster';
import CostCenterReportYTD from '../CostCenterReportDump';
import IODump from '../IODump';
import FinanceSLA from '../SLA';
import PreInvoiceGrid from 'pages/PreInvoice/PreInvoiceGrid/PreInvoiceGrid';
import InvoiceGrid from 'pages/invoice/invoiceGrid/invoiceGrid';
import Provisions from '../Provisions';
import { useAuthMethod } from "@crema/utility/AuthHooks";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { reqTokenResonse } from 'saga/Actions';
import MarketView from '../Market';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MainFinance = (props:any) => {
  const [value, setValue] = React.useState<number>(0);
  const { logout } = useAuthMethod();
  const navigate = useNavigate();

  const onTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(+newValue);
  };
  
  React.useEffect(()=>{
    if(props.checkTokenStatus){
      if(props.checkTokenStatus.message === 'Invalid Token'){
        logout()
        navigate("/signin");
        window.location.reload()
      }
    }   
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.checkTokenStatus])

  return (
    <>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <TabsWrapper>
          <Tabs
            className="account-tabs"
            value={value}
            onChange={onTabsChange}
            aria-label="basic tabs example"
            orientation="vertical"
          >
            {tabs.map((tab, index) => (
              <Tab
                className="account-tab"
                label={tab.name}
                icon={tab.icon}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <Box className="account-tabs-content">
            {value === 0 && <CostCentreMaster />}
            {value === 1 && <RateCardMaster />}
            {value === 2 && <ForexRatesView />}
            {value === 3 && <ViewIOMapping />}
            {value === 4 && <FinanceSLA />}
            {value === 5 && <PreInvoiceGrid />}
            {value === 6 && <InvoiceGrid />}
            {value === 7 && <Accruals />}
            {value === 13 && <Provisions />}
            {value === 8 && <EntityMaster />}
            {value === 9 && <MaterialMaster />}
            {value === 10 && <VendorMaster />}
            {value === 11 && <IODump />}
            {value === 12 && <CostCenterReportYTD />}
            {value === 14 && <MarketView />}
          </Box>
        </TabsWrapper>
      </AppAnimate>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    checkTokenStatus: state.auth.tokenValidationStatus,
    loading: state.auth.loading,   
}}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reqTokenResonse: () => {
      dispatch(reqTokenResonse())
  },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainFinance)

// export default MainFinance;