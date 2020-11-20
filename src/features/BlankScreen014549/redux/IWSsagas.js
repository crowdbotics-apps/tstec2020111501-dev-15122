import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';
import { NavigationActions } from 'react-navigation';

import Toast from 'react-native-simple-toast';
import {
  EMAIL_AUTH_LOGIN_REQUEST,
  EMAIL_AUTH_LOGIN_ERROR,
  EMAIL_AUTH_SIGNUP_REQUEST,
  EMAIL_AUTH_PASSWORD_RECOVER_REQUEST,
  EMAIL_AUTH_LOGIN_SUCCESS,
  EMAIL_AUTH_SIGNUP_ERROR,
  EMAIL_AUTH_SIGNUP_SUCCESS,
  EMAIL_AUTH_PASSWORD_RECOVER_SUCCESS,
  EMAIL_AUTH_PASSWORD_RECOVER_ERROR,
  EMAIL_AUTH_PASSWORD_RESET_REQUEST,
  EMAIL_AUTH_PASSWORD_RESET_SUCCESS,
  EMAIL_AUTH_PASSWORD_RESET_ERROR
} from './constants';
import {request} from '../../../utils/http';

function sendLogin({email, password}) {
  return request.post('/api/v1/login/', {
    username: email,
    password,
  });
}

function sendSignUp({email, password}) {
  return request.post('/api/v1/signup/', {
    email,
    password,
  });
}

function sendPasswordRecovery(email) {
  //There is no reset password endpoint in backend, it's just a fake url
  return request.post('/api/v1/password-reset/', {
    email,
  });
}


function sendPasswordReset({password,token}) {
  //There is no reset password endpoint in backend, it's just a fake url
  return request.post('/api/v1/password-reset/confirm/', {
    password,
    token
  });
}

function* handleLogin(action) {
  const {
    user: {email, password},
  } = action;
  try {
    const {status, data} = yield call(sendLogin, {email, password});
    console.log(status, data)
    if (status === 200) {
      yield put({
        type: EMAIL_AUTH_LOGIN_SUCCESS,
        accessToken: data.token,
        user: data.user,
      });

      // you can change the navigate for navigateAndResetStack to go to a protected route
      NavigationService.navigate('MainApp');
    } else {
      yield put({
        type: EMAIL_AUTH_LOGIN_ERROR,
        error: 'Unknown Error',
      });
    }
  } catch (error) {
    console.log("EMAIL_AUTH_LOGIN_ERROR", error)
    Toast.show("Can't sign in with provided credentials",Toast.LONG);
    // todo add errors with similar structure in backend
    yield put({
      type: EMAIL_AUTH_LOGIN_ERROR,
      error: null,
    });
  }
}

function* handleSignUp(action) {
  const {
    user: {email, password},
  } = action;
  try {
    const {status, data} = yield call(sendSignUp, {email, password});

    console.log(status, data)
    if (status === 201) {
      yield put({
        type: EMAIL_AUTH_SIGNUP_SUCCESS,
        user: data.user,
      });

      // you can change the navigate for navigateAndResetStack to go to a protected route
      NavigationService.navigate('ConfirmationRequired');
    } else {
      yield put({
        type: EMAIL_AUTH_SIGNUP_ERROR,
        error: 'Unknown Error',
      });
    }
  } catch (error) {
    console.log(error)
    // todo add errors with similar structure in backend
    yield put({
      type: EMAIL_AUTH_SIGNUP_ERROR,
      error: "Can't sign up with provided credentials",
    });
  }
}

function* handlePasswordRecovery(action) {
  const {email} = action;

  try {
    const {status} = yield call(sendPasswordRecovery, email);

    if (status === 200) {
      yield put({
        type: EMAIL_AUTH_PASSWORD_RECOVER_SUCCESS,
        email,
      });
      Toast.show('Password reset link sent.', Toast.LONG);

    } else {
      yield put({
        type: EMAIL_AUTH_PASSWORD_RECOVER_ERROR,
        error: 'Unknown Error',
      });
    }
  } catch (error) {
    Toast.show("Can't recover password with provided email",Toast.LONG);
    yield put({
      type: EMAIL_AUTH_PASSWORD_RECOVER_ERROR,
      error: null,
    });
  }
}

function* handlePasswordReset(action) {
  const {password,token} = action;
  try {
    const {status,data} = yield call(sendPasswordReset, {password,token});
    if (status === 200) {
      yield put({
        type: EMAIL_AUTH_PASSWORD_RESET_SUCCESS,
      });
      Toast.show('Password reset successfully.', Toast.LONG);
      NavigationService.navigate('SignIn');

    } else {
      yield put({
        type: EMAIL_AUTH_PASSWORD_RESET_ERROR,
        error: "Can't reset password! Password is too common..",
      });
      Toast.show("Can't reset password! Password is too common..", Toast.LONG);
    }
  } catch (error) {
    console.log("handlePasswordReset:",error)
    yield put({
      type: EMAIL_AUTH_PASSWORD_RESET_ERROR,
      error: "Can't reset password with provided password",
    });
    Toast.show("Can't reset password! Password is too common..", Toast.LONG);
  }
}

export default all([
  takeLatest(EMAIL_AUTH_LOGIN_REQUEST, handleLogin),
  takeLatest(EMAIL_AUTH_SIGNUP_REQUEST, handleSignUp),
  takeLatest(EMAIL_AUTH_PASSWORD_RECOVER_REQUEST, handlePasswordRecovery),
  takeLatest(EMAIL_AUTH_PASSWORD_RESET_REQUEST, handlePasswordReset),
]);
