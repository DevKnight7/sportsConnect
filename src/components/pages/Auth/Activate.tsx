import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link, Navigate, useLocation } from "react-router-dom";
import {  useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import LoadingOverlay from "react-loading-overlay-ts";
import { activateAccount } from "../../../actions/auth.actions";

type FormType = "signIn" | "signUp" | "forgot" | "activate" | "reset";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Activate: React.FunctionComponent = () => {
  const theme = useTheme();
  let params = useQuery();
  let verifyCode = params.get("code");

  const [loaded, setLoaded] = useState<boolean>(true);
  const [activated, setActivated] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Activate Account - SportsConnect"
    activateUser();
    
  }, []);

  async function activateUser() {
    if (verifyCode) {
      let activeResp = await activateAccount(verifyCode);

      
      if (activeResp.status === 200) {
        setActivated(true);
      } else {
        setActivated(false);
      }
      setLoaded(false);
    }
  }

  return (
    <>
      {!verifyCode && <Navigate to="/login" replace={true} />}
      <LoadingOverlay
        active={loaded}
        styles={{
          overlay: {
            backgroundColor: "rgba(255,255,255, 1)",
            position: "absolute" /* Stay in place */,
            zIndex: "999" /* Sit on top */,
            left: "0",
            top: "0",
            width: "100%" /* Full width */,
            height: "100%" /* Full height */,
            overflow: "auto" /* Enable scroll if needed */,
          },
          spinner: (base) => ({
            ...base,
            width: "100px",
            top: "100% !important",
            translate: "transform(50% , 50%)",
            "& svg circle": {
              stroke: "rgba(181, 21, 47, 1)",
            },
            "& svg ": {
              top: "50%",
            },
          }),
        }}
        spinner={true}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.colors.defaultBg}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Activation
          </Typography>

          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                justifyContent: "center",
                marginTop: "12px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: activated ? "green" : "red" }}
              >
                {activated
                  ? "Congrats!. Your Account has been activated."
                  : "Invalid Code! Please try again later."}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                marginTop: "12px",
              }}
            >
              <Link
                to="/login"
                style={{ fontSize: "16px" , color: theme.colors.defaultBg }}
              >
                Back To Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </LoadingOverlay>
    </>
  );
};

export default Activate;
