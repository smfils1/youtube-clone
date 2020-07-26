import React, { useState, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import axios from "axios";

import { BACKEND_URL } from "../config";

import clsx from "clsx";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const useStyles = makeStyles((theme) => ({
  subscribeBtn: {
    backgroundColor: red[700],
    borderRadius: 2,
  },
}));

export default function SubscribeBtn({ className, channelId }) {
  const classes = useStyles();
  const userId = useSelector(({ channel }) => channel.id);
  const [isSubscribed, setSubscribed] = useState(false);
  const handleClick = async () => {
    const data = {
      channel: channelId,
      subscriber: userId,
    };
    try {
      if (isSubscribed) {
        console.log(data);

        await api.delete(`/api/subscriptions/${data.channel}`);
        setSubscribed(false);
      } else {
        await api.post("/api/subscriptions", data);
        setSubscribed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSubscribed = async () => {
    try {
      const {
        data: { isSubscribed },
      } = await api.post(`/api/subscriptions/subscribed`, {
        channel: channelId,
      });
      console.log("channelId", isSubscribed);

      setSubscribed(isSubscribed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (channelId) {
      fetchSubscribed();
    }
  }, [channelId]);

  return (
    <Button
      className={clsx(classes.subscribeBtn, className)}
      disableElevation
      disableFocusRipple
      disableRipple
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      {!isSubscribed ? "subscribe" : "unsubscribe"}
    </Button>
  );
}
