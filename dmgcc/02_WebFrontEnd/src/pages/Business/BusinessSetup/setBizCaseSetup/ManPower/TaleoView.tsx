import React from 'react'
import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TaleoView = (props?:any) => {
    
  return (
    <Box>
         <Typography variant={'h4'} sx={{marginTop:4, marginLeft:2}}>Taleo</Typography>
    <Paper sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 4, marginBottom: 4 }}>
        <Grid item xs={12} md={12}>
            <Box style={{ width: '100%' }}>
                {props.TaleoData && <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                            <TableRow>
                                <TableCell sx={{
                                    color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: 0, backgroundColor: '#00677F'
                                }}>Level</TableCell>
                                <TableCell sx={{
                                    color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#00677F'
                                }}>Total</TableCell>
                                 <TableCell sx={{
                                    color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#00677F'
                                }}>Active</TableCell>
                                {(props.TaleoData?.length) ? props.TaleoData[0].taleo_properties.map((manpowerProperty, propertyIndex) => (
                                    <React.Fragment key={propertyIndex}>
                                        {/* {(bizYear && (rampupProperty.year === bizYear)) ?  */}
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>{manpowerProperty.month}</TableCell>
                                        {/* : null} */}
                                    </React.Fragment>
                                )) : null}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.TaleoData.map((manpowerProperty, propertyIndex) => (
                                <React.Fragment key={propertyIndex}>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}
                                            rowSpan={2}>
                                            {manpowerProperty.level}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}
                                            rowSpan={2}>
                                            {manpowerProperty.total}
                                        </TableCell>
                                        <TableCell>
                                        Plan
                                        </TableCell>
                                        {manpowerProperty.taleo_properties.map((property, propertyKey) => (
                                            <TableCell key={propertyKey} sx={{background:property.status_color}}>
                                                <Box sx={{color:property.status_color === 'Green'?'#ffffff':'#000000'}}>{property.plan !== ""?property.plan:0}</Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                         <TableCell>
                                         Actual
                                        </TableCell>
                                        {manpowerProperty.taleo_properties.map((property, propertyKey) => {
                                       return (
                                            <React.Fragment key={`${propertyKey}_spanKey`}>
                                                {property.actual ? <TableCell sx={{background:property.status_color}}>
                                                    {property.actual !== ""?property.actual:0}
                                                </TableCell> : <TableCell>0</TableCell>}
                                            </React.Fragment>
                                        )}
                                        )}
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Box>
        </Grid>
    </Paper>
</Box>
  )
}

export default TaleoView;