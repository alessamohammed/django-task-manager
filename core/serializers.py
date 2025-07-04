from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Task


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        return user


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "priority", "status", "created_at") 