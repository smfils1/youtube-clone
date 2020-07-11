import axios from "axios";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const setModal = (isOpen) => {
  return {
    type: "SET_MODAL",
    payload: { isOpen },
  };
};

const setLoading = (isLoading) => {
  return {
    type: "SET_LOADING",
    payload: { isLoading },
  };
};

const setVideoFile = (filename) => {
  return {
    type: "SET_VIDEO_FILE",
    payload: { filename },
  };
};

const setThumbnails = (thumbnails) => {
  return {
    type: "SET_THUMBNAILS",
    payload: { thumbnails },
  };
};

const setThumbnail = (thumbnail) => {
  return {
    type: "SET_THUMBNAIL",
    payload: { thumbnail },
  };
};

const setDetails = (details) => {
  return {
    type: "SET_DETAILS",
    payload: { details },
  };
};

const setVisibility = (visibility) => {
  return {
    type: "SET_VISIBILITY",
    payload: { visibility },
  };
};

const uploadVideo = (file) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);
      const { data: video } = await api.post("/api/videos", formData, config);
      const filename = video.filename;
      dispatch(setVideoFile(filename));
      const { data } = await api.post("/api/videos/thumbnails", {
        filename,
      });
      dispatch(setThumbnails(data.thumbnails));
    } catch (err) {
      dispatch(setVideoFile(null));
      dispatch(setThumbnails(null));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export { setModal, uploadVideo, setThumbnail, setDetails, setVisibility };
