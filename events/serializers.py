from rest_framework import serializers
from .models import Event, Like
from accounts.models import User


class EventSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=True
    )

    class Meta:
        model = Event
        fields = ["name", "date", "time", "location", "image", "creator"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
