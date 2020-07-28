import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Drawer, Divider, useMediaQuery } from "@material-ui/core";
import MainNavMenu from "./MainNavMenu";
import { SideCategoryMenu } from "../CategoryMenus";
import StartNav from "../TopNav/StartNav";
const drawerWidth = 240;
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
  const theme = useTheme();
  const isMaxScreenSm = useMediaQuery(theme.breakpoints.down("sm"));

  const isDrawerOpen = useSelector(({ layout }) => layout.isDrawerOpen);
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  let isOpen;
  if (isMaxScreenSm) isOpen = isDrawerOpen;
  else isOpen = true; //We will control open by css
  const classes = useStyles();
  return (
    <Drawer
      variant={isMaxScreenSm ? "temporary" : "persistent"}
      open={isOpen}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        }),
      }}
    >
      <div className={classes.navHead}>
        <StartNav mobile />
      </div>
      <Divider />
      <MainNavMenu />
      <Divider />
      {isDrawerOpen && !isAuth && <SideCategoryMenu />}
    </Drawer>
  );
};

export default SideNav;
