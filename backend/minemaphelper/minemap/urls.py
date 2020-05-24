from django.urls import include, path
from rest_framework_nested import routers
from minemaphelper.minemap import views

router = routers.DefaultRouter()
router.register('worlds', views.WorldViewSet, basename='world')

worlds_router = routers.NestedDefaultRouter(router, r'worlds', lookup='world')
worlds_router.register('maps', views.MapViewSet, basename='map')
worlds_router.register('markers', views.MarkerViewSet, basename='marker')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(worlds_router.urls)),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
]
