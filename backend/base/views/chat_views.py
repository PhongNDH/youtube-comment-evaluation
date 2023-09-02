from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import json

from base.comment import get_titles, release_comments, get_comments_len
from base.models import Comment, Chat
from base.serializers import ChatSerializer, CommentSerializer
from base.predict import release_prediction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getChatInfo(request):
    user = request.user
    url = request.data['url']
    number = request.data['number']
    title = get_titles(url)
    release_comments(url, number)
    comments = release_prediction()
    if  len(comments) == 0:
        return Response({"info" : "", "comments":""})
    
    negative = 0
    positive = 0
    neutral = 0
    total = len(comments)
    
    for comment in comments:
        if comment.sentiment == 'negative': 
            negative += 1
        elif comment.sentiment == 'neutral':
            neutral += 1
        else:
            positive+=1
    
    negativeRate = 0
    positiveRate = 0
    neutralRate = 0
    
    negativeRate = round(negative/total, 4) * 100
    if positive == 0:
        neutralRate = 100 - negativeRate
    elif neutral == 0:
        positiveRate = 100 - negativeRate
    else:
        positiveRate = round(positive/total, 4) * 100
        neutralRate = 100 - positiveRate - negativeRate
    
                        
    chat = Chat.objects.create(
        user=user,
        name=title,
        link=url,
        positive= positiveRate,
        negative = negativeRate,
        neutral = neutralRate
    )
    for comment in comments:
        Comment.objects.create(
            chat=chat,
            content=comment.content,
            sentiment  = 1 if comment.sentiment == "neutral" else 0 if comment.sentiment == "negative" else 2,
            language=comment.language
        )
    chatSerializer = ChatSerializer(chat, many = False)
    commentsData = Comment.objects.filter(chat = chat)
    commentSerializer = CommentSerializer(commentsData , many=True)
    
    return Response({"info" : chatSerializer.data, "comments":commentSerializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getCommentQuantity(request):
    url = request.data['url']
    title = get_titles(url)
    nbcomments = get_comments_len(url)
    return Response({"title" : title, "quantity":nbcomments,"link" : url})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getChatList(request):
    user = request.user
    chats = Chat.objects.filter(user=user).order_by('-_id')
    if(len(chats) == 0):
        return Response({'detail': 'You have no chat'},status=status.HTTP_400_BAD_REQUEST)
    serializer = ChatSerializer(chats, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getComment(request,pk):
    user = request.user
    try:
        page = request.query_params.get('page')
        chat = Chat.objects.get(_id=pk)
        if chat.user != user:
            return Response({'detail': 'Cannot access this data'},status=status.HTTP_400_BAD_REQUEST)         
        comments = Comment.objects.filter(chat = chat)
        index = comments[0]._id
        paginator = Paginator(comments, 25)
        try:
            comments = paginator.page(page)
        except PageNotAnInteger:
            comments = paginator.page(1)
        except EmptyPage:
            comments = paginator.page(paginator.num_pages)
        if page == 'null':
            page = 1
        page = int(page)
        serializer = CommentSerializer(comments, many = True)
        return Response({'info' : serializer.data, 'name': chat.name, 'page': page, 'pages': paginator.num_pages,'index':index})
    except:
        return Response({'detail': 'Comment not found', status: status.HTTP_400_BAD_REQUEST}, status=status.HTTP_400_BAD_REQUEST)                 
    
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def resetCommentAndChat(request):
    Comment.objects.all().delete()
    Chat.objects.all().delete()
    return Response({'message' : 'Done'})