import React from 'react'
import AppTableContainer from "@crema/core/AppTableContainer";
import TableUtilizationHead from '../Utilization/Table/TableUtilizationHead';
import TableUtilizationItem from '../Utilization/Table/TableUtilizationItem';
import { Grid, TableBody, TableHead, Table, Box, Pagination, } from '@mui/material';

const Utilization = (props?: any) => {
  const [isPage, setPage] = React.useState(1)

  React.useEffect(() => {
    if (props.isLastPage) {
      setPage(props.isLastPage)
    } else {
      setPage(1)
    }
  }, [props.isLastPage])
  const handleChange = (event, value) => {
    setPage(value)
    props.onChangePagination(value)
  }
  return (
    <Box sx={{ display: props.ShowUtilization ? 'block' : 'none' }}>
      <Grid container spacing={2}>
        {/* This part is used display total count end*/}
        {
          props.getApprovedResourceData ?
            <React.Fragment>
              <Grid item xs={12}>
                <Box sx={{ marginTop: 10, width: '100%', padding: 5 }}>
                  {
                    props.getApprovedResourceData.utilization_emp_info && props.getApprovedResourceData.utilization_emp_info.content && props.getApprovedResourceData.utilization_emp_info !== null ?
                      props.getApprovedResourceData.utilization_emp_info.content.map((data: any, i: any) => {
                        return (
                          <Box sx={{ marginBottom: 5, boxShadow: "0px 0px 10px 2px #ccc" }} className="autoscroll" key={i}>
                            <AppTableContainer >
                              <Table className="table" sx={{ border: '1px solid #ccc' }}>
                                <TableHead>
                                  <TableUtilizationHead />
                                </TableHead>
                                <TableBody>
                                  <TableUtilizationItem data={data} indexValues={i} key={i} />
                                </TableBody>
                              </Table>
                            </AppTableContainer>
                          </Box>
                        )
                      })

                      : null
                  }
                </Box>
                <Box sx={{
                  background: '#ffffff',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: '0px 0px 5px 0px #ccc',
                  marginBottom: 2
                }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ fontSize: 20 }}>Total Utilization: {props.getApprovedResourceData && props.getApprovedResourceData.utilization_emp_info ? props.getApprovedResourceData.utilization_emp_info.totalElements : 0}</Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'right',
                      }}>
                        <Pagination count={props.getApprovedResourceData && props.getApprovedResourceData.utilization_emp_info ? props.getApprovedResourceData.utilization_emp_info.totalPages : 0} variant="outlined" color="primary" page={isPage}
                          onChange={handleChange} />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </React.Fragment>
            : null}
      </Grid>

    </Box>
  )
}

export default Utilization;