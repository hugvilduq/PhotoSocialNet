from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT *,COUNT(categoriesPhotos.categoryId) AS categoryScore FROM categories LEFT JOIN categoriesphotos ON categories.categoryId=categoriesphotos.categoryId GROUP BY categories.categoryId ORDER BY categoryName;"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories/top_categories",
    method="GET",
    sql="SELECT *,COUNT(categoryId) AS categoryScore FROM categories NATURAL JOIN categoriesphotos GROUP BY categoryId ORDER BY COUNT(categoryId) DESC LIMIT 5"
)
def get_top_categories():
    pass

###############################################################################
@endpoint(
    route="/categories/$categoryId",
    method="GET",
    sql="SELECT *,COUNT(categoryId) AS categoryScore FROM categories NATURAL JOIN categoriesphotos  WHERE categoryId = $categoryId"
)
def get_category_by_id():
    pass

###############################################################################
@endpoint(
    route="/categories/photo/$photoId",
    method="GET",
    sql="SELECT * FROM categories NATURAL JOIN categoriesphotos WHERE photoId = $photoId"
)
def get_photo_categories():
    pass

###############################################################################

@endpoint(
    route="/categoriesPhotos",
    method="POST",
    sql="INSERT INTO CategoriesPhotos(categoryId,photoId) VALUES ($categoryId,$photoId)",
    auth_required=False,
)
def create_categoryPhoto(categoryId,photoId):
    pass

###############################################################################
@endpoint(
    route="/categoriesPhotos/$categoryId/$photoId",
    method="DELETE",
    sql="DELETE FROM categoriesPhotos WHERE categoryId=$categoryId AND photoId=$photoId",
    auth_required=False,
)
def delete_categoryPhoto():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories(categoryName) VALUES ($categoryName)",
    auth_required=False,
)
def create_category(categoryName):
    pass
