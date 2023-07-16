import React from 'react'
import { Box } from '@mui/material'

const ItemList = (props: any) => {
    return (
            <Box sx={{ textAlign: 'center', background: props.testimonialBgColor, padding: 2, borderRadius: 5 }}>
                <img className="testimonialImage" src={`${props.item.coverImage?props.item.coverImage.supporting_files_url:'.../../../img/unprofiles.jpg'}`} alt='' />
                <Box sx={{ padding: 1 }}>
                    <h5 style={{textTransform:'capitalize', marginTop:4}}>{props.item.customername}</h5>
                </Box>
                <Box >
                    <p>{props.item.description}</p>
                </Box>
            </Box>
    )
}

export default ItemList;