const initialState = {
  id: null,
  isAuth: false,
  name: null,
  email: null,
  image: null,
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHANNEL_INFO":
    case "SET_AUTH":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default channelReducer;
