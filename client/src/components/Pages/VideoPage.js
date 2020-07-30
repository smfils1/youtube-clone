import React from "react";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import VideoContent from "../Video/VideoContent";
import SecondaryVidContent from "../Video/SecondaryVidContent";
import queryString from "query-string";
import CommentsContent from "../Comments/CommentsContent";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export default function VideoPage({ location }) {
  const classes = useStyles();
  const { v: id } = queryString.parse(location.search);
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <VideoContent videoId={id} />
          <CommentsContent videoId={id} />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <SecondaryVidContent />
        </Grid>
      </Grid>
    </div>
  );
}
