import React from 'react'
import TableHeader from '../Table/TableHeader';
import TableItems from '../Table/TableItems';
import { Grid,  TableBody, TableHead, Table, Box } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";

const CommonTable = (props?:any) => {
  return (
    <Grid item xs={12} sx={{ marginTop: 5, marginBottom:4 }}>
      <Box className="autoscroll">
      <AppTableContainer>
      <Table className="table" sx={{ border: '1px solid #ccc' }}>
        <TableHead>
          {
            props.tableData ?
              <TableHeader tableHeaderField={props.tableData} />
              : null
          }
        </TableHead>
        <TableBody>
          {
            props.tableData ?
              <TableItems data={props.tableData} />
              : null
          }
        </TableBody>
      </Table>
    </AppTableContainer>
      </Box>

  </Grid>
  )
}

export default CommonTable;