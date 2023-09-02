from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

from base.serializers import UserSerializer, UserSerializerWithToken, ChatSerializer,AvatarSerializer
from base.models import Avatar

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many = False)
    
    data = request.data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']
    if(data['password'] != ''):
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadAvatar(request):
    data = request.data
    id = data['user_id']
    user = User.objects.get(id=id)
        
    avatar = Avatar.objects.filter(user = user)
    if(avatar):
        avatar[0].image = request.FILES.get('image') 
        avatar[0].save()
    else:
        Avatar.objects.create(
            user=user,
            image = request.FILES.get('image') 
        )
    return Response('Avatar was uploaded')
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserAvatar(request):
    user = request.user
    avatar = Avatar.objects.filter(user = user)
    if(avatar):
        serializer = AvatarSerializer(avatar[0], many=False)
        return Response(serializer.data)
    else:
        return Response('Avatar was not found')
    
