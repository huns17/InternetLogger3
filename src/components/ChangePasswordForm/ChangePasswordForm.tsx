import { Divider } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useRef } from "react";
import { logIn } from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useTranslation } from "react-i18next";

const ChangePasswordForm = () => {
  const pwRef = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  const reduxidToken: string = useAppSelector((state) => state.idToken);
  const reduxLan: string = useAppSelector((state) => state.lan);
  const { t } = useTranslation("main");
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(usersActions.updateIdToken(""));
    dispatch(usersActions.updateIsLoggedIn(false));
    dispatch(usersActions.updateUser(""));
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const formHandler = async () => {
    console.log(pwRef.current?.value);
    try {
      const data = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkLePHqkPxNxPalsSLE_C4CbAaOiaGwNw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: reduxidToken,
            password: pwRef.current?.value,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!data.ok) {
        console.log(data);
        let errorMessage = t("ChangePasswordForm.formHandler-alert");
        throw new Error(errorMessage);
      }

      const json = await data.json();
      console.log(json);
      alert(t("ChangePasswordForm.formHandler-alert2"));
      logoutHandler();
    } catch (err) {
      alert(err);
    }
  };

  console.log(reduxidToken);
  return (
    <section>
      <Typography variant="h6" color="white">
        {t("ChangePasswordForm.formHandler-header")}
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={3}>
          {}
        </Grid>
        <Grid item xs={12} sm={6}>
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
            label={t("Loginform.input-pd")}
            type="password"
            fullWidth
            inputRef={pwRef}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <button style={{ marginTop: "30px" }} onClick={formHandler}>
            {t("SignInForm.button-submit")}
          </button>
        </Grid>
      </Grid>
    </section>
  );
};

export default ChangePasswordForm;
