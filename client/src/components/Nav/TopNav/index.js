import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import MobileSearch from "./MobileSearch";
import StartNav from "./StartNav";
import MiddleNav from "./MiddleNav";
import EndNav from "./EndNav";

const useStyles = makeStyles((theme) => ({
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

const TopNav = () => {
  const classes = useStyles();
  const isMobileSearchClick = useSelector(
    ({ layout }) => layout.isMobileSearchClick
  );

  return (
    <div>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        {!isMobileSearchClick ? (
          <>
            <StartNav />
            <div className={classes.grow} />

            <MiddleNav />
            <div className={classes.grow} />
            <EndNav />
          </>
        ) : (
          <MobileSearch />
        )}
      </AppBar>
    </div>
  );
};

export default TopNav;
