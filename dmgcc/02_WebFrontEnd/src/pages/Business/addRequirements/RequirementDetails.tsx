import React from 'react'
import {  Table, TableCell, TableRow, Typography } from '@mui/material';
import { AppTableContainer } from '@crema';

const RequirementDetails = (props?: any) => {
    return (
        <React.Fragment>
             <AppTableContainer>
              <Table className="table">
              <TableRow>
              <TableCell className='boardLine'>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                        Project:
                    </Typography>
              </TableCell>
              <TableCell className='boardLine'>
              {props.data?props.data.project_name:'-'}
              </TableCell>
              </TableRow>
              <TableRow>
              <TableCell className='boardLine'>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              Biz. Start Date:
                    </Typography>
              </TableCell>
              <TableCell className='boardLine'>
              {props.data?props.data.business_case_start_date:'-'}
              </TableCell>
              </TableRow>
              <TableRow>
              <TableCell className='boardLine'>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              Biz. End Date:
                    </Typography>
              </TableCell>
              <TableCell className='boardLine'>
              {props.data?props.data.business_case_end_date:'-'}
              </TableCell>
              </TableRow>
              </Table>
              </AppTableContainer>
        </React.Fragment>

    )
}

export default RequirementDetails;