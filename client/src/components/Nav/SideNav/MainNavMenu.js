import React from "react";
import { useDispatch } from "react-redux";

import { List, Divider, useMediaQuery, useTheme } from "@material-ui/core";
import { Home as HomeIcon, Whatshot as TrendingIcon } from "@material-ui/icons";
import menuAuthIcons from "../../menuAuthIcons";
import NavItem from "../NavItem";
import { toggleDrawer } from "../../../redux/actions/layout";

const MainNavMenu = () => {
  const theme = useTheme();

  const isMinScreenMd = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const handleItemClick = () => {
    if (!isMinScreenMd) {
      dispatch(toggleDrawer(isMinScreenMd));
    }
  };

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
            <NavItem
              to={item.path}
              title={item.title}
              icon={item.icon}
              onClick={handleItemClick}
            />
            {index === 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default MainNavMenu;
