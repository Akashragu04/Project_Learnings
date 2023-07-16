import React from 'react'
import { Grid, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CommonCostCenter = (props?:any) => {
  return (
    <Grid container spacing={3}>
    <Grid item xs={4}>
        <Box sx={{ marginTop: 2 }}>
            <Autocomplete
                onChange={(event: any, newValue: any) => {
                    props.getCostCenterDetails(newValue)
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
    <Grid item xs={4}>
        <Box sx={{ marginTop: 2 }}>
            <TextField id="department" label="Department" variant="outlined" value={props.getDepartmentName ? props.getDepartmentName : ''} fullWidth disabled />
        </Box>
    </Grid>
    <Grid item xs={4}>
        <Box sx={{ marginTop: 2 }}>
            <TextField id="outlined-basic" label="Manager" variant="outlined" value={props.getManagerName ? props.getManagerName : ''} fullWidth disabled />
        </Box>
    </Grid>

</Grid>
  )
}

export default CommonCostCenter;