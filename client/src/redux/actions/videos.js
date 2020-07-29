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

const getSuggestedVideos = () => {
  return async (dispatch) => {
    dispatch(resetVideos());
    dispatch(getRecommended());
  };
};

const getTrendingVideos = (categoryId) => {
  return async (dispatch) => {
    dispatch(resetVideos());
    dispatch(getTrending(categoryId));
  };
};

const getRecommended = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const {
        data: { videos },
      } = await api.get("/api/videos/recommended");
      dispatch(setRecommended(videos));
    } catch (err) {
      console.error(err);
      dispatch(setRecommended([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const getTrending = (categoryId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const {
        data: { videos },
      } = await api.get(`/api/videos/trending/${categoryId || ""}`);
      dispatch(setTrending(videos));
    } catch (err) {
      dispatch(setTrending([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export {
  getTrendingVideos,
  getRecommended,
  getSuggestedVideos,
  getTrending,
  getHomeVideos,
};
