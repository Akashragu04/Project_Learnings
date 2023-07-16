import React from "react";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import AppScrollbar from "@crema/core/AppScrollbar";
import IntlMessages from "@crema/utility/IntlMessages";
import NotificationItem from "./NotificationItem";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

// interface AppNotificationContentProps {
//   onClose: () => void;
//   sxStyle: SxProps<Theme>;
//   items: any;
//   onRemove: () => void;
// }

const AppNotificationContent: React.FC<any> = (props?: any) => {
  const navigate = useNavigate();

  //This is function used to open notification and remove notification call services
const getNotificationsData = (getValues:any) =>{
  if(getValues){    
    navigate(getValues.url)
    props.removeNotification(getValues)
    props.onClose()
  }
}
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 320,
        height: "100%",
        ...props.sxStyle,
      }}
    >
      <Box
        sx={{
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderBottomColor: (theme) => theme.palette.divider,
          minHeight: { xs: 56, sm: 70 },
        }}
      >
        <Typography component="h3">
          <IntlMessages id="common.notifications" />({props.items.length})
        </Typography>
        <IconButton
          sx={{
            height: 40,
            width: 40,
            marginLeft: "auto",
            color: "text.secondary",
          }}
          onClick={props.onClose}
          size="large"
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <AppScrollbar
        sx={{
          height: { xs: "calc(100% - 96px)", sm: "calc(100% - 110px)" },
        }}
      >
        <List sx={{ py: 0 }}>
          {(props.items && props.items.length !== 0) && props.items.map((item, index) => (
            <Box
              sx={{
                padding: "2px 5px",
                display: "flex",
                alignItems: "center",
                borderBottom:'1px solid #ccc'
              }} key={index}>
           
              <NotificationItem key={item.id} item={item} onNavigateNotification={(event)=>props.onNavigateNotification(event)} getNotificationsData={getNotificationsData}/>
             
              <IconButton
                sx={{
                  width: 20,
                  marginLeft: "auto",
                  color: "text.secondary",
                }}
                onClick={() => props.removeNotification(item)}
                size="large"
              >
                <CancelOutlinedIcon />
              </IconButton>
             
            </Box>
          ))}
        </List>
      </AppScrollbar>
      {/* <Button
        sx={{
          borderRadius: 0,
          width: "100%",
          textTransform: "capitalize",
          marginTop: "auto",
          height: 40,
        }}
        variant="contained"
        color="primary"
      >
        <IntlMessages id="common.viewAll" />
      </Button> */}
    </Box>
  );
};

export default AppNotificationContent;
