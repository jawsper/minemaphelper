
from django.http import Http404
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from minemaphelper.minemap.models import MinecraftMap, MapMarker
from minemaphelper.minemap.serializers import MinecraftMapSerializer, MapMarkerSerializer


class MapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows maps to be viewed or edited.
    """
    queryset = MinecraftMap.objects.all()
    serializer_class = MinecraftMapSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(
        detail=False, 
        url_path='by_coords/(?P<x>-?[0-9]+)/(?P<z>-?[0-9]+)',
        methods=['get', 'put'])
    def by_coords(self, request, x=None, z=None):
        if request.method == 'GET':
            try:
                instance = MinecraftMap.objects.get(x=x, z=z)
            except MinecraftMap.DoesNotExist:
                raise Http404
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        elif request.method == 'PUT':
            print(request.data)
            try:
                instance = MinecraftMap.objects.get(x=x, z=z)
            except MinecraftMap.DoesNotExist:
                instance = MinecraftMap(x=x, z=z, zoom=0)

            map = request.data.get('map')
            if map is not None:
                instance.map = request.data.get('map')
                instance.save()
            elif instance.id is not None:
                instance.delete()

            return Response()
            
class MarkerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows markers to be views or edited.
    """
    queryset = MapMarker.objects.all()
    serializer_class = MapMarkerSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
