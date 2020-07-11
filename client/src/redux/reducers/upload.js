const initialState = {
  isOpen: false,
  filename: null,
  isLoading: false,
  thumbnail: null,
  thumbnails: new Array(3).fill(
    "https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png"
  ),
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
    default:
      return state;
  }
};
export default uploadReducer;
