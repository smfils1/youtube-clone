import React from "react";
import { List, Divider } from "@material-ui/core";
import { Home as HomeIcon, Whatshot as TrendingIcon } from "@material-ui/icons";
import menuAuthIcons from "./menuAuthIcons";
import ListItemLink from "./ListItemLink";

const MainNavMenu = () => {
  return (
    <List>
      {[
        {
          title: "Home",
          icon: HomeIcon,
          path: "/",
        },
        {
          title: "Trending",
          icon: TrendingIcon,
          path: "/trending",
        },
        ...menuAuthIcons,
      ].map((item, index) => {
        return (
          <React.Fragment key={index}>
            <ListItemLink to={item.path} title={item.title} icon={item.icon} />
            {index === 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default MainNavMenu;
