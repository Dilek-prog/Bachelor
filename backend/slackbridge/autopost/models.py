from django.conf import settings
from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    pub_date = models.DateTimeField() #publication date
    created = models.DateTimeField(auto_now_add=True) # kann automatisch ausgefüllt werden
    user = models.ForeignKey("auth.user", on_delete=models.CASCADE, related_name='posts')
    channel = models.CharField(max_length=100)
    posted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} -> {self.title} ({self.pub_date})"

