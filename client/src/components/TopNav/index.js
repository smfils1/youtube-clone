import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, CssBaseline, Toolbar } from "@material-ui/core";

import StartNav from "./StartNav";
import MiddleNav from "./MiddleNav";
import EndNav from "./EndNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    display: "flex",
    flexDirection: "row",

    background: "white",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <StartNav />
        <div className={classes.grow} />

        <MiddleNav />
        <div className={classes.grow} />
        <EndNav />
      </AppBar>
    </div>
  );
};
