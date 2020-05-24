import { GridLayer } from 'leaflet';
import { Map } from 'immutable';

import { get_map_bounds } from '../util';

const createDefaultOptions = () => {
    const tileSize = 128;
    const minZoom = -3;
    const maxZoom = 0;
    const bounds = [
        [-127 * tileSize, -127 * tileSize],
        [128 * tileSize, 128 * tileSize],
    ];
    const maps = Map();
    return { tileSize, minZoom, maxZoom, bounds, maps };
}

export const MinecraftGridlayer = GridLayer.extend({
    options: createDefaultOptions(),
    createTile: function (coords, done) {
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        const mc_coords = { x: coords.x, z: coords.y, zoom: Math.abs(coords.z) };

        this._drawTile(tile, mc_coords)
            .then(tile => done(null, tile));

        // return the tile so it can be rendered on screen
        return tile;
    },

    _getMap: function (coords) {
        return this.options.maps.getIn([coords.zoom, coords.z, coords.x], null);
    },

    _drawTile: function (tile, coords) {
        // console.log(this.options.bounds);
        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        const ctx = tile.getContext('2d');
        const origCoords = coords;
        // generate list of tiles based on zoom level
        return this._getTilesFromCoords(tile, coords).then(coord_list => {
            coord_list.forEach(({ coords, map_id, bounds, canvas_bounds }) => {

                // draw background, alternating between two colours
                let fill_color = map_id === null ? 'silver' : 'mediumseagreen';
                if (Math.abs(coords.x) % 2 == Math.abs(coords.z) % 2) {
                    fill_color = map_id === null ? 'lightgray' : 'lightgreen';
                }

                ctx.fillStyle = fill_color;
                ctx.fillRect(canvas_bounds.x, canvas_bounds.y, canvas_bounds.width, canvas_bounds.height);

                // on deepest zoom print the coords and bounds
                if (origCoords.zoom === 0) {
                    // print map coordinates
                    ctx.font = '12px serif';
                    ctx.fillStyle = 'black';
                    ctx.fillText(`Tile: { x: ${coords.x}, z: ${coords.z} }`, 5, 32);

                    // print map boundary coordinates
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.font = '10px monospace';
                    ctx.fillText(`Min: { x: ${bounds.min.x}, z: ${bounds.min.z} }`, 5, 5);
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(`Max: { x: ${bounds.max.x}, z: ${bounds.max.z} }`, tile.width - 5, tile.height - 5);
                }

                // if map assigned, print map ID
                if (map_id !== null) {
                    // pick font size based on map zoom level
                    const font_size = [32, 24, 12, 6][origCoords.zoom];
                    ctx.font = `${font_size}px serif`;
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`#${map_id}`, canvas_bounds.x + canvas_bounds.width / 2, canvas_bounds.y + canvas_bounds.height / 2);
                }
            });
            return tile;
        });
    },

    _getTilesFromCoords: function (tile, coords) {
        const { x, z, zoom } = coords;

        const valid_coord = (c, idx) =>
            (c * this.options.tileSize) >= this.options.bounds[0][idx]
            && (c * this.options.tileSize) <= this.options.bounds[1][idx]
        const valid_x = x => valid_coord(x, 0);
        const valid_z = z => valid_coord(z, 1);

        let tiles = [];
        const scale_factor = Math.pow(2, zoom);
        for (let x_offset = 0; x_offset < scale_factor; x_offset++) {
            for (let z_offset = 0; z_offset < scale_factor; z_offset++) {
                const tile_x = x * scale_factor + x_offset;
                const tile_z = z * scale_factor + z_offset;
                if (!valid_x(tile_x) || !valid_z(tile_z)) continue;
                tiles.push({
                    x: tile_x,
                    z: tile_z,
                    zoom: 0,
                })
            }
        }

        const width = tile.width / scale_factor;
        const height = tile.height / scale_factor;

        const apply_scale_factor = value => (scale_factor + (value % scale_factor)) % scale_factor;

        return Promise.all(tiles.map(coords => {
            return new Promise((resolve, _reject) => {
                const bounds = get_map_bounds(coords);
                const canvas_bounds = {
                    x: apply_scale_factor(coords.x) * width,
                    y: apply_scale_factor(coords.z) * height,
                    width,
                    height,
                };
                const map_id = this._getMap(coords);
                resolve({ coords, map_id, bounds, canvas_bounds });
            })
        }));

    }
});

export default function (options) {
    return new MinecraftGridlayer(options);
};