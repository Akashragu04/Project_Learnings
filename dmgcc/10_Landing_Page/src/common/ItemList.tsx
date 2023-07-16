import React from 'react'
import { Paper, Box } from '@mui/material'

const ItemList = (props: any) => {
    return (
        <Paper sx={{ boxShadow: "none" }}>
            <Box sx={{ textAlign: 'center', background: props.testimonialBgColor, padding: 2, borderRadius: 5 }}>
                <img className="testimonialImage" src={`${props.item.coverImage?props.item.coverImage.supporting_files_url:'.../../../img/unprofiles.jpg'}`} alt='' />
                <Box sx={{ padding: 1 }}>
                    <h4 style={{textTransform:'capitalize'}}>{props.item.customername}</h4>
                </Box>
                <Box >
                    <p>{props.item.description}</p>
                </Box>
            </Box>
        </Paper>
    )
}

export default ItemList;