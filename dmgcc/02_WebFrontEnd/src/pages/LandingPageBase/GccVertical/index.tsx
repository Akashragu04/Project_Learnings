import React from 'react'
import CostEngineering from '../AboutUs/CostEngineering';
import CustomerServices from '../AboutUs/CustomerServices';
import FinanceControlling from '../AboutUs/FinanceControlling';
import HumanResources from '../AboutUs/HumanResources';
import InformationTechnology from '../AboutUs/InformationTechnology';
import LeadProcessConsultants from '../AboutUs/LeadProcessConsultants';
import ManufacturingEngineering from '../AboutUs/ManufacturingEngineering';
import OurCapabilities from '../AboutUs/OurCapabilities';
import ProductEngineering from '../AboutUs/ProductEngineering';
import QualityManagement from '../AboutUs/QualityManagement';
import SupplierManagement from '../AboutUs/SupplierManagement';
import { connect } from "react-redux";
import CommonHeader from 'layout/CommonHeader';
import { reqCapabilitiesData, reqCostEngineeringData, reqCustomerServicesData, reqFinanceControllingData, 
  reqHumanResourcesData, reqInformationRechnologyData, reqLeanProcessData, reqQualityManagementData, reqSupplierManagementData, 
  reqProductEngineerData, reqManufacturingEngineerData, reqHumanResourcesSubCntData, reqLeanProcessSubCntData, reqManufacturingEngineerSubCntData, 
  reqProductEngineerSubCntData, reqQualityManagementSubCntData, reqSupplierManagementSubCntData, reqCostEngineeringSubCntData, 
  reqCustomerServicesSubCntData, reqFinanceControllingSubCntData } from 'saga/Actions';

const GccVertical = (props:any) => {
    React.useEffect(()=>{
      window.scrollTo(0, 0);
      props.reqCapabilitiesData()
      props.reqCostEngineeringData()
      props.reqCostEngineeringSubCntData()
      props.reqCustomerServicesData()
      props.reqInformationRechnologyData()
      props.reqProductEngineerData()
      props.reqHumanResourcesData()
      props.reqHumanResourcesSubCntData()
      props.reqQualityManagementData()
      props.reqQualityManagementSubCntData()
      props.reqLeanProcessSubCntData()
      props.reqLeanProcessData()
      props.reqSupplierManagementSubCntData()
      props.reqSupplierManagementData()
      props.reqManufacturingEngineerData()
      props.reqManufacturingEngineerSubCntData()
      props.reqFinanceControllingSubCntData()
      props.reqFinanceControllingData()
      props.reqCustomerServicesSubCntData()
      props.reqProductEngineerSubCntData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <React.Fragment>
            <CommonHeader bannerDetails={BannerDetails} />
            {
              props.resCapabilitiesData?
              <OurCapabilities resCapabilitiesData={props.resCapabilitiesData}/>
              :null
            }
            {
              props.resManufacturingEngineerData && props.resManufacturingEngineerSubCntData?
              <ManufacturingEngineering getMainContent={props.resManufacturingEngineerData} getSubContent={props.resManufacturingEngineerSubCntData}/>
              :null
            }
            {
              props.resProductEngineeringData&& props.resProductEngineeringSubCntData?
              <ProductEngineering getMainContent={props.resProductEngineeringData} getSubContent={props.resProductEngineeringSubCntData}/>
              :null
            }
           {
             props.resCustomerServicesData && props.resSubContentCustomerServicesData?
             <CustomerServices getMainContent={props.resCustomerServicesData} getSubContent={props.resSubContentCustomerServicesData}/>
             :null
           }
           {
             props.resInformationTechnology?
             <InformationTechnology getMainContent={props.resInformationTechnology}/>
             :null
           }
           
            {
              props.resFinanceControlling && props.resSubCntFinanceControlling?
              <FinanceControlling getMainContent={props.resFinanceControlling} getSubContent={props.resSubCntFinanceControlling}/>
              :null
            }
            {
              props.resCostEngineering && props.resSubCntCostEngineering?
              <CostEngineering getMainContent={props.resCostEngineering} putSubContent={props.resSubCntCostEngineering}/>
              :null
            }
            {
              props.resHumanResourcesData && props.resHumanResourcesSubCntData?
              <HumanResources putMainContent={props.resHumanResourcesData} putSubContent={props.resHumanResourcesSubCntData}/>
              :null
            }
            
           {
             props.resQualityManagementData && props.resQualityManagementSubCntData?
             <QualityManagement getMainContent={props.resQualityManagementData} getSubContent={props.resQualityManagementSubCntData}/>
             :null
           }
           {
             props.resLeanProcessData && props.resLeanProcessSubCntData?
             <LeadProcessConsultants getMainContent={props.resLeanProcessData} getSubContent={props.resLeanProcessSubCntData}/>
             :null
           }
            {
              props.resSupplierManagementData && props.resSupplierManagementSubCntData?
              <SupplierManagement getMainContent={props.resSupplierManagementData} getSubContent={props.resSupplierManagementSubCntData}/>
              :null
            }
            
        </React.Fragment>
    )
}
const BannerDetails: any = {
    title: 'G3C Vertical',
    homeurl: '/',
    homeTitle: 'Home'
}

const mapStateToProps = (state: any) => {
    return {
      resCapabilitiesData:state.gccVerticalReducer.resCapabilitiesData,
      resHumanResourcesData:state.gccVerticalReducer.resHumanResourcesData,
      resHumanResourcesSubCntData:state.gccVerticalReducer.resHumanResourcesSubCntData,
      resQualityManagementSubCntData:state.gccVerticalReducer.resQualityManagementSubCntData,
      resQualityManagementData:state.gccVerticalReducer.resQualityManagementData,
      resLeanProcessData:state.gccVerticalReducer.resLeanProcessData,
      resLeanProcessSubCntData:state.gccVerticalReducer.resLeanProcessSubCntData,
      resSupplierManagementSubCntData:state.gccVerticalReducer.resSupplierManagementSubCntData,
      resSupplierManagementData:state.gccVerticalReducer.resSupplierManagementData,
      resManufacturingEngineerData:state.gccVerticalReducer.resManufacturingEngineerData,
      resManufacturingEngineerSubCntData:state.gccVerticalReducer.resManufacturingEngineerSubCntData,
      resSubCntFinanceControlling:state.gccVerticalReducer.resSubCntFinanceControlling,
      resFinanceControlling:state.gccVerticalReducer.resFinanceControlling,
      resSubCntCostEngineering:state.gccVerticalReducer.resSubCntCostEngineering,
      resCostEngineering:state.gccVerticalReducer.resCostEngineering,
      resInformationTechnology:state.gccVerticalReducer.resInformationTechnology,
      resCustomerServicesData:state.gccVerticalReducer.resCustomerServicesData,
      resSubContentCustomerServicesData:state.gccVerticalReducer.resSubContentCustomerServicesData,
      resProductEngineeringData:state.gccVerticalReducer.resProductEngineeringData,
      resProductEngineeringSubCntData:state.gccVerticalReducer.resProductEngineeringSubCntData
    }
  }
  
  const mapDispatchToProps = (dispatch?: any) => {
    return {
        reqCapabilitiesData: () => dispatch(reqCapabilitiesData()), 
        reqCostEngineeringData: () => dispatch(reqCostEngineeringData()), 
        reqCustomerServicesData: () => dispatch(reqCustomerServicesData()), 
        reqFinanceControllingData: () => dispatch(reqFinanceControllingData()), 
        reqHumanResourcesData: () => dispatch(reqHumanResourcesData()), 
        reqInformationRechnologyData: () => dispatch(reqInformationRechnologyData()), 
        reqLeanProcessData: () => dispatch(reqLeanProcessData()),   
        reqQualityManagementData: () => dispatch(reqQualityManagementData()), 
        reqSupplierManagementData: () => dispatch(reqSupplierManagementData()), 
        reqProductEngineerData: () => dispatch(reqProductEngineerData()), 
        reqHumanResourcesSubCntData:()=>dispatch(reqHumanResourcesSubCntData()),
        reqQualityManagementSubCntData:()=>dispatch(reqQualityManagementSubCntData()),
        reqLeanProcessSubCntData:()=>dispatch(reqLeanProcessSubCntData()),
        reqSupplierManagementSubCntData:()=>dispatch(reqSupplierManagementSubCntData()),
        reqManufacturingEngineerData: () => dispatch(reqManufacturingEngineerData()), 
        reqManufacturingEngineerSubCntData:()=>dispatch(reqManufacturingEngineerSubCntData()),
        reqFinanceControllingSubCntData:()=>dispatch(reqFinanceControllingSubCntData()),
        reqCostEngineeringSubCntData:()=>dispatch(reqCostEngineeringSubCntData()),
        reqCustomerServicesSubCntData:()=>dispatch(reqCustomerServicesSubCntData()),
        reqProductEngineerSubCntData:()=>dispatch(reqProductEngineerSubCntData()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GccVertical);
