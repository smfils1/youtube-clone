const initialState = {
  isDrawerOpen: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "SET_DRAWER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default layoutReducer;
