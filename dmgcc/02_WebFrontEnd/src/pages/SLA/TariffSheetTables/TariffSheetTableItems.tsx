import React from 'react'
import { Autocomplete, Button, FormControl, IconButton, TableCell, TextField } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import UpgradeIcon from '@mui/icons-material/Upgrade';

const TariffSheetTableItems = (props?: any) => {
    const [showAutoCompleteList, setShowAutoComplete] = React.useState(null)
    const onRemoveRow = (getRowKey?: any) => {
        props.tariffSheetListHelpers.remove(getRowKey)
        props.onRemoveData(props.getValueInfo, getRowKey)
    }

    const onChangeMaterialDescription = (getValues?: any, getData?: any, getKeyId?: any) => {
        props.onUpdateTariffSheetData(getValues, getData, getKeyId)
        setShowAutoComplete(null)
    }

    const onClickMaterial = (getKey?: any, getTableData?: any) => {
        setShowAutoComplete(getKey)
        props.OnResTariffSheetMaterial(getTableData)
    }
    return (
        <React.Fragment>
            <TableCell sx={{}}>{props.data.material_description ? props.data.material_description : '-'}</TableCell>
            <TableCell sx={{}}>{props.data.material_code ? props.data.material_code :
                (props.getKey === showAutoCompleteList) &&
                <FormControl variant="outlined" fullWidth margin='dense' >
                    <Autocomplete
                        onChange={(event: any, newValue: any) => {
                            onChangeMaterialDescription(newValue, props.data, props.getKey)

                        }}
                        sx={{ width: 300 }}
                        //   value={MaterialDescriptValues}
                        getOptionLabel={(option: any) => (option && option.description ? `${option.description} - ${option.materialname}` : "")}
                        id='tariff_sheet.material_description'
                        options={props.resTariffSheetMaterial ? props.resTariffSheetMaterial : []}
                        renderInput={(params) => <TextField {...params} label='Material Description' />}
                    />
                </FormControl>}{props.data.material_code ? "" : (props.getKey !== showAutoCompleteList) &&
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined" startIcon={<UpgradeIcon />} type="button" onClick={() => onClickMaterial(props.getKey, props.data)}>Update</Button>}</TableCell>
            <TableCell sx={{}}>{props.data.units ? props.data.units : '-'}</TableCell>
            <TableCell sx={{}}>{props.data.estimated_quantity ? props.data.estimated_quantity : '-'}</TableCell>
            <TableCell sx={{}}>{props.data.rate ? props.data.rate : '-'}</TableCell>
            <TableCell sx={{}}>{props.data.has_markup ? 'True' : 'False'}</TableCell>
            <TableCell sx={{}}>{props.data.has_fx_risk ? 'True' : 'False'}</TableCell>
            <TableCell sx={{}}>{props.data.has_wht ? 'True' : 'False'}</TableCell>
            <TableCell sx={{}}>{props.data.is_taxable ? 'True' : 'False'}</TableCell>
            <TableCell sx={{}}>{props.data.amount ? props.data.amount : '-'}</TableCell>
            <TableCell sx={{}}>
                <IconButton aria-label='delete' disabled={props.disabled}
                    onClick={(event) => {
                        onRemoveRow(props.getKey)
                    }}>
                    <RemoveCircleIcon />
                </IconButton>
            </TableCell>
        </React.Fragment>
    )
}

export default TariffSheetTableItems;