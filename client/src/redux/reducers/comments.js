const initialState = {
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return [...action.payload];
    case "ADD_COMMENT":
      return [action.payload, ...state];
    case "RESET_COMMENTS":
      return [];
    default:
      return state;
  }
};
export default commentsReducer;
