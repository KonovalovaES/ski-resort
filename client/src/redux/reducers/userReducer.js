import { DELETE_USER, EDIT_USER, INIT_USER, UPDATE_AVATAR } from '../actionTypes/userAT';

export const userReducer = (state = { auth: undefined }, action) => {
  switch (action.type) {
    case INIT_USER:
      const { info, role } = action.payload;
      return { ...info, role, auth: true };
    case EDIT_USER:
      return { ...state, ...action.payload.info };
    case DELETE_USER:
      return { auth: false };
    case UPDATE_AVATAR:
      return { ...state, photo: action.payload };
    default:
      return state;
  }
}
