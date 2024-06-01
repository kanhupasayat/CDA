

from django.urls import path
from . import views
from .views import student_info_form
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('about-three', views.about, name='about'),
    path('course-one', views.course, name='course'),
    path('contact-me', views.contact_me, name='contact-me'),
    path('contact-us', views.contact_us, name='contact-us'),

    #Auth
    path('login', views.login_page, name='login_page'),
    path('signup', views.signup, name='signup'),
    path('student-info', views.student_info_form, name="student_info_form"),
    path('logout/',views.logout_page,name='logout_page'),
    #forgot_password
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='reset_password_email.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),

    #profile urls
    path('student_profile', views.profile, name='profile'),
    path('update_profile',views.update_profile,name='update_profile'),
    path('change_password', views.change_password, name='change_password'),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
