from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.blog.models import Blog, BlogCategory

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields=["id", "email", "username", "first_name", "last_name", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        email = validated_data["email"]
        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        
        user = get_user_model()

        new_user = user.objects.create(email=email, username=username, first_name=first_name, last_name=last_name)

        new_user.set_password(validated_data["password"])
        new_user.save()

        return new_user
    
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "bio", "profile_picture", "facebook", "youtube", "instagram", "twitter"]
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "profile_picture"]


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ["id", "name", "description"]


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    categories = BlogCategorySerializer(many=True, read_only=True)  # Muestra detalles de las categorías
    categories_ids = serializers.PrimaryKeyRelatedField(
        queryset=BlogCategory.objects.all(),
        source="categories",
        many=True,
        write_only=True,  # Para que al enviar datos solo acepte IDs,
        required=False
    )

    class Meta:
        model = Blog
        fields = ["id", "title", "slug", "content", "author", "posted_at", "state", "categories", "categories_ids", "featured_image", "created_at", "updated_at"]

class UserInfoSerializer(serializers.ModelSerializer):
    author_posts = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "bio", "profile_picture", "author_posts"]

    def get_author_posts(self, user):
        blogs = Blog.objects.filter(author=user)[:9]
        serializer = BlogSerializer(blogs, many=True)
        return serializer.data




