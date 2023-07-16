import React from 'react'
import { Box, Typography, } from '@mui/material';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer"; //NOSONAR
import BizSystemAccessHeader from './BizSystemAccessHeader';
import BizSystemAccessItems from './BizSystemAccessItems';

const BizSystemAccessGrid = (props?:any) => {
  return (
    <Box sx={{ marginTop: 5, padding: 5 }}>
            <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
                Plan </Typography>
            <AppTableContainer>
                <Table className="table" sx={{ border: "1px solid #ccc" }}>
                    <TableHead>
                        <BizSystemAccessHeader />
                    </TableHead>
                    <TableBody>
                        {(props.setBizCaseSetupData) && props.setBizCaseSetupData.map((data: any, index: any) => (
                            <BizSystemAccessItems data={data} key={index} />
                        )
                        )}
                    </TableBody>
                </Table>
            </AppTableContainer>
        </Box>
  )
}

export default BizSystemAccessGrid;
