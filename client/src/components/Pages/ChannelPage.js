import React, { useEffect, useState } from "react";
import NumAbbr from "number-abbreviate";
import { grey } from "@material-ui/core/colors";
import { Typography, Avatar, makeStyles } from "@material-ui/core";
import axios from "axios";

import { AntTab, AntTabs } from "../AntTabs";
import SubscribeBtn from "../SubscribeBtn";
import VideoGrid from "../Video/VideoGrid";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey[200],
    flex: 1,
  },
  header: {
    backgroundColor: grey[50],
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(0),
  },
  subscriptionContent: {
    padding: theme.spacing(6),
    width: "100%",
    height: "100%",
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  info_1: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  info_2: {
    display: "flex",
    flexDirection: "column",
  },
  info_3: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
  subscribeBtn: {
    padding: theme.spacing(1.5),
  },
}));

const ChannelPage = ({ match }) => {
  const { id: channelId } = match.params;
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [numberOfSubscribers, setSubscribers] = useState(0);
  const [tabValue, setTabValue] = React.useState(1);
  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const { data } = await api.get(`/api/channels/${channelId}`);
        console.log(data);
        setChannel({
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.imageLink,
        });
        const {
          data: { subscribers },
        } = await api.post(`/api/subscriptions/count`, {
          channel: channelId,
        });
        setSubscribers(subscribers || 0);
        const {
          data: { videos },
        } = await api.get(`/api/videos/channel/${channelId}`);
        setVideos(videos);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChannel();
  }, [channelId]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {channel ? (
          <>
            <div className={classes.info_1}>
              <Avatar
                alt="Channel Image"
                src={channel.image}
                className={classes.avatar}
              />
              <div className={classes.info_3}>
                <div className={classes.info_2}>
                  <Typography variant="h5" className={classes.channel}>
                    {channel.name}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.subTitle}>
                    {new NumAbbr().abbreviate(numberOfSubscribers, 2)}{" "}
                    subscribers
                  </Typography>
                </div>
                <div>
                  <SubscribeBtn
                    size="lg"
                    channelId={channel.id}
                    className={classes.subscribeBtn}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          "No Channel"
        )}

        <AntTabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="tabs"
        >
          <AntTab label="Home" disabled />
          <AntTab label="Videos" />
        </AntTabs>
      </div>
      <div className={classes.subscriptionContent}>
        {videos.length ? (
          <VideoGrid type="vertical_1" videos={videos} />
        ) : (
          "Nothing to Show"
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
