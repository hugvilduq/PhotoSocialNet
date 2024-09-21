"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { photosAPI } from "/js/api/photos.js";
import { mp_zoom } from "/js/libs/mp_zoom.js";
import { parseHTML } from "/js/utils/parseHTML.js";

document.addEventListener("DOMContentLoaded", main);
const userId = sessionManager.getLoggedId()

function main(){
    loadPrivatePhotos();
    loadPhotos();
    
}    
function loadPhotos(){
    let galleryContainer = document.querySelector("div.gallery");

    photosAPI
        .getRecent()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            mp_zoom.activate();
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}
function loadPrivatePhotos(){
    let galleryContainer = document.querySelector("div.private-gallery");
    let privateTitle = parseHTML(`<h3> 🔒 Your private posts</h3>`);
    photosAPI
        .getRecentPrivate(userId)
        .then(photos => {
            galleryContainer.appendChild(privateTitle);
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            mp_zoom.activate();
            

        })
        
        .catch(err => { 
            if (err!=="Not found"){
                messageRenderer.showErrorMessage(err);
            }
            });
}

