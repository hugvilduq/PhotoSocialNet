"use strict";
import { BASE_URL, requestOptions } from "/js/api/common.js";

const commentsAPI = {
    getById: function(photoId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/comments/" + photoId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    create: function (formData) {
        return new Promise (function(resolve,reject){
            axios.post(BASE_URL + "/comments", formData)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
};


export { commentsAPI };