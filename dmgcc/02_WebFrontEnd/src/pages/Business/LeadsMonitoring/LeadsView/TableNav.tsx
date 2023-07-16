import React from 'react'
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Chip, Stack } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

const generalCommonAction = (getValues: any) => {
  return getValues;
}
const setCommonAssignEnable = (getValues: any) => {
  return getValues;
}
const TableNav = () => {
  const navigate = useNavigate();

  const leadFilterColumnsList: any = [
    // { field: 'id', headerName: 'Lead Id', headerClassName: 'app-data-grid--header', width: 90, filterable: false },
    {
      field: 'service_receiver_entity',
      headerName: 'Entity',
      headerClassName: appConstants.dataGridAppDataHeader,
      width: 250,
      roleTypes: "common"
    },
    {
      field: 'service_receiver_contact_name',
      headerName: 'Customer Name',
      headerClassName: appConstants.dataGridAppDataHeader,
      width: 250,
      roleTypes: "common"
    },
    {
      field: 'project_name',
      headerName: 'Project Name',
      headerClassName: appConstants.dataGridAppDataHeader,
      width: 250,
      roleTypes: "common"
    },
    {
      field: 'requirement',
      headerName: 'Requirement',
      headerClassName: appConstants.dataGridAppDataHeader,
      width: 160,
      sortable: false,
      roleTypes: RoutePermittedRole.Business,
      renderCell: (params) => {
        const onViewRequirementClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
        };
        const onAddRequirementClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate('/business/business-request')
        };
        return params.row.isAssigned ? <Button color={'inherit'} size={'small'} variant={'contained'} onClick={() => onViewRequirementClick}>View Requirement</Button> : <Button color={'primary'} size={'small'} variant={'contained'} onClick={onAddRequirementClick}>Add Requirement</Button>;
      }
    },
    {
      field: 'responsible',
      headerName: 'Responsible',
      headerClassName: appConstants.dataGridAppDataHeader,
      width: 200,
      sortable: false,
      roleTypes: RoutePermittedRole.Business,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setCommonAssignEnable(true);
        };
        // return <Button color={'primary'} size={'small'} variant={'outlined'} onClick={onClick}>Approve</Button>;
        return params.row.isasign ? <span color={'success'}>{params.row.service_provider_department}</span> : <Button color={'primary'} size={'small'} variant={'outlined'} onClick={onClick}>Assign</Button>;
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: appConstants.dataGridAppDataHeader,
      width: 200,
      sortable: false,
      roleTypes: RoutePermittedRole.Business,
      renderCell: (params) => {
        let statusIcon: any = <AutorenewIcon />;
        let statusColor: any = 'primary';
        if (params.row.status === 'Business Approved') {
          statusIcon = <CheckIcon />;
          statusColor = 'success';
        } else if (params.row.status === 'In Process') {
          statusIcon = <AutorenewIcon />;
          statusColor = 'default';
        } else {
          statusIcon = <AutorenewIcon />;
          statusColor = 'primary';
        }
        return <Stack direction='column' spacing={1}>
          {params.row.status === 'Pending' ?
            <>
              <Chip icon={statusIcon} color={statusColor} label={params.row.status} variant='outlined' size='small' />
            </>
            :
            <>
              <Chip icon={statusIcon} color={statusColor} label={params.row.status} variant='outlined' size='small' />
            </>
          }
        </Stack>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: appConstants.dataGridAppDataHeader,
      type: 'actions',
      roleTypes: RoutePermittedRole.Customer,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon color={'primary'} />}
          label='Toggle Admin'
          onClick={() => generalCommonAction(params.id)}
        />,
      ]
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: appConstants.dataGridAppDataHeader,
      type: 'actions',
      roleTypes: RoutePermittedRole.Business,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon color={'primary'} />}
          label='Toggle Admin'
          onClick={() => generalCommonAction(params.id)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<VisibilityIcon color={'primary'} />}
          label='Duplicate User'
          onClick={() => generalCommonAction(params.id)}
        />,
      ]
    }
  ];

  return ({ leadFilterColumnsList, generalCommonAction, setCommonAssignEnable })
}


export default TableNav;