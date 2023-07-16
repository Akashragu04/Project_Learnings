import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';
import ResourceAllocationMapping from './ResourceAllocationMapping';
import ResourceTableView from './ResourceTableView';
import { useMemo, useRef } from "react";
import { reqPostChangeCapnitiTask, reqResourceDetails } from '../../../saga/Actions';
import { appConstants } from 'shared/constants/AppConst';
import ViewResourceDetails from 'pages/Resource/ResourcesRecord/ViewResourceDetails';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';
// import { formValidationPatten } from 'services/Constants';
// import  {onShowEmployeelDetails}  from './CommonFunction';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

const ResourceMapping = (props?: any) => {    
    const apiRef: any = useRef(null);
    // const { apiRef, columns } = useApiRef();
    const { getResourceAllocationDetails, getSLAListDetails } = props;
    const classes = useStyles();
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [checkedCapniti, setCheckedCapniti] = React.useState(false);
    const [checkedTasks, setCheckedTasks] = React.useState(false);
    const [getSLAName, setSLAName] = React.useState('');
    const [setSLAId, setsetSLADetails] = React.useState('')
    const [TableHeaderItems, setTableHeaderItems] = React.useState<any>([])
    const [showResourceDetails, setShowResourceDetails] = React.useState(false)
    const [getErrorFactor, setErrorFactor] = React.useState('')
    const [getResourceAllocationData, setResourceAllocationData] = React.useState([])
    // const [getErrorMessage, setErrorMessage] = React.useState({ helperText: '', error: false })
const {getResourceDetails} = props;

// const onChangeText = (event:any) => {
//     if (event.target.value.length > 2) {
//         setErrorMessage({ helperText: '', error: false });
//     } else {
//         setErrorMessage({ helperText: 'Invalid format', error: true });
//     }
//   }

    React.useEffect(()=>{
        const getRoleBased: any = [
            {
                field: 'shortid',
                headerName: 'Short Id',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 230,
                roleTypes: "common",
                renderCell: (params) => {
                    return (
                        <Box sx={{cursor:"pointer"}} onClick={()=>onShowEmployeelDetails(params.row)}>{params.row.shortid}</Box>
                    )
                }
            },
            {
                field: 'emp_name',
                headerName: 'Available Resource',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 250,
                roleTypes: "common"
            },
            {
                field: 'capacity',
                headerName: 'Available Capacity',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 250,
                sortable: false,
                renderCell: (params) => {
                    let availableCapacity: any = 0;
                    availableCapacity = 100 - params.row.capacity;
                    return (
                        <>
                            {/* {
                            availableCapacity?
                            <CircularProgressResource value={params.row.capacity} availableResources={availableCapacity}/>
                            :null
                        } */}
                            {availableCapacity ? `${availableCapacity}%` : `-`}
                        </>
                    );
                }
            },
            {
                field: 'level',
                headerName: 'Level',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 250,
                roleTypes: "common",
            },
            {
                field: 'allocate_capacity',
                headerName: 'Allocate Capacity ( % )',
                headerClassName: appConstants.dataGridAppDataHeader,
                disableClickEventBubbling: true,
                sortable: false,
                disableColumnMenu: true,
                width: 450,
                roleTypes: "common",
                renderCell: (params) => {
                    return <TextField fullWidth onChange={(e) =>
                        params.api.updateRows([{ ...params.row, allocate_capacity: e.target.value }])
                    } label="Allocate Capacity ( % )" inputProps={{ pattern: "[a-z]" }} />;
                }
            }
        
        ]
        setTableHeaderItems(getRoleBased)
        if(props.getResourceAllocationDetails && props.getResourceAllocationDetails.availableResource){
            setResourceAllocationData(props.getResourceAllocationDetails.availableResource)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.getResourceAllocationDetails])

    
    const onShowEmployeelDetails = (getResourceData?:any) =>{
        if(getResourceData){
            props.reqResourceDetailData(getResourceData.id)            
        }
        setShowResourceDetails(true)
        }
        const handleResourceClose = () =>{
            setShowResourceDetails(false)
        }

    const generalPageSizing = (showPageNo) => {
        setPageSize(showPageNo)
    }

 
    const requestSearch = (searchValue: string) => {
        if(searchValue && searchValue !=="" &&  props.getResourceAllocationDetails && props.getResourceAllocationDetails.availableResource){
          setSearchText(searchValue);
          const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
          const filteredRows = props.getResourceAllocationDetails.availableResource.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
      
              return searchRegex.test(row[field] ? row[field].toString() : "");
            });
          });
          setResourceAllocationData(filteredRows);
        }else{
          setSearchText("");    
          setResourceAllocationData(props.getResourceAllocationDetails && props.getResourceAllocationDetails.availableResource?props.getResourceAllocationDetails.availableResource:[]);
        }
      };

    const handleSortModelChange = (sortField) => {

    }

    const generalPaging = (paging) => {
    }

    const generalGridChange = (event) => {
    }
    const columns = useMemo(
        () =>
        TableHeaderItems.concat({
                field: "",
                width: 0,
                options: {
                    display: "none"
                },
                renderCell: (params) => {
                    apiRef.current = params.api;
                    return null;
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [TableHeaderItems]
    );

    const handleClickButton = () => {
        const getResourceAllocate: any = apiRef?.current.getRowModels()
        const filterAllocateCapacity: any = [];
        if (getResourceAllocate) {
            getResourceAllocate.forEach((items: any, index: any) => {
                if (items.allocate_capacity !== null) {
                    const postValues: any = {
                        "hrid": items.hrid,
                        "userid": items.id,
                        "resource_name": items.emp_name,
                        "resource_email": items.email,
                        "resource_shortid": items.shortid,
                        "capcity": items.allocate_capacity,
                        "level": items.level
                    }
                    filterAllocateCapacity.push(postValues)
                }
            })
            if (filterAllocateCapacity.length) {
                const resourceAllocationData: any = {
                    "project_id": props.resourceData ? props.resourceData.id : '',
                    "sla_id": setSLAId,
                    "capniti_enable": checkedCapniti,
                    "task_enable": checkedTasks,
                    "resourceMapping": filterAllocateCapacity
                }
                props.postResourceAllocationData(resourceAllocationData)
                // props.closeResourceMapping()
            }
            // setTimeout(() => {
            //     props.getResourceAllocationData(setSLAId)
            // }, 1000);
        }
    };

    const handleCapnitiChange = () => {
        if (checkedCapniti === true) {
            setCheckedCapniti(false)
            capnitiChangeupdateStatus(false)
        } else {
            setCheckedCapniti(true)
            capnitiChangeupdateStatus(true)
        }
    }

    const onErrorFactor = (getErrorFactorValues?:any) =>{
        const postValues: any = {
            "capniti_enable": checkedCapniti,
            "task_enable": checkedTasks,
            "slaid": setSLAId,
            "error_factor":getErrorFactorValues
        }
        setErrorFactor(getErrorFactorValues)
        props.reqChangeCapnitiTaskData(postValues)
        setTimeout(() => {
            props.getResourceAllocationData(setSLAId)
        }, 1000);
    }
    const handleTasksChange = () => {
        if (checkedTasks === true) {
            setCheckedTasks(false)
            tasksChangeupdateStatus(false)
        } else {
            setCheckedTasks(true)
            tasksChangeupdateStatus(true)
        }
    }

    const tasksChangeupdateStatus = (getValues?:any) => {
        const postValues: any = {
            "capniti_enable": checkedCapniti,
            "task_enable": getValues,
            "slaid": setSLAId,
            "error_factor":getErrorFactor
        }
        props.reqChangeCapnitiTaskData(postValues)
        setTimeout(() => {
            props.getResourceAllocationData(setSLAId)
        }, 1000);
    }

    const capnitiChangeupdateStatus = (getValues?:any) => {
        const postValues: any = {
            "capniti_enable": getValues,
            "task_enable": checkedTasks,
            "slaid": setSLAId,
            "error_factor":getErrorFactor
        }
        props.reqChangeCapnitiTaskData(postValues)
        // setTimeout(() => {
        //     props.getResourceAllocationData(setSLAId)
        // }, 1000);
    }

    const getLeadsConversion = (getEvent?: any, getSLADetails?: any) => {
        if(getSLADetails){
            setSLAName(getSLADetails.slaname)
            setsetSLADetails(getSLADetails.id)
            setCheckedTasks(getSLADetails.taskenable ? getSLADetails.taskenable : false)
            setCheckedCapniti(getSLADetails.capnitienable ? getSLADetails.capnitienable : false)
            setErrorFactor(getSLADetails.idle_hours ? getSLADetails.idle_hours : 0)
            props.getResourceAllocationData(getSLADetails.id)
        }        
    }

    return (
        <Dialog
            fullScreen
            open={props.show}
            onClose={props.closeResourceMapping}
        // TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                        Resource Allocation
                    </Typography>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={props.closeResourceMapping}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>     
            {
       getResourceDetails && showResourceDetails?
       <ViewResourceDetails showResourceDetails={showResourceDetails} handleResourceClose={((e)=>handleResourceClose())} resourceInfo={props.getResourceDetails}/>
       :null
     }
            <Box sx={{ marginTop: 5, padding: 5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ marginTop: 2 }}>
                            <TextField id="outlined-basic" label="Project Code" variant="outlined" 
                            value={props.resourceData ? props.resourceData.project_id : ''} fullWidth disabled />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ marginTop: 2 }}>
                            <TextField id="outlined-basic" label="Project Name" variant="outlined" 
                            value={props.resourceData ? props.resourceData.project_name : ''} fullWidth disabled />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ marginTop: 2 }}>
                            <Autocomplete
                                onChange={(event: any, newValue: any) => {
                                    getLeadsConversion(event, newValue)
                                }}
                                getOptionLabel={(option: any) => (option ? option.slaid : "")}
                                onInputChange={(event, newInputValue) => {
                                }}
                                id='controllable-states-demo'
                                options={getSLAListDetails}
                                renderInput={(params) => <TextField {...params} label='SLA Id' fullWidth />}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField sx={{ marginTop: 2 }} id="outlined-basic" label="SLA Name" 
                        variant="outlined" value={getSLAName !== null ? getSLAName : ''} 
                        fullWidth disabled />
                    </Grid>
                </Grid>
                {/* This is part after filter sla is show table and grid */}

                <Grid container spacing={3}>
                    {
                        props.getResourceAllocationDetails && columns ?
                            <>
                                <ResourceAllocationMapping handleTasksChange={handleTasksChange} handleCapnitiChange={handleCapnitiChange}
                                    checkedCapniti={checkedCapniti} checkedTasks={checkedTasks} resourceAllowcation={props.resourceAllowcation} 
                                    resourceData={props.resourceData} getSLAListDetails={getSLAListDetails} 
                                    getResourceAllocationDetails={getResourceAllocationDetails}/>
                                <ResourceTableView getProjectFilterColumns={columns} pageSize={pageSize} searchText={searchText} 
                                classes={classes} generalPageSizing={generalPageSizing} requestSearch={requestSearch} handleSortModelChange={handleSortModelChange} 
                                generalPaging={generalPaging} generalGridChange={generalGridChange} QuickSearchToolbar={QuickSearchToolbar} 
                                getResourceAllocationDetails={getResourceAllocationData?getResourceAllocationData:[]} onErrorFactor={onErrorFactor} getErrorFactor={getErrorFactor}/>
                                <Grid item xs={12} sx={{ marginTop: 5 }} className="hideoption">
                                    <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                            color="primary" type="submit" onClick={handleClickButton}> Save
                                        </Button>
                                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                                            color="primary" type="button" onClick={handleClickButton}>Save &amp; Notify
                                        </Button>
                                    </Box>
                                </Grid>

                            </>

                            : null
                    }
                </Grid>
            </Box>
        </Dialog>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.operationProcess.loading,
        getSLAListDetails: state.operationProcess.getSLAList,
        getResourceAllocationDetails: state.operationProcess.getResourceAllocation,
        getResourceDetails:state.resourceProcess.getResourceDetails,
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getResourceAllocationData: (getResourceId?: any) => dispatch({ type: OperationActionTypes.GET_RESOURCE_ALLOCATION_REQUEST, value: getResourceId }),
        postResourceAllocationData: (postResourceAllocation?: any) => dispatch({ type: OperationActionTypes.POST_RESOURCE_ALLOCATION_REQUEST, value: postResourceAllocation }),
        reqChangeCapnitiTaskData: (postResourceAllocation?: any) => dispatch(reqPostChangeCapnitiTask(postResourceAllocation)),
        reqResourceDetailData: (getResourceId?:any) => dispatch(reqResourceDetails(getResourceId)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceMapping);
// export default ResourceMapping;