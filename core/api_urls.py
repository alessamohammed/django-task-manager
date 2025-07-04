from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api import TaskViewSet, RegisterView

router = DefaultRouter()
router.register("tasks", TaskViewSet, basename="task")

urlpatterns = [
    path("register/", RegisterView.as_view(), name="api_register"),
    path("", include(router.urls)),
] 