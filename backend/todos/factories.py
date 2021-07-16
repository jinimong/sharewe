import factory


class TodoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = "todos.Todo"

    text = factory.Faker("slug")
    done = factory.Faker("boolean")
    user = factory.SubFactory("core.factories.UserFactory")
