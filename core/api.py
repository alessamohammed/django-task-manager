from rest_framework import viewsets, permissions, generics

from .models import Task
from .serializers import TaskSerializer, UserRegisterSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """CRUD operations for the authenticated user's tasks."""

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(user=self.request.user)
        status = self.request.query_params.get("status")
        if status == "completed":
            queryset = queryset.filter(completed=True)
        elif status == "pending":
            queryset = queryset.filter(completed=False)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(generics.CreateAPIView):
    """Public endpoint for new user registration."""

    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny] 