from django.db import models
from django.conf import settings

# Create your models here.


class World(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='worlds',
        blank=True,
    )
    private = models.BooleanField(default=True)

    def __str__(self):
        return f'World "{self.name}"'


class MinecraftMap(models.Model):
    x = models.IntegerField()
    z = models.IntegerField()
    zoom = models.IntegerField()
    map = models.IntegerField()

    world = models.ForeignKey(
        World, on_delete=models.CASCADE, related_name='maps')

    class Meta:
        unique_together = ['world', 'x', 'z', 'zoom']


class MapMarker(models.Model):
    x = models.FloatField()
    z = models.FloatField()
    text = models.CharField(max_length=255)

    world = models.ForeignKey(
        World, on_delete=models.CASCADE, related_name='markers')
