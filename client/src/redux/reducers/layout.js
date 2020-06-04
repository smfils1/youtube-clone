const initialState = {
  isDrawerOpen: false,
  isMobileSearchClick: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "SET_DRAWER":
    case "ACTIVATE_MOBILE_SEARCH":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default layoutReducer;
