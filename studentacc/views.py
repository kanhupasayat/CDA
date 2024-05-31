from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from .models import Contact
from .models import Contact_us
from .models import StudentInfo
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.urls import reverse

from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode





# Create your views here.


#user loging stats

def login_page(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Check if the user exists by email
        if not User.objects.filter(email=email).exists():
            messages.error(request, 'Invalid Username or Email')
            return redirect('/login')

        user = authenticate(request, username=email, password=password)
        if user is None:
            messages.error(request, 'Invalid Password')
            return redirect('/login')
        else:
            login(request, user)
            return redirect('/')
    return render(request, "login.html")





def logout_page(request):
    logout(request)
    return redirect(reverse('login_page'))


def signup(request):

    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        terms_condition = request.POST.get("terms_condition")

        user=User.objects.filter(email=email,username=email)
        if user.exists():
            messages.error(request,'email already taken')
            return redirect('signup')



        if not terms_condition:
            # Handle the case where terms and conditions are not agreed
            return render(request, "signup.html", {"error": "You must agree to the terms and conditions."})

        user = User.objects.create(
            username=email,
            first_name=first_name,
            last_name=last_name,
            email=email,

        )
        user.set_password(password)

        token = default_token_generator.make_token(user)
        user.save()
        messages.info(request,'Acoount created successfully')
        return redirect("login_page")  # Use the name of the URL pattern for the login page

    return render(request, "signup.html")










@login_required
def student_info_form(request):
    if request.method == 'POST':
        roll_number = request.POST['roll_number']
        first_name = request.POST['first_name']
        last_name = request.POST.get('last_name', '')
        date_of_birth = request.POST['date_of_birth']
        gender = request.POST['gender']
        father_name = request.POST['father_name']
        father_profession = request.POST['father_profession']
        mother_name = request.POST['mother_name']
        mother_profession = request.POST['mother_profession']
        father_contact_no = request.POST['father_contact_no']
        mother_contact_no = request.POST['mother_contact_no']
        mobile_number = request.POST['mobile_number']
        email = request.POST['email']
        city = request.POST['city']
        state = request.POST['state']
        country = request.POST['country']
        postal_code = request.POST['postal_code']
        address = request.POST['address']
        image = request.FILES['image']

        student_info = StudentInfo(
                user=request.user,
                roll_number=roll_number,
                first_name=first_name,
                last_name=last_name,
                date_of_birth=date_of_birth,
                gender=gender,
                father_name=father_name,
                father_profession=father_profession,
                mother_name=mother_name,
                mother_profession=mother_profession,
                father_contact_no=father_contact_no,
                mother_contact_no=mother_contact_no,
                mobile_number=mobile_number,
                email=email,
                city=city,
                state=state,
                country=country,
                postal_code=postal_code,
                address=address,
                image=image
            )
        student_info.save()
        messages.success(request, 'Student information submitted successfully!')
        return redirect('student_info_form')

    return render(request,"student_info_form.html")


from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import StudentInfo


@login_required
def profile(request):
    try:
        student = StudentInfo.objects.get(user=request.user)
        return render(request, 'student_profile.html', {'student': student})
    except StudentInfo.DoesNotExist:
        messages.warning(request, 'No profile found for your account. Please complete your profile.')
        return redirect('student_info_form')


@login_required
def update_profile(request):
    student = get_object_or_404(StudentInfo, user=request.user)

    if request.method == 'POST':
        student.roll_number = request.POST.get('roll_number')
        student.date_of_birth = request.POST.get('date_of_birth')
        student.gender = request.POST.get('gender')
        student.father_name = request.POST.get('father_name')
        student.father_profession = request.POST.get('father_profession')
        student.mother_name = request.POST.get('mother_name')
        student.mother_profession = request.POST.get('mother_profession')
        student.father_contact_no = request.POST.get('father_contact_no')
        student.mother_contact_no = request.POST.get('mother_contact_no')
        student.mobile_number = request.POST.get('mobile_number')
        student.city = request.POST.get('city')
        student.state = request.POST.get('state')
        student.country = request.POST.get('country')
        student.postal_code = request.POST.get('postal_code')
        student.address = request.POST.get('address')

        if 'image' in request.FILES:
            student.image = request.FILES['image']

        student.save()
        messages.success(request, 'Your profile has been updated successfully!')
        return redirect('profile')

    return render(request, 'update_profile.html', {'student': student})


def home(request):
    return render(request, "index-university.html")

def about(request):
    return render(request, 'about-three.html')


# def profile(request):
#     student = get_object_or_404(StudentInfo,user=request.user)
#     return render(request,'student_profile.html', {'student': student})



@login_required
def profile(request):
    try:
        student = StudentInfo.objects.get(user=request.user)
        return render(request, 'student_profile.html', {'student': student})
    except StudentInfo.DoesNotExist:
        messages.warning(request, 'No profile found for your account. Please complete your profile.')
        return redirect('student_info_form')



def course(request):
    return render(request,'course-one.html')



def contact_me(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')
        contacts = Contact(name=name, email=email, phone=phone, message=message)
        contacts.save()
        return redirect('contact-me')
    return render(request, "contact-me.html")



def contact_us(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')
        contacts =Contact_us(name=name, email=email, phone=phone, message=message)
        contacts.save()
        return redirect('contact-us')

    return render(request,"contact-us.html")