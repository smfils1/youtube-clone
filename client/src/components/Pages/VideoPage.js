import React from "react";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import VideoContent from "../Video/VideoContent";
import SecondaryVidContent from "../Video/SecondaryVidContent";
import queryString from "query-string";
import CommentsContent from "../Comments/CommentsContent";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function VideoPage({ location }) {
  const classes = useStyles();
  const { v: id } = queryString.parse(location.search);
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <VideoContent videoId={id} />
          <CommentsContent videoId={id} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <SecondaryVidContent />
        </Grid>
      </Grid>
    </div>
  );
}
