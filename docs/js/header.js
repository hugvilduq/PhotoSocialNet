"use strict";

import { sessionManager } from "/js/utils/session.js";

document.addEventListener("DOMContentLoaded", main);

function main(){
    hideHeaderOptions();
    showUser();
    addLogoutHandler();
    
}    
function showUser(){
    let title = document.getElementById ("navbar-title");
    let text;
    title.textContent = text;
    if ( sessionManager.isLogged ()) {
    let username = sessionManager.getLoggedUser().username;
    text = username;
    title.innerHTML = `<a class="text-light" href="user_view.html?userId=${sessionManager.getLoggedId()}">@${text}</a>`;
} else {
    text = "Not logged in";
    title.innerHTML = `<em class="text-light"">${text}</em>`;
    }
    }

function addLogoutHandler () {
    let logoutButton = document.getElementById ("navbar-logout");
    logoutButton.addEventListener("click", function(){
    sessionManager.logout ();
    window.location.href = "index.html";
    });
    }

function hideHeaderOptions() {
    let headerRegister = document.getElementById("navbar-register");
    let headerLogin = document.getElementById("navbar-login");
    let headerLogout = document.getElementById("navbar-logout");
    let headerFollowed = document.getElementById("navbar-followed");
    let headerCreate = document.getElementById("navbar-create");
    if ( sessionManager.isLogged ()) {
    headerRegister.style.display = "none";
    headerLogin.style.display = "none";
    } else {
    headerLogout.style.display = "none";
    headerFollowed.style.display = "none";
    headerCreate.style.display = "none";
    }
    }