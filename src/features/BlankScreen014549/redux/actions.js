export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const FORM_START = 'FORM_START';
export const FORM_END = 'FORM_END';
export const FORM_FB_START = 'FORM_FB_START';
export const FORM_FB_END = 'FORM_FB_END';
export const AUTH_START = 'AUTH_START';
export const CHECK_AUTH_START = 'CHECK_AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const UPDATE_USER = 'UPDATE_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REMOVE_TOKEN = 'AUTH_REMOVE_TOKEN';
export const SET_FCM_TOKEN = 'SET_FCM_TOKEN';
export const GET_FCM_TOKEN = 'GET_FCM_TOKEN';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const INIT_CLEAR_ERROR = 'INIT_CLEAR_ERROR';
export const FB_AUTH_LOGIN = 'FB_AUTH_LOGIN';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_SIGNUP = 'AUTH_SIGNUP';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_RIDER_INFO = 'UPDATE_RIDER_INFO';

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };