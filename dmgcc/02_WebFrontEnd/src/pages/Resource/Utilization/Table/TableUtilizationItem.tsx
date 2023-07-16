import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import ViewGraph from '@crema/commonservices/ViewGraph'
import { Box, } from '@mui/material';
import { ResponsiveContainer } from 'recharts';
// import ViewGraph from '@crema/commonservices/ViewGraph'

const TableUtilizationItem = (props?: any) => {
    return (
        <TableRow
            key={props.indexValues}
            sx={{
                "& .tableCell": {
                    fontSize: 13,
                    padding: 2,
                    whiteSpace: "nowrap",
                    "&:first-of-type": {

                    },
                    "&:last-of-type": {

                    },
                },
            }}
            className="item-hover"
        >
            <>
                <TableCell >{props.data.id}</TableCell>
                <TableCell >{props.data.hr_id ? props.data.hr_id : '-'}</TableCell>
                <TableCell >{props.data.emp_name}</TableCell>
                <TableCell >
                    <>
                        {
                            props.data.projectinfo ?
                                <table className="cuurecntPrj">
                                    <thead>
                                        <th>Project Code</th>
                                        <th>Project Name</th>
                                        <th>Capacity</th>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.projectinfo.map((items: any, i: any) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{items.project_code}</td>
                                                        <td>  {items.project_name}</td>
                                                        <td><CircularProgressWithLabel value={items.resource_capacity} /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                : null
                        }
                    </>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}><CircularProgressWithLabel value={props.data.curren_capacity} /></TableCell>
                <TableCell >
                    <>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ width: '80%' }}>
                                <ResponsiveContainer width="100%" aspect={3}>

                                    <ViewGraph data={props.data.employeecapacityreport} />
                                </ResponsiveContainer>
                            </Box>
                            <Box sx={{ width: '20%', marginLeft: 2, textAlign: 'center', marginTop: 10 }}>
                                <CircularProgressWithLabel value={(props.data.overall_yearly_capacity) ? props.data.overall_yearly_capacity : 0} />
                            </Box>
                        </Box>
                    </>
                </TableCell>
            </>

        </TableRow>
    )
}

export default TableUtilizationItem;