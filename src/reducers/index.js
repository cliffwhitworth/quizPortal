import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import auth from './auth';
import quiz from './quiz';

export default combineReducers ({
  auth,
  quiz,
  reduxFormReducer
})
