import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, useMediaQuery, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { setDrawer, toggleDrawer } from "../../redux/actions/layout";
import youtubeLogo from "../../assets/youtube-logo.png";

const useStyles = makeStyles((theme) => ({
  youtubeLogo: {
    height: "35px",
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up("md")]: {
      height: "40px",
    },
  },
  toolbar: {
    paddingRight: "0px",
  },
  iconButton: {
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "white",
    },
    "&:focus": {
      outline: "white",
    },
  },
}));

const StartNav = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isMinScreenLg = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    dispatch(setDrawer(isMinScreenLg));
  }, [isMinScreenLg]);

  return (
    <Toolbar
      classes={{
        gutters: classes.toolbar,
      }}
    >
      <IconButton
        aria-label="open drawer"
        edge="start"
        className={classes.iconButton}
        onClick={() => dispatch(toggleDrawer())}
      >
        <MenuIcon />
      </IconButton>

      <img
        src={youtubeLogo}
        className={classes.youtubeLogo}
        alt="YouTube logo"
      />
    </Toolbar>
  );
};

export default StartNav;
