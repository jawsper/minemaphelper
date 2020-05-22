from minemaphelper.minemap.models import World, MinecraftMap, MapMarker
from rest_framework import serializers


class WorldSerializer(serializers.ModelSerializer):
    class Meta:
        model = World
        fields = ['pk', 'name']


class MinecraftMapSerializer(serializers.ModelSerializer):
    # zoom = serializers.SerializerMethodField(method_name='get_zoom')

    class Meta:
        model = MinecraftMap
        fields = ['pk', 'world', 'x', 'z', 'zoom', 'map']

        lookup_field = ['x', 'z']

    # def get_zoom(self, obj):
    #     return 0


class MapMarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapMarker
        fields = ['pk', 'world', 'x', 'z', 'text']
