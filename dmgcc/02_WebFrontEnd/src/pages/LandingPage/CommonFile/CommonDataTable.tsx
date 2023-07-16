import React from 'react'
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { Box } from '@mui/system';

export const CommonDataTable = (props:any) => {

  return (
   <React.Fragment>
            {props.putTableHeader && props.putTableData && props.putTableData !== undefined && props.putTableData.length > 0 ?

<DataGrid
  autoHeight
  rowHeight={64}
  rows={props.putTableData}
  columns={props.putTableHeader}
  components={{ Toolbar: QuickSearchToolbar }}
  paginationMode="server"
  page={0}
  getRowHeight={() => 'auto'}
 sx={{
   [`& .${gridClasses.cell}`]: {
     py: 2,
   },
 }}
  pageSize={10}
  rowsPerPageOptions={[10, 25, 50]}
  disableSelectionOnClick
  disableColumnMenu
  sortingMode='server'
/>
:<Box>No Data</Box>}
       </React.Fragment>
  )
}
