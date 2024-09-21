"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { categoryRenderer } from "/js/renderers/category.js";
import { userBtnRenderer } from "/js/renderers/user_btn.js";


const tableRenderer = {
    asCategoryTable: function(categories){
        let html = `<div></div>`;
        let table = parseHTML(html);

        for(let category of categories){
            let li = categoryRenderer.asListElement(category);
            table.appendChild(li);
        }

        return table;
    },
    asUserTable: function(users){
        let html = `<div></div>`;
        let table = parseHTML(html);

        for(let user of users){
            let li = userBtnRenderer.asListElement(user);
            table.appendChild(li);
        }

        return table;
    }

};

export { tableRenderer }