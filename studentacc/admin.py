from django.contrib import admin
from django.contrib.auth.models import User
from .models import StudentInfo

from .models import Contact,Contact_us

admin.site.register(Contact)
admin.site.register(Contact_us)
class StudentInfoAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'roll_number', 'email', 'mobile_number')
    search_fields = ('first_name', 'last_name', 'roll_number', 'email')
    list_filter = ('gender', 'city', 'state')

admin.site.register(StudentInfo, StudentInfoAdmin)
