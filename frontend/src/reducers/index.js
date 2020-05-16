import maps from './maps';
import authentication from './authentication';
import markers from './markers'
import { combineReducers } from 'redux-immutable';

export default combineReducers({
    maps,
    authentication,
    markers,
});
