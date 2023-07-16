import React, { createContext, ReactNode, useContext, useEffect, useState, } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { AuthUser } from "../../../../types/models/AuthUser";
// import { fetchError, fetchStart, fetchSuccess, } from "../../../../saga/Actions";
// import { baseAPI } from '../../../../services/Service';
// import {getLogout} from '../../../../saga/Actions/auth.actions';
import { ActionTypes } from '../../../../saga/sagas/Types';
// import { ConfigAPI } from '../../../../services/config';
import { AppState } from "../../../../saga/store";
import { useSelector } from "react-redux";
// import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "AuthConfig";
// import axios from "axios";

interface FirebaseContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// interface SignUpProps {
//   name: string;
//   email: string;
//   password: string;
// }
// interface SignInProps {
//   username: string;
//   password: string;
// }

interface FirebaseActionsProps {
  logout: () => void;
}

const FirebaseContext = createContext<FirebaseContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const FirebaseActionsContext = createContext<FirebaseActionsProps>({
  logout: () => { },
});

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseActions = () => useContext(FirebaseActionsContext);

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({
  children,
}) => {
  const [firebaseData, setFirebaseData] = useState<FirebaseContextProps>({
    user: undefined,
    isLoading: true,
    isAuthenticated: false,
  });


  const authData: any = useSelector<AppState, AppState["auth"]>(
    ({ auth }) => auth
  );

  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();
  // const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    }).then((response) => {
      getAuthUser(response);
      localStorage.setItem('token', response?.accessToken);
    });

    const getAuthUser = (tokenResponse) => {
      const config: any = {
        headers: {
          Authorization: `Bearer ${tokenResponse?.accessToken}`
        }
      }
      dispatch({ type: ActionTypes.LOGIN_REQUEST, value: config });
      
      // baseAPI
      //   .get(ConfigAPI.login, config)
      //   .then(({ data }) => {
      //     setFirebaseData({
      //       user: data,
      //       isAuthenticated: Boolean(data),
      //       isLoading: false,
      //     });
      //   })
      //   .catch((error: any,) => {
      //     setFirebaseData({
      //       user: firebaseData.user,
      //       isLoading: false,
      //       isAuthenticated: true,
      //     });
      //   });
    }
    if (authData) {
      if (authData.profileDetails) {
        setFirebaseData({
          user: authData.profileDetails ? authData.profileDetails.roles : null,
          isLoading: false,
          isAuthenticated: authData.profileDetails ? authData.profileDetails.isAuthenticated : null,
        });
      } else {
        setFirebaseData({
          user: firebaseData.user,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    // setFirebaseData({ ...firebaseData, isLoading: true });
    try {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
      localStorage.setItem('token', '');
      dispatch({ type: ActionTypes.LOGOUT_REQUEST });
      await auth.signOut();
      dispatch({ type: ActionTypes.CLEAR_BUSINESS_REQUEST });
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <FirebaseActionsContext.Provider
        value={{
          logout,
        }}
      >
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};
export default FirebaseAuthProvider;
