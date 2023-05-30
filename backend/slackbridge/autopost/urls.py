from django.urls import include, path
from rest_framework import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PostDetail, PostList

urlpatterns = [
    path("posts/", PostList.as_view()),
    path("posts/<int:pk>/", PostDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)



