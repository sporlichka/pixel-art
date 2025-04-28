# api/urls.py (маршруты API)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CanvasViewSet

# Создаем роутер для ViewSet
router = DefaultRouter()
router.register(r'canvases', CanvasViewSet, basename='canvas')

urlpatterns = [
    # Подключаем все URL от роутера 
    # (будут доступны /api/canvases/, /api/canvases/<id>/, /api/canvases/<id>/join/)
    path('', include(router.urls)),
]