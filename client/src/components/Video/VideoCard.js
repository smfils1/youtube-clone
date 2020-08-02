import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";
import { grey } from "@material-ui/core/colors";
import NumAbbr from "number-abbreviate";
import Thumbnail from "./Thumbnail";
const useStyles = makeStyles((theme) => ({
  root_h: {
    display: "flex",
    marginBottom: theme.spacing(1.5),
  },
  root_v: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginBottom: theme.spacing(1.5),
  },
  thumbnail: {
    marginRight: theme.spacing(1.5),
  },
  content_1: {
    minWidth: 0,
    width: "100%",
  },
  content_1_v: {
    display: "flex",
  },

  content_2: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    paddingRight: theme.spacing(1.5),
  },
  content_2_v: {
    paddingTop: theme.spacing(1),
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
  avatar: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
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
  imagSize_3: {
    width: "100%",
    height: "100%",
  },
}));

const VideoCard = ({
  type = "vertical_1",
  id,
  description,
  channelId,
  channelImg,
  thumbnail,
  duration,
  title = "N/A",
  channel = "N/A",
  views = 0,
  date = "1/1/0000",
}) => {
  const classes = useStyles();
  return (
    <div
      className={clsx({
        [classes.root_v]: ["vertical_1", "vertical_2"].includes(type),
        [classes.root_h]: ["horizontal_1", "horizontal_2"].includes(type),
      })}
    >
      <div className={classes.thumbnail}>
        <a href={`/watch?v=${id}`}>
          <Thumbnail
            imgStyle={clsx({
              [classes.imagSize_1]: type === "horizontal_1",
              [classes.imagSize_2]: type === "horizontal_2",
              [classes.imagSize_3]: ["vertical_1", "vertical_2"].includes(type),
            })}
            src={thumbnail}
            duration={duration}
          />
        </a>
      </div>
      <a
        href={`/watch?v=${id}`}
        className={clsx(classes.link_1, classes.content_1, {
          [classes.content_1_v]: ["vertical_1", "vertical_2"].includes(type),
        })}
      >
        {type === "vertical_2" && (
          <a href={`/channel/${channelId}`} className={classes.avatar}>
            <Avatar src={channelImg} />
          </a>
        )}

        <div
          className={clsx(classes.content_2, {
            [classes.content_2_v]: ["vertical_1", "vertical_2"].includes(type),
          })}
        >
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
                {new NumAbbr().abbreviate(views, 2)} views •{" "}
                {moment(date).fromNow()}
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
