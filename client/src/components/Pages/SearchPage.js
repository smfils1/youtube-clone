import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import {
  Container,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";

import VideoList from "../Video/VideoList";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
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
const SearchPage = ({ location, history }) => {
  const { search_query } = queryString.parse(location.search);
  const [videoResults, setVideoResult] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const isMaxScreenSm = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        const {
          data: { videos },
        } = await api.get(`/api/videos/search?search_query=${search_query}`);
        setVideoResult(videos || []);
      } catch (err) {
        setVideoResult([]);
      }
    };
    fetchVideoContent();
  }, [search_query]);

  if (!search_query) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container maxWidth="xl" className={classes.root}>
        {(() => {
          if (videoResults.length && isMaxScreenSm) {
            return <VideoList type="vertical_2" videos={videoResults} />;
          } else if (videoResults.length && !isMaxScreenSm) {
            return <VideoList type="horizontal_1" videos={videoResults} />;
          } else {
            return "No videos found";
          }
        })()}
      </Container>
    );
  }
};

export default SearchPage;
