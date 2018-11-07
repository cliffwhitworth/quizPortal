import { QUIZ_ERROR, QUIZ_SCORE, QUIZ_ITEM_COUNT } from '../actions/types';

const INITIAL_STATE = {
  errorMessage: '',
  quizScore: 0
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case QUIZ_ITEM_COUNT:
      return { ...state, quizItemCount: action.payload };
    case QUIZ_SCORE:
      return { ...state, quizScore: action.payload };
    case QUIZ_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
