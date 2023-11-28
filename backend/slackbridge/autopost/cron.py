from datetime import datetime

from django_cron import CronJobBase, Schedule

from .models import Post

class PublishPosts(CronJobBase):
    RUN_EVERY_MINS = 1 #Die Aufgabe wird alle 1 Minute ausgeführt 

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'autopost.PublishPost'  #Eindeutiger Code für die Aufgabe

    def do(self):
        #Holt ungepostete Blog-Posts, die veröffentlicht werden können
        posts = Post.objects.filter(posted=False, pub_date__lte=datetime.now().astimezone(), error="")
        print(f"Publishing {len(posts)} posts ({posts})")
        for post in posts:
            post.publish()
