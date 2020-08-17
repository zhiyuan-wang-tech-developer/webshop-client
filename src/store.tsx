import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

// support the redux devtools
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

// use redux-thunk middleware
const enhancer = composeEnhancers(applyMiddleware(reduxThunkMiddleware))

// create global redux store
const GlobalReduxStore = createStore(rootReducer, enhancer)

export default GlobalReduxStore