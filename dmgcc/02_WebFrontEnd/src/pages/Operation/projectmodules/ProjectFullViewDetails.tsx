import { Dialog, AppBar, Toolbar, Typography, IconButton, Slide, Grid, Box } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Overview from '../overview/Overview';
import SlaViewGrid from '../overview/SlaViewGrid';

const Transition: any = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectFullViewDetails = (props: any) => {
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={props.show}
                onClose={props.onClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                            Project Details
                        </Typography>

                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={props.onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ padding: 5 }}>
                    <Grid item xs={12} style={{ marginTop: 0 }}>
                        {props.getProjectOverview && props.getProjectOverview.project_details ?
                            <Overview showProjectDetails={props.show} data={props.getProjectOverview}
                                getProjectOverview={props.getProjectOverview.project_details} />
                            : null}

                    </Grid>
                    {props.getProjectOverview && props.getProjectOverview.list_of_sla ?
                        <SlaViewGrid showProjectDetails={props.show} getProjectOverview={props.getProjectOverview.list_of_sla}
                            closeProjectFilterData={props.onClose} />
                        : null}
                </Box>

            </Dialog>
        </React.Fragment>
    )
}

export default ProjectFullViewDetails