from core.models import TimestampedModel
from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _


class Todo(TimestampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("유저"),
        on_delete=models.CASCADE,
    )
    text = models.TextField(_("할일 정보"))
    done = models.BooleanField(_("완료 여부"))

    def __str__(self):
        return f"{'[x]' if self.done else '[ ]'}: {self.text}"
