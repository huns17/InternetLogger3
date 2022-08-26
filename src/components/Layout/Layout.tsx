import MainNavigation from "./MainNavigation";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MessageIcon from "@mui/icons-material/Message";
import HomeIcon from "@mui/icons-material/Home";
import { usersActions } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DialogUndoingBox from "./DialogUndoingBox";

const Layout = (props: { children: React.ReactFragment }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("main");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const reduxUser: string = useAppSelector((state) => state.user);
  const reduxIsLoggedIn = useAppSelector((state) => state.isLoggedIn);
  const [openBox, setOpenBox] = useState(false);

  const dialogClickHandler = () => {
    setOpenBox(true);
  };

  const dialogCloseHandler = () => {
    setOpenBox(false);
  };

  const actions = [
    reduxIsLoggedIn
      ? { icon: <LogoutIcon />, name: t(`Layout.iconText-logout`) }
      : { icon: <LoginIcon />, name: t(`Layout.iconText-login`) },
    !reduxIsLoggedIn
      ? { icon: <AddToHomeScreenIcon />, name: t(`Layout.iconText-signin`) }
      : null,
    reduxIsLoggedIn
      ? { icon: <VpnKeyIcon />, name: t(`Layout.iconText-changepw`) }
      : null,
    reduxIsLoggedIn
      ? reduxUser === "성재" ||
        reduxUser === "엄마" ||
        reduxUser === "아빠" ||
        reduxUser === "은지"
        ? { icon: <MessageIcon />, name: "메세지 로그" }
        : { icon: <MessageIcon />, name: "Message Log" }
      : null,
    reduxIsLoggedIn
      ? reduxUser === "성재" ||
        reduxUser === "엄마" ||
        reduxUser === "아빠" ||
        reduxUser === "은지"
        ? { icon: <HomeIcon />, name: "홈" }
        : { icon: <HomeIcon />, name: "Home" }
      : null,
    reduxIsLoggedIn
      ? reduxUser === "성재" ||
        reduxUser === "엄마" ||
        reduxUser === "아빠" ||
        reduxUser === "은지"
        ? null
        : { icon: <DateRangeIcon />, name: "Undoing Box" }
      : null,
  ].filter(Boolean);

  const logoutHandler = () => {
    dispatch(usersActions.updateIdToken(""));
    dispatch(usersActions.updateIsLoggedIn(false));
    dispatch(usersActions.updateUser(""));
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  console.log(reduxUser);
  return (
    <div>
      <MainNavigation />
      <Box
        sx={{
          height: 330,
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <main>{props.children}</main>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: "absolute",
            bottom: -200,
            right: 40,
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action?.name}
              icon={action?.icon}
              tooltipTitle={action?.name}
              tooltipOpen
              onClick={() => {
                if (action?.name === "LogIn" || action?.name === "로그인") {
                  navigate("/login");
                } else if (
                  action?.name === "LogOut" ||
                  action?.name === "로그아웃"
                ) {
                  logoutHandler();
                } else if (
                  action?.name === "SingIn" ||
                  action?.name === "가입하기"
                ) {
                  navigate("/signin");
                } else if (
                  action?.name === "Change Password" ||
                  action?.name === "비밀번호 변경"
                ) {
                  navigate("/changepassword");
                } else if (action?.name === "Message Log") {
                  navigate("/msglogen");
                } else if (action?.name === "메세지 로그") {
                  navigate("/msglogkr");
                } else if (action?.name === "Home") {
                  navigate("/hompageen");
                } else if (action?.name === "홈") {
                  navigate("/hompagekr");
                } else if (action?.name === "메세지 로그") {
                  navigate("/hompagekr");
                } else if (action?.name === "Undoing Box") {
                  dialogClickHandler();
                }
                handleClose();
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <DialogUndoingBox open={openBox} close={dialogCloseHandler} />
    </div>
  );
};

export default Layout;
