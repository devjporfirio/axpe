import { combineReducers } from 'redux';

import loading from './loading/reducers';
import main from './main/reducers';
import search from './search/reducers';
import user from './user/reducers';

const rootReducers = combineReducers({ loading, main, search, user });
export default rootReducers;
