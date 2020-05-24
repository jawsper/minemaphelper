export const REQUEST_AUTH = 'REQUEST_AUTH';
export const REQUEST_AUTH_CLEAR = 'REQUEST_AUTH_CLEAR';
export function authRequest() {
    return (dispatch, _getState) => {
        return dispatch({ type: REQUEST_AUTH });
    }
}
export function clearAuthRequest() {
    return (dispatch, _getState) => {
        dispatch({ type: REQUEST_AUTH_CLEAR })
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
            return dispatch(authCheckLogin());
        });
    }
}