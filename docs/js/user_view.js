"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { titleRenderer } from "/js/renderers/titles.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { mp_zoom } from "/js/libs/mp_zoom.js"
import { sessionManager } from "/js/utils/session.js";
import { photosAPI } from "/js/api/photos.js";
import { usersAPI } from "/js/api/users.js";
import { parseHTML } from "/js/utils/parseHTML.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const userLoggedId = sessionManager.getLoggedId();

document.addEventListener("DOMContentLoaded", main);

function main(){
    loadTitle();
    loadPrivatePhotos();
    loadPhotos();
    btnHider()
    let followForm = document.getElementById("id-follow-form");
    followForm.onsubmit = handleFollow;
    let unfollowForm = document.getElementById("id-unfollow-form");
    unfollowForm.onsubmit = handleUnfollow;
}    
function loadPhotos(){
    
    photosAPI
    .getUserPosts(userId)
    .then(photos => {
        let gallery = galleryRenderer.asCardGallery(photos);
        let galleryContainer = document.querySelector("div.gallery");
        galleryContainer.appendChild(gallery);
        mp_zoom.activate();
        })
        .catch(err => { 
        if (err!=="Not found"){
            messageRenderer.showErrorMessage(err);
        }
        });
}
function loadTitle(){
    
    usersAPI
    .getUserData(userId)
    .then(user => {
        let userDetails = titleRenderer.asUser(user);
        let container = document.querySelector("div.title");
        container.appendChild(userDetails);
        
        mp_zoom.activate();

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}
function loadPrivatePhotos(){
    let galleryContainer = document.querySelector("div.private-gallery");
    let privateTitle = parseHTML(`<h3>Your private posts</h3>`);
    let separator = parseHTML(`<hr>`);
    if(userId==userLoggedId){
        photosAPI
        .getRecentPrivate(userLoggedId)
        .then(photos => {
            galleryContainer.appendChild(privateTitle);
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            galleryContainer.appendChild(separator);
            mp_zoom.activate();
            

        })
        
        .catch(err => { 
            if (err!=="Not found"){
                messageRenderer.showErrorMessage(err);
            }
            });
    }
    
}
function btnHider(){
    usersAPI
        .getFollow(userId,userLoggedId)
        .then(follow => { // Usuario ya seguido, seguimiento encontrado
            let btnUnfollow = parseHTML(`<button id="button-unfollow" type="submit" class="post-photo btn border-primary display-inline-block text-primary btn-dark">Unfollow</button>`);
            let unfollowForm = document.getElementById("id-unfollow-form")
            unfollowForm.appendChild(btnUnfollow);
            
        })
        .catch(err => { // Usuario no seguido, seguimiento no encontrado
            if (err=="Not found"){ 
                let btnFollow = parseHTML(`<button id="button-follow" type="submit" class="post-photo btn btn-primary">Follow</button>`);
                let followForm = document.getElementById("id-follow-form")
                followForm.appendChild(btnFollow);
            }else{
                messageRenderer.showErrorMessage(err)
            }
        });
}
function handleFollow(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append ("userFollowedById",sessionManager.getLoggedId()); //aqui va el id del usuario seguidor
    formData.append ("userFollowsId",userId); //aqui va el id del usuario seguido
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    usersAPI.createFollow(formData)
    .then( data => location.reload())
    .catch(err => { 
        if (err=="Incorrect integer value: 'null' for column `proyecto_api_iissi`.`usersusers`.`userFollowedById` at row 1"){
            messageRenderer.showWarningMessage("Login or Register to follow users");
        }
        else if(err.includes("CONSTRAINT `invalidAutoFollow` failed")){
            messageRenderer.showErrorMessage("You cannot follow yourself. Egocentric...");
        }
        else if(err.includes("for key 'userFollowsId'")){
            messageRenderer.showWarningMessage("You already follow this user");
        }
        else{
            messageRenderer.showErrorMessage(err);
        }
        });
    
}
function handleUnfollow (event) {
    event.preventDefault();
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    usersAPI.deleteFollow(userId,sessionManager.getLoggedId())
    .then(data => location.reload())
    .catch(error => messageRenderer.showErrorMessage (error));
   
}
