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
import axios from "axios";

export const saveUsername = (user) => {
  return { type: SAVE_USERNAME, payload: user };
};

export const getQuizRequest = () => {
  return { type: GET_QUIZ_REQUEST };
};
export const getQuizSucess = (questions) => {
  return { type: GET_QUIZ_SUCCESS, payload: questions };
};
export const getQuizFailure = (error) => {
  return { type: GET_QUIZ_FAILURE, payload: error };
};

export const getQuiz = () => {
  return (dispatch) => {
    const requestOptions = {
      method: "GET",
      url: "https://opentdb.com/api.php?amount=10&category=23&type=multiple",
    };
    dispatch(getQuizRequest());
    return axios(requestOptions)
      .then((response) => {
        dispatch(getQuizSucess(response.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getQuizFailure(errorMsg));
      });
  };
};

export const saveAnswer = (score) => {
  return { type: SAVE_ANSWER, payload: score };
};

export const setResult = () => {
  return { type: SET_RESULT };
};

export const setAllResults = (results) => {
  return { type: SET_ALL_RESULTS, payload: results };
};
export const deleteScore = () => {
  return { type: DELETE_SCORE };
};
