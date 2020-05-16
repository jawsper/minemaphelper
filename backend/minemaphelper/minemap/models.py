from django.db import models

# Create your models here.

class MinecraftMap(models.Model):
    x = models.IntegerField()
    z = models.IntegerField()
    zoom = models.IntegerField()
    map = models.IntegerField()

    class Meta:
        unique_together = ['x', 'z', 'zoom']

class MapMarker(models.Model):
    x = models.FloatField()
    z = models.FloatField()
    text = models.CharField(max_length=255)