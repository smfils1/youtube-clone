import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Divider,
  Avatar,
  Collapse,
} from "@material-ui/core";
import axios from "axios";
import NumAbbr from "number-abbreviate";
import moment from "moment";
import clsx from "clsx";

import { grey } from "@material-ui/core/colors";
import SubscribeBtn from "../SubscribeBtn";
import LikeDislikes from "../LikeDislikes";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 400,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  subTitle: {
    color: grey[700],
  },
  pointer: {
    cursor: "pointer",
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
  likeSubscribe: {
    display: "flex",
    marginLeft: "auto",
  },
}));

export default function VideoContent({ videoId }) {
  const [video, setVideo] = useState({});
  const [numberOfSubscribers, setSubscribers] = useState(0);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        const {
          data: { video },
        } = await api.patch(`/api/videos/${videoId}`, { updateViews: true });

        setVideo(video || {});
        const {
          data: { subscribers },
        } = await api.post(`/api/subscriptions/count`, {
          channel: video.channelId,
        });
        setSubscribers(subscribers || 0);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideoContent();
  }, [videoId]);

  const classes = useStyles();
  return (
    <div>
      <video
        style={{ width: "100%" }}
        src={video.videoLink}
        controls
        autoPlay
      />
      <div className={classes.primaryInfo}>
        <Typography variant="h6" className={classes.text}>
          {video.title}
        </Typography>
        <Typography
          variant="body2"
          className={clsx(classes.text, classes.subTitle)}
        >
          {new NumAbbr().abbreviate(video.views, 2)} views •{" "}
          {moment(video.createdAt).format("MMM Do YY")}
        </Typography>
        <Divider />
      </div>
      <div className={classes.secondaryInfo}>
        <Avatar alt="Avatar" src={video.channelImg} />
        <div className={classes.secondaryInfo_1}>
          <div className={classes.secondaryInfo_2}>
            {" "}
            <div className={classes.secondaryInfo_3}>
              {" "}
              <Typography variant="body2" className={clsx(classes.channel)}>
                {video.channelName}
              </Typography>
              <Typography variant="caption" className={clsx(classes.subTitle)}>
                {new NumAbbr().abbreviate(numberOfSubscribers, 2)} subscribers
              </Typography>
            </div>
            <div className={classes.likeSubscribe}>
              <LikeDislikes type="video" id={video.id} videoId={video.id} />{" "}
              <SubscribeBtn channelId={video.channelId} />
            </div>
          </div>{" "}
          <div>
            <Collapse in={showMore} collapsedHeight={50}>
              {video.description}
            </Collapse>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={clsx(classes.subTitle, classes.pointer)}
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
