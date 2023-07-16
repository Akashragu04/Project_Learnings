import React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import AuthRoutes from "@crema/utility/AuthRoutes"; //NOSONAR
import AppContextProvider from "@crema/utility/AppContextProvider"; //NOSONAR
import AppThemeProvider from "@crema/utility/AppThemeProvider"; //NOSONAR
import AppStyleProvider from "@crema/utility/AppStyleProvider"; //NOSONAR
import AppLocaleProvider from "@crema/utility/AppLocaleProvider"; //NOSONAR
import AppLayout from "@crema/core/AppLayout"; //NOSONAR
import FirebaseAuthProvider from "./@crema/services/auth/firebase/FirebaseAuthProvider";
import { BrowserRouter } from "react-router-dom";
import { store } from './saga/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PublicClientApplication } from "@azure/msal-browser";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import {  msalConfig } from './AuthConfig';
import './App.css';
import CommonPageAuth from "pages/LandingPageBase/CommonPage";

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => (
    <MsalProvider instance={msalInstance}>
      <AppContextProvider>
        <Provider store={store}>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <BrowserRouter >
                  <AuthenticatedTemplate>
                    <FirebaseAuthProvider>
                      <AuthRoutes>
                        <CssBaseline />
                        <AppLayout />
                      </AuthRoutes>
                    </FirebaseAuthProvider>
                  </AuthenticatedTemplate>
                  <UnauthenticatedTemplate>
                    <CommonPageAuth />
                  </UnauthenticatedTemplate>
                </BrowserRouter>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
          <ToastContainer />
        </Provider>
      </AppContextProvider>
    </MsalProvider>
);



export default App;
