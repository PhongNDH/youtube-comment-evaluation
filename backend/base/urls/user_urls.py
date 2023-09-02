from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('',views.getUserList,name='user-list'),
    path('login/', views.MyTokenObtainPairView.as_view(),
        name='token_obtain_pair'),
    path('register/', views.registerUser, name='user-register'),
    path('profile/',views.getUserProfile, name='user-profile'),
    path('profile/update/',views.updateUserProfile, name='user-profile-update'),
    path('profile/upload/avatar/',views.uploadAvatar, name='user-profile-upload-avatar'),
    path('avatar/',views.getUserAvatar, name='user-avarta')

]