
import { withLeaflet, GridLayer } from 'react-leaflet';
import minecraftGridLayer from '../leaflet/MinecraftGridLayer';

class MinecraftGridLayer extends GridLayer {
    createLeafletElement(props) {
        return minecraftGridLayer(this.getOptions(props));
    }

    updateLeafletElement(fromProps, toProps) {
        // console.log('updateLeafletElement', this.leafletElement);
        const { opacity, zIndex, maps } = toProps
        if (opacity !== fromProps.opacity) {
            this.leafletElement.setOpacity(opacity)
        }
        if (zIndex !== fromProps.zIndex) {
            this.leafletElement.setZIndex(zIndex)
        }
        if (!maps.equals(fromProps.maps)) {
            this.leafletElement.options.maps = maps;
            this.leafletElement.redraw();
        }
    }
}

export default withLeaflet(MinecraftGridLayer);