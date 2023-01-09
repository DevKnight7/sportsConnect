import React, { useEffect, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";

import {  useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {  ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Forgot from "./Forgot"
import Activate from "./Activate"
import Reset from "./ResetPassword";




type FormType = "signIn" | "signUp" | "forgot" | "activate" | "reset";
interface RouteProps{
  
  comp:FormType
  
}




const Auth: React.FunctionComponent<RouteProps>= ( {comp} ) => {

  const theme = useTheme();
  
  const [currrentForm, setCurrentForm] = useState<FormType>(comp ?? "signIn");
  
  useEffect(()=>{

    setCurrentForm(comp ?? "signIn");
    
  },[comp])
  

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
            {currrentForm === "signUp" && (
              <SignUp />
            )}
            {currrentForm === "signIn" && (
              <SignIn  />
            )}
            {currrentForm === "forgot" && (
              <Forgot  />
            )}
            {currrentForm === "activate" && (
              <Activate  />
            )}
            {currrentForm === "reset" && (
              <Reset  />
            )}
            {/* <Copyright sx={{ mt: 0 }} /> */}
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

export default Auth;
