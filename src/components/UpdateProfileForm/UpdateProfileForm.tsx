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

const UpdateProfileForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  const reduxidToken = useAppSelector((state) => state.idToken);
  const reduxLan = useAppSelector((state) => state.lan);
  const { t } = useTranslation("main");

  const formHandler = async () => {
    console.log(userRef.current?.value);
    try {
      const data = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkLePHqkPxNxPalsSLE_C4CbAaOiaGwNw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: reduxidToken,
            displayName: userRef.current?.value,
            photoUrl: null,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!data.ok) {
        console.log(data);
        let errorMessage = t(`UpdateProfileForm.error`);
        throw new Error(errorMessage);
      }
      const json = await data.json();
      console.log(json);
      alert(t(`UpdateProfileForm.alert`));
    } catch (err) {
      alert(err);
    }
  };

  console.log(reduxidToken);
  return (
    <section>
      <Typography variant="h6" color="white">
        {t(`UpdateProfileForm.header`)}
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
            name="Username"
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
            label="Username"
            type="Username"
            fullWidth
            inputRef={userRef}
          />
          <button style={{ marginTop: "30px" }} onClick={formHandler}>
            {t(`SignInForm.button-submit`)}
          </button>
        </Grid>
      </Grid>
    </section>
  );
};

export default UpdateProfileForm;
