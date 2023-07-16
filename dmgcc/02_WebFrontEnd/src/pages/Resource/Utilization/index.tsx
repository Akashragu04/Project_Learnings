import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AppGridContainer from "@crema/core/AppGridContainer";
import { connect } from "react-redux";
import { reqCostCentreList, reqUtilization, reqEmployee } from '../../../saga/Actions/resources.actions';
import { Grid, TableBody, TableHead, Table, Box, Pagination, } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";
import TableUtilizationHead from './Table/TableUtilizationHead';
import TableUtilizationItem from './Table/TableUtilizationItem';
import { RoutePermittedRole } from 'shared/constants/AppConst';

const Utilization = (props?: any) => {
    const [getDep, setDep] = React.useState('')
    const [getMng, setMng] = React.useState('')
    const [getgetCostCentre, setgetCostCentre] = React.useState('')
    const [getEmpDetail, setEmpDetails] = React.useState('')
    const [isPageSize, setPageSize] = React.useState(10)
    const [isPage, setPage] = React.useState(1)

    React.useEffect(() => {
        setPageSize(10)
        setPage(1)
        props.getUtilizationDataList()
        if (RoutePermittedRole.Admin === props.authRole.roles || RoutePermittedRole.AdminBusiness === props.authRole.roles) {
            props.getconstcentreData()
        }
        getUtilization()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUtilization = () => {
        const reqCostCentreData: any = {
            cost_center: '',
            userid: '',
            size: isPageSize,
            page: isPage - 1
        }
        props.getUtilizationDataList(reqCostCentreData)
    }
    // This is a function use to getCostcentreId
    const getCostcentreId = (getCostCentreId?: any) => {
        const reqCostCentreData: any = {
            cost_center: getCostCentreId.cost_center,
            userid: '',
            size: isPageSize,
            page: isPage - 1
        }
        props.getUtilizationDataList(reqCostCentreData)
        props.postEmployee(reqCostCentreData)
        setgetCostCentre(getCostCentreId.cost_center)
        setDep(getCostCentreId.department)
        setMng(getCostCentreId.manager)
    }

    // This is a function use to get Employee
    const getEmpDetails = (getEmpDetails?: any) => {
        const reqEmpDetail: any = {
            cost_center: getgetCostCentre,
            userid: getEmpDetails.id,
            size: isPageSize,
            page: isPage - 1
        }
        setEmpDetails(getEmpDetails.id)
        props.getUtilizationDataList(reqEmpDetail)
    }

    const handleChange = (event, value) => {
        if (value) {
            const reqCostCentreData: any = {
                cost_center: getgetCostCentre,
                userid: getEmpDetail,
                size: isPageSize,
                page: value - 1
            }
            props.getUtilizationDataList(reqCostCentreData)
        }
        setPage(value);

    };

    return (
        <Box >
            <BreadcrumbsData menuList={breadCrumbValues} />
            <AppGridContainer className="marginTop">
                <Grid item xs={12} style={{ marginTop: 0 }}>
                    {
                        RoutePermittedRole.Admin === props.authRole.roles || RoutePermittedRole.AdminBusiness === props.authRole.roles ?
                            <Card variant='outlined' sx={{ marginBottom: 3 }}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ marginTop: 2 }}>
                                                <Autocomplete
                                                    onChange={(event: any, newValue: any) => {
                                                        getCostcentreId(newValue)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option.cost_center : "")}
                                                    onInputChange={(event, newInputValue) => {
                                                    }}
                                                    id='controllable-states-demo'
                                                    options={props.getCostCentreList ? props.getCostCentreList : []}
                                                    sx={{ marginLeft: 2 }}
                                                    renderInput={(params) => <TextField {...params} label='Cost Centre' fullWidth />}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ marginTop: 2 }}>
                                                <TextField id="outlined-basic" label="Department" variant="outlined" value={getDep ? getDep : ''} fullWidth disabled />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ marginTop: 2 }}>
                                                <TextField id="outlined-basic" label="Manager" variant="outlined" value={getMng ? getMng : ''} fullWidth disabled />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ marginTop: 2 }}>
                                                <Autocomplete
                                                    onChange={(event: any, newValue: any) => {
                                                        getEmpDetails(newValue)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? option.emp_name : "")}
                                                    onInputChange={(event, newInputValue) => {
                                                    }}
                                                    id='controllable-states-demo'
                                                    options={props.getEmployeeList ? props.getEmployeeList : []}
                                                    sx={{ marginLeft: 2 }}
                                                    renderInput={(params) => <TextField {...params} label='Employee' fullWidth />}
                                                />
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                            : null
                    }


                    <Card variant='outlined' sx={{ marginBottom: 3 }}>
                        <CardContent>
                            {
                                props.getUtilizationData ?
                                    <Box sx={{ marginTop: 3, width: '100%', padding: 2 }}>
                                        {
                                            props.getUtilizationData && props.getUtilizationData !== null && props.getUtilizationData.content ?
                                                props.getUtilizationData.content.map((data: any, i: any) => {
                                                    return (
                                                        <Box sx={{ marginBottom: 5, boxShadow: "0px 0px 10px 2px #ccc" }} className="autoscroll">
                                                            <AppTableContainer>
                                                                <Table className="table" sx={{ border: '1px solid #ccc' }}>
                                                                    <TableHead>
                                                                        <TableUtilizationHead />
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableUtilizationItem data={data} indexValues={i} key={i} />
                                                                    </TableBody>
                                                                </Table>
                                                            </AppTableContainer>
                                                        </Box>
                                                    )
                                                })

                                                : null
                                        }
                                    </Box>
                                    : <Box>No Record</Box>
                            }
                        </CardContent>
                    </Card>
                    <Box sx={{
                        background: '#ffffff',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: '0px 0px 5px 0px #ccc',
                        marginBottom: 2
                    }}>
                         <Grid container spacing={3}>
                         <Grid item xs={12} md={3}>
                         <Box sx={{fontSize:20}}>Total Utilization: {props.getUtilizationData && props.getUtilizationData.totalElements ? props.getUtilizationData.totalElements : 0}</Box>
                         </Grid>
                         <Grid item xs={12} md={9}>
                         <Box sx={{
                        display: 'flex',
                        justifyContent: 'right',
                    }}>
                         <Pagination count={props.getUtilizationData && props.getUtilizationData.totalPages ? props.getUtilizationData.totalPages : 0} variant="outlined" color="primary" page={isPage}
                            onChange={handleChange} />
                            </Box>
                         </Grid>
                         </Grid>
                    </Box>

                </Grid>
            </AppGridContainer>
        </Box>
    )
}

const breadCrumbValues = {
    title: 'Utilization',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.resourceProcess.loading,
        getCostCentreList: state.resourceProcess.getCostCentreList,
        getUtilizationData: state.resourceProcess.getUtilizationList,
        getEmployeeList: state.resourceProcess.getEmployeeList,
        authRole: state.auth.profileDetails
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getconstcentreData: () => dispatch(reqCostCentreList()),
        getUtilizationDataList: (getCostCenterId?: any) => dispatch(reqUtilization(getCostCenterId)),
        postEmployee: (getCostCenterId?: any) => dispatch(reqEmployee(getCostCenterId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Utilization);
// export default Utilization;
