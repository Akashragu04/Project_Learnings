import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import ViewEmployeeDetails from './ViewEmployeeDetails';
import ViewGraph from '@crema/commonservices/ViewGraph'
import { Box, } from '@mui/material';
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import { LineChart, ResponsiveContainer, Tooltip, Line,} from 'recharts';
import { appConstants } from 'shared/constants/AppConst';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});


const UtilizationGrid = (props?: any) => {
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [showEmployeeDetails, setShowEmployeeDetails] = React.useState(false);
    // const [UtilizationData, setUtilizationData] = React.useState({});

    const generalPageSizing = (showPageNo) => {
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
    };

    const handleSortModelChange = (sortField) => {

    }

    const generalPaging = (paging) => {
    }

    const generalGridChange = (event) => {
    }

    React.useEffect(() => {
        getRoleBased()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

const handleEmployeeDetailsClose = () =>{
    setShowEmployeeDetails(false)
}
// const viewEmployeeDetailsDetails = (getEmployeeDetails?:any) =>{
//     setUtilizationData(getEmployeeDetails.row)
//     setShowEmployeeDetails(true)
// }
    const getRoleBased = () => {
        const leadFilterColumns: any = [
            // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
            {
                field: 'hr_id',
                headerName: 'HR Id',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 130,
                roleTypes: "common",
                renderCell: (params) => {
                    return(
                        <Box>{params.row.hr_id?params.row.hr_id:'-'}</Box>
                    )
                }
            },
            {
                field: 'emp_name',
                headerName: 'Employee',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 230,
                roleTypes: "common"
            },
            {
                field: 'projectinfo',
                headerName: 'Current Projects',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 250,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <>
                        {
                            params.row.projectinfo?
                                    <table className="cuurecntPrj">
                                    <tbody>
                                  {  
                                  params.row.projectinfo.map((items:any, i:any)=>{
                                        return(
                                    <tr key={i}>
                                        <td>{items.project_code}</td>
                                        <td>  {items.project_name}</td>
                                        <td><CircularProgressWithLabel value={items.resource_capacity} /></td>
                                    </tr>
                                       )})
                                    }
                                    </tbody>
                                </table>
                             
                            :null
                        }
                   
                        </>
                    )

                }
            },
            {
                field: 'current_utilization',
                headerName: 'Current Utilization',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <>
                        <Box sx={{marginLeft:2}}>
                        <CircularProgressWithLabel value={params.row.curren_capacity} />
                        </Box>
                        </>
                    )

                }
            },
            {
                field: 'ytd_utilization',
                headerName: 'YTD Utilization',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 350,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <>
                               <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart data={params.row.employeecapacityreport} >
                                {/* <CartesianGrid />
                                <XAxis dataKey="curren_capacity"
                                    interval={'preserveStartEnd'} /> */}
                                {/* <YAxis></YAxis> */}
                                {/* <Legend /> */}
                                <Tooltip labelStyle={{ color: "black" }} />
                                {/* <Tooltip /> */}
                                <Line  dataKey="capacity"
                                    stroke="black" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <ViewGraph data={params.row.employeecapacityreport}/>
                        <Box sx={{marginLeft:2}}>
                        <CircularProgressWithLabel value={30} />
                        </Box>
                        </>
                    )

                }
            },

        ];
        setResourcesColumns(leadFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4, paddingLeft: 5 }} className={classes.root}>
              {/* <AppTableContainer>
              <Table className="table" sx={{ border: '1px solid #ccc' }}>
                <TableHead>
             
                      <TableUtilizationHead />
                </TableHead>
                <TableBody> */}
                  {/* {
                    props.resourceInfo.skills && props.resourceInfo.skills !== null ?
                      props.resourceInfo.skills.map((data: any, i: any) => {
                        return (
                          <TableUtilizationItem data={data} indexValues={i} key={i}/>
                        )
                      })

                      : null
                  } */}
                {/* </TableBody>
              </Table>
            </AppTableContainer> */}
            <ViewEmployeeDetails showEmployeeDetails={showEmployeeDetails} handleEmployeeDetailsClose={handleEmployeeDetailsClose} />
            {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && props.getUtilizationData ?

                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={props.getUtilizationData}
                    columns={getResourcesColumns}
                    components={{ Toolbar: QuickSearchToolbar }}
                    componentsProps={{
                        toolbar: {
                            value: searchText,
                            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                                requestSearch(event.target.value),
                            clearSearch: () => requestSearch(""),
                        },
                    }}
                    getRowHeight={() => 'auto'}
                   sx={{
                     [`& .${gridClasses.cell}`]: {
                       py: 2,
                     },
                   }}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    //   checkboxSelection
                    //   disableSelectionOnClick
                    //   disableColumnMenu
                    // loading={loading}
                    // sortingMode='server'
                    onSortModelChange={handleSortModelChange}
                    onPageChange={(paging) => generalPaging(paging)}
                    onPageSizeChange={(size) => generalPageSizing(size)}
                    onStateChange={(event) => generalGridChange(event)}
                />
                : null}
        </Box>
    )
}

export default UtilizationGrid;