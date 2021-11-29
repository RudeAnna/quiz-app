import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import quizReducer from './quizReducer'

const store = createStore(quizReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store