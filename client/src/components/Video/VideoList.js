import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Thumbnail from "./Thumbnail";
import VideoCard from "./VideoCard";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  thumbnail: {
    width: "25%",
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
              },
              i
            ) => (
              <VideoCard
                type={type}
                horizontal
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
                ThumbComponent={() => (
                  <Thumbnail
                    image={thumbnail || "https://via.placeholder.com/300"}
                    duration={duration}
                    imgStyle={classes.thumbnail}
                  />
                )}
              />
            )
          )
        : new Array(8)
            .fill(null)
            .map((value, i) => (
              <VideoCard
                horizontal
                key={i}
                isLoading={isLoading}
                ThumbComponent={() => (
                  <Thumbnail
                    image={"https://via.placeholder.com/300"}
                    height={100}
                    width={150}
                  />
                )}
              />
            ))}
    </div>
  );
}
