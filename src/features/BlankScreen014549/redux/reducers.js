import {
  FORM_START,
  FORM_END,
  FORM_FB_START,
  FORM_FB_END,
  SHOW_LOADER,
  HIDE_LOADER,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  UPDATE_USER,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  CLEAR_ERROR,
  CHECK_AUTH_START,
  AUTH_LOGOUT,
  GET_FCM_TOKEN,
} from './actions';
import { updateObject } from '../../../redux/utility';

const initialState = {
  user: {},
  accessToken: null,
  errorMsg: '',
  message: '',
  loading: false,
  submit: false,
  fbsubmit: false,
  fcmPushToken: null,
};

const showLoader = (state, action) => {
  return updateObject(state, { loading: true });
};

const hideLoader = (state, action) => {
  return updateObject(state, { loading: false });
};

const formStart = (state, action) => {
  return updateObject(state, { submit: true });
};

const formEnd = (state, action) => {
  return updateObject(state, { submit: false });
};

const formfbStart = (state, action) => {
  return updateObject(state, { fbsubmit: true });
};

const formfbEnd = (state, action) => {
  return updateObject(state, { fbsubmit: false });
};

const authStart = (state, action) => {
  return updateObject(state, { errorMsg: action.errorMsg });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    accessToken: action.accessToken,
    user: action.user,
    errorMsg: action.errorMsg,
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const updateUser = (state, action) => {
  return updateObject(state, {
    user: action.user,
    errorMsg: action.errorMsg,
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const changePassword = (state, action) => {
  return updateObject(state, {
    errorMsg: action.errorMsg,
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const resetPassword = (state, action) => {
  return updateObject(state, {
    message: action.message,
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    errorMsg: action.errorMsg,
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const checkAuthStart = (state, action) => {
  return updateObject(state, {
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const clearError = (state, action) => {
  return updateObject(state, {
    errorMsg: action.errorMsg,
    message: action.message,
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    accessToken: null,
    user: {},
    loading: false,
    submit: false,
    fbsubmit: false,
  });
};

const getFcmPushToken = (state, action) => {
  return updateObject(state, {
    fcmPushToken: action.fcmPushToken,
  });
};

const EmailAuthReducer = (state = initialState, action) => {
  console.log('REDUX ACTION', action)
  switch (action.type) {
    case SHOW_LOADER:
      return showLoader(state, action);
    case HIDE_LOADER:
      return hideLoader(state, action);
    case FORM_START:
      return formStart(state, action);
    case FORM_END:
      return formEnd(state, action);
    case FORM_FB_START:
      return formfbStart(state, action);
    case FORM_FB_END:
      return formfbEnd(state, action);
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case UPDATE_USER:
      return updateUser(state, action);
    case CHANGE_PASSWORD:
      return changePassword(state, action);
    case RESET_PASSWORD:
      return resetPassword(state, action);
    case GET_FCM_TOKEN:
      return getFcmPushToken(state, action);
    case CHECK_AUTH_START:
      return checkAuthStart(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case CLEAR_ERROR:
      return clearError(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default EmailAuthReducer;