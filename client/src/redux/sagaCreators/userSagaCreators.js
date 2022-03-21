import { CHECK_USER, LOG_USER, REG_USER, UPDATE_USER } from "../actionTypes/userAT";


export const loginUser = (data, navigate) => {
  return {
    type: LOG_USER,
    payload: data,
    callback: navigate,
  };
};

export const registrationUser = (data, navigate) => {
  return {
    type: REG_USER,
    payload: data,
    callback: navigate,
  };
};

export const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};

export const checkUser = () => {
  return {
    type: CHECK_USER,
  };
};
