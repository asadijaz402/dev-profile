import { SC } from "../../components/helper/ServerCall";

import {
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  SET_USER,
} from "./types";

export const getProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  SC.getCall({ url: "/profile" })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};

export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  SC.getCall({ url: "/profile/all" })
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: null,
      });
    });
};

export const createProfile = (data, navigate) => (dispatch) => {
  
  SC.postCall({ url: "/profile", data })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      navigate("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteProfile = () => (dispatch) => {
  if (window.confirm("Are you sure? This can Not be unDone!")) {
    SC.deleteCall({ url: "/profile" })
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};

export const addExperience = (data, navigate) => (dispatch) => {
  SC.postCall({ url: "/profile/experience", data })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      navigate("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addEducation = (data, navigate) => (dispatch) => {
  SC.postCall({ url: "/profile/education", data })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      navigate("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteExperience = (id) => (dispatch) => {
  SC.deleteCall({ url: `/profile/experience/${id}` })
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
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

export const deleteEducation = (id) => (dispatch) => {
  SC.deleteCall({ url: `/profile/education/${id}` })
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
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

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  SC.getCall({ url: `/profile/handle/${handle}` })
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: null,
      });
    });
};
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
