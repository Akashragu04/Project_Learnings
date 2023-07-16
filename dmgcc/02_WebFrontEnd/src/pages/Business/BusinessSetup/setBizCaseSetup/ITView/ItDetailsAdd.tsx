import React from 'react'
import { Box, Typography, } from '@mui/material';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer"; //NOSONAR
import ItTableHead from './ItTableHead';
import TableItems from './TableItems';

const ItDetailsAdd = (props?: any) => {
    return (
        <Box sx={{ marginTop: 5, padding: 5 }}>
            <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
            Plan 
            </Typography>
            {/* <Box sx={{marginBottom:5}}>
    <BizCaseBarChar/>
    </Box> */}

            <AppTableContainer>
                <Table className="table" sx={{ border: "1px solid #ccc" }}>
                    <TableHead>
                        <ItTableHead />
                    </TableHead>
                    {
                        props.setBizCaseSetupData ?
                            <TableBody>
                                {props.setBizCaseSetupData.map((data: any, index: any) => (
                                    <TableItems data={data} key={index} />
                                )
                                )}
                            </TableBody>
                            : null
                    }

                </Table>
            </AppTableContainer>
        </Box>
    )
}

export default ItDetailsAdd;
