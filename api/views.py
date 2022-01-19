from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClassesSerializer, PostsSerializer
from .models import Classes, Posts


class ClassesView(viewsets.ModelViewSet):
    serializer_class = ClassesSerializer
    queryset = Classes.objects.all()


class PostsView(viewsets.ModelViewSet):
    serializer_class = PostsSerializer
    queryset = Posts.objects.all()