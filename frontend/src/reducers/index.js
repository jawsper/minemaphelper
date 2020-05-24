import authentication from './authentication';
import worlds from './worlds';
import { combineReducers } from 'redux-immutable';

export default () => combineReducers({
    authentication,
    worlds,
});
