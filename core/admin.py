from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'priority', 'status', 'created_at')
    list_filter = ('priority', 'status') 