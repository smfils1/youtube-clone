import axios from "axios";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const setComments = (comments) => {
  return {
    type: "SET_COMMENTS",
    payload: comments,
  };
};

const addComment = (comment) => {
  return {
    type: "ADD_COMMENT",
    payload: comment,
  };
};

const setLoading = (isLoading) => {
  return {
    type: "SET_LOADING",
    payload: { isLoading },
  };
};

const resetComments = () => {
  return {
    type: "RESET_COMMENTS",
  };
};

const getVideoComments = (videoId) => {
  return async (dispatch) => {
    dispatch(resetComments());
    dispatch(getComments(videoId));
  };
};

const getComments = (videoId) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    try {
      const {
        data: { comments },
      } = await api.get(`/api/comments/${videoId}`);
      dispatch(setComments(comments));
    } catch (err) {
      dispatch(setComments([]));
    } finally {
      //  dispatch(setLoading(false));
    }
  };
};

const postVideoComment = ({ videoId, content, commentBy, commentTo }) => {
  return async (dispatch) => {
    try {
      const data = { videoId, content, commentBy, commentTo };
      const {
        data: { comments },
      } = await api.post("/api/comments", data);
      dispatch(setComments(comments));
    } catch (err) {
      console.log(err);
    }
  };
};

export { postVideoComment, getVideoComments, addComment, resetComments };
