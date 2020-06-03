import React from "react";
import { blue } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Toolbar,
  IconButton,
  Hidden,
  Button,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";
import {
  Search as SearchIcon,
  AccountCircle as AccountIcon,
  VideoCall as VideoIcon,
  MoreVert as MoreIcon,
  Apps as AppsIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  signButton: {
    color: blue[800],
    borderColor: blue[800],
    borderRadius: "3px",
  },
  toolbar: {
    paddingLeft: "0px",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Toolbar
      classes={{
        gutters: classes.toolbar,
      }}
    >
      <Hidden smUp>
        <IconButton size={theme.breakpoints.up("md") ? "small" : "medium"}>
          <SearchIcon />
        </IconButton>
      </Hidden>
      <Hidden smDown>
        <Tooltip title="Create">
          <IconButton>
            <VideoIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Apps">
          <span>
            <IconButton disabled>
              <AppsIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Settings">
          <span>
            <IconButton disabled>
              <MoreIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Hidden>

      <Button
        variant="outlined"
        size={theme.breakpoints.up("md") ? "medium" : "large"}
        className={classes.signButton}
        startIcon={<AccountIcon />}
      >
        sign in
      </Button>
    </Toolbar>
  );
};

export default NavBar;
