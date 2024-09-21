"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { titleRenderer } from "/js/renderers/titles.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { mp_zoom } from "/js/libs/mp_zoom.js"
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("categoryId");

document.addEventListener("DOMContentLoaded", main);

function main(){
    loadPhotos();
    loadTitle();
    
}    
function loadPhotos(){
    photosAPI
    .getCategoryPosts(categoryId)
    .then(photos => {
        let gallery = galleryRenderer.asCardGallery(photos);
        let galleryContainer = document.querySelector("div.gallery");
        galleryContainer.appendChild(gallery);
        mp_zoom.activate();
        })
        .catch(err => { 
            if (err=="Not found"){
                messageRenderer.showSuccessMessage("Be the first one to post here!")
            }else{
                messageRenderer.showErrorMessage(err);

            }
            });
        
 
}
function loadTitle(){
    
    categoriesAPI
    .getCategoryData(categoryId)
    .then(category => {
        let CategoryDetails = titleRenderer.asCategory(category);
        let container = document.querySelector("div.title");
        container.appendChild(CategoryDetails);
        
        mp_zoom.activate();

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}
