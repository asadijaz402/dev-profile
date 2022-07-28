/* eslint-disable no-extend-native */
import axios from "axios";
import { authHeader } from "./AuthHeader";
// import store from "../../redux/storeConfig/store";
// import { logout } from "../../redux/actions/auth";
const baseUrl = process.env.REACT_APP_BASE_API_URL;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.message === "Un-Authroized access!"
    ) {
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
export const SC = {
  getCall,
  postCall,
  putCall,
  deleteCall,
  postCallWithoutAuth,
  getCallWithId,
  postAttachment,
};

function getCall({ url, customUrl, page, params }) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params,
  };
  return axios
    .get(customUrl || baseUrl + url, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
function postCall({ url, data, callbackProgressUpload = null, source }) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
    onUploadProgress: function (progressEvent) {
      // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(baseUrl + url, data, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
}
function postAttachment({ url, data, callbackProgressUpload = null, source }) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: data,
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (callbackProgressUpload) callbackProgressUpload(percentCompleted);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(baseUrl + url, data, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
function putCall({ url, data }) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return axios
    .put(baseUrl + url, data, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
function deleteCall({ url }) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  console.log(requestOptions);
  return axios
    .delete(baseUrl + url, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function postCallWithoutAuth({ url, data }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return axios
    .post(baseUrl + url, data, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
//get data with id
function getCallWithId(url, id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return axios
    .get(baseUrl + url + "/" + id, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}
