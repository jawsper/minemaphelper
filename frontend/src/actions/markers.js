export const LOADING_MARKERS = 'LOADING_MARKERS';
export const LOADING_MARKERS_SUCCESS = 'LOADING_MARKERS_SUCCESS';
export function loadMarkers(world) {
    return (dispatch, _getState) => {
        return dispatch({
            type: LOADING_MARKERS,
            payload: {
                request: {
                    method: 'get',
                    url: `/worlds/${world}/markers/`,
                }
            }
        });
    };
}