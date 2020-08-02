import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import {
  makeStyles,
  Container,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { capitalize } from "lodash";

import { HorizontalCategoryMenu } from "../Nav/CategoryMenus";
import { categories } from "../../utils";
import { getTrendingVideos } from "../../redux/actions/videos";
import VideoList from "../Video/VideoList";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
  const theme = useTheme();
  const isMaxScreenSm = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    dispatch(getTrendingVideos(categoryId));
  }, [categoryId]);

  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h5" className={classes.text}>
        {capitalize(categories[categoryId]) || "Trending"}
      </Typography>
      <HorizontalCategoryMenu />

      <Divider light className={classes.divider} />
      {(() => {
        if (isLoading && isMaxScreenSm) {
          return (
            <VideoList
              type="vertical_2"
              isLoading={isLoading}
              videos={trendingVids}
            />
          );
        } else if (isLoading && !isMaxScreenSm) {
          return (
            <VideoList
              type="horizontal_1"
              isLoading={isLoading}
              videos={trendingVids}
            />
          );
        } else if (!isLoading && !isMaxScreenSm && trendingVids.length) {
          return (
            <VideoList
              type="horizontal_1"
              isLoading={isLoading}
              videos={trendingVids}
            />
          );
        } else {
          return "Nothing Trending";
        }
      })()}
    </Container>
  );
};

export default TrendingPage;
