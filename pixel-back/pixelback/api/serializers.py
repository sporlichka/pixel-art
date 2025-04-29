from rest_framework import serializers
from .models import Canvas, User, Participant, Pixel

class CanvasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Canvas
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Participant
        fields = '__all__'

class PixelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pixel
        fields = '__all__'
