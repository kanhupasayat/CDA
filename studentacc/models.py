from django.db import models
from django.contrib.auth.models import User


from django.contrib.auth.models import User

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()

    def __str__(self):
        return self.name


class Contact_us(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()

    def __str__(self):
        return self.name




class StudentInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=20)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    father_name = models.CharField(max_length=100)
    father_profession = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100)
    mother_profession = models.CharField(max_length=100)
    father_contact_no = models.CharField(max_length=15)
    mother_contact_no = models.CharField(max_length=15)
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=10)
    address = models.TextField()
    image = models.ImageField(upload_to='student_images/')

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.roll_number})'

