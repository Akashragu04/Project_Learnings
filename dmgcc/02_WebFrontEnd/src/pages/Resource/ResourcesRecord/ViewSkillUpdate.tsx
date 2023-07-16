import React from 'react'
import UpdateSkillData from './UpdateSkillData'
import { Box, FormControl, FormControlLabel, FormGroup, Grid, Stack, Switch, Typography } from '@mui/material';
import { Fonts } from "shared/constants/AppEnums";
import AppDialog from "@crema/core/AppDialog";
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const ViewSkillUpdate = (props?: any) => {
  const [getInitilData, setInitilData] = React.useState<any>(null)
  const [getBenchResource, setBenchResource] = React.useState(false)

  React.useEffect(() => {
    onGetIntilValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeResourcesStatus = () => {
    setBenchResource(!getBenchResource)
  }

  const onGetIntilValues = () => {
    let initialValues: any = {
      primaryskill: props.getResourceSkill.primaryskill ? props.getResourceSkill.primaryskill : '',
      secondary: props.getResourceSkill.secondary ? props.getResourceSkill.secondary : [{ secondaryskill: "" }],
      bench_resource: getBenchResource
    };
    setBenchResource(props.getResourceSkill.bench_resource ? props.getResourceSkill.bench_resource : false)
    setInitilData(initialValues)
  }
  const onSubmitUpdateSkill = (postEmpSkill?: any) => {
    let initialValues: any = {
      emp_id: postEmpSkill.emp_id,
      update_skill: {
        primaryskill: postEmpSkill.update_skill.primaryskill,
        secondary: postEmpSkill.update_skill.secondary,
        bench_resource: getBenchResource
      }
    };
    props.postResourceSkill(initialValues)
  }
  return (
    <AppDialog
      sxStyle={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: 800,
          width: "100%",
          height: "auto"
        },
        "& .MuiTypography-h6": {
          fontWeight: Fonts.SEMI_BOLD,
          backgroundColor: "#00677F",
          color: "#ffffff"
        },
      }}
      dividers
      open={props.showSkillUpdate}
      onClose={props.handleSkillUpdateClose}
      title={"Update Skills"}
    >
      <Box sx={{ marginTop: 1 }}>
        {
          RoutePermittedRole.HR === props.useProfile.roles ?
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
              <Grid item xs={12} md={5} sx={{ marginBottom: 4 }} >
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Typography sx={{ mr: 2 }} >On Board</Typography>
                  <FormControl component='fieldset' variant='standard'>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={getBenchResource}
                            onChange={onChangeResourcesStatus}
                            name='captinityleave'
                          />
                        }
                        label='Bench Resource'
                      />
                    </FormGroup>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={7}></Grid>
            </Grid>

            : null
        }

        {
          getInitilData ?
            <UpdateSkillData handleSkillUpdateClose={props.handleSkillUpdateClose} 
            getEmployeeInfo={props.getEmployeeInfo} initialValues={getInitilData} postResourceSkill={onSubmitUpdateSkill} />
            : null
        }
      </Box>
    </AppDialog>
  )
}

export default ViewSkillUpdate;