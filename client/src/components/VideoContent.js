import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  Divider,
  Avatar,
  Button,
  Collapse,
} from "@material-ui/core";
import clsx from "clsx";
import { grey, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 400,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  subTitle: {
    color: grey[700],
  },
  primaryInfo: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  secondaryInfo: {
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  secondaryInfo_1: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  secondaryInfo_2: {
    display: "flex",
    width: "100%",
  },
  channel: {
    fontWeight: 500,
  },
  secondaryInfo_3: {
    paddingLeft: theme.spacing(1),
    lineHeight: "80%",
  },
  subscribeBtn: {
    backgroundColor: red[700],
    marginLeft: "auto",
    borderRadius: 2,
  },
}));

export default function VideoPage() {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <video
        style={{ width: "100%" }}
        src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`}
        controls
        //autoPlay
      />
      <div className={classes.primaryInfo}>
        <Typography variant="h6" className={classes.text}>
          Title
        </Typography>
        <Typography
          variant="body2"
          className={clsx(classes.text, classes.subTitle)}
        >
          402 views • Dec 6, 2019
        </Typography>
        <Divider />
      </div>
      <div className={classes.secondaryInfo}>
        <Avatar alt="Avatar" />
        <div className={classes.secondaryInfo_1}>
          <div className={classes.secondaryInfo_2}>
            {" "}
            <div className={classes.secondaryInfo_3}>
              {" "}
              <Typography variant="body2" className={clsx(classes.channel)}>
                Channel Name
              </Typography>
              <Typography variant="caption" className={clsx(classes.subTitle)}>
                5.22K subscribers
              </Typography>
            </div>
            <Button
              className={classes.subscribeBtn}
              disableElevation
              disableFocusRipple
              disableRipple
              variant="contained"
              color="secondary"
            >
              subscribe
            </Button>
          </div>{" "}
          <div>
            <Collapse in={showMore} collapsedHeight={100}>
              1
              <br />1
              <br />1
              <br />1
              <br />1
              <br />1
              <br />1
              <br />1
            </Collapse>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={classes.subTitle}
              onClick={() => setShowMore((previous) => !previous)}
            >
              Show More{" "}
            </Typography>
          </div>{" "}
        </div>
      </div>
      <Divider />
    </div>
  );
}
