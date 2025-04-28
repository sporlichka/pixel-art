from django.db import models

class Canvas(models.Model):
    name = models.CharField(max_length=100)
    pixels = models.JSONField(default=list)  # Формат: [{"x": 0, "y": 0, "color": "#FFFFFF"}, ...]
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class UserSession(models.Model):
    nickname = models.CharField(max_length=50)
    canvas = models.ForeignKey(Canvas, on_delete=models.CASCADE, related_name="participants")
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["nickname", "canvas"]]  # Один никнейм на холст

    def __str__(self):
        return f"{self.nickname} ({self.canvas.name})"