# Generated by Django 3.0.6 on 2020-05-16 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [('minemap', '0001_initial'), ('minemap', '0002_auto_20200513_1158'), ('minemap', '0003_auto_20200513_1546')]

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MinecraftMap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.IntegerField()),
                ('zoom', models.IntegerField()),
                ('z', models.IntegerField()),
                ('map', models.IntegerField()),
            ],
            options={
                'unique_together': {('x', 'z', 'zoom')},
            },
        ),
        migrations.CreateModel(
            name='MapMarker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.FloatField()),
                ('z', models.FloatField()),
                ('text', models.CharField(max_length=255)),
            ],
        ),
    ]
