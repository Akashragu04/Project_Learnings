import React from "react";
// import orange from "@mui/material/colors/orange";
import { useAuthMethod, useAuthUser } from "../../../../utility/AuthHooks";
import { Box, ListItemIcon, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { useNavigate } from "react-router-dom";
import { AppState } from '../../../../../saga/store';
import { useSelector } from "react-redux";
// import { AppState } from "../../../saga/store";
import { useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CommonStore from '@crema/services/commonstore';
import { RoutePermittedRole } from "shared/constants/AppConst";
import { toast } from "react-toastify";

interface UserInfoProps {
  color?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ color = "text.secondary" }) => {
  const userRole = CommonStore().userRoleType;
  const { logout } = useAuthMethod();
  const theme = useTheme();
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const authData: any = useSelector<AppState, AppState["auth"]>(
    ({ auth }) => auth
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (authData.profileDetails.username && user && user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (authData.profileDetails.email && user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };
React.useEffect(()=>{
if(authData && authData.resTokenError === true){
  logout()
  toast.warning("Session Timeout", {position: 'bottom-right'});
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[authData])
  return (
    <>
      {authData.profileDetails ?
        <Box
          onClick={handleClick}
          sx={{
            py: 3,
            px: 3,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          className="user-info-view"
        >
          <Box sx={{ py: 0.5 }}>
            {authData.profileDetails.username ? (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 24,
                  backgroundColor: theme.palette.primary.main,
                }}
              // src={user.photoURL}
              />
            ) : (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 24,
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                {getUserAvatar()}
              </Avatar>
            )}
          </Box>
          <Box
            sx={{
              width: { xs: "calc(100% - 62px)", xl: "calc(100% - 72px)" },
              ml: 4,
              color: color,
            }}
            className="user-info"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  mb: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 16,
                  fontWeight: Fonts.MEDIUM,
                  color: theme.palette.primary.main,
                  textTransform: "uppercase"
                }}
                component="span"
              >
                {authData.profileDetails.username ? authData.profileDetails.username : "Admin User "}
              </Box>
              <Box
                sx={{
                  ml: 3,
                  color: "inherit",
                  display: "flex",
                }}
              >
                <ExpandMoreIcon />
              </Box>
            </Box>
            <Box
              sx={{
                mt: -0.5,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "inherit",
              }}
            >
              {authData.profileDetails.designation ? authData.profileDetails.designation : "Customer"}
            </Box>
          </Box>
        </Box>
        : null}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/my-account");
          }}
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>My account</ListItemText>
        </MenuItem>
        {(userRole === RoutePermittedRole.Admin) && <MenuItem
          onClick={() => {
            handleClose();
            navigate("/settings");
          }}
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          <ListItemIcon>
            <SettingsIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>}
        <MenuItem
          onClick={logout}
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;
