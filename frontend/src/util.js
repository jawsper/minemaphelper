/**
 * Get the in-game map boundaries for given map position
 * @param {Object} coords - Coordinate object containing x, y, and z values,
 * where x is Minecraft X, y is Minecraft Z, and z is Minecraft map zoom level (0-4)
 */
export function get_map_bounds(coords) {
    const { x, z, zoom } = coords;

    const scale_factor = Math.pow(2, zoom + 7);

    const scale_min = val => (val * scale_factor) - 64;
    const scale_max = val => ((val + 1) * scale_factor) - 64;

    return { min: { x: scale_min(x), z: scale_min(z) + 1 }, max: { x: scale_max(x) - 1, z: scale_max(z) } };
}

/**
 * Converts rendered map coordinates to in-game map index
 * @param {number} position - X or Z coordinate
 * @param {int} zoom_level - Map zoom level (0-4)
 */
export function leaflet_coordinate_to_minecraft_map_coordinate(position, zoom_level) {
    return Math.floor((position + 64) / Math.pow(2, Math.abs(zoom_level) + 7));
}
