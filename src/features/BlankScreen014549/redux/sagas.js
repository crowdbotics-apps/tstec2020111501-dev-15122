import {all, takeLatest, put, call, delay} from 'redux-saga/effects';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {appConfig} from '../../../config/app';
import axios from 'axios';
import axiosAuth from '../../../utils/http';
import * as RootNavigation from '../../../navigation/RootNavigation';
import * as actions from './actions';

async function getFcmToken() {
  return await messaging().getToken();
}

function* logoutSaga(action) {
  yield AsyncStorage.removeItem('token');
  yield AsyncStorage.removeItem('expirationDate');
  try {
    yield axios.get(`${appConfig.API_URL}/auth/logout/`);
    yield put(actions.logoutSucceed());
  } catch (err) {
    console.log('logout api fail', err)
    yield put(actions.logoutSucceed());
  }
}

function* authCheckStateSaga(action) {
  yield put(actions.showLoader());
  const token = yield AsyncStorage.getItem('token');
  if (!token || token === undefined) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      AsyncStorage.getItem('expirationDate'),
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      try {
        const res = yield axiosAuth.get('/auth/user/');
        yield put(actions.authSuccess(token, res.data));
        yield put(
          actions.checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
          ),
        );
      } catch (error) {
        yield put(actions.logout());
      }
    }
  }
}

function* signInSaga(action) {
  yield put(actions.formStart());
  try {
    const res = yield axios.post(
      `${appConfig.API_URL}/auth/login/`,
      action.params,
    );
    
    var resHeader = res.headers['set-cookie'][0]
    var resArr = resHeader.split(";")
    var sessionid = undefined
    
    resArr.forEach(element => {
      if(element.includes("sessionid")){
        sessionid = element.split("=")[2]
      }
    });


    if (res.data.user.user_type === 1) {
      const expirationDate = yield new Date(new Date().getTime() + 3600 * 1000);
      yield AsyncStorage.setItem(
        'expirationDate',
        JSON.stringify(expirationDate),
      );
      yield AsyncStorage.setItem('sessionid', sessionid);
      yield AsyncStorage.setItem('token', res.data.token);
      yield put(actions.authSuccess(res.data.token, res.data.user));
      yield put(actions.formEnd());

    } else {
      yield put(
        actions.authFail('Unable to log in with provided credentials.'),
      );
      yield put(actions.formEnd());
      yield put(actions.logout());
    }
  } catch (error) {
    console.log(error.response.data, 'signIn error');
    if (error.response.data.non_field_errors) {
      yield put(actions.authFail(error.response.data.non_field_errors[0]));
    } else {
      yield put(actions.authFail(error.response.data.detail));
    }
    yield put(actions.formEnd());
  }
}

function* signUpSaga(action) {
  yield put(actions.formStart());
  try {
    const res = yield axios.post(
      `${appConfig.API_URL}/auth/registration/`,
      action.params,
    );
    const expirationDate = yield new Date(new Date().getTime() + 3600 * 1000);
    yield AsyncStorage.setItem(
      'expirationDate',
      JSON.stringify(expirationDate),
    );
    yield AsyncStorage.setItem('token', res.data.token);
    yield put(actions.authSuccess(res.data.token, res.data.user));
    yield put(actions.formEnd());
  } catch (error) {
    console.log(error.response.data, 'signIn');
    if (error.response.data.email) {
      yield put(actions.authFail(error.response.data.email[0]));
    } else if (error.response.data.phone) {
      yield put(actions.authFail(error.response.data.phone[0]));
    } else {
      yield put(actions.authFail(error.response.data.detail));
    }
    yield put(actions.formEnd());
  }
}

function* fbLoginSaga(action) {
  yield put(actions.formFBStart());
  try {
    const res = yield axios.post(
      `${appConfig.API_URL}/auth/facebook/connect/`,
      action.params,
    );
    if (res.data.user.user_type === 1) {
      const expirationDate = yield new Date(new Date().getTime() + 3600 * 1000);
      yield AsyncStorage.setItem(
        'expirationDate',
        JSON.stringify(expirationDate),
      );
      yield AsyncStorage.setItem('token', res.data.token);
      // yield put(actions.authSuccess(res.data.token, res.data.user));
      yield delay(500);
      yield axiosAuth.get(`/auth/save-user-type/${action.params.user_type}`);
      yield delay(500);
      const resAuth = yield axiosAuth.get('/auth/user/');
      yield put(actions.authSuccess(res.data.token, resAuth.data));
      yield put(actions.formFBEnd());
    } else {
      yield put(
        actions.authFail('Unable to log in with provided credentials.'),
      );
      yield put(actions.formFBEnd());
      yield put(actions.logout());
    }
  } catch (error) {
    console.log(error.response.data, 'fbLogin');
    if (error.response.data.non_field_errors) {
      put(actions.authFail(error.response.data.non_field_errors[0]));
    } else {
      put(actions.authFail(error.response.data.detail));
    }
    yield put(actions.formFBEnd());
  }
}

function* setFcmTokenSaga(action) {
  const fcmToken = yield call(getFcmToken);
  try {
    const res = yield axiosAuth.get(`/auth/devices/${fcmToken}/`);
    if (res.data.registration_id) {
      yield put(actions.getFcmPushToken(res.data.registration_id));
    }
  } catch (error) {
    console.log(error, 'error');
    if (error.response.status === 404 || error.response.status === 400) {
      const fields = {
        ...action.params,
        registration_id: fcmToken,
      };
      const res = yield axiosAuth.post('/auth/devices/', fields);
      if (res.data.registration_id) {
        yield put(actions.getFcmPushToken(res.data.registration_id));
      }
    }
  }
}

function* updateUserInfoSaga(action) {
  yield put(actions.formStart());
  const token = yield AsyncStorage.getItem('token');
  try {
    const res = yield axiosAuth.put('/auth/user/', action.params);
    yield put(actions.authSuccess(token, res.data));
    yield put(actions.formEnd());
    yield call(action.callback);
  } catch (error) {
    console.log(error.response, 'updateUserInfoSaga-error');
    if (error.response.data.non_field_errors) {
      yield put(actions.authFail(error.response.data.non_field_errors[0]));
    } else {
      yield put(actions.authFail(error.response.data.detail));
    }
    yield put(actions.formEnd());
  }
}

function* updateRiderProfileSaga(action) {
  yield put(actions.formStart());
  const token = yield AsyncStorage.getItem('token');
  try {
    yield axiosAuth.put(
      `/userprofile/${action.rider_pro_id}/`,
      action.params,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const res = yield axiosAuth.get('/auth/user/');
    yield put(actions.authSuccess(token, res.data));
    yield put(actions.formEnd());
  } catch (error) {
    console.log(error.response, 'updateRiderProfileSaga-errors');
    if (error.response.data.non_field_errors) {
      yield put(actions.authFail(error.response.data.non_field_errors[0]));
    } else {
      yield put(actions.authFail(error.response.data.detail));
    }
    yield put(actions.formEnd());
  }
}

function* onClearAllErrorsSaga(action) {
  yield put(actions.clearError());
}

export default all([
  takeLatest(actions.AUTH_INITIATE_LOGOUT, logoutSaga),
  takeLatest(actions.AUTH_CHECK_STATE, authCheckStateSaga),
  takeLatest(actions.AUTH_LOGIN, signInSaga),
  takeLatest(actions.AUTH_SIGNUP, signUpSaga),
  takeLatest(actions.FB_AUTH_LOGIN, fbLoginSaga),
  takeLatest(actions.INIT_CLEAR_ERROR, onClearAllErrorsSaga),
  takeLatest(actions.SET_FCM_TOKEN, setFcmTokenSaga),
  takeLatest(actions.UPDATE_USER_INFO, updateUserInfoSaga),
  takeLatest(actions.UPDATE_RIDER_INFO, updateRiderProfileSaga),
]);