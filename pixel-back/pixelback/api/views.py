from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Canvas, User, Participant, Pixel
from .serializers import CanvasSerializer, UserSerializer, ParticipantSerializer, PixelSerializer

class CanvasViewSet(viewsets.ModelViewSet):
    queryset = Canvas.objects.all()
    serializer_class = CanvasSerializer

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        canvas = self.get_object()
        nickname = request.data.get("nickname")
        user, _ = User.objects.get_or_create(nickname=nickname)
        Participant.objects.get_or_create(user=user, canvas=canvas)
        return Response({"message": f"{nickname} joined {canvas.name}"})

    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        canvas = self.get_object()
        participants = Participant.objects.filter(canvas=canvas)
        serializer = ParticipantSerializer(participants, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def pixels(self, request, pk=None):
        canvas = self.get_object()
        pixels = Pixel.objects.filter(canvas=canvas)
        serializer = PixelSerializer(pixels, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def update_pixels(self, request, pk=None):
        canvas = self.get_object()
        pixel_data = request.data.get("pixels", [])
        for pix in pixel_data:
            Pixel.objects.update_or_create(
                canvas=canvas,
                x=pix["x"],
                y=pix["y"],
                defaults={"color": pix["color"]},
            )
        return Response({"message": "Pixels updated"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        """
        Удаляет участника с холста.
        """
        canvas = self.get_object()
        nickname = request.data.get("nickname")
        user = User.objects.filter(nickname=nickname).first()

        if user:
            participant = Participant.objects.filter(user=user, canvas=canvas).first()
            if participant:
                participant.delete()
                return Response({"message": f"{nickname} left the canvas."}, status=status.HTTP_200_OK)
            return Response({"message": "Participant not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
