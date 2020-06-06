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
import { Home as HomeIcon, Whatshot as TrendingIcon } from "@material-ui/icons";
import menuAuthIcons from "./menuAuthIcons";

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
          icon: HomeIcon,
        },
        {
          title: "Trending",
          icon: TrendingIcon,
        },
        ...menuAuthIcons,
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <React.Fragment key={index}>
            <Tooltip title={item.title}>
              <ListItem button>
                <ListItemIcon className={classes.icon}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Tooltip>
            {index === 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default MainNavMenu;
