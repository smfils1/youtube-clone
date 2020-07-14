import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    color: "blue",
    textDecoration: "none" /* no underline */,
  },
  card: {
    maxWidth: 345,
    backgroundColor: "transparent",
    borderWidth: "0px",
    "&:hover, &:focus": {
      backgroundColor: "transparent",
    },
  },
  footer: {
    alignItems: "start",
    paddingLeft: 0,
  },
});

const VertVidCard = ({
  videoThumbnail,
  ThumbComponent,
  videoLink,
  channelThumbnail,
  title,
  channel,
  views,
  date,
}) => {
  const classes = useStyles();
  return (
    <a href={videoLink} className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardMedia
          component={ThumbComponent || "img"}
          alt="video thumbnail"
          height="200"
          image={videoThumbnail}
          title={title}
        />
        <CardHeader
          className={classes.footer}
          avatar={<Avatar className={classes.avatar}>R</Avatar>}
          action={
            <IconButton aria-label="options">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={
            <div>
              <div>{channel}</div>
              <div>
                {views} • {moment(date).format("MMM Do YY")}
              </div>
            </div>
          }
        />
      </Card>{" "}
    </a>
  );
};

export { VertVidCard };
