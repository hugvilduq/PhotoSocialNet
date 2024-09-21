DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS UsersUsers;
DROP TABLE IF EXISTS categoriesphotos;
DROP TABLE IF EXISTS badWords;

CREATE TABLE Users(
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL,
	lastName VARCHAR(128) NOT NULL,
	telephone VARCHAR(32) NOT NULL,
	email VARCHAR(128) NOT NULL UNIQUE,
	username VARCHAR(64) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	profilePicUrl VARCHAR(512) DEFAULT "/images/default_avatar.png"
);

CREATE TABLE Photos(
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL,
	description VARCHAR(512) DEFAULT "",
	uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	photoUrl VARCHAR(512) NOT NULL,
	visibility VARCHAR(16) NOT NULL,
	userId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users(userId),
	CONSTRAINT validVisibility CHECK (visibility IN ('PUBLIC', 'PRIVATE'))
);

CREATE TABLE Comments(
	commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	commentText VARCHAR(512) NOT NULL,
	publishDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users(userId),
	FOREIGN KEY (photoId) REFERENCES Photos(photoId)
);

CREATE TABLE Ratings(
	ratingId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ratingDate DATETIME DEFAULT CURRENT_TIMESTAMP ,
	score INT NOT NULL,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users(userId),
	FOREIGN KEY (photoId) REFERENCES Photos(photoId),
	UNIQUE(userId,photoId),
	CONSTRAINT invalidScoreRange CHECK (score>=0 AND score<=5)

);

CREATE TABLE Categories(
	categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	categoryName VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE UsersUsers(
	userUserId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	userFollowsId INT NOT NULL,
	userFollowedById INT NOT NULL,
	FOREIGN KEY (userFollowsId) REFERENCES Users(userId),
	FOREIGN KEY (userFollowedById) REFERENCES Users(userId),
	UNIQUE(userFollowsId,userFollowedById),
	CONSTRAINT invalidAutoFollow CHECK (userFollowsId!=userFollowedById)
);
	
CREATE TABLE CategoriesPhotos(
	categoryPhotoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	categoryId INT,
	photoId INT NOT NULL,
	FOREIGN KEY (categoryId) REFERENCES Categories(categoryId),
	FOREIGN KEY (photoId) REFERENCES Photos(photoId) ON DELETE CASCADE,
	UNIQUE(categoryId,photoId)
	);	
