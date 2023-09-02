from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    positive = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    negative = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    neutral = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    link = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    createAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class Comment(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.SET_NULL, null=True)
    sentiment = models.IntegerField(null=True, blank=True, default=1)
    _id = models.AutoField(primary_key=True, editable=False)
    content = models.TextField(null=True, blank=True)
    language = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.content

class Avatar(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True, default='/user-default.png')
    
    def __str__(self):
        return self.user.first_name