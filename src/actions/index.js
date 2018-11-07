import axios from 'axios';
import { AUTH_FIRSTNAME, AUTH_MIDDLENAME, AUTH_LASTNAME, AUTH_USERNAME, AUTH_TOKEN, AUTH_ID, AUTH_ERROR, QUIZ_ERROR, QUIZ_SCORE, QUIZ_ITEM_COUNT } from './types';
import { api_address } from '../variables';

const api = axios.create({
  baseURL: api_address
});

if(localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export const getUserInfo = callback => async dispatch => {

  try {
    const response = await api.get(
      'api/users/info'
    );

    dispatch({ type: AUTH_FIRSTNAME, payload: response.data[0].firstname });
    dispatch({ type: AUTH_MIDDLENAME, payload: response.data[0].middlename });
    dispatch({ type: AUTH_LASTNAME, payload: response.data[0].lastname });
    dispatch({ type: AUTH_USERNAME, payload: response.data[0].name });
    dispatch({ type: AUTH_ID, payload: response.data[0].id });
    callback(response.data[0].id);
  } catch (e) {
    callback(0);
    dispatch({ type: AUTH_ERROR, payload: 'Could not get user info' });
  }
};

export const getQuizzesByUser = (userProps, callback) => async dispatch => {

  try {
    const response = await api.get(
      'api/quiz/user/' + userProps.id
    );

    callback(response.data);
  } catch (e) {
    dispatch({ type: QUIZ_ERROR, payload: 'Could not get quiz by ID' });
  }

};

export const getAttemptsByUserQuizID = (quizProps, callback) => async dispatch => {

  try {
    const response = await api.get(
      'api/quiz/attempts/' + quizProps.user_quiz_id
    );

    callback(response.data);
  } catch (e) {
    dispatch({ type: QUIZ_ERROR, payload: 'Could not get quiz by UserQuizID' });
  }

};

export const gradeQuiz = (submitProps, callback) => dispatch => {

  let score = 0;
  dispatch({ type: QUIZ_ITEM_COUNT, payload: submitProps.UserResponses.length });

  submitProps.UserResponses.map(async (response, i) => {
    if(response){
      let splitResponse = response.split('_');
      try {
        const response = await api.get(
          'api/score/checkanswer/' + splitResponse[1].substr(1) + '/' + splitResponse[0].substr(1)
        );
        score += response.data[0].isCorrect;
        dispatch({ type: QUIZ_SCORE, payload: score });
        callback();
      } catch (e) {
        dispatch({ type: QUIZ_ERROR, payload: 'Could not get quiz by ID' });
      }
    }
    return 'ok';
  })

};

export const getOptionsByID = (quizProps, callback) => async dispatch => {

  try {
    const response = await api.get(
      'api/options/' + quizProps.id
    );

    callback(response.data);
  } catch (e) {
    dispatch({ type: QUIZ_ERROR, payload: 'Could not get quiz by ID' });
  }
};

export const getStemsByID = (quizProps, callback) => async dispatch => {

  try {
    const response = await api.get(
      'api/stems/' + quizProps.id
    );

    callback(response.data);
  } catch (e) {
    dispatch({ type: QUIZ_ERROR, payload: 'Could not get quiz by ID' });
  }
};

export const getQuizByID = (quizProps, callback) => async dispatch => {

  try {
    const response = await api.get(
      'api/quiz/' + quizProps.id
    );

    callback(JSON.stringify(response.data[0]));
  } catch (e) {
    dispatch({ type: QUIZ_ERROR, payload: 'Could not get quiz by ID' });
  }
};

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await api.post(
      'api/users/register',
      formProps
    );

    dispatch({ type: AUTH_TOKEN, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Username in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {

  // returns token
  try {
    const response = await api.post(
      'api/users',
      formProps
    );

    dispatch({ type: AUTH_TOKEN, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_TOKEN,
    payload: ''
  };
};
