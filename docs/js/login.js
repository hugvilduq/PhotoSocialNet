'use strict';

import { authAPI } from './api/auth.js';
import { sessionManager } from './utils/session.js';
import { messageRenderer } from './renderers/messages.js';

// DOM elements that we will use
const loginForm = document.getElementById("login-form");

document.addEventListener("DOMContentLoaded", function () { // Control del documento
    loginForm.addEventListener("submit", function (event) { // Controlador del Submit
        event.preventDefault();  // Inhibir el envío del formulario
		document.getElementById("errors").innerHTML = ""; // Limpiar errores
		sendLogin(new FormData(loginForm)); // Envío del formulario para Login como formData
    });
});

function sendLogin(formData) {
    authAPI.login(formData)
        .then(loginData => {// Login satisfactorio. Se guarda en localStorage
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html"; // Al inicio para mostrar usuario conectado
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}
