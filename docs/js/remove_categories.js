"use strict";

import { categoryRenderer } from "/js/renderers/category.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { categoriesAPI } from "/js/api/categories.js";
import { photosAPI } from "/js/api/photos.js";
import { mp_zoom } from "/js/libs/mp_zoom.js";

let urlParams = new URLSearchParams ( window.location.search ); // Query a la URL
let photoId = urlParams.get ("photoId"); // Extrae el parámetro

document.addEventListener("DOMContentLoaded", main);

function main(){
    loadCurrentCategories();
    loadCurrentPhoto();
    let form = document.getElementById("category-form");
    form.onsubmit = submitForm;
    let finishBtn = document.getElementById("finish-btn");
    finishBtn.onclick = handleFinish;
}    

function loadCurrentCategories(){
    let selectorContainer = document.getElementById("input-categories");
    let currentBox = document.getElementById("current-categories");
    categoriesAPI
        .getPhotoCategories(photoId)
        .then(categories => {
            console.log(categories);
            for (let c of categories){
                let currentcategory = categoryRenderer.asPhotoDetail(c);
                currentBox.appendChild(currentcategory);
                let categoryOption = categoryRenderer.asSelectorElement(c);
                selectorContainer.appendChild(categoryOption);
            }
            
        })
        .catch(err => { 
            if (err=="Not found"){
            }
            else{
                messageRenderer.showErrorMessage("err");
            }
            });
}
function submitForm(event){
    event.preventDefault();
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    let form = event.target;
    let formData = new FormData(form);
    
    for (let v of formData.values()){
        var categoryId = v;
    }
    categoriesAPI
        .removeCategoryPost(categoryId,photoId)
        .then(categories => location.reload())
        .catch(err => messageRenderer.showErrorMessage(err))
}
function handleFinish (event) {
    window.location.href = `photo_details.html?photoId=${photoId}`;
}
function loadCurrentPhoto(){
    photosAPI
        .getById(photoId)
        .then(photo => {
            let photoDetails = photoRenderer.asPreviewCard(photo);
            let container = document.getElementById("photo_details");
            container.appendChild(photoDetails);
            mp_zoom.activate();
        })
        .catch(err => messageRenderer.showErrorMessage("err"))
}
