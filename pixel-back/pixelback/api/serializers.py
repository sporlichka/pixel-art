from rest_framework import serializers
from .models import *

class CanvasListSerializer(serializers.ModelSerializer):
    """Для списка холстов (GET /api/canvases/)"""
    participants_count = serializers.SerializerMethodField()

    class Meta:
        model = Canvas
        fields = ["id", "name", "created_at", "participants_count"]

    def get_participants_count(self, obj):
        return obj.participants.count()  # Количество участников холста

class CanvasCreateSerializer(serializers.ModelSerializer):
    """Для создания холста (POST /api/canvases/)"""
    class Meta:
        model = Canvas
        fields = ["name"]  # Пользователь указывает только название

class CanvasUpdateSerializer(serializers.ModelSerializer):
    """Для обновления холста (PATCH /api/canvases/<id>/)"""
    class Meta:
        model = Canvas
        fields = ["pixels"]  # Принимает только данные пикселей



class UserSerializer(serializers.Serializer):
    class Meta:
        model = UserSession
        fields = '__all__'

class UserSessionSerializer(serializers.ModelSerializer):
    """Для присоединения к холсту (POST /api/canvases/<id>/join/)"""
    class Meta:
        model = UserSession
        fields = ["nickname"]  # Пользователь отправляет только никнейм

    def validate(self, data):
        """Проверка, что пользователь ещё не присоединился к холсту"""
        canvas_id = self.context["view"].kwargs.get("canvas_id")
        nickname = data["nickname"]
        if UserSession.objects.filter(nickname=nickname, canvas_id=canvas_id).exists():
            raise serializers.ValidationError("Этот никнейм уже занят на этом холсте.")
        return data

