from django.http import Http404
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from minemaphelper.minemap.models import World, MinecraftMap, MapMarker


def user_allowed_world(world, user):
    if user.is_superuser:
        return True
    if world.private and user.is_anonymous or world.users.filter(pk=user.pk).count() == 0:
        return False
    return True


class UserInWorld(permissions.BasePermission):
    def has_object_permission(self, request, view, world):
        def _has_object_permission(request, view, world):
            if request.method in permissions.SAFE_METHODS:
                if world.private:
                    return user_allowed_world(world, request.user)
                else:
                    return True
            else:
                return user_allowed_world(world, request.user)
        permission = _has_object_permission(request, view, world)
        # print(
        #     f'UserInWorld.has_object_permission({request.method}, {request.user}, {world}) => {permission}')
        return permission


class UserAllowedMap(permissions.BasePermission):
    def has_permission(self, request, view):
        def _has_permission(request, view):
            if request.method in permissions.SAFE_METHODS:
                if view.world.private:
                    return user_allowed_world(view.world, request.user)
                else:
                    return True
            else:
                return user_allowed_world(view.world, request.user)
        permission = _has_permission(request, view)
        # print(
        #     f'UserAllowedMap.has_permission({request.method}, {request.user}, {view.world}) => {permission}')
        return permission


class WorldViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Worlds to be viewed or edited.
    """

    queryset = World.objects.all()
    lookup_value_regex = r'[0-9]+'

    def filter_queryset(self, queryset):
        if self.request.user.is_anonymous:
            return queryset.filter(private=False)
        elif self.request.user.is_superuser:
            return queryset
        else:
            return queryset.filter(Q(users__in=[self.request.user]) | Q(private=False))

    serializer_class = WorldSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, UserInWorld]


class HasWorldMixin:
    """
    Mixin that sets self.world based on the world_pk kwarg
    """

    def initial(self, *args, **kwargs):
        try:
            self.world = World.objects.get(pk=self.kwargs['world_pk'])
        except World.DoesNotExist:
            self.world = None
        return super().initial(*args, **kwargs)


class MapViewSet(HasWorldMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows maps to be viewed or edited.
    """

    def get_queryset(self):
        if self.world is None:
            raise Http404
        return MinecraftMap.objects.filter(world=self.world)

    serializer_class = MinecraftMapSerializer
    pagination_class = None
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, UserAllowedMap]

    def get_lookup_regex(self, lookup_prefix=''):
        return '/'.join((
            f'(?P<{lookup_prefix}x>-?[0-9]+)',
            f'(?P<{lookup_prefix}z>-?[0-9]+)',
            f'(?P<{lookup_prefix}zoom>[0-9]+)'
        ))

    def get_object(self):
        """
        Returns the object the view is displaying.
        This is overriden to allow to fetch the zoom, x, and z parameters from the URL.
        """
        queryset = self.filter_queryset(self.get_queryset())

        filter_kwargs = {
            'zoom': self.kwargs['zoom'],
            'z': self.kwargs['z'],
            'x': self.kwargs['x']
        }
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


class MarkerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows markers to be views or edited.
    """

    def get_queryset(self):
        return MapMarker.objects.filter(world=self.kwargs['world_pk'])
    serializer_class = MapMarkerSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
