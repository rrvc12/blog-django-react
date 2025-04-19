from django.urls import path
from . import views

app_name = "blog"

urlpatterns = [
    path("register_user/", views.register_user, name="register_user"),
    path("update_user/", views.update_user, name="update_user"),
    path("create_blog/", views.create_blog, name="create_blog"),
    path("create_category/", views.create_blog_category, name="create_category"),
    path("blog_list/", views.blog_list, name="blog_list"),
    path("blogs/<slug:slug>", views.get_blog, name="get_blog"),
    path("update_blog/<int:pk>/", views.update_blog, name="update_blog"),
    path("delete_blog/<int:pk>/", views.delete_blog, name="delete_blog"),
    path("get_categories/", views.get_blog_categories, name="get_categories"),
    path("get_username/", views.get_username, name="get_username"),
    path("get_userinfo/<str:username>", views.get_userinfo, name="get_userinfo")
]