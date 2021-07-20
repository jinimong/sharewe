import factory


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = "users.User"
        django_get_or_create = ("email",)

    email = factory.Faker("email")
    username = factory.Faker("slug")
    password = factory.PostGenerationMethodCall("set_password", "1234")
