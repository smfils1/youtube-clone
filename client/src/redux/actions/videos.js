import axios from "axios";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const setTrending = (trending) => {
  return {
    type: "SET_TRENDING",
    payload: { trending },
  };
};

const setRecommended = (recommended) => {
  return {
    type: "SET_RECOMMENDED",
    payload: { recommended },
  };
};

const setLoading = (isLoading) => {
  return {
    type: "SET_LOADING",
    payload: { isLoading },
  };
};

const resetVideos = () => {
  return {
    type: "RESET_VIDEOS",
  };
};

const getHomeVideos = () => {
  return async (dispatch) => {
    dispatch(resetVideos());

    dispatch(getRecommended());
    dispatch(getTrending());
  };
};

const getRecommended = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const {
        data: { videos },
      } = await api.get("/api/videos/recommended");
      console.log(videos);
      dispatch(setRecommended(videos));
    } catch (err) {
      dispatch(setRecommended([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const getTrending = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const {
        data: { videos },
      } = await api.get("/api/videos/trending");
      dispatch(setTrending(videos));
    } catch (err) {
      dispatch(setTrending([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export { getRecommended, getTrending, getHomeVideos };
