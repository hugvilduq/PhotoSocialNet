"use strict";

const registerValidator = {
    getErrors: function (formData) {
        let errors=[];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let username = formData.get("username");
        let email = formData.get("email");
        let phone = formData.get("telephone");
        let password1 = formData.get("password");
        let password2 = formData.get("password2");
        
        if(firstName.length < 3){
            errors.push("The first name must have at least 3 characters");
        }
        if(lastName.length < 3){
            errors.push("The last name must have at least 3 characters");
        }
        if(/[^0-9-]/.test(phone)){
            errors.push("Your phone number must be valid");
        }
        if (password1 !== password2){
            errors.push("Passwords must match");
        } 

        return errors;
    }
};

export { registerValidator };