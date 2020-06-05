import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Hidden } from "@material-ui/core";
import NavSearch from "./NavSearch";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const MiddleNav = () => {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Toolbar className={classes.root} disableGutters>
        <NavSearch />
      </Toolbar>{" "}
    </Hidden>
  );
};

export default MiddleNav;
