import axios from "axios";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const setAuth = (isAuth) => {
  return {
    type: "SET_AUTH",
    payload: { isAuth },
  };
};

const setChannelInfo = (channel) => {
  return {
    type: "SET_CHANNEL_INFO",
    payload: channel,
  };
};

const logoutChannel = (history) => {
  return async (dispatch) => {
    try {
      await api.get("/api/auth/google/logout");
      dispatch(setAuth(false));
      dispatch(
        setChannelInfo({
          id: null,
          name: null,
          email: null,
          image: null,
        })
      );
      history.push("/");
    } catch (err) {
      dispatch(setAuth(false));
      dispatch(
        setChannelInfo({
          id: null,
          name: null,
          email: null,
          image: null,
        })
      );
    }
  };
};

const auth = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.get("/api/channels/owner");
      dispatch(setAuth(true));
      dispatch(
        setChannelInfo({
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.imageLink,
        })
      );
    } catch (err) {
      dispatch(setAuth(false));
      dispatch(
        setChannelInfo({
          id: null,
          name: null,
          email: null,
          image: null,
        })
      );
    }
  };
};
export { auth, logoutChannel, setChannelInfo };
