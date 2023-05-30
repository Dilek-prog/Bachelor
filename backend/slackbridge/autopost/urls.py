from django.urls import include, path
from .views import post_detail, post_list

urlpatterns = [
    path("posts/", post_list),
    path("posts/<int:pk>/", post_detail)
]



