import { combineReducers } from 'redux';

import loading from './loading/reducers';
import main from './main/reducers';
import user from './user/reducers';

const rootReducers = combineReducers({ loading, main, user });
export default rootReducers;
