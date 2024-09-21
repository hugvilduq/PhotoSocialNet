"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
 const categoryRenderer = {
    asListElement: function(category){
        let html= `<li class="list-group-item bg-dark">
                    <a class="btn btn-primary category-button" href="category_view.html?categoryId=${category.categoryId}">${category.categoryName} - ${category.categoryScore}</a>
                    </li>`;
        let li = parseHTML(html);
        return li;
    },
    asSelectorElement: function(category){
        let html= `<option value="${category.categoryId}">${category.categoryName}</option>`;
        let li = parseHTML(html);
        return li;
    },
    asPhotoDetail: function(category){
        let html= `<a href="category_view.html?categoryId=${category.categoryId}">${category.categoryName} </a>`;
        let li = parseHTML(html);
        return li;
    },

 };
 export {categoryRenderer};