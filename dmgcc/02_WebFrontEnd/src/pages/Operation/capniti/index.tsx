import AppGridContainer from "@crema/core/AppGridContainer";
import { Grid } from "@mui/material";
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Capniti from './Capniti';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';

export const CapnitiView = (props:any) => {

  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />

      <AppGridContainer className="marginTop">
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Capniti />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>
  )
}

const breadCrumbValues = {
  title: 'Capniti',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}


const mapStateToProps = (state: any) => {
  return {
      loading: state.operationProcess.loading
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
      getCapacityManagementList: () => dispatch({ type: OperationActionTypes.GET_CAPACITY_MANAGEMENT_REQUEST })
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapnitiView);
// export default CapnitiView;