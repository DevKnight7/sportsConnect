import React, { useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {  ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import jsCookie from "js-cookie";




const SessionExpired: React.FunctionComponent = () => {
  const theme = useTheme();

  useEffect(() => {
    
    return ()=>{
      jsCookie.remove('login')
    }
    
  },[])

  
 

  return (
    <ThemeProvider theme={theme}>
      {/* <ToastContainer /> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Container
            maxWidth="xs"
            sx={{
              border: "1px solid #dcdcdc",
              marginTop: "20%",
              borderRadius: "10px",
              boxShadow: "2px 5px #dcdcdc;",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: theme.colors.defaultBg }}>
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
                    sx={{ color: "red" }}
                  >
                    Oops..! Your session just Expired. Please login to continue.
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
                    style={{ fontSize: "16px", color: theme.colors.defaultBg }}
                  >
                    Back To Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: "url(images/cr-ball.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default SessionExpired;
