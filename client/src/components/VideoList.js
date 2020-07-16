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
}));

export default function VideoList({ isLoading, videos }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {!isLoading
        ? videos.map(
            (
              { duration, uploader, createdAt, thumbnail, title, video, views },
              i
            ) => (
              <VideoCard
                horizontal
                key={i}
                date={createdAt}
                videoLink={video}
                title={title}
                channel={uploader}
                views={views}
                ThumbComponent={() => (
                  <Thumbnail
                    image={thumbnail || "https://via.placeholder.com/300"}
                    duration={duration}
                    height={100}
                    width={150}
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
