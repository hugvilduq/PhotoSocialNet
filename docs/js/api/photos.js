"use strict";
import { BASE_URL, requestOptions } from "/js/api/common.js";

const photosAPI = {
    getAll: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getRecent: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/recent")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getRecentPrivate: function(userId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/recent/"+userId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function(photoId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/" + photoId)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
    getTopRated: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/top_rated")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getTopCommented: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/top_commented")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getUserPosts: function(userId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/users/" + userId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getCategoryPosts: function(categoryId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/categories/" + categoryId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getFollowedPosts: function(userId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/photos/followedBy/" + userId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function (formData) {
        return new Promise (function(resolve,reject){
            axios.post(BASE_URL + "/photos", formData)
                .then(response => {
                    resolve (response.data);
                })
                .catch(error => reject (error.response.data.message));
        });
    },
    update: function (photoId,formData) {
        return new Promise (function(resolve,reject){
            axios.put(BASE_URL + "/photos/" + photoId , formData)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    delete: function (photoId) {
        return new Promise (function(resolve,reject){
            axios.delete(BASE_URL + "/photos/" + photoId)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    
        
    
};


export { photosAPI };