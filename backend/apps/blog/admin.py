from apps.blog.models import User, Blog, BlogCategory
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.

@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ["username", "email", "first_name", "last_name"]
    # We add the new fields for admin form
    fieldsets = UserAdmin.fieldsets + (
        (
            "Profile info", 
            {
                "fields": ["bio", "profile_picture", "facebook", "youtube", "instagram", "twitter"],
            }
         ),
    )


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ["title", "state", "author", "posted_at"]
