import pytest
from pytest_factoryboy import register
from core.factories import UserFactory
from django.utils import timezone


register(UserFactory)


@pytest.fixture(autouse=True)
def enable_db_access_for_all_tests(db):
    pass


@pytest.fixture(scope="session", autouse=True)
def faker_session_locale():
    return ["ko_KR"]


@pytest.fixture(scope="session", autouse=True)
def faker_seed():
    return timezone.now()
