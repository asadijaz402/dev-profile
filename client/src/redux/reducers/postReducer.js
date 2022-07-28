import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
} from "../action/types";

const initialState = {
  posts: [],
  loading: false,
  post: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    case GET_POST:
      return { ...state, post: action.payload, loading: false };

    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default postReducer;
