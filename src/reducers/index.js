import { combineReducers } from 'redux';
import { userReducers } from './userReducers';

const mergeReducers = combineReducers({
 user: userReducers
})
export default mergeReducers;