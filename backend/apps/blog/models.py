from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from apps.models import TimestampedModel
import shortuuid

# Create your models here.

class User(AbstractUser):
    bio = models.TextField(
        blank=True,
        null=True
    )

    profile_picture = models.ImageField(
        upload_to="profile",
        blank=True,
        null=True
    )

    facebook = models.URLField(
        max_length=255,
        blank=True,
        null=True
    )

    youtube = models.URLField(
        max_length=255,
        blank=True,
        null=True
    )

    instagram = models.URLField(
        max_length=255,
        blank=True,
        null=True
    )

    twitter = models.URLField(
        max_length=255,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username
    
class BlogCategory(TimestampedModel):
    name = models.CharField(
        max_length=255,
    )

    description = models.CharField(
        max_length=1000,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name
    
class Blog(TimestampedModel):
    title = models.CharField(
        max_length=255,
    )

    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True
    )

    content = models.TextField(
        blank=True,
        null=True,
    )

    author = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="blogs",
        null=True
    )

    posted_at = models.DateTimeField(
        blank=True,
        null=True
    )

    state = models.CharField(
        max_length=100,
        choices={
            'draft': 'Draft',
            'posted': 'Posted',
        },
        default='draft',
    )
    
    categories = models.ManyToManyField(
        BlogCategory,
        blank=True,
        related_name='categories',
    )

    featured_image = models.ImageField(
        upload_to="blog",
        blank=True,
        null=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
    
    def unique_slug(self, slug):
        # Check if slug exists and generate a slug 
        num = 1
        base_slug = slug
        while Blog.objects.filter(slug=slug).exists():
            slug = f'{base_slug}-{str(shortuuid.uuid().lower()[:2])}'
            num += 1
        return slug
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = self.unique_slug(base_slug)
            self.slug = slug

        if not self.state == 'draft' and self.posted_at is None:
            self.posted_at = timezone.now()

        super().save(*args, **kwargs)


