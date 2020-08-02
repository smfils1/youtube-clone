import React from "react";
import TopNav from "./TopNav";
import { makeStyles } from "@material-ui/core/styles";

import SideNav from "./SideNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden",
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));
const NavBar = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopNav />
      <SideNav />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default NavBar;
