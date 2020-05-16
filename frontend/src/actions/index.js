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

export const SAVING_MAP = 'SAVING_MAP';
export const SAVING_MAP_SUCCESS = 'SAVING_MAP_SUCCESS';
export const SAVING_MAP_FAIL = 'SAVING_MAP_FAIL';
export function saveMap(coords, map) {
    return (dispatch, _getState) => {
        return dispatch({
            type: SAVING_MAP,
            context: { coords, map },
            payload: {
                request: {
                    method: 'put',
                    url: `/maps/by_coords/${coords.x}/${coords.z}/`,
                    data: { map },
                }
            }
        })
    }
}

export const LOADING_MAPS = 'LOADING_MAPS';
export const LOADING_MAPS_SUCCESS = 'LOADING_MAPS_SUCCESS';
export function loadMaps() {
    return (dispatch, _getState) => {
        return dispatch({
            type: LOADING_MAPS,
            payload: {
                request: {
                    method: 'get',
                    url: '/maps/',
                }
            }
        });
    }
}

export const LOADING_MARKERS = 'LOADING_MARKERS';
export const LOADING_MARKERS_SUCCESS = 'LOADING_MARKERS_SUCCESS';
export function loadMarkers() {
    return (dispatch, _getState) => {
        return dispatch({
            type: LOADING_MARKERS,
            payload: {
                request: {
                    method: 'get',
                    url: '/markers/',
                }
            }
        });
    };
}