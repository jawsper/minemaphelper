export const LOADING_WORLDS = 'LOADING_WORLDS';
export const LOADING_WORLDS_SUCCESS = 'LOADING_WORLDS_SUCCESS';
export function loadWorlds() {
    return (dispatch, _getState) => {
        return dispatch({
            type: LOADING_WORLDS,
            payload: {
                request: {
                    method: 'get',
                    url: '/worlds/',
                }
            }
        });
    }
}

export const SELECT_WORLD = 'SELECT_WORLD';
export function selectWorld(world) {
    return dispatch => {
        return dispatch({ type: SELECT_WORLD, world })
    };
}