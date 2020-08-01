import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";
import { grey } from "@material-ui/core/colors";

import { generateVideoLink } from "../../utils";
import Thumbnail from "./Thumbnail";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  thumbnail: {
    marginRight: theme.spacing(1.5),
  },
  content_1: {
    minWidth: 0,
    width: "100%",
  },
  content_2: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  title: {
    fontWeight: 500,
  },
  link_1: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": { color: "inherit", textDecoration: "none" },
  },
  channel: {
    paddingRight: theme.spacing(1),
  },
  description: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(0),
  },
  link_2: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": { color: "black", textDecoration: "none" },
  },
  subtitle: {
    color: grey[600],
  },

  subContent: {
    display: "flex",
  },
  imagSize_1: {
    width: 240,
    height: 130,
  },
  imagSize_2: {
    width: 160,
    height: 90,
  },
}));

const VideoCard = ({
  vertical,
  horizontal,
  isLoading,
  videoThumbnail,
  thumbnailComponent,
  videoLink = "#",
  channelThumbnail,
  type = "horizontal_1",
  id,
  description,
  channelId,
  thumbnail,
  duration,
  title = "N/A",
  channel = "N/A",
  views = "0",
  date = "1/1/0000",
}) => {
  const classes = useStyles();
  console.log(videoLink);
  return (
    <div className={classes.root}>
      <div className={classes.thumbnail}>
        <a href={`/watch?v=${id}`}>
          <Thumbnail
            imgStyle={clsx({
              [classes.imagSize_1]: type === "horizontal_1",
              [classes.imagSize_2]: type === "horizontal_2",
            })}
            src={thumbnail}
            duration={duration}
          />
        </a>
      </div>
      <a
        href={`/watch?v=${id}`}
        className={clsx(classes.link_1, classes.content_1)}
      >
        <div className={classes.content_2}>
          <Typography
            variant="body1"
            className={clsx(classes.text, classes.title)}
          >
            {title}
          </Typography>
          <div
            className={clsx({
              [classes.subContent]: type === "horizontal_1",
            })}
          >
            <div>
              <Typography
                variant="body2"
                className={clsx(
                  classes.text,
                  classes.subtitle,
                  classes.channel
                )}
              >
                <a href={`/channel/${channelId}`} className={classes.link_2}>
                  {channel}{" "}
                </a>
              </Typography>
            </div>
            <div>
              {" "}
              <Typography
                variant="body2"
                className={clsx(classes.text, classes.subtitle)}
              >
                {views} views • {moment(date).fromNow()}
              </Typography>
            </div>
          </div>

          {type === "horizontal_1" && (
            <Typography
              variant="body2"
              className={clsx(classes.text, classes.description)}
            >
              {description}
            </Typography>
          )}
        </div>
      </a>
    </div>
  );
};

export default VideoCard;
