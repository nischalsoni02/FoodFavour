# views.py
from rest_framework import viewsets
from .models import Category, Product, Comment, ExpiryTracker
from .serializers import CategorySerializer, ProductSerializer, CommentSerializer, ExpiryTrackerSerializer, DonateFoodSerializer
from rest_framework.permissions import IsAuthenticated

from django.core.mail import send_mail
from django.http import JsonResponse
from backend.settings import EMAIL_HOST_USER
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from django.conf import settings
import openai

openai.api_key = settings.OPENAI_API_KEY


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ExpiryTrackerViewSet(viewsets.ModelViewSet):
    queryset = ExpiryTracker.objects.all()
    serializer_class = ExpiryTrackerSerializer


@api_view(['POST'])
def donate_form(request):
    serializer = DonateFoodSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        user_data = serializer.validated_data


        email_subject = 'Confirmation of Your Food Donation Form Submission - FoodFavor'


        html_content = render_to_string('donate_food_email.html', {'user_data': user_data})
        text_content = strip_tags(html_content)

        email = EmailMultiAlternatives(
            email_subject,
            text_content,
            EMAIL_HOST_USER,  
            [user_data["email"]]  
        )
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)

        return JsonResponse({'status': 'success', 'message': 'Form submitted successfully'})
    else:
        print("serializer not valid ")
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def newsletter(request):
    user_data = request.data
    email_subject = 'FoodFavor - Subscribed to Newsletter'
    html_content = render_to_string('newsletter_email.html')
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        email_subject,
        text_content,
        EMAIL_HOST_USER,  
        [user_data['email']]  
    )
    email.attach_alternative(html_content, "text/html")
    email.send(fail_silently=False)

    return JsonResponse({'status': 'success', 'message': 'Newsletter subscribed successfully'})

@api_view(['POST'])
def contact_form(request):
    user_data = request.data
    print("Request reached to backend")
    email_subject = 'FoodFavor - Contact Form Submission'
    html_content = render_to_string('contact_us_email.html')
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(
        email_subject,
        text_content,
        EMAIL_HOST_USER, 
        [user_data["email"]]  
    )
    email.attach_alternative(html_content, "text/html")
    email.send(fail_silently=False)

    return JsonResponse({'status': 'success', 'message': 'Form submitted successfully'})



@api_view(['POST'])
def get_recipe(request):
    try:
        ingredients = request.data
        prompt = f'''
            Given the following ingredients available in my home:

            -  {", ".join(ingredients)}

            Please generate a delicious recipe using these ingredients in below format: 
            ''' + '''

            {
                "recipe": "Delicious Recipe",
                "instructions": [
                    "instruction 1 ",
                    "instruction 22",
                    "instruction 3 and soon",
                ]   
            }

            Note: generate me instruciton as format specified above and generate nothing else. 
                    Note: generate me instruciton as format specified above and generate nothing else. 
                '''
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613", 
            messages = [{"role": "system", "content" : "Generate code for below explanition"},
                {"role": "user", "content" : f"{prompt}"}]
        )   

        response_data = completion.choices[0].message.content   
        return Response(response_data)  
     
    except Exception as e: 
        print(f"an error occured:{e}")
        return None   

