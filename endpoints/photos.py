from silence.decorators import endpoint

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT photos.*,username,profilePicUrl,AVG(score)AS score,GROUP_CONCAT(DISTINCT categoryName)AS categories FROM photos LEFT JOIN categoriesphotos ON photos.photoId=categoriesphotos.photoId LEFT JOIN categories ON categoriesphotos.categoryId=categories.categoryId LEFT JOIN ratings ON photos.photoId=ratings.photoId JOIN users ON photos.userId=users.userId WHERE photos.photoId = $photoId  GROUP BY categoriesphotos.photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photos/recent",
    method="GET",
    sql="SELECT * FROM photos WHERE visibility='PUBLIC' ORDER BY uploadDate DESC"
)
def get_recent():
    pass

###############################################################################

@endpoint(
    route="/photos/recent/$userId",
    method="GET",
    sql="SELECT * FROM photos WHERE visibility='PRIVATE' AND userId=$userId ORDER BY uploadDate DESC"
)
def get_recent_private():
    pass

###############################################################################

@endpoint(
    route="/photos/users/$userId",
    method="GET",
    sql="SELECT photos.*,users.username FROM Users NATURAL JOIN Photos WHERE userId = $userId AND visibility='PUBLIC' ORDER BY uploadDate DESC"
)
def get_user_posts():
    pass

###############################################################################
@endpoint(
    route="/photos/categories/$categoryId",
    method="GET",
    sql="SELECT photos.*,categories.categoryName FROM photos NATURAL JOIN categoriesphotos NATURAL JOIN categories WHERE categoryId = $categoryId AND visibility='PUBLIC' ORDER BY uploadDate DESC"
)
def get_category_posts():
    pass

###############################################################################

@endpoint(
    route="/photos/top_rated",
    method="GET",
    sql="SELECT photos.* FROM ratings JOIN photos ON ratings.photoId=photos.photoId AND (70>(DATEDIFF(CURRENT_TIMESTAMP, uploadDate))) WHERE visibility='PUBLIC' GROUP BY photos.photoId ORDER BY AVG(score) DESC LIMIT 5"
)
def get_top_rated():
    pass

###############################################################################

@endpoint(
    route="/photos/top_commented",
    method="GET",
    sql="SELECT photos.* FROM comments JOIN photos ON comments.photoId=photos.photoId AND (70>(DATEDIFF(CURRENT_TIMESTAMP, uploadDate))) WHERE visibility='PUBLIC' GROUP BY photos.photoId ORDER BY COUNT(commentId) DESC LIMIT 5"
)
def get_top_commented():
    pass

###############################################################################

@endpoint(
    route="/photos/followedBy/$userId",
    method="GET",
    sql="SELECT photos.* FROM photos NATURAL JOIN users JOIN usersusers ON users.userId=usersusers.userFollowsId WHERE userFollowedById=$userId AND visibility='PUBLIC' ORDER BY uploadDate DESC "
)
def get_followed():
    pass

###############################################################################

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, photoUrl, visibility, userId) VALUES ($title, $description, $photoUrl, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=False,
)
def create(title, description, photoUrl, visibility, userId):
    pass


###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, photoUrl = $photoUrl, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=False,
)
def update(title, description, photoUrl, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=False,
)
def delete():
    pass

