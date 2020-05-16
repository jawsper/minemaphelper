from minemaphelper.minemap.models import MinecraftMap, MapMarker
from rest_framework import serializers

class MinecraftMapSerializer(serializers.ModelSerializer):
    zoom = serializers.SerializerMethodField(method_name='get_zoom')

    class Meta:
        model = MinecraftMap
        fields = ['pk', 'x', 'z', 'zoom', 'map']

        lookup_field = ['x', 'z']

    def get_zoom(self, obj):
        return 0

class MapMarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapMarker
        fields = ['pk', 'x', 'z', 'text']