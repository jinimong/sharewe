from rest_framework import status
from django.urls import reverse

login_url = reverse("token_obtain_pair")
refresh_url = reverse("token_refresh")


def test_user(user_factory):
    password = "1234"
    user = user_factory(password=password)
    assert user.is_active
    assert user.check_password(password)


def test_user_login(user_factory, api_client):
    password = "1234"
    user = user_factory(password=password)

    payload = {"email": user.email, "password": "0000"}  # Wrong Password
    response = api_client.post(login_url, payload)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    payload = {"email": user.email, "password": password}
    response = api_client.post(login_url, payload)
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "refresh" in response.data

    access_token = response.data["access"]
    refresh_token = response.data["refresh"]

    response = api_client.post(refresh_url, {"refresh": ""})
    assert response.status_code == status.HTTP_400_BAD_REQUEST

    response = api_client.post(refresh_url, {"refresh": refresh_token})
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert access_token != response.data["access"]
