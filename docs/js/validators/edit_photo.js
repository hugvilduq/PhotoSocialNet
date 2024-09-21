"use strict";

const editPhotoValidator = {
    getErrors: function (formData) {
        let errors=[];

        let photoUrl = formData.get("photoUrl");
        let title = formData.get("title");
        let description = formData.get("description");
        
        if(photoUrl.length == 0){
            errors.push("The URL cannot be empty");
        }
        if(title.length == 0){
            errors.push("Title cannot be empty");
        }
        if(description.length == 0){
            errors.push("Description cannot be empty");
        }

        return errors;
    }
};

export { editPhotoValidator };