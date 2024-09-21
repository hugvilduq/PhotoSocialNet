from silence.decorators import endpoint

@endpoint(
    route="/comments/$photoId",
    method="GET",
    sql="SELECT * FROM Comments NATURAL JOIN Users WHERE photoId = $photoId"
)
def get_photo_comments():
    pass

###############################################################################


@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments(commentText,userId,photoId) VALUES ($commentText, $userId, $photoId)",
    auth_required=False,
)
def create_comment(commentText,userId,photoId):
    pass

