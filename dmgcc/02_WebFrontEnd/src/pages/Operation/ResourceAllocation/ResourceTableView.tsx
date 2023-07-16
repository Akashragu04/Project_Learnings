import React from 'react'
import { Grid, Box, Typography, TextField } from '@mui/material';
import { DataGrid, gridClasses, } from "@mui/x-data-grid";

const ResourceTableView = (props?: any) => {
    return (
        <React.Fragment>
            <Grid item xs={9} sx={{ marginTop: 5 }}>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                    Allocate Resource
                </Typography>
            </Grid>
            <Grid item xs={3} sx={{ marginTop: 5 }}>
                <Box sx={{ marginTop: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Error Factor"
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, max: 3 } }}
                        fullWidth
                        value={props.getErrorFactor}
                        onChange={(event: any) => {
                            props.onErrorFactor(event.target.value)
                        }}
                        type="number" />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={props.classes.root}>
                    {props.getProjectFilterColumns && props.getProjectFilterColumns !== null && props.getResourceAllocationDetails ?

                        <DataGrid
                            autoHeight
                            rowHeight={64}
                            rows={props.getResourceAllocationDetails}
                            columns={props.getProjectFilterColumns}
                            components={{ Toolbar: props.QuickSearchToolbar }}
                            componentsProps={{
                                toolbar: {
                                    value: props.searchText,
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                                        props.requestSearch(event.target.value),
                                    clearSearch: () => props.requestSearch(""),
                                },
                            }}
                            getRowHeight={() => 'auto'}
                           sx={{
                             [`& .${gridClasses.cell}`]: {
                               py: 2,
                             },
                           }}
                            pageSize={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            checkboxSelection={false}
                            disableSelectionOnClick={true}
                            onSortModelChange={props.handleSortModelChange}
                            onPageChange={(paging) => props.generalPaging(paging)}
                            onPageSizeChange={(size) => props.generalPageSizing(size)}
                            onStateChange={(event) => props.generalGridChange(event)}
                        />
                        : null}

                </Box>
            </Grid>
        </React.Fragment>
    )
}

export default ResourceTableView;