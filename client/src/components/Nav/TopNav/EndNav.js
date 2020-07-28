import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, IconButton, Hidden, Tooltip } from "@material-ui/core";
import {
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Apps as AppsIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { setMobileSearch } from "../../../redux/actions/layout";
import SignInBtn from "../../SignInBtn";
import NavUserMenuBtn from "./NavUserMenuBtn";
import NavVidMenuBtn from "./NavVidMenuBtn";
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
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Toolbar
      classes={{
        gutters: classes.toolbar,
      }}
    >
      <>
        <Hidden smUp>
          <IconButton
            onClick={() => dispatch(setMobileSearch(true))}
            size={theme.breakpoints.up("md") ? "small" : "medium"}
            className={classes.iconButton}
          >
            <SearchIcon />
          </IconButton>
        </Hidden>
        <Tooltip title="Create">
          <NavVidMenuBtn />
        </Tooltip>
        <Hidden smDown>
          <>
            <Tooltip title="Apps">
              <span>
                <IconButton disabled>
                  <AppsIcon />
                </IconButton>
              </span>
            </Tooltip>
            {isAuth || (
              <Tooltip title="Settings">
                <span>
                  <IconButton disabled>
                    <MoreIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </>
        </Hidden>
        {isAuth && (
          <Tooltip title="Notifications">
            <IconButton className={classes.iconButton}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
        )}

        {isAuth && <NavUserMenuBtn />}
        {isAuth || (
          <SignInBtn size={theme.breakpoints.up("md") ? "medium" : "large"} />
        )}
      </>
    </Toolbar>
  );
};

export default NavBar;
