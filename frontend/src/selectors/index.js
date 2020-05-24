import { createSelector } from 'reselect';

const authenticationSelector = state => state.get('authentication');
export const userSelector = createSelector(
    [authenticationSelector],
    authentication => authentication.get('user')
)

const worldsSelector = state => state.get('worlds');
export const currentWorldIDSelector = createSelector(
    [worldsSelector],
    worlds => worlds.get('current')
)

export const worldsLoadedSelector = createSelector(
    [worldsSelector],
    worlds => worlds.get('loaded')
)

export const worldsListSelector = createSelector(
    [worldsSelector],
    worlds => worlds.get('worlds')
);

export const currentWorldSelector = createSelector(
    [worldsSelector, currentWorldIDSelector],
    (worlds, current) => worlds.getIn(['worlds', current])
);

const mapsGroupSelector = createSelector(
    [currentWorldSelector],
    currentWorld => currentWorld.get('maps')
)

export const mapsSelector = createSelector(
    [mapsGroupSelector],
    mapsGroup => mapsGroup.get('list')
);

export const mapsLoadedSelector = createSelector(
    [mapsGroupSelector],
    mapsGroup => mapsGroup.get('loaded')
);

const markersGroupSelector = createSelector(
    [currentWorldSelector],
    currentWorld => currentWorld.get('markers')
)

export const markersSelector = createSelector(
    [markersGroupSelector],
    markersGroup => markersGroup.get('list')
);

export const markersLoadedSelector = createSelector(
    [markersGroupSelector],
    markersGroup => markersGroup.get('loaded')
);