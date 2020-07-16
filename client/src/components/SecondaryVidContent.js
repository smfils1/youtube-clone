import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import VideoList from "./VideoList";
import { getHomeVideos } from "../redux/actions/videos";
const useStyles = makeStyles((theme) => ({
  root: {},
}));
const HomePage = () => {
  const isAuth = useSelector(({ user }) => user.isAuth);
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeVideos());
  }, []);
  const classes = useStyles();
  return (
    <div>
      <VideoList isLoading={isLoading} videos={recommendedVids} />
    </div>
  );
};

export default HomePage;
