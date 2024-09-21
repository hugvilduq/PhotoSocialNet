"use strict";
import { BASE_URL, requestOptions } from "/js/api/common.js";

const categoriesAPI = {
    getAll: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/categories")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getPhotoCategory: function(photoId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/categories/" + photoId)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
    getPhotoCategories: function(photoId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/categories/photo/" + photoId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getTopCategories: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/categories/top_categories")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getCategoryData: function(categoryId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/categories/" + categoryId)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
    create: function (formData) {
        return new Promise (function(resolve,reject){
            axios.post(BASE_URL + "/categories", formData)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    addCategoryPost: function (formData) {
        return new Promise (function(resolve,reject){
            axios.post(BASE_URL + "/categoriesPhotos", formData)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    removeCategoryPost: function (categoryId,photoId) {
        return new Promise (function(resolve,reject){
            axios.delete(BASE_URL + "/categoriesPhotos/"+categoryId+"/"+photoId )
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    
};


export { categoriesAPI };