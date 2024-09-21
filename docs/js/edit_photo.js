"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { editPhotoValidator } from "/js/validators/edit_photo.js";
import { photosAPI } from "/js/api/photos.js";
import { badLanguage } from "/js/utils/badLanguage.js";
import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { mp_zoom } from "/js/libs/mp_zoom.js";

let urlParams = new URLSearchParams ( window.location.search ); // Query a la URL
let photoId = urlParams.get ("photoId"); // Extrae el parámetro
const userLoggedId = sessionManager.getLoggedId();
let currentPhoto = null; // Datos de la foto actual

document.addEventListener("DOMContentLoaded", main);

function main(){
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    loadCurrentPhoto ();
    let registerForm = document.getElementById ("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;
    
    

    
}    
function handleSubmitPhoto(event){
    event.preventDefault(); // Evitar submit del navegador
    let form = event.target; // Captura del objeto formulario
    let formData = new FormData (form);
    let listaDatos = new Array()
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    for (let v of formData.values()){
        listaDatos.push(v);
    }
    let errors = editPhotoValidator.getErrors(formData);

    if(errors.length > 0 ){
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        } 
    } else{
        let titleString= new String(listaDatos[1]);
        let descString= new String(listaDatos[2]);
        if (badLanguage(titleString)===0 && badLanguage(descString)===0){ //Good language used
            if ( currentPhoto === null ) { // Creating a new photo
                formData.append("userId",sessionManager.getLoggedId());
                photosAPI
                .create(formData)
                .then(data => (window.location.href="index.html"))
                .catch(error => {
                    if (error=="Incorrect integer value: 'null' for column `proyecto_api_iissi`.`photos`.`userId` at row 1"){
                        messageRenderer.showWarningMessage("Register or Login to post photos")}
                    else{
                        messageRenderer.showErrorMessage(error);}
                        });
            }
                else { // Updating an existing photo
                    if (userLoggedId!=null){
                        formData.append ("userId", currentPhoto.userId );
                        formData.append ("date", currentPhoto.date );
                        photosAPI.update ( photoId , formData )
                        .then( data => window.location.href = "index.html")
                        .catch( error => messageRenderer.showErrorMessage( error ));
                    }
                    else{
                        messageRenderer.showErrorMessage("You do not have the permission to edit this photo");
                    }
                    
                }
    
        }
        else{ // Bad language used
            messageRenderer.showErrorMessage("Please, mind your language");
        }
    }
        
    //TODO categoriesAPI.createCategoryPhoto , crea un FormData que llama a su endpoint, 
    // pero recibe como parametro las categories y el lastId de la peticion API del POST
}
function loadCurrentPhoto () {
    let pageTitle = document.getElementById("title");
    let pageSubtitle = document.getElementById("subtitle");
    let urlInput = document.getElementById ("input-url");
    let titleInput = document.getElementById ("input-title");
    let descriptionInput = document.getElementById ("input-description");
    let visibilityInput = document.getElementById ("input-visibility");
    // let categoryInput = document.getElementById("input-categories");
    

    pageTitle.textContent = "Edit photo";
    pageSubtitle.textContent = "Details should be appreciated";

    photosAPI
        .getById(photoId)
        .then(photos => {
        currentPhoto = photos;
        urlInput.value = currentPhoto.photoUrl;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
        let container = document.getElementById("photo_details");
        if ( photoId !== null ){
            let photoDetails = photoRenderer.asPreviewCard(photos);
            container.appendChild(photoDetails);
        }else{
            
                    
        }
        mp_zoom.activate();
        })
        .catch ( error => {
        let container = document.getElementById("photo_details");
        let html= `<div>
                        <div class="card-dark btn-dark">
                            <div  class="card-header">
                                <h5 class="card-title">Example title</h5>
                                </div>
                                <img src=/images/bulb.jpg class="img-fluid-card-image card-img-top">
                                <div class="card-footer align-bottom">
                                <p class="card-text">Example description</p>
                                <a class="btn btn-lg btn-block btn-primary card-link">View details</a>
                            </div>
                        </div>
                    </div>`;
        let card = parseHTML(html);
        container.appendChild(card);
        });


}
