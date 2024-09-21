"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { categoryRenderer } from "/js/renderers/category.js";
import { categoriesAPI } from "/js/api/categories.js";
import { sessionManager } from "/js/utils/session.js";

document.addEventListener("DOMContentLoaded", main);

function main(){
    loadCategories();
    let categoryForm = document.getElementById ("id-create-category-form");
    categoryForm.onsubmit = handleSubmitCategory;
    let finishBtn = document.getElementById("finish-btn");
    finishBtn.onclick = handleFinish;
}
function handleSubmitCategory(event){
    event.preventDefault(); // Evitar submit del navegador
    if(sessionManager.getLoggedId()!==null){
        let form = event.target; // Captura del objeto formulario
        let formData = new FormData (form);
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        
        if (formData.get("categoryName").match(/#\b/)){
            categoriesAPI.create(formData)
            .then( data => location.reload())
            .catch(err => { 
                if (err.includes("for key 'categoryName'")){
                    messageRenderer.showWarningMessage("That category already exists")
                }
                else{
                    messageRenderer.showErrorMessage(err);
                }
                });
        }else{
            messageRenderer.showErrorMessage("Please use the format: #Category")
    }
}
    else{
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        messageRenderer.showWarningMessage("Login or Register to create categories");
    }
}
function loadCategories(){
    let selectorContainer = document.getElementById("current-categories");
    categoriesAPI
        .getAll()
        .then(categories => {
            for (let c of categories){
                let categoryOption = categoryRenderer.asPhotoDetail(c);
                selectorContainer.appendChild(categoryOption);
                
            }
        })
        .catch(err => messageRenderer.showErrorMessage(err));
}
function handleFinish (event) {
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    window.location.href="categories.html";
}
