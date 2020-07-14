import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Divider } from "@material-ui/core";
import VideoGrid from "../VideoGrid";
import { getHomeVideos } from "../../redux/actions/videos";
const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(3),
  },
  text: {
    paddingBottom: theme.spacing(3),
    fontWeight: 500,
  },
  divider: {
    height: "5px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
const HomePage = () => {
  const isAuth = useSelector(({ user }) => user.isAuth);
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const trendingVids = useSelector(({ videos }) => videos.trending);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeVideos());
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.text}>
          Recommended
        </Typography>
        <VideoGrid isLoading={isLoading} videos={recommendedVids} />
        <Divider light className={classes.divider} />
        <Typography variant="h5" className={classes.text}>
          Trending
        </Typography>
        <VideoGrid isLoading={isLoading} videos={trendingVids} />
      </div>
    </Container>
  );
};

export default HomePage;
