"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { tableRenderer } from "/js/renderers/category-table.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { usersAPI } from "/js/api/users.js";
import { mp_zoom } from "/js/libs/mp_zoom.js"


function main(){
    loadCategories();
    loadTopRatedUsers();
    loadTopFollowedUsers();
    loadPhotos();
    loadPhotos2();
    
    
}
function loadCategories(){
    let listContainer = document.getElementById("top-category-list");

    categoriesAPI
        .getTopCategories()
        .then(categories => {
            let gallery = tableRenderer.asCategoryTable(categories);
            listContainer.appendChild(gallery);
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}
function loadTopFollowedUsers(){
    let listContainer = document.getElementById("top-followed-users-list");
    usersAPI
        .getTopFollowedUsers()
        .then(users => {
            let gallery = tableRenderer.asUserTable(users);
            listContainer.appendChild(gallery);
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}
function loadTopRatedUsers(){
    let listContainer = document.getElementById("top-rated-users-list");
    
    usersAPI
        .getTopRatedUsers()
        .then(users => {
            let gallery = tableRenderer.asUserTable(users);
            listContainer.appendChild(gallery);
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}

function loadPhotos(){
    let galleryContainer = document.querySelector("div.gallery");
    
    photosAPI
        .getTopRated()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            mp_zoom.activate();
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}


function loadPhotos2(){
    let galleryContainer2 = document.querySelector("div.gallery2");

    photosAPI
        .getTopCommented()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer2.appendChild(gallery);
            mp_zoom.activate();
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
}
document.addEventListener("DOMContentLoaded", main);
