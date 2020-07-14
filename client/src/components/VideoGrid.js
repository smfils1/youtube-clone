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

export default function VideoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {new Array(8).fill(null).map((value, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <VertVidCard
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
