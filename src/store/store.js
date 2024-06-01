import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducer from './reducer'
import { composeWithDevTools } from "@redux-devtools/extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, composedEnhancer)
export default store

