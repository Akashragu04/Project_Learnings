import React from 'react'
import { Box, Typography, } from '@mui/material';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer"; //NOSONAR
import BizThirdPartyServicesItems from './BizThirdPartyServicesItems';
import BizThirdPartyServicesHeader from './BizThirdPartyServicesHeader';
import BizThirdPartyServicesDataHead from './BizThirdPartyServicesDataHead';
import BizThirdPartyServicesDataItems from './BizThirdPartyServicesDataItems';

const BizThirdPartyServicesGrid = (props?:any) => {
  return (
    <Box sx={{ marginTop: 5, padding: 5 }}>
    <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
        Plan   </Typography>
    <AppTableContainer>
        <Table className="table" sx={{ border: "1px solid #ccc" }}>
            <TableHead>
                <BizThirdPartyServicesHeader />
            </TableHead>
            <TableBody>
                {(props.setBizCaseSetupData) && props.setBizCaseSetupData.map((data: any, index: any) => (
                    <BizThirdPartyServicesItems data={data} key={index} />
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
                        <BizThirdPartyServicesDataHead />
                    </TableHead>
                    <TableBody>
                        {(props.setThirdPartyServicesData) && props.setThirdPartyServicesData.map((data: any, index: any) => (
                            <BizThirdPartyServicesDataItems data={data} key={index} />
                        )
                        )}
                    </TableBody>
                </Table>
            </AppTableContainer>
            </Box>
</Box>
  )
}

export default BizThirdPartyServicesGrid;
