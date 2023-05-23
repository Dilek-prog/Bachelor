from django.db.models.query import QuerySet
from django.shortcuts import render
from .models import Post
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import PostSerializer

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        queryset = Post.objects.filter(title="teszt")