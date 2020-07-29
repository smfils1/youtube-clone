import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumAbbr from "number-abbreviate";

import {
  Container,
  Typography,
  Divider,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import { capitalize } from "lodash";
import axios from "axios";

import SubscribeBtn from "../SubscribeBtn";
import { getTrendingVideos } from "../../redux/actions/videos";
import VideoGrid from "../Video/VideoGrid";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(3),
  },

  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  info_1: {
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  info_2: {
    display: "flex",
    flexDirection: "column",
  },
  info_3: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
  subscribeBtn: {
    padding: theme.spacing(1.5),
  },
  text: {
    paddingBottom: theme.spacing(3),
    fontWeight: 500,
  },
  divider: {
    height: "5px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const ChannelPage = ({ match }) => {
  const { id: channelId } = match.params;
  const userId = useSelector(({ channel }) => channel.id);
  const [channel, setChannel] = useState(null);
  const [numberOfSubscribers, setSubscribers] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchChannelInfo = async () => {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchChannelInfo();
  }, [channelId]);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.content}>
        {channel ? (
          <div className={classes.info_1}>
            <Avatar
              alt="Channel Image"
              src={channel.image}
              className={classes.avatar}
            />
            <div className={classes.info_3}>
              {" "}
              <div className={classes.info_2}>
                {" "}
                <Typography variant="h5" className={classes.channel}>
                  {channel.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.subTitle}>
                  {new NumAbbr().abbreviate(numberOfSubscribers, 2)} subscribers
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
        ) : (
          //   <>
          //     {" "}
          //     <Avatar
          //       alt="Channel Image"
          //       src={channel.image}
          //       className={classes.avatar}
          //     />
          //     <Typography variant="h5" className={classes.text}></Typography>
          //     <Divider light className={classes.divider} />
          //   </>
          "Channel doesn't exist"
        )}

        {[].length ? <VideoGrid videos={[]} /> : "Nothing"}
      </div>
    </Container>
  );
};

export default ChannelPage;
