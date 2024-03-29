from django.urls import include, path
from knox import views as knox_views
from rest_framework.routers import DefaultRouter 

from .views import PostViewSet


router = DefaultRouter()
router.register(r"posts", PostViewSet, basename="post")

urlpatterns = [
   path("", include(router.urls)),
   path("login/", knox_views.LoginView.as_view(), name="knox_login"), 
   path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"), 
   path("logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"), 
]
