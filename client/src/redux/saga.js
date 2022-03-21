import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import { CHECK_USER, LOG_USER, REG_USER, UPDATE_USER } from './actionTypes/userAT';
import { editUser, initUser } from './actionCreators/userAC';


function* workerLogUser(action) {
  const data = action.payload;
  const navigate = action.callback;

  try {
    const response = yield call(axios, {
      url: '/api/login',
      method: 'POST',
      data,
    });

    const { token, info, role } = response.data;

    localStorage.setItem('auth_token', token);
    yield put(initUser(info, role));
    navigate('/');

  } catch (err) {
    const { status } = err.response;

    switch (status) {
      case 400:
        return window.alert("Неправильный пароль");
      case 404:
        return window.alert("E-mail не найден");
      default:
        console.log(err.response.data.error);
        return window.alert('Ошибка');
    }
  }
}

function* workerRegUser(action) {
  const data = action.payload;
  const navigate = action.callback;

  try {
    const response = yield call(axios, {
      url: '/api/registration',
      method: 'POST',
      data: data,
    });

    const { token, info, role } = response.data;

    localStorage.setItem('auth_token', token);
    yield put(initUser(info, role));
    navigate('/');

  } catch (err) {
    const { status, data } = err.response
    // TODO: переделать вывод информации с алерта на текст около кнопки
    switch (status) {
      case 400:
        return window.alert('Некорректеные данные');
      case 501:

        if (data.message === 'changeEmail') return window.alert('E-mail уже используется');
        return window.alert('Номер телефона уже используется');

      default:
        console.log(err.response.data.error);
        return window.alert('Ошибка');
    }
  }
}

function* workerUpdateUser(action) {
  const data = action.payload

  try {
    const response = yield call(axios, {
      url: '/api/updateUser',
      method: 'PUT',
      data: data,
    })
    const { info } = response.data

    yield put(editUser(info))
    // TODO: переделать вывод информации с алерта на текст около кнопки
    return window.alert('Данные обновлены')
  } catch (err) {
    const { status, data } = err.response
    // TODO: переделать вывод информации с алерта на текст около кнопки
    switch (status) {
      case 400:
        return window.alert('Некорректеные данные')
      case 403:
        return window.alert('Введен неправильный пароль')
      case 501:

        if (data.message === 'changeEmail') return window.alert('E-mail уже используется')
        return window.alert('Номер телефона уже используется')

      default:
        console.log(err.response.data.error);
        return window.alert('Ошибка')
    }
  }
}

function* workerCheckUser(action) {
  try {
    const response = yield call(axios, {
      url: '/api/checkUser',
    });

    const { info, role } = response.data;
    yield put(initUser(info, role));
  } catch (err) {
    console.log(err.response.data.error);
  }
}


function* watcherUser() {
  yield takeEvery(LOG_USER, workerLogUser);
  yield takeEvery(UPDATE_USER, workerUpdateUser);
  yield takeEvery(REG_USER, workerRegUser);
  yield takeEvery(CHECK_USER, workerCheckUser);
}

export default function* rootSaga() {
  yield all([
    watcherUser(),
  ]);
};
