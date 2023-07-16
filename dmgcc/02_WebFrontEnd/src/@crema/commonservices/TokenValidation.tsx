import React, { useEffect }  from 'react'
import { connect } from "react-redux";
import { ActionTypes } from "saga/sagas/Types";

const TokenValidation = (props?:any) => {
    useEffect(() => {
        // props.checkTokenValidation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <></>
  )
}

const mapStateToProps = (state: any) => {
    return {
      checkTokenStatus:state.auth.tokenValidationStatus,
      loading:state.auth.loading,

    }
  }
  const mapDispatchToProps = (dispatch?: any) => {
    return {
      checkTokenValidation: () => dispatch({ type: ActionTypes.TOKEN_VALIDATION_REQUEST }),
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(TokenValidation);