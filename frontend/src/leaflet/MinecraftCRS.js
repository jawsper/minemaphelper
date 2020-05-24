import L from 'leaflet';

const MinecraftCRS = L.Util.extend({}, L.CRS.Simple, {
    transformation: L.transformation(1, 64, 1, 64),
});

export default MinecraftCRS;