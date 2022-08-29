import { Divider } from "@mui/material";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { logIn } from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  const { t } = useTranslation("main");

  const formHandler = () => {
    const a = logIn(idRef.current?.value!, pwRef.current?.value!);
    a.then((r) => {
      console.log(r);
      if (r?.registered === true) {
        dispatch(usersActions.updateIdToken(r.idToken));
        dispatch(usersActions.updateIsLoggedIn(true));
        dispatch(usersActions.updateUser(r?.displayName));
        localStorage.setItem("token", r.idToken);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", r?.displayName);
        navigate("/initialpage");
      } else if (r?.registered !== true) {
        alert(t("Loginform.formHandler.alert"));
      }
    });
  };

  return (
    <section>
      <Typography variant="h6" color="white">
        {t("Loginform.header")}
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={3}>
          {}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            color="primary"
            sx={{
              input: {
                borderRadius: "5px",
                border: "1px solid white",
                color: "white",
              },
            }}
            margin="dense"
            name="Email"
            label={t("Loginform.input-email")}
            type="text"
            fullWidth
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            inputRef={idRef}
          />
          <TextField
            margin="dense"
            required
            name="pw"
            sx={{
              input: {
                borderRadius: "5px",
                border: "1px solid white",
                color: "white",
              },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            label={t("Loginform.input-pd")}
            type="password"
            fullWidth
            inputRef={pwRef}
          />
          <button style={{ marginTop: "30px" }} onClick={formHandler}>
            {t("Loginform.button-submit")}
          </button>
        </Grid>
      </Grid>
    </section>
  );
};

export default Login;
