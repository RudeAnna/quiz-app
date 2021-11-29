import {
  SAVE_USERNAME,
  GET_QUIZ_REQUEST,
  GET_QUIZ_SUCCESS,
  GET_QUIZ_FAILURE,
  SAVE_ANSWER,
  SET_RESULT,
  SET_ALL_RESULTS,
  DELETE_SCORE
} from "./quizTypes";

const initialState = {
  currentUser: "",
  result: {},
  quiz: [],
  listOfResults: [],
  isFetching: false,
  error: "",
  score: 0,
};
const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USERNAME:
      localStorage.setItem("CurrentUser", action.payload);
      return {
        ...state,
        currentUser: action.payload,
      };
    case GET_QUIZ_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_QUIZ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        quiz: [...action.payload.results],
      };
    case GET_QUIZ_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case SAVE_ANSWER:
      return {
        ...state,
        score: state.score + action.payload,
        result: {
          user: state.currentUser,
          score: state.score + action.payload,
        },
      };

    case SET_RESULT:   
      return {
          ...state,
        result: { user: state.currentUser, score: state.score },
        listOfResults: [
          ...state.listOfResults,
          { user: state.currentUser, score: state.score },
        ],
      };

      case SET_ALL_RESULTS:
      return {
          ...state,
        listOfResults: action.payload,
      };

      case DELETE_SCORE:
          return {
              ...state,
              score: 0,
          }
    default:
      return state;
  }
};

export default quizReducer;
