from .permission import IsOwner
from django.db.models.query import QuerySet
from django.http import HttpResponse, JsonResponse
from django.http.response import Http404
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework import generics

from .models import Post
from .serializers import PostSerializer

class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]


