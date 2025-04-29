from django.db import models
from django.utils import timezone

class Canvas(models.Model):
    name = models.CharField(max_length=100, unique=True)
    width = models.IntegerField(default=64)
    height = models.IntegerField(default=64)
    background_color = models.CharField(max_length=7, default="#ffffff")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class User(models.Model):
    nickname = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nickname

class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    canvas = models.ForeignKey(Canvas, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'canvas')

class Pixel(models.Model):
    canvas = models.ForeignKey(Canvas, on_delete=models.CASCADE, related_name='pixels')
    x = models.IntegerField()
    y = models.IntegerField()
    color = models.CharField(max_length=7, default="#ffffff")

    class Meta:
        unique_together = ('canvas', 'x', 'y')
