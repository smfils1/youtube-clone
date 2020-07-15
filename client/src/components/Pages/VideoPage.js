import React from "react";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import VideoContent from "../VideoContent";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export default function VideoPage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <VideoContent />
          Conmments
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          Other Videos
        </Grid>
      </Grid>
    </div>
  );
}
