"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
 const userBtnRenderer = {
    asListElement: function(user){
        let html= `<li class="list-group-item bg-dark">
                    <a class="btn btn-primary category-button" href="user_view.html?userId=${user.userId}">@${user.username} - ${user.userScore}</a>
                    </li>`;
        let li = parseHTML(html);
        return li;
    }
 };
 export {userBtnRenderer};