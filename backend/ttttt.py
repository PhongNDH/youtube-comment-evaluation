import csv
import googleapiclient.discovery
import googleapiclient.errors
from googleapiclient.discovery import build
import time

DEVELOPER_KEY = "AIzaSyADp7BinfKMvNc_3aHAZsSSvg5d6nlr7OA"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def get_youtube_short_code(link):
    # Extract the video ID or the video shortcode from the YouTube link
    if 'youtu.be' in link:
        short_code = link.split('/')[-1]
    else:
        short_code = link.split('v=')[-1].split('&')[0]
    return short_code

def get_all_comments(youtube, video_id, number):
    comments = []
    next_page_token = None
    index = 0

    while index < number:
        try:
            response = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=1,
                pageToken=next_page_token
            ).execute()

            for item in response["items"]:
                comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
                comments.append(comment)

            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break
            index += 1

        except googleapiclient.errors.HttpError as error:
            print(f"An error occurred: {error}")
            break

    return comments

def get_comments_len(link):
    comments = []
    next_page_token = None
    youtube = googleapiclient.discovery.build(
        YOUTUBE_API_SERVICE_NAME,
        YOUTUBE_API_VERSION,
        developerKey=DEVELOPER_KEY
    )
    landmark = 40
    index = 0
    video_id = get_youtube_short_code(link)
    start = time.time()
    while index < landmark:
        try:
            response = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=100,
                pageToken=next_page_token
            ).execute()

            for item in response["items"]:
                comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
                comments.append(comment)

            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break
            index += 1
        except googleapiclient.errors.HttpError as error:
            print(f"An error occurred: {error}")
            break
    end = time.time()    
    print("The time of execution of above program is : " ,(end-start) * 10**3 , "ms"),
    print("Number of comments : ",len(comments))

def release_comments(link, number) :
    youtube = googleapiclient.discovery.build(
        YOUTUBE_API_SERVICE_NAME,
        YOUTUBE_API_VERSION,
        developerKey=DEVELOPER_KEY
    )

    video_id = get_youtube_short_code(link)

    comments = get_all_comments(youtube, video_id, number)

    if(comments == None) :
        return 
    # Write the comments to a CSV file
    with open('commentsytV2.csv', mode='w', newline='', encoding='utf-8-sig') as file:
        writer = csv.writer(file)
        writer.writerow(["Comment"])
        for comment in comments:
            writer.writerow([comment])
    
    print(f"{len(comments)} comments saved to commentsyt7.csv")
    return comments

get_comments_len('https://www.youtube.com/watch?v=uk-DSogtQRo')

    

