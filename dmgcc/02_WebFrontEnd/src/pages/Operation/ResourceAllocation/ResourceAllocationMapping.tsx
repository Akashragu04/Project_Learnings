import React from 'react'
import { Grid, Box, Typography, Switch } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeader from './TableHeader';
import TableItems from './TableItems';

const ResourceAllocationMapping = (props?: any) => {
    return (
        <>
            <Grid item xs={12} md={10} sx={{ marginTop: 5 }}>
                <AppTableContainer>
                    <Table className="table" sx={{ border: '1px solid #ccc' }}>
                        <TableHead>
                            {
                                props.getResourceAllocationDetails ?
                                    <TableHeader tableHeaderField={props.getResourceAllocationDetails.fullFTERequirement} />
                                    : null
                            }
                        </TableHead>
                        <TableBody>
                            {
                                props.getResourceAllocationDetails ?
                                    <TableItems data={props.getResourceAllocationDetails.fullFTERequirement} />
                                    : null
                            }
                        </TableBody>
                    </Table>
                </AppTableContainer>
            </Grid>
            <Grid item xs={12} md={2} sx={{ marginTop: 5 }}>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>

                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={3} sx={{ marginTop: 3 }}>Capniti:</Grid>
                            <Grid item xs={9} sx={{marginTop:1}}>
                                <Switch
                                    checked={props.checkedCapniti?props.checkedCapniti:false}
                                    onChange={props.handleCapnitiChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                </Typography>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>

                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={3} sx={{ marginTop: 3 }}>Tasks:</Grid>
                            <Grid item xs={9} sx={{marginTop:1}}>
                                <Switch
                                    checked={props.checkedTasks?props.checkedTasks:false}
                                    onChange={props.handleTasksChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Typography>
            </Grid>
        </>
    )
}

export default ResourceAllocationMapping;