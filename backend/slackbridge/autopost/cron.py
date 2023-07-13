from datetime import datetime

from django_cron import CronJobBase, Schedule

from .models import Post

class PublishPosts(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'autopost.PublishPost' 

    def do(self):
        posts = Post.objects.filter(posted=False, pub_date__lte=datetime.now().astimezone(), error="")
        print(f"Publishing {len(posts)} posts ({posts})")
        for post in posts:
            post.publish()
