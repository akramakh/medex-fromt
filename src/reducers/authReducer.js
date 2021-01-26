/* eslint-disable import/no-cycle */
/* eslint-disable default-case */
import * as types from '../actions/types'

const userObj = {
  token: null
};

export default function reducer(
  state = {
    user: {
      ...userObj
    },
    token: null
  },
  action,
) {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
        token: action.payload.token,
        user: {...state.user, ...action.payload.user}
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        token: null,
      };
    }
    case types.UPDATE_USER: {
      return {
        ...state,
        user: {...state.user, ...action.payload.user},
      };
    }
  }
  return state;
}
