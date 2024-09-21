from silence.decorators import endpoint

@endpoint(
    route="/score/photos/$photoId/$userId",
    method="GET",
    sql="SELECT * FROM Ratings WHERE photoId=$photoId AND userId=$userId"
)
def get_submitted_score():
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings(score,userId,photoId) VALUES ($score, $userId, $photoId) ON DUPLICATE KEY UPDATE score=$score",
)
def create(score,userId,photoId):
    pass