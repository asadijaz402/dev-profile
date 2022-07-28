import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS,
} from "./types";
import { SC } from "../../components/helper/ServerCall";
export const addPost = (data) => (dispatch) => {
  dispatch(clearErrors())
  SC.postCall({ url: "/post", data })
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getPost = (id) => (dispatch) => {

  dispatch(clearErrors())
  dispatch(postLoading());
  SC.getCall({ url: `/post/${id}` }).then((res) => {
    dispatch({
      type: GET_POST,
      payload: res.data,
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
  });
};

export const getPosts = () => (dispatch) => {
  dispatch(clearErrors())
  dispatch(postLoading());
  SC.getCall({ url: "/post" }).then((res) => {
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    }).catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: null,
      });
    });
  });
};

export const postDelete = (id) => (dispatch) => {
  dispatch(clearErrors())
  dispatch(postLoading());
  SC.deleteCall({ url: `/post/${id}` }).then((res) => {
    dispatch({
      type: DELETE_POST,
      payload: id,
    }).catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: err.response.data,
      });
    });
  });
};

export const addLike = (id) => (dispatch) => {
  dispatch(clearErrors())
  SC.postCall({ url: `/post/like/${id}` })
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: [],
      });
      dispatch(getPosts());
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addComment = (id, data) => (dispatch) => {
  dispatch(clearErrors())
  SC.postCall({ url: `/post/comment/${id}`, data })
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: [],
      });
      dispatch(getPost(id));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteComment = (postId, id) => (dispatch) => {
  dispatch(clearErrors())
  SC.deleteCall({ url: `/post/comment/${postId}/${id}` })
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: [],
      });
      dispatch(getPost(postId));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const postLoading = () => (dispatch) => {
  dispatch({
    type: POST_LOADING,
  });
};
