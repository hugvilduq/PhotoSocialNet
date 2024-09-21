/*
	C.Arévalo
	auth.js.  API Rest para gestionar Registro y Login con email/password 
	Marzo/2021
*/
"use_strict";
import { BASE_URL , requestOptions } from "./common.js";
const authAPI = {
    login: function(formData){
        return new Promise(function (resolve, reject) {
        axios
            .post(`${BASE_URL}/login`, formData , requestOptions)
            .then(response=>resolve(response.data))
            .catch(error=>reject(error.response.data.message));
        });
    },

    register: function(formData){
        return new Promise(function(resolve, reject) {
        axios
            .post(`${BASE_URL}/register`, formData , requestOptions)
            .then(response=>resolve(response.data))
            .catch(error=>reject(error.response.data.message));
        });
    },
};
export { authAPI };