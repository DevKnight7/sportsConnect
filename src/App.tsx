import React , {useEffect, useState}  from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import {useSelector} from "react-redux";
import {socket} from "../src/utils/socket";

import "react-toastify/dist/ReactToastify.css";

import "./styles/style.css";

import AppRoutes from "./routes/Routes";
import theme from "./shared/themeStyles";
import { AuthReducerState } from "./shared/customTypes";



function App() {
  const Socket = socket.getSocket();
  const userPayload = useSelector(({ authReducer }: any) => authReducer.userPayload);
  const isLoggedIn = useSelector(({ authReducer }: AuthReducerState) => authReducer.isLoggedIn);
  const socketConnect = () => {
    if(isLoggedIn){
      socket.loginAction(`${userPayload?.first_name} ${userPayload?.last_name}` , userPayload.id)
    }    
  }

  const handleNewUserConnect = (value:any) => {
    toast.success(`${value}`)
  }
  useEffect(()=>{
    Socket.once('new user', handleNewUserConnect);
   
    
    // socket.onAction('newLike', (value) => {
    //   toast.success(`${value}`)
    // });
    Socket.on('connect', socketConnect)
    return () => {
      Socket.off('connect', socketConnect)
      Socket.off('new user', handleNewUserConnect)
    }

  },[])



  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </> 
  );
}

export default App;
