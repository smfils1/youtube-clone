import React from "react";
import {
  makeStyles,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import queryString from "query-string";

import VideoContent from "../Video/VideoContent";
import SecondaryVidContent from "../Video/SecondaryVidContent";
import CommentsContent from "../Comments/CommentsContent";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

export default function VideoPage({ location }) {
  const classes = useStyles();
  const { v: id } = queryString.parse(location.search);
  const theme = useTheme();
  const isMaxScreenSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <VideoContent videoId={id} />

          {isMaxScreenSm ? (
            <SecondaryVidContent />
          ) : (
            <CommentsContent videoId={id} />
          )}
          {isMaxScreenSm && <Divider className={classes.divider} />}
        </Grid>
        <Grid item xs={12} md={4}>
          {isMaxScreenSm ? (
            <CommentsContent videoId={id} />
          ) : (
            <SecondaryVidContent />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
