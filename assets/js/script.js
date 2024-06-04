import * as validator from "./validator.js";

const tooltipShowTimer = 2000;
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

var showSignInPage = document.getElementById("showSignIn");
var showSignUpPage = document.getElementById("showSignUp");
var formsContainer = document.querySelector(".forms-container");
var infoContainer = document.querySelector(".info-cards-container");
var signInContainer = document.querySelector(".sign-in-form-container");
var signUpContainer = document.querySelector(".sign-up-form-container");
var signInBtn = document.getElementById("signInButton");
var signUpBtn = document.getElementById("signUpButton");
var signInInfo = document.querySelector(".sign-in-info");
var signUpInfo = document.querySelector(".sign-up-info");

function showSignUp() {
    formsContainer.classList.remove("move-input-cards-left");
    formsContainer.classList.add("move-input-cards-right");

    infoContainer.classList.remove("move-info-cards-right");
    infoContainer.classList.add("move-info-cards-left");
    infoContainer.classList.replace("rounded-end-4", "rounded-start-4");

    signInContainer.classList.add("hidden-input-card")
    signInContainer.classList.remove("active-input-card")

    signUpContainer.classList.add("active-input-card");
    signUpContainer.classList.remove("hidden-input-card");

    signInInfo.classList.replace("end-100", "end-0");
    signUpInfo.classList.replace("start-0", "start-100");
}

function showSignIn() {
    formsContainer.classList.remove("move-input-cards-right");
    formsContainer.classList.add("move-input-cards-left");

    infoContainer.classList.remove("move-info-cards-left");
    infoContainer.classList.add("move-info-cards-right");
    infoContainer.classList.replace("rounded-start-4", "rounded-end-4");

    signInContainer.classList.add("active-input-card")
    signInContainer.classList.remove("hidden-input-card")

    signUpContainer.classList.add("hidden-input-card");
    signUpContainer.classList.remove("active-input-card");

    signInInfo.classList.replace("end-0", "end-100");
    signUpInfo.classList.replace("start-100", "start-0");
}

function signIn(e) {
    e.preventDefault();
    let emailInputSignIn = document.getElementById("emailInputSignIn");
    let passwordInputSignIn = document.getElementById("passwordInputSignIn");

    let credentials = JSON.parse(localStorage.getItem(emailInputSignIn.value));

    if(!credentials) {
        tooltipList[0].show();
        setTimeout(() => {tooltipList[0].hide()}, tooltipShowTimer);
        return;
    }

    if(!(credentials.password == passwordInputSignIn.value)) {
        tooltipList[1].show();
        setTimeout(() => {tooltipList[1].hide()}, tooltipShowTimer);
        return;
    }

    emailInputSignIn.value = "";
    passwordInputSignIn.value = "";

    sessionStorage.setItem("currentUser", JSON.stringify({name: credentials.name, data: credentials.data}));
    open("../../assets/pages/home.html");
    close();
}

function signUp(e) {
    e.preventDefault();
    let nameInput = document.getElementById("nameInput");
    let emailInputSignUp = document.getElementById("emailInputSignUp");
    let passwordInputSignUp = document.getElementById("passwordInputSignUp"); 

    let isUsedEmail = localStorage.getItem(emailInputSignUp.value);

    if(!nameInput.value.length) {
        tooltipList[2].show();
        setTimeout(() => {tooltipList[2].hide()}, tooltipShowTimer);
        return;
    }

    if(!validator.validateEmail(emailInputSignUp.value)) {
        tooltipList[3].show();
        setTimeout(() => {tooltipList[3].hide()}, tooltipShowTimer);
        return;
    }

    if(isUsedEmail) {
        tooltipList[3]._config.title = "Email already in use";
        tooltipList[3].show();
        setTimeout(() => {tooltipList[3]._config.title = "ex: example@google.com"; tooltipList[3].hide()}, tooltipShowTimer);
        return;
    }

    if(!validator.validatePassword(passwordInputSignUp.value)) {
        tooltipList[4].show();
        setTimeout(() => {tooltipList[4].hide()}, tooltipShowTimer);
        return;
    }

    localStorage.setItem(emailInputSignUp.value, JSON.stringify({name: nameInput.value, password: passwordInputSignUp.value}));
    nameInput.value = "";
    emailInputSignUp.value = "";
    passwordInputSignUp.value = "";
    showSignInPage.click();
}

showSignInPage.addEventListener("click", showSignIn);
showSignUpPage.addEventListener("click", showSignUp);
signInBtn.addEventListener("click", signIn);
signUpBtn.addEventListener("click", signUp);