import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import musicIcon from "../../../assets/music-icon.png";
import sportsIcon from "../../../assets/soccer-icon.png";
import gameIcon from "../../../assets/gaming-icon.png";
import filmIcon from "../../../assets/film-icon.png";
import newsIcon from "../../../assets/news-icon.png";
import liveIcon from "../../../assets/live-icon.png";
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
}));

const CategoryMenu = () => {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText
          primary="BEST OF YOUTUBE"
          classes={{ primary: classes.title }}
        />
      </ListItem>
      {[
        {
          title: "Music",
          component: (
            <img
              src={musicIcon}
              className={classes.bestOfYoutubeIcon}
              alt="music logo"
            />
          ),
        },
        {
          title: "Sports",
          component: (
            <img
              src={sportsIcon}
              className={classes.bestOfYoutubeIcon}
              alt="sports logo"
            />
          ),
        },
        {
          title: "Gaming",
          component: (
            <img
              src={gameIcon}
              className={classes.bestOfYoutubeIcon}
              alt="game logo"
            />
          ),
        },
        {
          title: "Movies & Shows",
          component: (
            <img
              src={filmIcon}
              className={classes.bestOfYoutubeIcon}
              alt="film logo"
            />
          ),
        },
        {
          title: "News",
          component: (
            <img
              src={newsIcon}
              className={classes.bestOfYoutubeIcon}
              alt="news logo"
            />
          ),
        },
        {
          title: "Live",
          component: (
            <img
              src={liveIcon}
              className={classes.bestOfYoutubeIcon}
              alt="live logo"
            />
          ),
        },
      ].map((item, index) => (
        <Tooltip title={item.title} key={index}>
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              {item.component}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default CategoryMenu;
