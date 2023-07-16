import React from 'react'
import AppComponentHeader from "@crema/core/AppComponentHeader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const BreadcrumbsData = (props?: any) => {
  return (
    <>
      {props.menuList && props.menuList !== null ?
        <Grid container>
          <Grid item xs={12} lg={6}>
            <AppComponentHeader
              title={props.menuList.title}
              description={props.menuList.description}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box style={{ display: 'flex', flex: '1', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Box role='presentation' onClick={props.handleClick}>
                <Breadcrumbs aria-label='breadcrumb'>
                  <Link underline='hover' color='inherit' href={props.menuList.homeLink}>
                    {props.menuList.homeTitle}
                  </Link>
                  {
                    props.menuList.subTitle && props.menuList.subTitle !== null ?
                      <Link
                        underline='hover'
                        color='inherit'
                        href={props.menuList.SubUrl}
                      >
                        {props.menuList.subTitle}
                      </Link>
                      : null
                  }
                  <Typography color='text.primary'>{props.menuList.title}</Typography>
                </Breadcrumbs>
              </Box>
            </Box>
          </Grid>
        </Grid>
        : null}
    </>
  )
}

export default BreadcrumbsData;
