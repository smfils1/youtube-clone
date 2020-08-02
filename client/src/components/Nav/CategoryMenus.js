import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useHistory } from "react-router";

import NavItem from "./NavItem";
import categoryIcons from "../categoryIcons";

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: theme.spacing(0, 1),
  },
  title: {
    padding: theme.spacing(0, 1),
    fontSize: "1em",
    fontWeight: 500,
    color: grey[600],
  },
  bestOfYoutubeIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
  },
  root_h: {
    display: "flex",
    overflowX: "auto",
    justifyContent: "center",
  },
  spacing_h: { margin: "1em" },
  img_h: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
}));

const Img = ({ className, src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      // className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// const handleCategoryClick = (history, categoryId) => {
//   history.push(`/trending?category=${categoryId}`);
// };

const SideCategoryMenu = () => {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText
          primary="BEST OF YOUTUBE"
          classes={{ primary: classes.title }}
        />
      </ListItem>
      {categoryIcons.map((item, index) => {
        return (
          <NavItem
            key={index}
            to={`/trending?category=${index}`}
            title={item.title}
            icon={() => (
              <img
                //style={{ width: "100%", height: "100%" }}
                className={classes.bestOfYoutubeIcon}
                src={item.icon}
                alt={item.title + " logo"}
              />
            )}
          />
        );
      })}
    </List>
  );
};

const HorizontalCategoryMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.root_h}>
      {categoryIcons.map((item, index) => {
        return (
          <div className={classes.spacing_h}>
            <NavItem
              key={index}
              to={`/trending?category=${index}`}
              title={item.title}
              type="secondary"
              icon={() => (
                <img
                  className={classes.img_h}
                  src={item.icon}
                  alt={item.title + " logo"}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export { SideCategoryMenu, HorizontalCategoryMenu };
