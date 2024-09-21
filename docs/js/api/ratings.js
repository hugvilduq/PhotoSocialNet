"use strict";
import { BASE_URL, requestOptions } from "/js/api/common.js";

const ratingsAPI = {
    getSubmittedScore: function(photoId,userId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/score/photos/"+ photoId +"/"+userId)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
    create: function (formData) {
        return new Promise (function(resolve,reject){
            axios.post(BASE_URL + "/ratings", formData)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
};


export { ratingsAPI };