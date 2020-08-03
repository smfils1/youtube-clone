import React from "react";
import { makeStyles } from "@material-ui/core";

import VideoCard from "./VideoCard";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

export default function VideoList({ type, isLoading, videos }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
            )
          )
        : new Array(8).fill(<VideoCard isLoading={isLoading} type={type} />)}
    </div>
  );
}
