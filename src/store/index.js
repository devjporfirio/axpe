import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'store/middlewares/logger';
import userMiddleware from 'store/middlewares/user';
import rootReducers from './modules/rootReducers';


const configureStore = (initialState = {}) => {
  const middlewares = process.env.NODE_ENV === 'production' ? [
    userMiddleware,
    thunkMiddleware
  ] : [ loggerMiddleware, userMiddleware, thunkMiddleware ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [ middlewareEnhancer ];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducers, initialState, composedEnhancers)
};

export default configureStore;
