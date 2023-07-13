from rest_framework.fields import ReadOnlyField
from .models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        user = serializers.ReadOnlyField(source="user.username")
        fields = [
            'id',
            'title',
            'pub_date',
            'channel',
            'posted',
            'text',  
            'created',
            'error',
            'elipsis',
        ]

        read_only_fields = [  #Keine Überschreibung der Werte
            'id',
            'posted',
            'created',
            'error',
            'elipsis',
        ]
