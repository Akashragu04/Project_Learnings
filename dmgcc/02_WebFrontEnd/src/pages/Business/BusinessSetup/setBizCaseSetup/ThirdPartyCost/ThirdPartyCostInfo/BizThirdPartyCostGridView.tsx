import React from 'react'
import { Box, Typography, } from '@mui/material';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer"; //NOSONAR
import BizThirdPartyCostHead from './BizThirdPartyCostHead';
import BizThirdPartyCostItems from './BizThirdPartyCostItems';
import BizThirdPartyCostSetupHeader from './BizThirdPartyCostSetupHeader';
import BizThirdPartyCostSetupItems from './BizThirdPartyCostSetupItems';

const BizThirdPartyCostGridView = (props?:any) => {
  return (
    <Box sx={{ marginTop: 5, padding: 5 }}>
            <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
                Plan  </Typography>
            <AppTableContainer>
                <Table className="table" sx={{ border: "1px solid #ccc" }}>
                    <TableHead>
                        <BizThirdPartyCostHead />
                    </TableHead>
                    <TableBody>
                        {(props.setBizCaseSetupData) && props.setBizCaseSetupData.map((data: any, index: any) => (
                            <BizThirdPartyCostItems data={data} key={index} />
                        )
                        )}
                    </TableBody>
                </Table>
            </AppTableContainer>
            {/* This is view third party cost update detail */}
            <Box sx={{marginTop:8}}>
            <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
            Actual
            </Typography>
            <AppTableContainer>
                <Table className="table" sx={{ border: "1px solid #ccc" }}>
                    <TableHead>
                        <BizThirdPartyCostSetupHeader />
                    </TableHead>
                    <TableBody>
                        {(props.setThirdPartyCostData) && props.setThirdPartyCostData.map((data: any, index: any) => (
                            <BizThirdPartyCostSetupItems data={data} key={index} />
                        )
                        )}
                    </TableBody>
                </Table>
            </AppTableContainer>
            </Box>
        
        </Box>
  )
}

export default BizThirdPartyCostGridView;
