from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db import models, transaction


class UserManager(BaseUserManager):
    def create_user(self, email, username="", password=None, group=None):
        if not email:
            raise ValueError("The given email must be set")

        user = self.model(
            email=self.normalize_email(email), username=username,
        )
        user.set_password(password)
        user.group = group
        user.save(using=self._db)
        return user

    @transaction.atomic()
    def create_superuser(self, email, username="", password=None):
        user = self.create_user(email, username, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100, default="")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    joined_at = models.DateTimeField(auto_now_add=True)
    objects = UserManager()
    USERNAME_FIELD = "email"
