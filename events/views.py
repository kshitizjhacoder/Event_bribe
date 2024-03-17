from rest_framework import viewsets, status
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Event, Like
from .serializers import EventSerializer, LikeSerializer
from django.shortcuts import get_object_or_404
from accounts.models import User
from rest_framework.views import APIView


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def list(self, request):
        user_id = request.query_params.get("user_id")
        if user_id:
            user = get_object_or_404(User, id=user_id)
            events = self.queryset.filter(creator=user)
            serializer = self.get_serializer(events, many=True)
            return Response(serializer.data)
        else:
            return super().list(request)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeEventView(APIView):
    def post(
        self, request, event_id, user_id
    ):  # Include both event_id and user_id in the parameters
        user = get_object_or_404(User, id=user_id)
        event = get_object_or_404(Event, id=event_id)

        try:
            like = Like.objects.get(user=user, event=event)
            like.delete()
            return Response(
                {"message": "Like removed successfully"}, status=HTTP_204_NO_CONTENT
            )
        except Like.DoesNotExist:
            Like.objects.create(user=user, event=event)
            return Response(
                {"message": "Event liked successfully"}, status=HTTP_201_CREATED
            )
