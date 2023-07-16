import React, { useState } from "react";
import { Badge, IconButton, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppNotificationContent from "./AppNotificationContent";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppTooltip from "../AppTooltip";
import { alpha } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import NotificationSockJsClient from "../thirdParty/notificationsocketjsclient/client";
import CommonStore from '@crema/services/commonstore';
import { connect } from "react-redux";
import { removePushNotificationAction, resetPushNotificationAction } from "saga/Actions";

interface AppNotificationsProps {
  drawerPosition?: "left" | "top" | "right" | "bottom";
  tooltipPosition?:
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";
  isMenu?: boolean;
  sxNotificationContentStyle?: SxProps<Theme>;
}

// {
//   drawerPosition = "right",
//   tooltipPosition = "bottom",
//   isMenu = false,
//   sxNotificationContentStyle = {},
// }

const AppNotifications: React.FC<AppNotificationsProps> = (props?: any) => {
  const userInfo = CommonStore().profileDetails
  const [showNotification, setShowNotification] = useState(false);
  const [notificationResponse, setNotificationResponse] = useState([]);
  const [notificationId, setNotificationId] = useState(null);

  const { notificationResponseData }: any = props;


  React.useEffect(() => {
    props.initPushNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (notificationResponseData && notificationResponseData.status) {
      reFilterPushNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationResponseData])


  const removeNotification = (item: any) => {
    if (item.id) {
      setNotificationId(item.id);
      props.removePushNotification({ notification_id: item.id })
    }
  }

  const reFilterPushNotification = () => {
    const notificationResponseList = notificationResponse;
    const indexOfNotificationItem = notificationResponseList.findIndex((data: any) => {
      return data.id === notificationId;
    });

    notificationResponseList.splice(indexOfNotificationItem, 1);
    setNotificationResponse(notificationResponseList);
    props.initPushNotifications();
  }

  const onNavigateNotification = (data: any) => {
    // Code for the navigation
    // navigate('/business/leads-monitoring')
  }
  // console.log(notificationResponse, 'notificationResponse...')

  return (
    <>
      {props.isMenu ? (
        <Box component="span" onClick={() => setShowNotification(true)}>
          Notifications
        </Box>
      ) : (
        <AppTooltip title="Notification" placement={props.tooltipPosition}>
          <Badge badgeContent={(notificationResponse && notificationResponse.length) ? notificationResponse.length : 0} color='primary'>
            <IconButton
              className="icon-btn"
              sx={{
                borderRadius: "50%",
                width: 40,
                height: 40,
                color: (theme) => theme.palette.primary.main,
                backgroundColor: (theme) => theme.palette.background.default,
                border: 1,
                borderColor: "transparent",
                "&:hover, &:focus": {
                  color: (theme) => theme.palette.text.primary,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.background.default, 0.9),
                  borderColor: (theme) =>
                    alpha(theme.palette.text.secondary, 0.25),
                },
              }}
              onClick={() => setShowNotification(true)}
              size="large"
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Badge>
        </AppTooltip>
      )
      }
      <React.Fragment>

        <NotificationSockJsClient
          url={`${process.env.REACT_APP_API_URL}api/G3C_Notification`}
          topics={[`/users/${userInfo?.shortid}/messages`]}
          onConnect={() => {
          }}
          onDisconnect={() => {
          }}
          onMessage={(msg) => {
            if (msg) {
              setNotificationResponse(msg);
            } else {
              setNotificationResponse([]);
            }
          }}
          ref={(client: any) => {
          }} />

        <Drawer
          anchor={props.drawerPosition}
          open={showNotification}
          onClose={() => setShowNotification(false)}
        >
          <AppNotificationContent
            sxStyle={props.sxNotificationContentStyle}
            onClose={() => setShowNotification(false)}
            items={notificationResponse}
            removeNotification={(event) => removeNotification(event)}
            onNavigateNotification={(event) => onNavigateNotification(event)}
          />
        </Drawer>
      </React.Fragment>
    </>
  );
};


const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.errors,
  notificationResponseData: state.auth.removeNotificationResponse,
})

const mapDispatchToProps = (dispatch: any) => ({
  initPushNotifications: () => {
    dispatch(resetPushNotificationAction())
  },
  removePushNotification: (data) => {
    dispatch(removePushNotificationAction(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNotifications);
