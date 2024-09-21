"use strict";
import { BASE_URL, requestOptions } from "/js/api/common.js";

const usersAPI = {
    getUserData: function(userId){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/users/" + userId)
                .then(response => resolve(response.data[0]))
                .catch(error => reject(error.response.data.message));
        });
    },
    
    getTopRatedUsers: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/users/top_rated")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getTopFollowedUsers: function(){
        return new Promise(function(resolve,reject){
            axios.get(BASE_URL + "/users/top_followed")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getFollow: function (userFollowsId,userFollowedById) {
        return new Promise (function(resolve,reject){
            axios.get(BASE_URL + "/usersUsers/"+ userFollowsId +"/"+ userFollowedById)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    createFollow: function (formData) {
        return new Promise (function(resolve,reject){
            axios.post(BASE_URL + "/usersUsers", formData)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
    deleteFollow: function (userFollowsId,userFollowedById) {
        return new Promise (function(resolve,reject){
            axios.delete(BASE_URL + "/usersUsers/"+ userFollowsId +"/"+ userFollowedById)
                .then(response => resolve (response.data))
                .catch(error => reject (error.response.data.message));
        });
    },
};


export { usersAPI };