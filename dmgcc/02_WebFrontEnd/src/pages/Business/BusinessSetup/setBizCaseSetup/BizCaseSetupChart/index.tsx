import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer"; //NOSONAR
import BizCaseSetupChart from './BizCaseSetupChart';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { AppCircularProgress } from '@crema';
import BizCaseReport from './BizCaseReport';

const BizCaseChartView = (props?: any) => {
  // const [getBizCaseChart, setBizCaseChart] = useState([])
  React.useEffect(() => {
    if (props.data) {
      // const BizCaseChartData: any = [
      //   {
      //     name: 'Manpower',
      //     value: props.data.total_average || 0,
      //   }, {
      //     name: 'IT Infra',
      //     value: props.data.it_average || 0,
      //   },
      //   {
      //     name: 'Facility',
      //     value: props.data.facility_average || 0,
      //   },
      //   {
      //     name: 'HR',
      //     value: props.data.hr_average || 0,
      //   },
      //   {
      //     name: '3rd party manpower - Cost',
      //     value: props.data.total_average || 0,
      //   },
      //   {
      //     name: '3rd party Services - Business​',
      //     value: props.data.total_average || 0,
      //   },
      //   {
      //     name: 'System Access',
      //     value: props.data.total_average || 0,
      //   }]
      // setBizCaseChart(BizCaseChartData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <React.Fragment>
      <AppGridContainer>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                component="h5"
                variant="inherit"
                color="inherit"
                sx={{
                  fontSize: 16,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                Project setup status
              </Typography>
              <Box sx={{ marginTop: 5 }}>
                <AppCircularProgress activeColor="#00677F" value={props.data && props.data.overall_project_status?props.data.overall_project_status:0} thickness={2} />
              </Box>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          {
            props.data?
            <BizCaseSetupChart data={props.data} />            
            :null
          }         
        </Grid>
      </AppGridContainer>
      <Box sx={{ marginTop: 5 }}>
      {
            props.data?
        <BizCaseReport data={props.data} onChangeCostDetails={props.onChangeCostDetails}/>
        :null
      } 
      </Box>

    </React.Fragment>
  )
}

export default BizCaseChartView;
