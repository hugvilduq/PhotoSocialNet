"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { commentsRenderer } from "/js/renderers/comments.js";
import { categoryRenderer } from "/js/renderers/category.js";
import { photosAPI } from "/js/api/photos.js";
import { commentsAPI } from "/js/api/comments.js";
import { ratingsAPI } from "/js/api/ratings.js";
import { categoriesAPI } from "/js/api/categories.js";
import { sessionManager } from "/js/utils/session.js";
import { badLanguage } from "/js/utils/badLanguage.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { mp_zoom } from "/js/libs/mp_zoom.js";

const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");
const userId = sessionManager.getLoggedId();

document.addEventListener("DOMContentLoaded", main);

function main(){
    loadPhoto();
    loadComments();
    loadSubmittedRating(); // Defensa
    hideActionsColumn();

    let deleteBtn = document.getElementById("button-delete");
    deleteBtn.onclick = handleDelete;
    let editBtn = document.getElementById("button-edit");
    editBtn.onclick = handleEdit;
    let CategoryBtn = document.getElementById("button-add-categories");
    CategoryBtn.onclick = handleAddCategories;
    let CategoryRemoveBtn = document.getElementById("button-remove-categories");
    CategoryRemoveBtn.onclick = handleRemoveCategories;
    let commentForm = document.getElementById ("id-comment-form");
    commentForm.onsubmit = handleSubmitComment;
    let ratingForm = document.getElementById ("id-rating-form");
    ratingForm.onsubmit = handleSubmitRating;
   
    
    
}
function loadPhoto(){
    photosAPI
        .getById(photoId)
        .then(photo => {
            let photoDetails = photoRenderer.asDetails(photo);
            let container = document.getElementById("photo_details");
            container.appendChild(photoDetails);
            mp_zoom.activate();
            loadCategories();
            
        })
        .catch(err => messageRenderer.showErrorMessage(err))
}
function loadCategories(){
    categoriesAPI
            .getPhotoCategories(photoId)
            .then(categories => {
                for (let c of categories){
                    let categoryLink = categoryRenderer.asPhotoDetail(c);
                    let categoriesSpace=document.getElementById("photo-details-categories");
                    categoriesSpace.appendChild(categoryLink)
                }})
                .catch(err => { 
                    if (err=="Not found"){
                        let categoriesSpace=document.getElementById("photo-details-categories");
                        categoriesSpace.remove();
                    }
                    else{
                        messageRenderer.showErrorMessage(err);
                    }
                    });
}
function loadComments(){
    commentsAPI
        .getById(photoId)
        .then(comments => {
            for (let i of comments){
                let commentItem = commentsRenderer.asListElement(i);
                let container = document.getElementById("published-comments");
                container.appendChild(commentItem);
                }
            
        })
        .catch(err => { 
            if (err!=="Not found"){
                messageRenderer.showErrorMessage(err);
            }
            });
}
function loadSubmittedRating(){
    ratingsAPI
        .getSubmittedScore(photoId,userId)
        .then(rating => {
            let container = document.getElementById("current-score");
            let html= `<span>Your rating: ⭐${rating.score}</span>`;
            let current = parseHTML(html);
            container.appendChild(current);
        })
        .catch(err => { 
            if (err!=="Not found"){
                messageRenderer.showErrorMessage(err);
            }
            });
}
function handleDelete (event){
    photosAPI.delete ( photoId )
    .then(data => window.location.href = "index.html")
    .catch(error => messageRenderer.showErrorMessage (error));
   
}
function handleEdit (event){
    window.location.href = " edit_photo.html?photoId=" + photoId;
    };
function handleAddCategories (event){
    window.location.href = " add_categories.html?photoId=" + photoId;
    };
function handleRemoveCategories (event){
    window.location.href = " remove_categories.html?photoId=" + photoId;
    };

function handleSubmitComment(event){
    event.preventDefault(); // Evitar submit del navegador
    let form = event.target; // Captura del objeto formulario
    let formData = new FormData (form);
    for (let v of formData.values()){
        var commentString = new String(v);
    }
    if (badLanguage(commentString)===0){
        formData.append ("userId",userId); //aqui va el id del usuario logueado
        formData.append("photoId",photoId);
        commentsAPI
        .create(formData)
        .then( data => window.location.reload())
        .catch( error => messageRenderer.showErrorMessage( error ));
    }
    else{
        messageRenderer.showErrorMessage("Please, mind your language")
    }
    
}
function handleSubmitRating(event){
    event.preventDefault(); // Evitar submit del navegador
    let form = event.target; // Captura del objeto formulario
    let formData = new FormData (form);
    formData.append ("userId", userId); //aqui va el id del usuario logueado
    formData.append("photoId",photoId)
    ratingsAPI.create(formData)
    .then( data => window.location.reload())
    .catch(err => { 
        if (err.includes("for key 'userId'")){
            messageRenderer.showWarningMessage("You already rated this photo")
        }
        else if (err.includes("Column 'score' cannot be null")){
            messageRenderer.showWarningMessage("Please, select a score")
        }
        else{
            messageRenderer.showErrorMessage(err);
        }
        });
}
function hideActionsColumn(){
    let actions_col = document.getElementById("actions-col");
    let action_rating = document.getElementById("action-rating");
    let action_comment = document.getElementById("action-comment");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
        action_comment.style.display = "none";
        action_rating.style.display = "none";
        messageRenderer.showSuccessMessage("Login or Register to rate and comment on this post");
    }
    }
