# Generated by Django 3.0.6 on 2020-05-22 11:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='World',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('users', models.ManyToManyField(related_name='worlds', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MapMarker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.FloatField()),
                ('z', models.FloatField()),
                ('text', models.CharField(max_length=255)),
                ('world', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='markers', to='minemap.World')),
            ],
        ),
        migrations.CreateModel(
            name='MinecraftMap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.IntegerField()),
                ('zoom', models.IntegerField()),
                ('z', models.IntegerField()),
                ('map', models.IntegerField()),
                ('world', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='maps', to='minemap.World')),
            ],
            options={
                'unique_together': {('world', 'x', 'z', 'zoom')},
            },
        ),
    ]
