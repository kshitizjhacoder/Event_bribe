from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, LikeEventView

router = DefaultRouter()
router.register(r"events", EventViewSet, basename="event")
urlpatterns = [
    path(
        "likes/<int:event_id>/<int:user_id>", LikeEventView.as_view(), name="like_event"
    ),
] + router.urls
