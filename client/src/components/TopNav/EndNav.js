import React from "react";
import { useDispatch } from "react-redux";
import { blue } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Toolbar,
  IconButton,
  Hidden,
  Button,
  Tooltip,
} from "@material-ui/core";
import {
  Search as SearchIcon,
  AccountCircle as AccountIcon,
  VideoCall as VideoIcon,
  MoreVert as MoreIcon,
  Apps as AppsIcon,
} from "@material-ui/icons";
import { setMobileSearch } from "../../redux/actions/layout";

const useStyles = makeStyles((theme) => ({
  signButton: {
    color: blue[800],
    borderColor: blue[800],
    borderRadius: "3px",
  },
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
