import Immutable from 'immutable';
import {
    SHOW_AUTHENTICATION_DIALOG,
    HIDE_AUTHENTICATION_DIALOG,
    AUTH_CHECK_LOGIN_SUCCESS,
    AUTH_CHECK_LOGIN_FAIL,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
} from '../actions/authentication';

const initialState = Immutable.fromJS({
    user: null,
    showDialog: false,
    errors: {},
});

export default function maps(state = initialState, action) {
    switch (action.type) {
        /* Authentication */
        case SHOW_AUTHENTICATION_DIALOG:
            return state.setIn(['showDialog'], true);
        case HIDE_AUTHENTICATION_DIALOG:
            return state
                .set('errors', Immutable.fromJS({}))
                .set('showDialog', false)

        /* Get user data */
        case AUTH_CHECK_LOGIN_SUCCESS:
            state = state.setIn(['user'], Immutable.fromJS(action.payload.data));
            return state;
        case AUTH_CHECK_LOGIN_FAIL:
            state = state.setIn(['user'], Immutable.fromJS({ anonymous: true }));
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
            state = state.setIn(['user'], Immutable.fromJS({ anonymous: true }));
            return state;

        default:
            return state;
    }
}