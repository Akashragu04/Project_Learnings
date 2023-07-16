import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import jwtAxios from "./index";
import { AuthUser } from "../../../../types/models/AuthUser";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../../../saga/Actions";
import { ActionTypes } from '../../../../saga/sagas/Types';
import {ConfigAPI} from '../../../../services/config';
import { connect } from "react-redux";
import {getLogin, getLoginSuccess, getLoginFailure} from '../../../../saga/Actions/auth.actions';
import { AnyObject } from "yup/lib/object";

interface JWTAuthContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

// interface SignInProps {
//   email: string;
//   password: string;
// }

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => void;
  signInUser: (data: any) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => {},
  signInUser: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}, props:any) => {
  const [firebaseData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
const {getLoginUser} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   setJWTAuthData({
      //     user: undefined,
      //     isLoading: false,
      //     isAuthenticated: false,
      //   });
      //   return;
      // }
      // setAuthToken(token);
   jwtAxios
        .get(ConfigAPI.checkauth)
        .then(({ data }) =>
          setJWTAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          })
        )
        .catch((error:any, ) =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          })
        );
      // jwtAxios
      //   .post("/api/auth/signin",  { username:'business', password:'business001' })
      //   .then(({ data }) =>
      //     setJWTAuthData({
      //       user: data,
      //       isLoading: false,
      //       isAuthenticated: true,
      //     })
      //   )
      //   .catch(() =>
      //     setJWTAuthData({
      //       user: undefined,
      //       isLoading: false,
      //       isAuthenticated: false,
      //     })
      //   );
    };

    getAuthUser();
  }, []);

  const signInUser = async (getData:any) => {
    // console.log(getData, 'getData...')
    // dispatch(fetchStart());
    // dispatch({type: ActionTypes.LOGIN_REQUEST, value: getData});
    try {
      const { data } = await jwtAxios.post(ConfigAPI.login, getData);
      // console.log(props.statuscode, 'props.statuscode..')
      setJWTAuthData({
        user: data,
        isAuthenticated: true,
        isLoading: false,
      });
      // dispatch(fetchSuccess());
      dispatch(getLoginSuccess());
    } catch (error) {
      // console.log('test2...')
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      // dispatch(fetchError("Something went wrong"));
      dispatch(getLoginFailure());
    }
  };

  const signUpUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(fetchStart());
    try {
      const { data } = await jwtAxios.post("users", { name, email, password });
      localStorage.setItem("token", data.token);
      // setAuthToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError("Something went wrong"));
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};

const mapStateToProps = (state: any) => {
  return{
      statuscode:state.auth.items
  }
}
const mapDispatchToProps = (dispatch?:any) => {
  return {
    getLoginUser: (getValues?:any) => dispatch ({type: ActionTypes.LOGIN_REQUEST, value: getValues})
  }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(JWTAuthAuthProvider);
// export default JWTAuthAuthProvider;
