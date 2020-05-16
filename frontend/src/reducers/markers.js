import Immutable from 'immutable';
import { LOADING_MARKERS_SUCCESS } from '../actions';

const initialState = Immutable.fromJS({
    loaded: false,
    markers: [],
});

export default function maps(state = initialState, action) {
    switch (action.type) {
        /* Markers */
        case LOADING_MARKERS_SUCCESS:
            const markers = action.payload.data;
            state = state.setIn(['markers'], Immutable.fromJS(markers));
            state = state.setIn(['loaded'], true);
        default:
            return state;
    }
}