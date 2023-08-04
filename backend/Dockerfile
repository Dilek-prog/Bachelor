FROM ubuntu:22.04

RUN apt update 
RUN apt -y install python3 python3-django python3-djangorestframework
RUN apt -y install python3-pip
RUN pip install django-cron django-rest-knox requests
RUN apt -y install cron

COPY slackbridge/autopost /app/autopost 
COPY slackbridge/slackbridge /app/slackbridge
COPY slackbridge/manage.py /app/manage.py

COPY post-cron /etc/cron.d/post-cron
RUN chmod 0644 /etc/cron.d/post-cron 
RUN crontab /etc/cron.d/post-cron 

EXPOSE 8000

CMD printenv > /etc/environment && cron && python3 /app/manage.py runserver 0.0.0.0:8000 