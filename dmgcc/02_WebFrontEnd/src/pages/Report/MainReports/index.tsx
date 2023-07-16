import React from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AppAnimate } from "@crema";
import TabsWrapper from './TabsWrapper';
import { tabs } from './MenuList';
import { connect } from 'react-redux'
import { reqTokenResonse } from 'saga/Actions';
import BusinessReports from '../BusinessReports';
import SLAReports from '../SLAReports';
import OperationsReports from '../OperationsReports';
import FinanceReports from '../FinanceReports';
import ResourceReports from '../ResourceReports';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MainReports = (props:any) => {
  const [value, setValue] = React.useState<number>(0);

  const onTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(+newValue);
  };


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
            {value === 0 && <BusinessReports />}
            {value === 1 && <SLAReports />}
            {value === 2 && <OperationsReports />}
            {value === 3 && <FinanceReports />}
            {value === 4 && <ResourceReports />}
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
export default connect(mapStateToProps, mapDispatchToProps)(MainReports)

// export default MainFinance;