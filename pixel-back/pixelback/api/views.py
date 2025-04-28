from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Canvas, UserSession
from .serializers import (
    CanvasListSerializer,
    CanvasCreateSerializer,
    CanvasUpdateSerializer,
    UserSessionSerializer,
)

class CanvasViewSet(viewsets.ModelViewSet):
    queryset = Canvas.objects.all()
    
    def get_serializer_class(self):
        if self.action == "list":
            return CanvasListSerializer
        elif self.action == "create":
            return CanvasCreateSerializer
        return CanvasUpdateSerializer

    @action(detail=True, methods=["POST"])
    def join(self, request, pk=None):
        """Присоединение к холсту (POST /api/canvases/<id>/join/)"""
        canvas = self.get_object()
        serializer = UserSessionSerializer(
            data=request.data,
            context={"view": self, "canvas_id": canvas.id}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save(canvas=canvas)
        return Response(serializer.data, status=status.HTTP_201_CREATED)