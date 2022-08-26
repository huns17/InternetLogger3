import { Divider } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const InitialPage = () => {
  const { t } = useTranslation("main");
  return (
    <section>
      <Typography variant="h6" color="white">
        Internet Logger v3
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container style={{ marginTop: "10px" }}></Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" color="white">
          {t("InitialPage.header")}
        </Typography>
      </Grid>
    </section>
  );
};

export default InitialPage;
