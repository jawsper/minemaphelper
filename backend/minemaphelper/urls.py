from django.urls import include, path
from rest_framework_nested import routers
from minemaphelper.minemap import views

router = routers.DefaultRouter()
router.register('worlds', views.WorldViewSet, basename='world')

worlds_router = routers.NestedDefaultRouter(router, r'worlds', lookup='world')
worlds_router.register('maps', views.MapViewSet, basename='map')
worlds_router.register('markers', views.MarkerViewSet, basename='marker')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(worlds_router.urls)),
    path('api/auth/', include('rest_auth.urls')),
    path('api/auth/registration/', include('rest_auth.registration.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
