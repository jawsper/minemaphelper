from django.contrib.auth import get_user_model

from minemaphelper.minemap.models import World, MinecraftMap

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, URLPatternsTestCase


class WorldTests(APITestCase):
    def setUp(self):
        self.user = get_user_model()(username='staff')
        self.user.set_password('staffword')
        self.user.save()

    def test_list_worlds(self):
        url = reverse('world-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_create_world_forbidden_when_anonymous(self):
        url = reverse('world-list')
        data = {'name': 'World', 'private': True}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_world_when_authenticated(self):
        url = reverse('world-list')
        data = {'name': 'World', 'private': True}
        self.assertTrue(self.client.login(username='staff', password='staffword'))
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response.data, { 'pk': 1, 'name': 'World', 'private': True})

    def test_access_private_world_when_anonymous(self):
        self.test_create_world_when_authenticated()
        self.client.logout()
        url = reverse('world-detail', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class MapListTests(APITestCase):
    def setUp(self):
        self.private_world = World.objects.create(name='Test world', private=True)
        self.public_world = World.objects.create(name='Public test world', private=False)
        self.test_user = get_user_model().objects.create(username='testuser')
        self.test_user.set_password('testpassword')
        self.test_user.save(update_fields=['password'])
        self.test_user2 = get_user_model().objects.create(username='testuser2')
        self.private_world.users.add(self.test_user)
        self.public_world.users.add(self.test_user)

    def tearDown(self):
        self.private_world.delete()
        self.public_world.delete()
        self.test_user.delete()
        self.test_user2.delete()

    def test_list_maps_unauthenticated_for_private_world_fails(self):
        url = reverse('map-list', args=[self.private_world.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_maps_unauthenticated_for_public_world_succeeds(self):
        url = reverse('map-list', args=[self.public_world.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_maps_authenticated_for_private_world_succeeds(self):
        self.assertTrue(self.client.login(username='testuser', password='testpassword'))
        url = reverse('map-list', args=[self.public_world.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_maps_authenticated_for_public_world_succeeds(self):
        self.assertTrue(self.client.login(username='testuser', password='testpassword'))
        url = reverse('map-list', args=[self.public_world.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_maps_authenticated_for_invalid_private_world_fails(self):
        self.client.force_authenticate(self.test_user2)
        url = reverse('map-list', args=[self.private_world.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class MapDetailTests(APITestCase):
    def setUp(self):
        self.private_world = World.objects.create(name='Test world', private=True)
        self.public_world = World.objects.create(name='Public test world', private=False)
        self.good_user = get_user_model().objects.create(username='testuser')
        self.bad_user = get_user_model().objects.create(username='testuser2')
        self.private_world.users.add(self.good_user)
        self.public_world.users.add(self.good_user)

        self.map_priv_0_0_0 = MinecraftMap.objects.create(
            world=self.private_world,
            zoom=0, x=0, z=0,
            map=1
        )

    def tearDown(self):
        self.private_world.delete()
        self.public_world.delete()
        self.good_user.delete()
        self.bad_user.delete()

    def test_detailed_map_non_existant_fails(self):
        url = reverse('map-detail', args=[
            self.private_world.pk, 
            self.map_priv_0_0_0.zoom,
            self.map_priv_0_0_0.z,
            self.map_priv_0_0_0.x,
        ])
        print(url)


class MarkerTests(APITestCase):
    pass
