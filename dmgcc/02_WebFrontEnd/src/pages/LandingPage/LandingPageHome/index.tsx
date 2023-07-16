import React from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AppAnimate } from "@crema";
import TabsLandingWrapper from './TabsLandingWrapper';
import { LandingMenuList } from './LandingMenuList';
import AboutUs from '../AboutUs';
import ContentView from '../Content';
import NewLetter from '../NewsLetter';
import BrochureView from '../Brochure';
import AboutUsVisions from '../AboutUsVisions';
import AboutUsTestimonials from '../AboutUsTestimonials';
import AboutUsSupplierManagement from '../AboutUsSupplierManagement';
import AboutUsServices from '../AboutUsServices';
import AboutUsQualityManagement from '../AboutUsQualityManagement';
import AboutUsproductEngineering from '../AboutUsProductEngineering';
import AboutUsMission from '../AboutUsMission';
import AboutUsManufacturingEngineering from '../AboutUsManufacturingEngineering';
import AboutUsLeadProcessConsultants from '../AboutUsLeadProcessConsultants';
import AboutUsInformationTechnology from '../AboutUsInformationTechnology';
import AboutUsFinanceControl from '../AboutUsFinanceControlling';
import AboutUsCustomerServices from '../AboutUsCustomerServices.tsx';
import AboutUsCostEngineering from '../AboutUsCostEngineering';
import AboutUsContacts from '../AboutUsContacts';
import OurCapabilities from '../AboutOurCapabilities';
import HumanResources from '../HumanResources';

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

const LandingPageHome = (props:any) => {
    const [value, setValue] = React.useState<number>(0);

    const onTabsChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(+newValue);
    };
    
  return (
   <React.Fragment>
             <AppAnimate animation="transition.slideUpIn" delay={200}>
        <TabsLandingWrapper>
          <Tabs
            className="account-tabs"
            value={value}
            onChange={onTabsChange}
            aria-label="basic tabs example"
            orientation="vertical"
          >
            {LandingMenuList.map((tab, index) => (
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
            {value === 0 &&  <AboutUs />}
            {value === 1 && <AboutUsServices />}
            {value === 2 && <AboutUsVisions />}
            {value === 3 && <AboutUsMission />}
            {value === 4 && <OurCapabilities />}
            {value === 5 && <AboutUsManufacturingEngineering />}
            {value === 6 && <AboutUsproductEngineering />}
            {value === 7 && <AboutUsCustomerServices />}
            {value === 8 && <AboutUsInformationTechnology />}
            {value === 9 && <AboutUsFinanceControl />}
            {value === 10 && <AboutUsCostEngineering />}
            {value === 11 && <HumanResources />}
            {value === 12 && <AboutUsQualityManagement />}
            {value === 13 && <AboutUsLeadProcessConsultants />}
            {value === 14 && <AboutUsSupplierManagement />}
            {value === 15 && <AboutUsTestimonials />}
            {value === 16 && <AboutUsContacts />}
            {value === 17 && <BrochureView />}
            {value === 18 && <NewLetter />}
            {value === 19 && <ContentView/>}
            
            
          </Box>
        </TabsLandingWrapper>
      </AppAnimate>
       </React.Fragment>
  )
}

export default LandingPageHome;