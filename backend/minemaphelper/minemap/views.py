from django.http import Http404
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from minemaphelper.minemap.models import World, MinecraftMap, MapMarker
from minemaphelper.minemap.serializers import WorldSerializer, MinecraftMapSerializer, MapMarkerSerializer


class WorldViewSet(viewsets.ModelViewSet):
    """
    Viewset to list, retreive and modify Worlds
    """

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return World.objects.filter(private=False)
        return self.request.user.worlds.all()
    serializer_class = WorldSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class MapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows maps to be viewed or edited.
    """
    def get_queryset(self):
        return MinecraftMap.objects.filter(world=self.kwargs['world_pk'])
    serializer_class = MinecraftMapSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(
        detail=False,
        url_path='by_coords/(?P<x>-?[0-9]+)/(?P<z>-?[0-9]+)',
        methods=['get', 'put'])
    def by_coords(self, request, world_pk=None, x=None, z=None):
        world = World.objects.get(pk=world_pk)
        if request.method == 'GET':
            try:
                instance = MinecraftMap.objects.get(world=world, x=x, z=z)
            except MinecraftMap.DoesNotExist:
                raise Http404
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        elif request.method == 'PUT':
            try:
                instance = MinecraftMap.objects.get(world=world, x=x, z=z)
            except MinecraftMap.DoesNotExist:
                instance = MinecraftMap(world=world, x=x, z=z, zoom=0)

            map = request.data.get('map')
            if map is not None:
                instance.map = request.data.get('map')
                instance.save()
            elif instance.id is not None:
                instance.delete()

            serializer = self.get_serializer(instance)

            return Response(serializer.data)


class MarkerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows markers to be views or edited.
    """
    def get_queryset(self):
        return MapMarker.objects.filter(world=self.kwargs['world_pk'])
    serializer_class = MapMarkerSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
