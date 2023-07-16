import React from 'react'
import AppTableContainer from "@crema/core/AppTableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeader from '../Table/TableHeader';
import TableItems from '../Table/TableItems';
import { Grid, Box } from '@mui/material';
import CommonGridView from '../commonComponent/CommonGridView';
import { approvedTable } from '../ResourcesOverview/Types';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AppGridContainer from "@crema/core/AppGridContainer";

const BenchResources = (props?: any) => {
  return (
    <Box >
      <BreadcrumbsData menuList={breadCrumbValues} />
      <AppGridContainer>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Grid item xs={12} sx={{ marginTop: 5 }}>
                <AppTableContainer>
                  <Table className="table" sx={{ border: '1px solid #ccc' }}>
                    <TableHead>
                      {
                        approvedTable.totalBenchResources ?
                          <TableHeader tableHeaderField={approvedTable.totalBenchResources} />
                          : null
                      }
                    </TableHead>
                    <TableBody>
                      {
                        approvedTable ?
                          <TableItems data={approvedTable.totalBenchResources} />
                          : null
                      }
                    </TableBody>
                  </Table>
                </AppTableContainer>
              </Grid>
              <CommonGridView approvedTable={approvedTable} />
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </Box>
  )
}
const breadCrumbValues = {
  title: 'Bench Resources',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: 'Bench Resources Details'
}

export default BenchResources;