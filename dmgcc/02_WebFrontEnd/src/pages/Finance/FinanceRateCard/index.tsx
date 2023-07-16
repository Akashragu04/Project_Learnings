import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { AppGridContainer } from "@crema";
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import FinanceRateCardGrid from "./FinanceRateCardGrid";

const FinanceBizGrid = () => {

  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {/* <AppAnimate animation="transition.fadeIn" delay={200}> */}
      <AppGridContainer className="marginTop">
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <FinanceRateCardGrid />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>
  );
};

const breadCrumbValues = {
  title: 'Finance Rate Card',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default FinanceBizGrid;

