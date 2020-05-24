from django.urls import include, path
from rest_framework_nested import routers
from minemaphelper.minemap import views


class CustomRouter(routers.DefaultRouter):
    def get_lookup_regex(self, viewset, lookup_prefix=''):
        """
        This function has been overridden to allow a 'get_lookup_regex'
        function on a viewset. This function returns the full regex path
        for a viewset.
        """

        lookup_function = getattr(viewset, 'get_lookup_regex', None)
        if lookup_function is not None:
            return viewset.get_lookup_regex(lookup_prefix)

        return super().get_lookup_regex(viewset, lookup_prefix)


class NestedCustomRouter(routers.NestedMixin, CustomRouter):
    pass


router = CustomRouter()
router.register('worlds', views.WorldViewSet, basename='world')

worlds_router = NestedCustomRouter(router, r'worlds', lookup='world')
worlds_router.register('users', views.UserViewset, basename='user')
worlds_router.register('maps', views.MapViewSet, basename='map')
worlds_router.register('markers', views.MarkerViewSet, basename='marker')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(worlds_router.urls)),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
]
