from django.db import models
from accounts.models import User


class Event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)
    image = models.URLField()
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_events"
    )

    def __str__(self):
        return self.name


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} likes {self.event}"
