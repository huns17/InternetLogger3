import { Toolbar, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";

const Navbar = () => {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation("main");

  const LanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  // const logoutHandler = () => {
  //   dispatch(usersActions.updateIdToken(""));
  //   dispatch(usersActions.updateIsLoggedIn(false));
  //   dispatch(usersActions.updateUser(""));
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  return (
    <>
      <Box
        sx={{
          backgroundColor:
            "linear-gradient(to left, #3399ff 27%, #9999ff 100%);",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              padding: "10px 0px",
            }}
            component="div"
          >
            <Typography
              variant="body2"
              component="div"
              gutterBottom
              sx={{ color: "white" }}
            >
              InterLogger v3
            </Typography>
            <select
              onChange={LanguageChangeHandler}
              style={{
                color: "white",
                backgroundColor: "#00000000",
                borderColor: "#00000000",
              }}
            >
              <option value="kr">한국어</option>
              <option value="en">English</option>
            </select>
          </Box>
        </Toolbar>
      </Box>
    </>
  );
};

export default Navbar;
