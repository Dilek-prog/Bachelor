from django.conf import settings
from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.TextField()
    text = models.TextField()
    pub_date = models.DateTimeField() #publication date
    user = models.ForeignKey("auth.user", on_delete=models.CASCADE, related_name='posts')
    channel = models.TextField()
    posted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} -> {self.title} ({self.pub_date})"

