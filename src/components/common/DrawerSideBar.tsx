import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface SidebarDrawer {
  handleDrawerClose: () => void;
  open?: boolean;
  DrawerHeader: any;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidebarDrawer: React.FunctionComponent<SidebarDrawer> = ({
  open,
  handleDrawerClose,
  DrawerHeader,
}) => {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            p: 1,
            m: 1,
            //   bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="span"
            color={theme.colors.defaultBg}
          >
            Sports Connect
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Divider />
      <List>
      <Link to="/profile" style={theme.styles.noDecorationLink}>
      <ListItem key="my_profile" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary={"My Profile"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
        
        <Link to="/dashboard" style={theme.styles.noDecorationLink}>
          
          <ListItem key="my_sports" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SportsVolleyballIcon />
              </ListItemIcon>
              <ListItemText
                primary={"My Stats"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>



        <Link to="/timeline" style={theme.styles.noDecorationLink}>
          
          <ListItem key="timeline" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FeedOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Timeline"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default SidebarDrawer;
