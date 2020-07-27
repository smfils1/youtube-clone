import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
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
const SearchPage = ({ location, history }) => {
  const { search_query } = queryString.parse(location.search);
  const [videoResults, setVideoResult] = useState([]);
  const classes = useStyles();

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
        <div className={classes.content}>
          {!videoResults.length ? (
            "No results found"
          ) : (
            <VideoList videos={videoResults} />
          )}
        </div>
      </Container>
    );
  }
};

export default SearchPage;
