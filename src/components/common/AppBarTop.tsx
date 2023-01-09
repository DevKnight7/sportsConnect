import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControl from '@mui/material/FormControl';
import { useUpdateSportsAvailibilityMutation } from '../../features/usersApi';
import { toast } from "react-toastify";
import {socket} from "../../utils/socket";
import { logout } from "../../actions/auth.actions";


// import jsCookie from 'js-cookie';
import { useDispatch } from "react-redux";
// import { DisabledByDefault } from "@mui/icons-material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface ButtonAppBarProps {
  open?: boolean;
  handleDrawerOpen: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.colors.defaultBg,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ButtonAppBar: React.FunctionComponent<ButtonAppBarProps> = ({
  open,
  handleDrawerOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [updateUserSportsAvailibility, { isLoading: isUserSportsAvailibilityUpdate }] = useUpdateSportsAvailibilityMutation();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogoutSuccess = () => {
    navigate("/login")
  }

  async function logoutUser() {
    // jsCookie.remove('login');
    socket.logoutAction();
    logout(dispatch, onLogoutSuccess);


  }


  async function handleSwitchChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!isUserSportsAvailibilityUpdate) {
      let is_available = event.target.checked
      updateUserSportsAvailibility(is_available).unwrap().then(() => {
        toast.success("All User Sports availability have been updated!");
      })
    }

  }

  return (
    <>
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {" "}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Typography variant="h6" noWrap component="div">
            </Typography>
              Sports Connect DashBoard
              </Grid>
          <Grid item xs={2} style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <FormControl component="fieldset" variant="standard">
              <Grid container>
                <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography variant="h6" noWrap style={{ float: 'left' }}>                    
                   Availability
                  </Typography>
                </Grid>
                <Grid item>
                  <Switch style={{ float: 'left' }} onChange={(e) => {
                    handleSwitchChange(e);
                  }} />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={2} style={{ display: "flex", justifyContent: "flex-end" }}>
            {" "}
            <Box

            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={() => { logoutUser() }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>

              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
      
    </AppBar>
   
    </>
  );
};

export default ButtonAppBar;
