import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Service/ApiService";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { usersActions } from "../../store/userSlice";

const SignInForm = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  const { t } = useTranslation("main");

  const formHandler = () => {
    const a = signIn(idRef.current?.value!, pwRef.current?.value!);
    a.then((r) => {
      if (r?.idToken) {
        alert(t("SignInForm.formHandler.alert"));
        navigate("/login");
      }
    });
  };

  return (
    <section>
      <Typography variant="h6" color="white">
        {t("SignInForm.header")}
        <br />
        {t("SignInForm.header2")}
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
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            margin="dense"
            name="Email"
            label="Email"
            type="text"
            fullWidth
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
            label="Password"
            type="password"
            fullWidth
            inputRef={pwRef}
          />
          <button style={{ marginTop: "30px" }} onClick={formHandler}>
            {t("SignInForm.button-submit")}
          </button>
        </Grid>
      </Grid>
    </section>
  );
};

export default SignInForm;
