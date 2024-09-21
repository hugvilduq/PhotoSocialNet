"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "/js/api/photos.js";
import { sessionManager } from "/js/utils/session.js";
import { mp_zoom } from "/js/libs/mp_zoom.js";

const userFollowerId = sessionManager.getLoggedId();

document.addEventListener("DOMContentLoaded", main);

function main(){
    loadPhotos();
}

function loadPhotos(){
    let galleryContainer = document.querySelector("div.gallery");

    photosAPI
        .getFollowedPosts(userFollowerId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            mp_zoom.activate();
            

        })
        .catch(err => { 
            if (err=="Not found"){
                messageRenderer.showSuccessMessage("Start following users to see their posts here");
            }
            });
}
