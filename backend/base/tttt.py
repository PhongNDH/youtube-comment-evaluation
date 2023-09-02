import csv
import googleapiclient.discovery
import googleapiclient.errors

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


def get_all_comments(youtube, video_id):
    comments = []
    next_page_token = None

    while True:
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

        except googleapiclient.errors.HttpError as error:
            print(f"An error occurred: {error}")
            break
        
    return comments

def release_comments(link, number) :
    youtube = googleapiclient.discovery.build(
        YOUTUBE_API_SERVICE_NAME,
        YOUTUBE_API_VERSION,
        developerKey=DEVELOPER_KEY
    )

    video_id = get_youtube_short_code(link)

    comments = get_all_comments(youtube, video_id)

    
    
    if(comments == None) :
        return 
    # Write the comments to a CSV file
    with open('demo.csv', mode='w', newline='', encoding='utf-8-sig') as file:
        writer = csv.writer(file)
        writer.writerow(["Comment"])
        comments = comments[:number]
        for comment in comments:
            writer.writerow([comment])
            
    #return comments
    print(f"{len(comments)} comments saved to demo.csv")
    
release_comments('https://www.youtube.com/watch?v=MYiiwaQ-JlM',200)