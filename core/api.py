from rest_framework import viewsets, permissions, generics
from django.db import models

from .models import Task
from .serializers import TaskSerializer, UserRegisterSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """CRUD operations for the authenticated user's tasks."""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(user=self.request.user)

        # Filter by status choice if provided
        status = self.request.query_params.get("status")
        if status in Task.Status.values:
            queryset = queryset.filter(status=status)

        # Optional filter by priority
        priority = self.request.query_params.get("priority")
        if priority in Task.Priority.values:
            queryset = queryset.filter(priority=priority)

        # Text search by title or description (?q=)
        query = self.request.query_params.get("q")
        if query:
            queryset = queryset.filter(
                models.Q(title__icontains=query) | models.Q(description__icontains=query)
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(generics.CreateAPIView):
    """Public endpoint for new user registration."""

    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny] 