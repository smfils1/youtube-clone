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
    overflow: "hidden",
  },
  root_h1: {
    height: 130,
  },
  root_h2: {
    height: 90,
  },
  root_v: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginBottom: theme.spacing(1.5),
  },
  thumbnail_h: {
    marginRight: theme.spacing(1.5),
  },
  content_1: {
    overflow: "hidden",
    minWidth: 0,
    width: "100%",
  },
  content_1_v: {
    display: "flex",
  },
  content_2: {
    display: "flex",
    flexDirection: "column",
  },
  content_2_v: {
    paddingTop: theme.spacing(1),
    width: "100%",
  },
  textNoWrap: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  textWrap: {
    width: "100%",
    overflow: "hidden",
    wordWrap: "break-word",
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
  size_1: {
    width: 240,
    height: 130,
  },
  size_2: {
    width: 160,
    height: 90,
  },
  size_3: {
    width: "100%",
    height: "100%",
  },
}));

const VideoCard = ({
  isLoading,
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
        [classes.root_h1]: type === "horizontal_1",
        [classes.root_h2]: type === "horizontal_2",
      })}
    >
      <div
        className={clsx({
          [classes.thumbnail_h]: ["horizontal_1", "horizontal_2"].includes(
            type
          ),
        })}
      >
        <a href={isLoading || `/watch?v=${id}`}>
          {isLoading ? (
            <Skeleton animation={"wave"} variant="rect">
              <Thumbnail
                imgStyle={clsx({
                  [classes.size_1]: type === "horizontal_1",
                  [classes.size_2]: type === "horizontal_2",
                  [classes.size_3]: ["vertical_1", "vertical_2"].includes(type),
                })}
                duration={duration}
              />
            </Skeleton>
          ) : (
            <Thumbnail
              imgStyle={clsx({
                [classes.size_1]: type === "horizontal_1",
                [classes.size_2]: type === "horizontal_2",
                [classes.size_3]: ["vertical_1", "vertical_2"].includes(type),
              })}
              src={thumbnail}
              duration={duration}
            />
          )}
        </a>
      </div>

      <a
        href={isLoading || `/watch?v=${id}`}
        className={clsx(classes.link_1, classes.content_1, {
          [classes.content_1_v]: ["vertical_1", "vertical_2"].includes(type),
        })}
      >
        {type === "vertical_2" && (
          <a
            href={isLoading || `/channel/${channelId}`}
            className={classes.avatar}
          >
            {isLoading ? (
              <Skeleton variant="circle">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar src={channelImg} />
            )}
          </a>
        )}

        <div
          className={clsx(classes.content_2, {
            [classes.content_2_v]: ["vertical_1", "vertical_2"].includes(type),
          })}
        >
          {isLoading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <Typography
              variant="body1"
              className={clsx(classes.textNoWrap, classes.title)}
            >
              {title}
            </Typography>
          )}
          <div
            className={clsx({
              [classes.subContent]: type === "horizontal_1",
            })}
          >
            {isLoading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <div>
                <Typography
                  variant="body2"
                  className={clsx(
                    classes.textNoWrap,
                    classes.subtitle,
                    classes.channel
                  )}
                >
                  <a href={`/channel/${channelId}`} className={classes.link_2}>
                    {channel}{" "}
                  </a>
                </Typography>
              </div>
            )}
            {isLoading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <div>
                {" "}
                <Typography
                  variant="body2"
                  className={clsx(classes.textNoWrap, classes.subtitle)}
                >
                  {new NumAbbr().abbreviate(views, 2)} views •{" "}
                  {moment(date).fromNow()}
                </Typography>
              </div>
            )}
          </div>
          {type === "horizontal_1" && !isLoading && (
            <Typography
              variant="body2"
              className={clsx(classes.textWrap, classes.description)}
            >
              {description}
            </Typography>
          )}
          {type === "horizontal_1" && isLoading && (
            <Skeleton width="100%"></Skeleton>
          )}
        </div>
      </a>
    </div>
  );
};

export default VideoCard;
