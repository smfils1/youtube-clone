import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, IconButton, Hidden, Tooltip } from "@material-ui/core";
import {
  Search as SearchIcon,
  VideoCall as VideoIcon,
  MoreVert as MoreIcon,
  Apps as AppsIcon,
} from "@material-ui/icons";
import { setMobileSearch } from "../../redux/actions/layout";
import SignInBtn from "../SignInBtn";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: "0px",
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

const NavBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Toolbar
      classes={{
        gutters: classes.toolbar,
      }}
    >
      <Hidden smUp>
        <IconButton
          onClick={() => dispatch(setMobileSearch(true))}
          size={theme.breakpoints.up("md") ? "small" : "medium"}
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
      </Hidden>
      <Hidden smDown>
        <Tooltip title="Create">
          <IconButton className={classes.iconButton}>
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

      <SignInBtn size={theme.breakpoints.up("md") ? "medium" : "large"} />
    </Toolbar>
  );
};

export default NavBar;
