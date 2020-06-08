const initialState = {
  isAuth: false,
  name: null,
  email: null,
  profileImg: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
    case "SET_AUTH":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
