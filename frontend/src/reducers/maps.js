import Immutable from 'immutable';
import { LOADING_MAPS_SUCCESS, SAVING_MAP_SUCCESS } from '../actions';

const initialState = Immutable.fromJS({
    loaded: false,
    maps: {}
});

export default function maps(state = initialState, action) {
    switch (action.type) {
        case LOADING_MAPS_SUCCESS:
            const maps = action.payload.data;
            if (maps !== undefined) {
                for (let map of maps) {
                    state = state.setIn(['maps', map.zoom, map.z, map.x], map.map);
                }
                state = state.setIn(['loaded'], true);
            }
            return state;
        case SAVING_MAP_SUCCESS:
            const { coords, map } = action.meta.previousAction.context;
            state = state.setIn(['maps', coords.zoom, coords.z, coords.x], map);
            return state;

        default:
            return state;
    }
}