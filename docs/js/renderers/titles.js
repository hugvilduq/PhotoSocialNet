"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
 const titleRenderer = {
    asUser: function(user){
        let html= `<div class="container-fluid">
                        <div class="row">
                            <div class="col-12 mt-3">
                                <div class="card-dark">
                                    <div class="card-horizontal">
                                        <div class="img-square-wrapper">
                                        <img src=${user.profilePicUrl} class="user-card-img">
                                        </div>
                                        <div class="user-card-text card-body">
                                            <span>@${user.username}</span>
                                            <h1 class="text-secondary">${user.firstName} ${user.lastName}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        let box = parseHTML(html);
        return box;
        
    },
    asCategory: function(category){
        let html= `<div class="container-fluid">
                        <div class="row">
                            <div class="col-12 mt-3">
                                <div class="card-dark">
                                    <div class="card-horizontal">
                                        <div class="img-square-wrapper">
                                        <img src="images/hashtag.png" class="user-card-img">
                                        </div>
                                        <div class="user-card-text card-body">
                                            <span>${category.categoryName}</span>
                                            <h1 class="text-secondary">${category.categoryScore} posts</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        let box = parseHTML(html);
        return box;
    },

 
 };

 export {titleRenderer};