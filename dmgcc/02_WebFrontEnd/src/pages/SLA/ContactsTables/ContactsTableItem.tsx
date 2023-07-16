import React from 'react'
import { IconButton, TableCell } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ContactsTableItem = (props?: any) => {
    return (
        <React.Fragment>
            <TableCell>{props.data.name}</TableCell>
            <TableCell>{props.data.email}</TableCell>
            <TableCell>{props.data.customer_type}</TableCell>
            <TableCell>{(props.data.primary) ? 'Yes' : 'No'}</TableCell>
            <TableCell>{(props.data.key_person) ? 'Yes' : 'No'}</TableCell>
            <TableCell>{(props.data.is_pre_invoice) ? 'Yes' : 'No'}</TableCell>
            <TableCell>{(props.data.is_sla) ? 'Yes' : 'No'}</TableCell>
            <TableCell>
                <IconButton aria-label='delete' onClick={(event) => props.contactsHelpers.remove(props.getKey)}>
                    <RemoveCircleIcon />
                </IconButton>
            </TableCell>
        </React.Fragment>
    )
}

export default ContactsTableItem;