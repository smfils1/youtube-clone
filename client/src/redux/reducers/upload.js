const initialState = {
  isOpen: false,
  filename: null,
  isLoading: false,
  thumbnailFilename: null,
  thumbnails: null,
  details: null,
  visibility: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL":
    case "SET_LOADING":
    case "SET_VIDEO_FILE":
    case "SET_THUMBNAILS":
    case "SET_THUMBNAIL":
    case "SET_DETAILS":
    case "SET_VISIBILITY":
      return { ...state, ...action.payload };
    case "RESET_UPLOAD":
      return { ...initialState };
    default:
      return state;
  }
};
export default uploadReducer;
