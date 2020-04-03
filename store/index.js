import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk';
import user from './user'
import messages from './messages'
import profileSubmission from './profileSubmission'

const rootReducer = combineReducers({
    user,
    messages,
    profileSubmission,
  })

export default createStore(rootReducer, applyMiddleware(ReduxThunk))