from django.urls import path, include

urlpatterns = [
    path('', include('apps.blog.urls')),
]
