import React from "react";
import TopNav from "../components/TopNav";
import { makeStyles } from "@material-ui/core/styles";
import SideNav from "../components/SideNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
