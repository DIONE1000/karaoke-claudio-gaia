from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MusicaViewSet

router = DefaultRouter()
router.register(r'musicas', MusicaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
