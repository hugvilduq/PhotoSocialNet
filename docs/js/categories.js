"use strict";

import { tableRenderer } from "/js/renderers/category-table.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { categoriesAPI } from "/js/api/categories.js";

function main(){
    loadCategories();
    
}
function loadCategories(){
    let listContainer = document.getElementById("category-list");

    categoriesAPI
        .getAll()
        .then(categories => {
            let gallery = tableRenderer.asCategoryTable(categories);
            listContainer.appendChild(gallery);
            

        })
        .catch(err => messageRenderer.showErrorMessage(err));
 
}
document.addEventListener("DOMContentLoaded", main);