import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Divider } from "@material-ui/core";
import { capitalize } from "lodash";

import VideoGrid from "../Video/VideoGrid";
import { categories } from "../../utils";
import { getHomeVideos, getTrendingVideos } from "../../redux/actions/videos";
import VideoList from "../Video/VideoList";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
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
const TrendingPage = ({ location }) => {
  const { category: categoryId } = queryString.parse(location.search);
  const trendingVids = useSelector(({ videos }) => videos.trending);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingVideos(categoryId));
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.text}>
          {capitalize(categories[categoryId]) || "Trending"}
        </Typography>
        <Divider light className={classes.divider} />
        <VideoList isLoading={isLoading} videos={trendingVids} />
      </div>
    </Container>
  );
};

export default TrendingPage;
