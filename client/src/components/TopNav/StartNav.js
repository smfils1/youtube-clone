import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, useMediaQuery, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import youtubeLogo from "../../assets/youtube-logo.png";

const useStyles = makeStyles((theme) => ({
  youtubeLogo: {
    height: "35px",
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up("md")]: {
      height: "40px",
    },
  },
}));

const StartNav = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState(false);
  const isMinScreenLg = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    setOpen(isMinScreenLg);
  }, [isMinScreenLg]);

  return (
    <Toolbar disableGutters>
      <IconButton aria-label="open drawer" edge="start">
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
