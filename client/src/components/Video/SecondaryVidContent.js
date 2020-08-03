import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";

import VideoList from "./VideoList";
import { getSuggestedVideos } from "../../redux/actions/videos";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(1),
  },
}));

export default () => {
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuggestedVideos());
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Suggested Videos
      </Typography>
      <VideoList
        type="horizontal_2"
        isLoading={isLoading}
        videos={recommendedVids}
      />
    </div>
  );
};
