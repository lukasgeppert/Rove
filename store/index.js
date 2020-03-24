import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk';
import user from './user'
import messages from './messages'

const rootReducer = combineReducers({
    user,
    messages,
  })

export default createStore(rootReducer, applyMiddleware(ReduxThunk))