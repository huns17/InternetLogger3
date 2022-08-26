/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable yoda */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import React from "react";
import { styled } from "@mui/material/styles";

type DialogEquipmentProps = {
  open: boolean;
  close: () => void;
};

// eslint-disable-next-line arrow-body-style
const DialogEquipment = ({ open, close }: DialogEquipmentProps) => {
  const [isBluePressed, setIsBluePressed] = useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onClose={close} fullWidth={true} maxWidth="sm">
        <DialogTitle>Undoing Box</DialogTitle>
        <DialogContent>
          <DialogContentText align="left">
            <Grid
              container
              spacing={8}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {!isBluePressed && (
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">
                    우리 이쁜이 안녕? You pressed this button because you wanted
                    to say goodbye or break up to me, right? You must have had a
                    hard time today. 우리 이쁜이. 너무 수고했어. <br />
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    Lets take some 5 min of Rest time first and cool down
                    yourself.
                  </Typography>
                  <br />
                  <Typography variant="body2">
                    Did you all rest? I think I've probably cleared my mind.
                    Then let's press blue button. Then you'll change your mind
                    about breaking up.
                  </Typography>
                </Grid>
              )}
            </Grid>
            {isBluePressed && (
              <Grid item xs={12} sm={12}>
                <Box
                  sx={{ width: "400px", height: "600px" }}
                  component="img"
                  src="image/sarah.jpeg"
                ></Box>
                <Typography variant="body2">
                  오빠도 우리돼지를 많이 사랑하고 믿지. 오빠랑 다시 한번
                  전화해서 이야기 해보자 이쁜이. We cannot break easily like
                  this. <br />
                  We can fix the issue with call. Let make a call bae.
                </Typography>
                <br />
                <a href="tel:+85267901714"> 오빠한테 전화 걸기 </a>
              </Grid>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ color: "white" }}
            onClick={() => {
              setIsBluePressed(true);
            }}
            disabled={isBluePressed}
          >
            Press Me
          </Button>
          <Button
            variant="contained"
            style={{ color: "white", background: "red" }}
            onClick={() => {
              close();
              setIsBluePressed(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogEquipment;
