import { AUTH_FIRSTNAME, AUTH_MIDDLENAME, AUTH_LASTNAME, AUTH_USERNAME,  AUTH_TOKEN, AUTH_ID, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  emailMessage: '',
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case AUTH_FIRSTNAME:
      return { ...state, firstname: action.payload };
    case AUTH_MIDDLENAME:
      return { ...state, middlename: action.payload };
    case AUTH_LASTNAME:
      return { ...state, lastname: action.payload };
    case AUTH_USERNAME:
      return { ...state, username: action.payload };
    case AUTH_TOKEN:
      return { ...state, token: action.payload };
    case AUTH_ID:
      return { ...state, id: action.payload };
    case AUTH_ERROR:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
