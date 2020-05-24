import { currentWorldSelector, mapsSelector } from "../selectors";

export const CREATING_MAP = 'CREATING_MAP';
export const CREATING_MAP_SUCCESS = 'CREATING_MAP_SUCCESS';
export const CREATING_MAP_FAIL = 'CREATING_MAP_FAIL';
export const SAVING_MAP = 'SAVING_MAP';
export const SAVING_MAP_SUCCESS = 'SAVING_MAP_SUCCESS';
export const SAVING_MAP_FAIL = 'SAVING_MAP_FAIL';
export const DELETING_MAP = 'DELETING_MAP';
export const DELETING_MAP_SUCCESS = 'DELETING_MAP_SUCCESS';
export const DELETING_MAP_FAIL = 'DELETING_MAP_FAIL';

export function saveMap({ x, z, zoom }, map) {
    return (dispatch, getState) => {
        const world = currentWorldSelector(getState()).get('pk');
        const currentMap = mapsSelector(getState()).getIn([zoom, z, x], null);

        if (currentMap === null && map !== null) {
            return dispatch({
                type: CREATING_MAP,
                payload: {
                    request: {
                        method: 'post',
                        url: `/worlds/${world}/maps/`,
                        data: { world, x, z, zoom, map }
                    }
                }
            })
        } else if (currentMap !== undefined && map !== null) {
            return dispatch({
                type: SAVING_MAP,
                payload: {
                    request: {
                        method: 'patch',
                        url: `/worlds/${world}/maps/${x}/${z}/${zoom}/`,
                        data: { map }
                    }
                }
            })
        } else if (map === null) {
            return dispatch({
                type: DELETING_MAP,
                payload: {
                    request: {
                        method: 'delete',
                        url: `/worlds/${world}/maps/${x}/${z}/${zoom}/`,
                    },
                },
                // Add this data this so can delete this map in the reducer
                data: { world, x, z, zoom },
            })
        }
    }
}

export const LOADING_MAPS = 'LOADING_MAPS';
export const LOADING_MAPS_SUCCESS = 'LOADING_MAPS_SUCCESS';
export function loadMaps(world) {
    return (dispatch, _getState) => {
        return dispatch({
            type: LOADING_MAPS,
            payload: {
                request: {
                    method: 'get',
                    url: `/worlds/${world}/maps/`,
                }
            }
        });
    }
}