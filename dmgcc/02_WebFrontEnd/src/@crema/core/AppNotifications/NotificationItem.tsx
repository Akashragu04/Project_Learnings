import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, ListItem, Typography } from "@mui/material";
import { Fonts } from "../../../shared/constants/AppEnums";
import moment from "moment";

const NotificationItem: React.FC<any> = (props) => {

  return (
    <React.Fragment>
    <Box sx={{}} onClick={()=>props.getNotificationsData(props.item)}>
    <ListItem
      sx={{
        padding: "8px 20px",
      }}
      className="item-hover"
      onClick={() => props.onNavigateNotification(props.item)}
    >
      <ListItemAvatar
        sx={{
          minWidth: 0,
          mr: 4,
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
          }}
          alt="Remy Sharp"
          src={props.item.image}
        />
      </ListItemAvatar>
      <Box
        sx={{
          fontSize: 14,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography>
          <Box
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
              mb: 0.5,
              color: (theme) => theme.palette.text.primary,
              mr: 1,
              display: "inline-block",
            }}
          >
            {props.item.send_by}
          </Box>
          {props.item.message}
        </Typography>
        <Typography sx={{ color: (theme) => theme.palette.text.primary, justifyContent: 'flex-end', alignContent: 'flex-end' }} variant='caption' display='block' gutterBottom>
          { moment(props.item.create_date).format('MMMM Do YYYY, h:mm a') }
        </Typography>
      </Box>
    </ListItem>    
    </Box>
    </React.Fragment>
  );
};

export default NotificationItem;
