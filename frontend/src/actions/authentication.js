import { push } from 'connected-react-router/immutable';

export const SHOW_AUTHENTICATION_DIALOG = 'SHOW_AUTHENTICATION_DIALOG';
export const HIDE_AUTHENTICATION_DIALOG = 'HIDE_AUTHENTICATION_DIALOG';
export function showAuthenticationDialog() {
    return (dispatch, _getState) => {
        dispatch({ type: SHOW_AUTHENTICATION_DIALOG });
        dispatch(push('/auth/login'))
    }
}
export function hideAuthenticationDialog() {
    return (dispatch, _getState) => {
        dispatch({ type: HIDE_AUTHENTICATION_DIALOG })
        dispatch(push('/'))
    }
}

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export function authLogout() {
    return (dispatch, _getState) => {
        return dispatch({
            type: "AUTH_LOGOUT",
            payload: {
                request: {
                    method: 'post',
                    url: '/auth/logout/',
                }
            }
        });
    };
}
export const AUTH_CHECK_LOGIN = 'AUTH_CHECK_LOGIN';
export const AUTH_CHECK_LOGIN_SUCCESS = 'AUTH_CHECK_LOGIN_SUCCESS';
export const AUTH_CHECK_LOGIN_FAIL = 'AUTH_CHECK_LOGIN_FAIL';
export function authCheckLogin() {
    return (dispatch, _getState) => {
        return dispatch({
            type: AUTH_CHECK_LOGIN,
            payload: {
                request: {
                    method: 'get',
                    url: '/auth/user/',
                },
            },
        });
    };
}

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';

export function authLogin(username, password) {
    return (dispatch, _getState) => {
        return dispatch({
            type: AUTH_LOGIN,
            payload: {
                request: {
                    method: 'post',
                    url: '/auth/login/',
                    data: { username, password },
                }
            }
        }).then(() => {
            dispatch(push('/'));
            return dispatch(authCheckLogin());
        });
    }
}