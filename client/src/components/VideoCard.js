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

const useStyles = makeStyles((theme) => ({
  root: {
    color: "blue",
    textDecoration: "none" /* no underline */,
  },
  card: {
    backgroundColor: "transparent",
    borderWidth: "0px",
    "&:hover, &:focus": {
      backgroundColor: "transparent",
    },
  },
  cardV: {
    maxWidth: 500,
  },
  cardH: {
    display: "flex",
  },
  footer: {
    alignItems: "start",
    paddingLeft: 0,
  },
  side: {
    alignItems: "start",
    width: "100%",
    paddingLeft: theme.spacing(1),
  },
  icon: {
    padding: 0,
    "&:hover, &:focus": {
      backgroundColor: "transparent",
    },
  },

  sideContent2: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const VideoCard = ({
  vertical,
  horizontal,
  isLoading,
  videoThumbnail,
  ThumbComponent,
  videoLink = "#",
  channelThumbnail,
  title = "N/A",
  channel = "N/A",
  views = "0",
  date = "1/1/0000",
}) => {
  const classes = useStyles();
  const [isActive, setActive] = useState(false);
  if (!vertical && !horizontal) {
    vertical = true;
  }
  return (
    <Card
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={clsx(classes.card, {
        [classes.cardV]: vertical,
        [classes.cardH]: horizontal,
      })}
      variant="outlined"
    >
      <CardMedia
        component={
          isLoading
            ? () => (
                <Skeleton
                  animation={"wave"}
                  variant="rect"
                  width={250}
                  height={100}
                />
              )
            : ThumbComponent
        }
        alt="video thumbnail"
        height="200"
        image={videoThumbnail}
        title="thumbnail"
      />
      <CardHeader
        className={clsx({
          [classes.footer]: vertical,
          [classes.side]: horizontal,
        })}
        avatar={(() => {
          if (vertical && isLoading) {
            return (
              <Skeleton variant="circle">
                <Avatar />
              </Skeleton>
            );
          } else if (vertical) {
            return <Avatar className={classes.avatar}>R</Avatar>;
          } else {
            return <></>;
          }
        })()}
        action={
          !isLoading &&
          isActive && (
            <IconButton aria-label="options" className={classes.icon}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          isLoading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            title
          )
        }
        subheader={
          isLoading ? (
            <Skeleton width="80%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <div>
              <div className={clsx({ [classes.sideContent2]: horizontal })}>
                {channel}
              </div>
              <div>
                {views} • {moment(date).format("MMM Do YY")}
              </div>
            </div>
          )
        }
      />
    </Card>
  );
};

export default VideoCard;
