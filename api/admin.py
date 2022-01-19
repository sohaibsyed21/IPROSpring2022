from django.contrib import admin
from .models import Classes
from .models import Posts


class ClassesAdmin(admin.ModelAdmin):
    list_display = ("courseCode", "department","courseTitle", "courseDesc", "courseCreds", "coursePrereqs")


class PostsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "contents")


admin.site.register(Classes, ClassesAdmin)
admin.site.register(Posts, PostsAdmin)