import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import VideoList from "./VideoList";
import { getSuggestedVideos } from "../../redux/actions/videos";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default () => {
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuggestedVideos());
  }, []);

  const classes = useStyles();
  return (
    <div>
      <VideoList isLoading={isLoading} videos={recommendedVids} />
    </div>
  );
};
