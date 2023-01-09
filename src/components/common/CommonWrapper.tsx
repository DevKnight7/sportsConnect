// import * as React from "react";
import React , {useEffect, useState}  from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { socket } from "../../utils/socket";
import { toast} from "react-toastify";
import { Alert, Button } from "@mui/material";
import AppBar from "./AppBarTop";
import { useNavigate } from "react-router-dom";
import SideBar from "./DrawerSideBar";
// import MatchFeedback from "../pages/Match/EndMatchFeedback";
import {setNewMatchAlert, setEndMatchAlert} from "../../../src/redux/slices/alertSlice";
import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const AppDrawer: React.FunctionComponent<any> = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const newMatch = useSelector(({ alertReducer }: any) => alertReducer.newMatch);
  const  endMatch = useSelector(({ alertReducer }: any) => alertReducer.endMatch);
  const navigate = useNavigate();
  const Socket = socket.getSocket()
  function viewMatchTeams(match_id: number) {
    // dispatch(setNewMatchAlert(0));
    // navigate('/matchTeams', {state: {match_id: match_id}});
  }
  function endMatchFeedbackModal(){
    // dispatch(setEndMatchAlert(0));
    // navigate('/matchFeedback', {state: {set_modal: true, match_id: endMatch}})
    
  }
  const newMatchFunction = (value :any) => {
     dispatch(setNewMatchAlert(value.match_id))
    toast.success("Your match has been started!")
  }
  const endMatchFunction = (value: any) => {
      dispatch(setEndMatchAlert(value.match_id))
      toast.success(value.message)
  }

  useEffect(()=>{
    Socket.once('newMatch', newMatchFunction);
    Socket.once('endMatch', endMatchFunction);
    return () => {
      Socket.off('newMatch', newMatchFunction);
      Socket.off('endMatch', endMatchFunction);
    }
  },[])
  
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        DrawerHeader={DrawerHeader}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      {/* All Children of main app to be rendered here. */}
      { newMatch !== 0 ? 
        <Alert
          action={
            <>
            <Button  onClick={() => {
              viewMatchTeams(newMatch);
            }}
           color="inherit" size="small">
              Veiw Teams
            </Button>

            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              dispatch(setNewMatchAlert(0));
            }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
            </>
          }
        >
         You are assigned in a team — check it out!
         </Alert> : <> </>}
         {/* { endMatch !== 0 ? 
        <Alert
          action={
            <>
            <Button  onClick={() => {
              endMatchFeedbackModal();
            }}
           color="inherit" size="small">
              Feedback
            </Button>

            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              dispatch(setEndMatchAlert(0));
            }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
            </>
          }
        >
         You match comes to end  — Submit your feedback!
         </Alert> : <> </>} */}
        {children}



      </Box>
    </Box>
  );
};

export default AppDrawer;
