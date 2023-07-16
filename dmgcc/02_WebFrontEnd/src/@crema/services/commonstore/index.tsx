// import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../saga/store";

const CommonStore = () => {
    const authData:any  = useSelector<AppState, AppState["auth"]>(
      ({ auth }) => auth
    );
    return (authData);
  };


  
  export default CommonStore;