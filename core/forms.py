from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

from .models import Task


class BootstrapFormMixin:
    """Mixin to add bootstrap classes to form widgets."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            widget = field.widget
            existing = widget.attrs.get("class", "")
            if getattr(widget, 'input_type', '') == 'checkbox':
                widget.attrs['class'] = (existing + ' form-check-input').strip()
            elif getattr(widget, 'input_type', '') == 'select' or widget.__class__.__name__ == 'Select':
                widget.attrs['class'] = (existing + ' form-select').strip()
            else:
                widget.attrs['class'] = (existing + ' form-control').strip()


class RegisterForm(BootstrapFormMixin, UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email')


class TaskForm(BootstrapFormMixin, forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'completed']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
        } 