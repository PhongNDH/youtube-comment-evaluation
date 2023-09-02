from django.urls import path
from base.views import chat_views as views


urlpatterns = [
   path('',views.getChatInfo,name='chat-info'),
   path('delete/',views.resetCommentAndChat, name='chat-delete-comment'),
   path('quantity/',views.getCommentQuantity,name='chat-comment-quantity'),
   path('list/',views.getChatList, name='chat-list'),
   path('comment/<str:pk>/',views.getComment, name='chat-commment')
]