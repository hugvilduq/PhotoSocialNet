"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
 const photoRenderer = {
    asCard: function(photo){
        let html= `<div class="col-lg-4">
                        <div class="card-dark btn-dark">
                            <div  class="card-header">
                                <h5  class="card-title">${photo.title}</h5>
                                </div>
                                <a title="${photo.title}" class="simg" href=${photo.photoUrl}>
                                <img src=${photo.photoUrl} class="img-fluid-card-image card-img-top"></a>
                                <div class="card-footer align-bottom">
                                <p class="card-text">${photo.description}</p>
                                <a href="photo_details.html?photoId=${photo.photoId}" class="btn btn-lg btn-block btn-primary card-link">View details</a>
                            </div>
                        </div>
                    </div>`;
        let card = parseHTML(html);
        return card;
    },
    asPreviewCard: function(photo){
        let html= `<div>
                        <div class="card-dark btn-dark">
                            <div  class="card-header">
                                <h5 class="card-title">${photo.title}</h5>
                                </div>
                                <img src=${photo.photoUrl} class="img-fluid-card-image card-img-top">
                                <div class="card-footer align-bottom">
                                <p class="card-text">${photo.description}</p>
                                <a href="photo_details.html?photoId=${photo.photoId}" class="btn btn-lg btn-block btn-primary card-link">View details</a>
                            </div>
                        </div>
                    </div>`;
        let card = parseHTML(html);
        return card;
    },

    asDetails: function(photo){
        let html = `<div class="card-dark btn-dark small-margin-top" >
                        <div class="card-header">
                            <h5 class="card-title">${photo.title}</h5>
                        </div>
                        <a title="${photo.title}" class="simg" href=${photo.photoUrl}>
                        <img src=${photo.photoUrl} class="card-img-top"></a>
                        <div class="card-body">
                            <p class="card-text">${photo.description}</p>
                            <img src=${photo.profilePicUrl} class="user-comment-img"><span class="card-text"> <a href="user_view.html?userId=${photo.userId}" class="card-link">@${photo.username}</a></span>
                            <p class="card-text">⭐ ${photo.score || "-"}</p>
                            <p class="card-text">Uploaded on ${photo.uploadDate}</p>
                            <p id="photo-details-categories" class="card-text"></p>
                        </div>
                    </div>`;
        let details = parseHTML(html);
        return details;
    } 
 };

 export {photoRenderer};