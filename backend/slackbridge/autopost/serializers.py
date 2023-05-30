from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        user = serializers.ReadOnlyField(source="user.username")
        fields = ['title', 'text', 'channel', 'pub_date']
