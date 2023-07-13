from django.conf import settings
from django.db import models
import requests

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    pub_date = models.DateTimeField() #publication date
    created = models.DateTimeField(auto_now_add=True) # kann automatisch ausgefüllt werden
    user = models.ForeignKey("auth.user", on_delete=models.CASCADE, related_name='posts')
    channel = models.CharField(max_length=100)
    posted = models.BooleanField(default=False)
    error = models.CharField(max_length=500, default="") # wenn beim posten ein fehler auftritt, wird beim Error der Fehler angezeigt


    def __str__(self):
        return f"{self.user} -> {self.title} ({self.pub_date})"

    def elipsis(self):
        if len(self.text)>23:
            return self.text[:20] + "..."
        else:
            return self.text


    def publish(self):
        response = requests.post(
                    "https://bachelorarbeit-rxk9339.slack.com/api/chat.postMessage",
                    json=dict(
                        channel=self.channel,
                        text=self.title, 
                        attachments=[dict(text=self.text)]), 
                    headers={
                        #"Content-Type": "application/json, charset=utf-8",
                        "Authorization": settings.SLACK_API_TOKEN
                    }
        )
        response_json = response.json()
        if response_json['ok']:
            self.posted = True
            self.error = ''
            self.save()
            print(f'publish successful: {self.title}')
        else:
            self.error = response_json['error']
            self.save()
            print(f'publish failed: {self.title} reason: {self.error}')


