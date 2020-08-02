import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { capitalize } from "lodash";

import { HorizontalCategoryMenu } from "../Nav/CategoryMenus";
import VideoGrid from "../Video/VideoGrid";
import { categories } from "../../utils";
import { getTrendingVideos } from "../../redux/actions/videos";
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
  const theme = useTheme();
  const isMaxScreenSm = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    dispatch(getTrendingVideos(categoryId));
  }, [categoryId]);

  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.text}>
          {capitalize(categories[categoryId]) || "Trending"}
        </Typography>
        <HorizontalCategoryMenu />

        <Divider light className={classes.divider} />
        {(() => {
          if (trendingVids.length && isMaxScreenSm) {
            return (
              <VideoList
                type="vertical_2"
                isLoading={isLoading}
                videos={trendingVids}
              />
            );
          } else if (trendingVids.length && !isMaxScreenSm) {
            return (
              <VideoList
                type="horizontal_2"
                isLoading={isLoading}
                videos={trendingVids}
              />
            );
          } else {
            return "Nothing Trending";
          }
        })()}
      </div>
    </Container>
  );
};

export default TrendingPage;
