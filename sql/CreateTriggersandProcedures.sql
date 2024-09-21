CREATE OR REPLACE VIEW photosRating AS SELECT photos.*,AVG(score) AS score FROM ratings JOIN photos ON ratings.photoId=photos.photoId GROUP BY photos.photoId ORDER BY AVG(score);

-- RN-001
DELIMITER //
CREATE OR REPLACE TRIGGER tPhotosLimit
	BEFORE INSERT ON Photos
	FOR EACH ROW
	BEGIN
	DECLARE postsAmount INT;
	SET postsAmount = (SELECT COUNT(*) FROM photos WHERE userId=NEW.userId); 	
	
	IF (postsAmount)>=50 THEN
	SIGNAL SQLSTATE '45000' SET message_text = 
			'You reached the maximum amount possible of posts';
		END IF;
	END //
DELIMITER ;

-- RN-005
DELIMITER //
CREATE OR REPLACE TRIGGER tCommentedPhototDelete
	BEFORE DELETE ON Photos
	FOR EACH ROW
	BEGIN
	DECLARE commentAmount INT;
	SET commentAmount = (SELECT COUNT(*) FROM comments WHERE photoId=old.photoId); 	
	
	IF (commentAmount)>0 THEN
	SIGNAL SQLSTATE '45000' SET message_text = 
			'Photos with comments cannot be deleted';
		END IF;
	END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER tCommentedPhotoPrivatize
	BEFORE UPDATE ON Photos
	FOR EACH ROW
	BEGIN
	DECLARE commentAmount INT;
	SET commentAmount = (SELECT COUNT(*) FROM comments WHERE photoId=NEW.photoId); 	
	
	IF (commentAmount)>0 AND NEW.visibility='PRIVATE' THEN
	SIGNAL SQLSTATE '45000' SET message_text = 
			'Photos with comments cannot be made private';
		END IF;
	END //
DELIMITER ;



