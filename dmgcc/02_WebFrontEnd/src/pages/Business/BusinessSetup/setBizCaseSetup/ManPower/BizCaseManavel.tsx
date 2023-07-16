import React from 'react'
import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BizCaseForm from './BizCaseForm';
import { connect } from 'react-redux';
import { reqPostJDMappingData, reqPutJDMappingData } from 'saga/Actions';
import { RoutePermittedRole } from 'shared/constants/AppConst';


const BizCaseManavel = (props?: any) => {
    const [showTaleo, setTaleo] = React.useState(false)
    const [getBizCaseValues, setBizCaseValues] = React.useState(null)
    const [getBizCaseTotal, setBizCaseTotal] = React.useState(null)

    const onShowBizCaseForm = (getBizCaseSetupValues?: any, getTotal?: any) => {
        setBizCaseValues(getBizCaseSetupValues)
        setBizCaseTotal(getTotal)
        setTaleo(true)
        props.reqPostJDMappingData(getBizCaseSetupValues)
    }

    React.useEffect(() => {
        if (props.postResJDMapping) {
            if (props.postResJDMapping.status === true) {
                closeTaleo()
            }
        }
    }, [props.postResJDMapping])

    const closeTaleo = () => {
        setTaleo(false)
    }
    
    return (
        <Box>
            {
                showTaleo && props.getJDMappingInternal ?
                    <BizCaseForm showTaleo={showTaleo} closeTaleo={closeTaleo} getBizCaseValues={getBizCaseValues} getBizCaseTotal={getBizCaseTotal} getJDMappingInternal={props.getJDMappingInternal} onSubmit={props.onSubmitInternalJDMappingData} />
                    : null
            }

            <Typography variant={'h4'} sx={{ marginTop: 5, marginLeft: 2 }}>Internal</Typography>
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
                                        {(props.TaleoData?.length) ? props.TaleoData[0].manual_properties.map((manpowerProperty, propertyIndex) => (
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
                                                {manpowerProperty.manual_properties.map((property, propertyKey) => (
                                                    <TableCell key={propertyKey}>
                                                        {property.plan !== "" ? property.plan : 0}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>
                                                    Actual
                                                </TableCell>
                                                {manpowerProperty.manual_properties.map((property, propertyKey) => (
                                                    <React.Fragment key={`${propertyKey}_spanKey`}>
                                                        {property.plan !== "" && parseInt(manpowerProperty.total) !== manpowerProperty.hired_total && RoutePermittedRole.HR === props.profileInfo.roles ? <TableCell sx={{background: property.plan === property.actual?'green':'#f1f1f1', color:property.plan === property.actual?'#fff':''}}>
                                                            <Grid container spacing={3}>
                                                                {/* <Grid item xs={6} md={6}> {property.actual !== ""?property.actual:0}</Grid> */}
                                                                <Grid item xs={12} md={12}>
                                                                    {
                                                                        property.plan === property.actual ? <Box>{property.actual !== "" ? property.actual : ""}</Box> : <React.Fragment>
                                                                            <Box sx={{ display: "flex" }}>
                                                                                <Box sx={{marginRight:2}}>
                                                                                    {property.actual ? property.actual : 0}
                                                                                </Box>
                                                                                <Box className='pointer' onClick={() => onShowBizCaseForm(manpowerProperty, manpowerProperty.total)}><RemoveRedEyeIcon sx={{ fontSize: 16 }} />

                                                                                </Box>
                                                                            </Box>

                                                                        </React.Fragment>
                                                                    }

                                                                </Grid>
                                                            </Grid>
                                                        </TableCell> : <TableCell sx={{background: property.plan === property.actual?'green':'#f1f1f1', color:property.plan === property.actual?'#fff':''}}>{property.actual !== "" ? property.actual : 0}</TableCell>}
                                                    </React.Fragment>
                                                ))}
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



const mapStateToProps = (state: any) => {
    return {
        loading: state.resourceProcess.loading,
        getJDMappingInternal: state.resourceProcess.getJDMappingInternal,
        postResJDMapping: state.resourceProcess.postResJDMapping,
        profileInfo: state.auth.profileDetails,
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        reqPostJDMappingData: (getBizId?: any) => dispatch(reqPostJDMappingData(getBizId)),
        reqPutJDMappingData: (getBizId?: any) => dispatch(reqPutJDMappingData(getBizId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BizCaseManavel)
// export default BizCaseManavel;