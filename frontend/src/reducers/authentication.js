import Immutable from 'immutable';
import {
    REQUEST_AUTH,
    REQUEST_AUTH_CLEAR,
    AUTH_CHECK_LOGIN_SUCCESS,
    AUTH_CHECK_LOGIN_FAIL,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
} from '../actions';

const initialState = Immutable.fromJS({
    user: null,
    showDialog: false,
    errors: {},
});

export default function maps(state = initialState, action) {
    switch (action.type) {
        /* Authentication */
        case REQUEST_AUTH:
            return state.setIn(['showDialog'], true);
        case REQUEST_AUTH_CLEAR:
            return state.setIn(['showDialog'], false);

        /* Get user data */
        case AUTH_CHECK_LOGIN_SUCCESS:
            state = state.setIn(['user'], Immutable.fromJS(action.payload.data));
            return state;
        case AUTH_CHECK_LOGIN_FAIL:
            state = state.setIn(['user'], null);
            return state;

        /* Login request */
        case AUTH_LOGIN_SUCCESS:
            state = state.setIn(['showDialog'], false);
            return state;
        case AUTH_LOGIN_FAIL:
            const errors = action.error.response.data;
            state = state.setIn(['errors'], Immutable.fromJS(errors));
            return state;

        /* Logout completed */
        case AUTH_LOGOUT_SUCCESS:
            state = state.setIn(['user'], null);
            return state;

        default:
            return state;
    }
}