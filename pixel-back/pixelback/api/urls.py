from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CanvasViewSet, UserViewSet

router = DefaultRouter()
router.register(r'canvases', CanvasViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
