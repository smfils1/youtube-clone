import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import VideoCard from "./VideoCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function VideoGrid({ isLoading, videos, type }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {!isLoading
          ? videos.map(
              (
                {
                  id,
                  description,
                  duration,
                  channelName: uploader,
                  channelId,
                  createdAt,
                  thumbnailLink: thumbnail,
                  title,
                  videoLink: video,
                  views,
                  channelImg,
                },
                i
              ) => (
                <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                  <VideoCard
                    type={type}
                    channelImg={channelImg}
                    key={id}
                    description={description}
                    id={id}
                    channelId={channelId}
                    date={createdAt}
                    videoLink={video}
                    title={title}
                    channel={uploader}
                    views={views}
                    thumbnail={thumbnail}
                    duration={duration}
                  />
                </Grid>
              )
            )
          : new Array(8).fill(
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <VideoCard isLoading={isLoading} type={type} />{" "}
              </Grid>
            )}
      </Grid>
    </div>
  );
}
