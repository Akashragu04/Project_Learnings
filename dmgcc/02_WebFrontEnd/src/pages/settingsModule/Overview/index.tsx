import React from "react";
import { AppAnimate, AppComponentHeader, AppGridContainer } from "@crema";
import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import RoleManagementGrid from "../RoleManagement";
import ProjectOwnershipGrid from "../ProjectOwnership";

const Overview = () => {

    const navigate = useNavigate();
    
    const toAssignRole = () => {
        navigate("/settings/createRoles", { state: { action: 'create' } });
    }

    return (
        <>
            <AppComponentHeader
                title="User Management"
                description=""
            />
            <AppAnimate animation="transition.fadeIn" delay={200}>
                <AppGridContainer>
                    <Grid item xs={12}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2} >
                                    <Grid item xs={6}>
                                        <Typography sx={{ mt: 3 }} variant='h4' component='div'>
                                            Role Management
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{ textAlign: 'end' }}>
                                        <ButtonGroup variant='outlined' aria-label='outlined button group'>
                                            <Button onClick={toAssignRole}>Assign Role</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>                              

                                <Box>
                                    <RoleManagementGrid />
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2} >
                                    <Grid item xs={6}>
                                        <Typography sx={{ mt: 3 }} variant='h4' component='div'>
                                            Project Owner
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{ textAlign: 'end' }}>                                       
                                    </Grid>
                                </Grid>
                                <Box>
                                    <ProjectOwnershipGrid />
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                    
                </AppGridContainer>
            </AppAnimate>
        </>
    );
};

export default Overview;