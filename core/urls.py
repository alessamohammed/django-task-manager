from django.urls import path
from . import views

urlpatterns = [
    path('', views.task_list_view, name='task_list'),
    path('task/add/', views.task_create_view, name='task_add'),
    path('task/<int:pk>/edit/', views.task_update_view, name='task_edit'),
    path('task/<int:pk>/delete/', views.task_delete_view, name='task_delete'),
    path('register/', views.register_view, name='register'),
] 