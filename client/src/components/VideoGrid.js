import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Thumbnail from "./Thumbnail";
import { VertVidCard } from "./VideoCard";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function VideoGrid({ isLoading, videos }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {!isLoading
          ? videos.map(
              (
                {
                  duration,
                  uploader,
                  createdAt,
                  thumbnail,
                  title,
                  video,
                  views,
                },
                i
              ) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <VertVidCard
                    date={createdAt}
                    videoLink={video}
                    title={title}
                    channel={uploader}
                    views={views}
                    ThumbComponent={() => (
                      <Thumbnail
                        image={thumbnail || "https://via.placeholder.com/300"}
                        duration={duration}
                      />
                    )}
                  />
                </Grid>
              )
            )
          : new Array(8).fill(null).map((value, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <VertVidCard
                  isLoading={isLoading}
                  ThumbComponent={() => (
                    <Thumbnail image={"https://via.placeholder.com/300"} />
                  )}
                />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
