import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, IconButton } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import NavSearch from "./NavSearch";
import { setMobileSearch } from "../../../redux/actions/layout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backButton: {
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "white",
    },
    "&:focus": {
      outline: "white",
    },
  },
}));

const MiddleNav = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Toolbar className={classes.root}>
      <IconButton
        disableRipple
        edge="start"
        className={classes.backButton}
        aria-label="open search"
        onClick={() => dispatch(setMobileSearch(false))}
      >
        <ArrowBackIcon />
      </IconButton>
      <NavSearch />
    </Toolbar>
  );
};

export default MiddleNav;
