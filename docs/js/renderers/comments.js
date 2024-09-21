"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
 const commentsRenderer = {
    asListElement: function(comment){
        let html= `<div><li class="list-group-item bg-dark">
                    <a href="user_view.html?userId=${comment.userId}">
                    <img src=${comment.profilePicUrl} class="user-comment-img">
                    <span class="comment-author">@${comment.username}</span></a>
                    <span class="small text-secondary"> on ${comment.publishDate}</span></li>
                    <li class="list-group-item bg-dark"><p>${comment.commentText}</p></li></div>`;
        let li = parseHTML(html);
        return li;
    }
 };
 export {commentsRenderer};