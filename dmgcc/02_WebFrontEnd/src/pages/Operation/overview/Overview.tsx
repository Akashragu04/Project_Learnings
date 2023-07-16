import React from 'react'
import AppGridContainer from "@crema/core/AppGridContainer";
import { Grid } from "@mui/material";
import AppCard from "@crema/core/AppCard";
import { Box, Typography } from "@mui/material";
import MovingIcon from '@mui/icons-material/Moving';
// import { dashboardJson } from '../../../../Dashboard/HealthCare/Types'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useThemeContext } from '@crema/utility/AppContextProvider/ThemeContextProvider';
import SLAInfo from './SLAInfo';
import { StatusFromBusinessSetup } from './StatusFromBusinessSetup';

const Overview = (props?: any) => {
  const { theme } = useThemeContext();
  return (
    <Box style={{ display: props.showProjectDetails ? 'block' : 'none' }} sx={{ marginTop: 5 }}>
      <AppGridContainer>
        <Grid item xs={12} sm={6} md={3}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <Box sx={{ mr: 4, alignSelf: "flex-start" }}>
                <MovingIcon />
              </Box>
              <Box sx={{ width: "calc(100% - 70px)" }} >
                <Typography component="h5" variant="inherit" color="inherit" sx={{
                  fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", width: "100%",
                }} >
                  {props.getProjectOverview ? props.getProjectOverview.total_active_sla : 0}
                </Typography>
                <Box component="p" sx={{
                  pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  width: "100%",
                }} >
                  {'No of Active SLA'}
                </Box>
              </Box>
            </Box>
          </AppCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <Box sx={{ mr: 4, alignSelf: "flex-start" }}>
                <MovingIcon />
              </Box>
              <Box sx={{ width: "calc(100% - 70px)" }} >
                <Typography component="h5" variant="inherit" color="inherit" sx={{
                  fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", width: "100%",
                }} >
                  {props.getProjectOverview ? props.getProjectOverview.total_sla : 0}
                </Typography>
                <Box component="p" sx={{
                  pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  width: "100%",
                }} >
                  {'Total No. of SLA'}
                </Box>
              </Box>
            </Box>
          </AppCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <Box sx={{ mr: 4, alignSelf: "flex-start" }}>
                <MovingIcon />
              </Box>
              <Box sx={{ width: "calc(100% - 70px)" }} >
                <Typography component="h5" variant="inherit" color="inherit" sx={{
                  fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", width: "100%",
                }} >
                  {props.getProjectOverview ? props.getProjectOverview.billable_hours : 0}
                </Typography>
                <Box component="p" sx={{
                  pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  width: "100%",
                }} >
                  {'Billable hours'}
                </Box>
              </Box>
            </Box>
          </AppCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <Box sx={{ mr: 4, alignSelf: "flex-start" }}>
                <MovingIcon />
              </Box>
              <Box sx={{ width: "calc(100% - 70px)" }} >
                <Typography component="h5" variant="inherit" color="inherit" sx={{
                  fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", width: "100%",
                }} >
                  {props.getProjectOverview ? props.getProjectOverview.billed_hours : 0}
                </Typography>
                <Box component="p" sx={{
                  pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  width: "100%",
                }} >
                  {'Billed hours'}
                </Box>
              </Box>
            </Box>
          </AppCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <Box sx={{ mr: 4, alignSelf: "flex-start" }}>
                <MovingIcon />
              </Box>
              <Box sx={{ width: "calc(100% - 70px)" }} >
                <Typography component="h5" variant="inherit" color="inherit" sx={{
                  fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", width: "100%",
                }} >
                  {props.getProjectOverview && props.getProjectOverview.project_profitablity && props.getProjectOverview.project_profitablity !=="NaN" ? `${props.getProjectOverview.project_profitablity} %` : `${0} %`}
                </Typography>
                <Box component="p" sx={{
                  pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  width: "100%",
                }} >
                  {'Project Profitability'}
                </Box>
              </Box>
            </Box>
          </AppCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <Box sx={{ mr: 4, alignSelf: "flex-start" }}>
                <MovingIcon />
              </Box>
              <Box sx={{ width: "calc(100% - 70px)" }} >
                <Typography component="h5" variant="inherit" color="inherit" sx={{
                  fontSize: 16, overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", width: "100%",
                }} >
                  {props.getProjectOverview ? props.getProjectOverview.io_expense_amount : 0}
                </Typography>
                <Box component="p" sx={{
                  pt: 0.5, color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  width: "100%",
                }} >
                  {'Expenses (IO) number & cumulative'}
                </Box>
              </Box>
            </Box>
          </AppCard>
        </Grid>

      

        {/* ))
        : null} */}
      </AppGridContainer>

      <AppGridContainer sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm={8} md={8}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Typography component="h5"
              variant="inherit"
              color="inherit"
              sx={{
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                marginBottom: 3
              }}>Task Report</Typography>
            {
              props.getProjectOverview && props.getProjectOverview.task_resport ?
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={props.getProjectOverview?props.getProjectOverview.task_resport:[]} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey='conversion_name' />
                    <YAxis 
                             tickFormatter={(value) =>
                                new Intl.NumberFormat("en-US", {
                                  notation: "compact",
                                  compactDisplay: "short",
                                }).format(value)
                              }
                            />
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Bar dataKey='count' barSize={75} fill={theme.palette.primary.main}>
                      {
                        props.getProjectOverview.task_resport.map((entry, index) => {
                          return (
                            <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                          )
                        })
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                : null
            }

          </AppCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Typography component="h5"
              variant="inherit"
              color="inherit"
              sx={{
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                marginBottom: 3
              }}>Invoice Status ​</Typography>
            {
             props.getProjectOverview && props.getProjectOverview.sla_budget_invoice_payment ?
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={props.getProjectOverview.sla_budget_invoice_payment?props.getProjectOverview.sla_budget_invoice_payment:[]} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey='conversion_name' />
                    <YAxis 
                             tickFormatter={(value) =>
                                new Intl.NumberFormat("en-US", {
                                  notation: "compact",
                                  compactDisplay: "short",
                                }).format(value)
                              }
                            />
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Bar dataKey='count' barSize={35} fill={theme.palette.primary.main}>
                      {
                        props.getProjectOverview.sla_budget_invoice_payment.map((entry, index) => {
                          return (
                            <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                          )
                        })
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                : null
            }

          </AppCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Typography component="h5"
              variant="inherit"
              color="inherit"
              sx={{
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                marginBottom: 3
              }}>SLA   <Box sx={{ display: 'flex', justifyContent: 'right'}}>
              <Box></Box>
              <Box sx={{ marginLeft: 3, background:  props.getProjectOverview?props.getProjectOverview.projectSlaReportInfo.color_code:'#ffffff',  borderRadius: "50px", width: "20px", height: "20px", textAlign: "center", color: "#fff" }}></Box>
            </Box></Typography>
         
            <SLAInfo data={props.getProjectOverview?props.getProjectOverview.projectSlaReportInfo:null}/>

          </AppCard>
        </Grid>     

        <Grid item xs={12} sm={6} md={4}>
          <AppCard sxStyle={{ height: 1, border: '1px solid #ccc' }} >
            <Typography component="h5"
              variant="inherit"
              color="inherit"
              sx={{
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                marginBottom: 3
              }}>Business Case Setup Report </Typography>
         {
           props.getProjectOverview?
           <StatusFromBusinessSetup data={props.getProjectOverview?props.getProjectOverview.bizCaseSetupReport:null}/>
           :null
         }
            

          </AppCard>
        </Grid>
      </AppGridContainer>

    
    </Box>

  )
}

export default Overview;