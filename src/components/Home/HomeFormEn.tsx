import { Divider } from "@mui/material";

import { Grid } from "@mui/material";
import { Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const HomeFormEn = () => {
  let navigate = useNavigate();
  const reduxUser = useAppSelector((state) => state.user);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section>
      <Typography variant="h6" color="white">
        Welcome Back.. {reduxUser}..
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={12}>
          {!matches ? (
            <Box
              sx={{ width: "400px", height: "600px" }}
              component="img"
              src="image/sarah.jpeg"
            ></Box>
          ) : (
            <Box
              sx={{ width: "300px", height: "400px" }}
              component="img"
              src="image/sarah.jpeg"
            ></Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <button
            style={{ marginTop: "30px" }}
            onClick={() => {
              navigate("/msglogen");
            }}
          >
            Log Message
          </button>
        </Grid>
      </Grid>
    </section>
  );
};

export default HomeFormEn;
