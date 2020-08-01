import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Divider } from "@material-ui/core";
import VideoGrid from "../Video/VideoGrid";
import { getHomeVideos } from "../../redux/actions/videos";
import Banner from "../Banner";
import youtubeIcon from "../../assets/youtube-icon.png";
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
  const isAuth = useSelector(({ channel }) => channel.isAuth);
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const trendingVids = useSelector(({ videos }) => videos.trending);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeVideos());
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Banner closeable>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            padding: "1em",
          }}
        >
          {" "}
          <img
            style={{
              alignSelf: "center",
            }}
            src={youtubeIcon}
            height="60%"
          />
          <div
            style={{
              margin: "2em",
            }}
          >
            <h1
              style={{
                fontSize: "4em",
              }}
            >
              FullStack Clone
            </h1>
            <h1
              style={{
                fontSize: "2em",
              }}
            >
              <a
                style={{
                  color: "red",
                }}
                href="https://github.com/smfils1/youtube-clone"
              >
                GitHub Repo
              </a>
            </h1>
            <p>* For Educational Purposes</p>
          </div>
        </div>
      </Banner>
      <Container maxWidth="xl" className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" className={classes.text}>
            Recommended
          </Typography>

          <VideoGrid
            type="vertical_2"
            isLoading={isLoading}
            videos={recommendedVids}
          />
          <Divider light className={classes.divider} />
          <Typography variant="h5" className={classes.text}>
            Trending
          </Typography>
          <VideoGrid
            type="vertical_2"
            isLoading={isLoading}
            videos={trendingVids}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
