from django.db import models


class Classes(models.Model):
    # id = models.AutoField(primary_key=True)
    courseCode = models.CharField(max_length=40, primary_key=True)
    department = models.CharField(max_length=100)
    courseTitle = models.CharField(max_length=255)
    courseDesc = models.CharField(max_length=4095)
    courseCreds = models.CharField(max_length=255)
    coursePrereqs = models.CharField(max_length=1024)

    def __str__(self):
        return self.courseCode

    class Meta:
        ordering = ("courseCode","department","courseTitle","courseDesc", "courseCreds", "coursePrereqs")


class Posts(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120)
    contents = models.CharField(max_length=1000)
    Classes = models.ForeignKey(
        Classes, on_delete=models.CASCADE, related_name='Classes+'
    )
    ParentPost = models.ForeignKey(
        'self', on_delete=models.CASCADE, related_name='Posts+', default="0000"
    )

    def __str(self):
        return self.name

    class Meta:
        ordering = ("name",)
