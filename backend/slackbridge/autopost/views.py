from rest_framework import viewsets
from rest_framework import permissions

from .models import Post
from .serializers import PostSerializer
from .permission import IsOwner

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)

