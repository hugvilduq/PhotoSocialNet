from silence.decorators import endpoint

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/top_rated",
    method="GET",
    sql="SELECT users.username,users.userId,ROUND(AVG(score),2) AS userScore FROM photosRating NATURAL JOIN users GROUP BY photosRating.userId ORDER BY userScore DESC LIMIT 5"
)
def get_top_rated():
    pass

###############################################################################

@endpoint(
    route="/users/top_followed",
    method="GET",
    sql="SELECT users.username,users.userId,COUNT(userFollowedById) AS userScore FROM usersusers JOIN users ON userFollowsId=userId GROUP BY userFollowsId ORDER BY userScore DESC LIMIT 5"
)
def get_top_followers():
    pass

###############################################################################

@endpoint(
    route="/usersUsers/$userFollowsId/$userFollowedById",
    method="GET",
    sql="SELECT userFollowsId,userFollowedById FROM UsersUsers WHERE userFollowsId=$userFollowsId AND userFollowedById=$userFollowedById"
)
def get_follow():
    pass

###############################################################################

@endpoint(
    route="/usersUsers",
    method="POST",
    sql="INSERT INTO UsersUsers(userFollowsId,userFollowedById) VALUES ($userFollowsId,$userFollowedById)"
)
def create_follow(userFollowsId,userFollowedById):
    pass

###############################################################################

@endpoint(
    route="/usersUsers/$userFollowsId/$userFollowedById",
    method="DELETE",
    sql="DELETE FROM UsersUsers WHERE userFollowsId=$userFollowsId AND userFollowedById=$userFollowedById"
)
def delete_follow():
    pass

###############################################################################