import Immutable from 'immutable';
import { LOADING_WORLDS_SUCCESS, SELECT_WORLD } from '../actions/worlds';
import {
    LOADING_MAPS_SUCCESS,
    SAVING_MAP_SUCCESS,
    SAVING_MAP_FAIL,
    CREATING_MAP_SUCCESS,
    CREATING_MAP_FAIL,
    DELETING_MAP_SUCCESS,
    DELETING_MAP_FAIL,
} from '../actions/maps';
import { LOADING_MARKERS_SUCCESS } from '../actions/markers';
import { AUTH_LOGOUT_SUCCESS, AUTH_LOGIN_SUCCESS } from '../actions/authentication';

const initialState = Immutable.fromJS({
    loaded: false,
    current: null,
    worlds: {},
});

function worlds(state = initialState, action) {
    switch (action.type) {
        // Ensure worlds get cleared when logging in or out
        case AUTH_LOGIN_SUCCESS:
        case AUTH_LOGOUT_SUCCESS:
            state = state.set('worlds', Immutable.fromJS({}));
            state = state.set('current', null);
            state = state.set('loaded', false);
            return state;

        case SELECT_WORLD:
            state = state.set('current', action.world);
            return state;

        case LOADING_WORLDS_SUCCESS:
            const worlds = action.payload.data;
            if (worlds !== undefined) {
                for (const world of worlds) {
                    if (state.get('current') === null) {
                        state = state.set('current', world.pk);
                    }
                    state = state.setIn(['worlds', world.pk], Immutable.fromJS(world));
                    state = state.setIn(['worlds', world.pk, 'maps'], Immutable.fromJS({ list: {}, loaded: false }));
                    state = state.setIn(['worlds', world.pk, 'markers'], Immutable.fromJS({ list: {}, loaded: false }));
                }

                state = state.setIn(['loaded'], true);
            }
            return state;
        case LOADING_MAPS_SUCCESS:
            const maps = action.payload.data;
            if (maps !== undefined && maps.length > 0) {
                let map = null;
                for (map of maps) {
                    state = state.setIn(['worlds', map.world, 'maps', 'list', map.zoom, map.z, map.x], map.map);
                }
                state = state.setIn(['worlds', map.world, 'maps', 'loaded'], true);
            } else {
                state = state.setIn(['worlds', state.get('current'), 'maps', 'loaded'], true);
            }
            return state;

        case CREATING_MAP_SUCCESS: {
            const { world, zoom, x, z, map } = action.payload.data;
            state = state.setIn(['worlds', world, 'maps', 'list', zoom, z, x], map);
            return state;
        }
        case SAVING_MAP_SUCCESS: {
            const { world, zoom, x, z, map } = action.payload.data;
            state = state.setIn(['worlds', world, 'maps', 'list', zoom, z, x], map);
            return state;
        }
        case DELETING_MAP_SUCCESS: {
            const { world, zoom, z, x } = action.meta.previousAction.data;
            state = state.deleteIn(['worlds', world, 'maps', 'list', zoom, z, x]);
            return state;
        }

        case CREATING_MAP_FAIL: {
            const error = action.error.response.data;
            console.log('reducer CREATING_MAP_FAIL', error);
            return state;
        }
        case SAVING_MAP_FAIL: {
            const error = action.error.response.data;
            console.log('reducer SAVING_MAP_FAIL', error);
            return state;
        }
        case DELETING_MAP_FAIL: {
            const error = action.error.response.data;
            console.log('reducer DELETING_MAP_FAIL', error);
            return state;
        }

        case LOADING_MARKERS_SUCCESS:
            const markers = action.payload.data;
            if (markers.length > 0) {
                let marker = null;
                for (marker of markers) {
                    // const { x, z, text } = marker;
                    // const im_marker = Immutable.fromJS({ x, z, text })
                    state = state.setIn(['worlds', marker.world, 'markers', 'list', marker.pk], Immutable.fromJS(marker))
                }
                state = state.setIn(['worlds', marker.world, 'markers', 'loaded'], true);
            } else {
                state = state.setIn(['worlds', state.get('current'), 'markers', 'loaded'], true);
            }
            return state;

        default:
            return state;
    }
}

export default worlds;