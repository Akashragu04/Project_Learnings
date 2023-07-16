import * as React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AboutUsView from '../page/AboutUs';
import BrochureView from '../page/Brochure';
import ContentView from '../page/Content';
import GccVertical from '../page/GccVertical';
import HomePage from '../page/homepage';
import NewsLatterView from '../page/Newletter';
import { LandingPageURL } from './Roles';

const Pages: React.FC = () => (

  <BrowserRouter>
    <Routes>
    <Route path={LandingPageURL.homepage} element={<HomePage/>} />
    <Route path={LandingPageURL.aboutusPage} element={<AboutUsView/>} />
    <Route path={LandingPageURL.brochurePage} element={<BrochureView/>} />
    <Route path={LandingPageURL.newsletterPage} element={<NewsLatterView/>} />
    <Route path={LandingPageURL.contentPage} element={<ContentView/>} />
    <Route path={LandingPageURL.GccVertical} element={<GccVertical/>} />
  </Routes>
  </BrowserRouter>
  )

  
  export default Pages