from django.contrib import admin

# Register your models here.

from .models import World

@admin.register(World)
class WorldAdmin(admin.ModelAdmin):
    list_display = ('name', 'private')