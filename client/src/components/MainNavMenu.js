import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Whatshot as TrendingIcon,
  History as HistoryIcon,
  VideoLibrary as LibraryIcon,
  Subscriptions as SubscriptionIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: theme.spacing(0, 1),
  },
}));

const MainNavMenu = () => {
  const classes = useStyles();
  return (
    <List>
      {[
        {
          title: "Home",
          component: <HomeIcon />,
        },
        {
          title: "Trending",
          component: <TrendingIcon />,
        },
        {
          title: "Subscriptions",
          component: <SubscriptionIcon />,
        },
        {
          title: "Library",
          component: <LibraryIcon />,
        },
        {
          title: "History",
          component: <HistoryIcon />,
        },
      ].map((item, index) => (
        <>
          <Tooltip title={item.title} key={index}>
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                {item.component}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Tooltip>
          {index === 1 && <Divider key={index} />}
        </>
      ))}
    </List>
  );
};

export default MainNavMenu;
