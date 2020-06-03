import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Drawer, Divider } from "@material-ui/core";
import MainNavMenu from "./MainNavMenu";

const drawerWidth = 240;
const isOpen = false;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create(["width", "margin", "visibility"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down("xs")]: {
      width: 0,
      visibility: "hidden",
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  navHead: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const SideNav = () => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
    >
      <div className={classes.navHead}></div>
      <Divider />
      <MainNavMenu />
      <Divider />
    </Drawer>
  );
};

export default SideNav;
