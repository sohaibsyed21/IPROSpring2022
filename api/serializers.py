from rest_framework import serializers
from .models import Classes, Posts


class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = ("courseCode", "department","courseDesc","courseDesc","coursePrereqs")


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ("id", "name", "contents", "Classes", "ParentPost")
