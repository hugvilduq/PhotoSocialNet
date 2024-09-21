"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { registerValidator } from "/js/validators/register.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";

function main(){
    addHandlerForm();
}


function addHandlerForm(){
    let form = document.getElementById("register-form");
    form.onsubmit =validateForm;

}

function validateForm(event){
    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);

    let errors = registerValidator.getErrors(formData);

    if(errors.length > 0 ){
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        } 
    } else{
        sendRegister(formData); // 6. Se envía el formulario al servidor.   
					return false; // Se mantiene el formulario para ver errores en el registro
    }
}

function sendRegister(formData) { // 6. Registro del nuevo usuario
    
    authAPI.register(formData)
        .then(loginData=>{    
                let sessionToken=loginData.sessionToken;
                let loggedUser=loginData.user;
                sessionManager.login(sessionToken, loggedUser);
                window.location.href = "index.html"; // Devuelve control al documento de inicio
        })
        .catch(error=>{    
            if(error.includes("for key 'email'")){
                messageRenderer.showErrorMessage("There already exists another user with that email");}
                else{
                    messageRenderer.showErrorMessage(error);
                    return false; // Se mantiene el formulario y se muestra el error de registro
                }
           
        });
    }
document.addEventListener("DOMContentLoaded", main);