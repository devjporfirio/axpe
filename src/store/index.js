import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'store/middlewares/logger';
import rootReducers from './modules/rootReducers';

const configureStore = (initialState = {}) => {
  const middlewares =
    process.env.NODE_ENV === 'production'
      ? [ thunkMiddleware ]
      : [ loggerMiddleware, thunkMiddleware ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [ middlewareEnhancer ];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducers, initialState, composedEnhancers);
};

export default configureStore;
