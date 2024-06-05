const tooltipShowTimer = 2000;
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let logoutBtn = document.getElementById("logoutButton");
var loadingScreen = document.querySelector(".loading-screen");
var gridOptions = document.querySelector(".grid-options");
var isVisibleGrid = false;
var isVisibleForm = false;
var isSingleColumn = true;
var gridLayoutBtn = document.getElementById("gridLayoutButton");
var singleColumnGridBtn = document.getElementById("singleColumnGridButton");
var multiColumnGridBtn = document.getElementById("multiColumnGridButton");
var addCardBtn = document.getElementById("addCardButton");
var addCardForm = document.querySelector(".add-card-form");
var submitCardBtn = document.getElementById("submitCardButton");
var cardsContainer = document.querySelector(".cards-container .row");

if(currentUser.data != "")
    displayData();

singleColumnGridBtn.addEventListener("click", function() {
    tooltipList[0].hide();
    singleColumnGrid();
});

multiColumnGridBtn.addEventListener("click", function() {
    tooltipList[1].hide();
    multiColumnGrid();
})

submitCardBtn.addEventListener("click", submitCard);

if(currentUser)
    document.querySelector("h1").textContent = `Welcome ${currentUser.name} to your Zoology.`;
else
    document.querySelector("h1").textContent = `Welcome to your Zoology.`;

logoutBtn.addEventListener("click", function() {
    localStorage.setItem(currentUser.email, JSON.stringify({name: currentUser.name, password: currentUser.password, data: cardsContainer.innerHTML}));
    history.back();
});

initiateWebsiteLoading();

function initiateWebsiteLoading() {
    let loadingChildren = loadingScreen.getElementsByClassName("child");
    Array.from(loadingChildren).forEach((item) => {
        item.style.animationPlayState = "running";
    })

    function removeLoadingParent() {
        loadingScreen.remove();
    }

    setTimeout(removeLoadingParent, 1300);
}

gridLayoutBtn.addEventListener("click", function() {
    tooltipList[3].hide();

    if(!isVisibleGrid) {
        gridOptions.classList.remove("move-grid-options-down");
        gridOptions.classList.add("move-grid-options-up");
        isVisibleGrid = true;
    }
    else {
        gridOptions.classList.remove("move-grid-options-up");
        gridOptions.classList.add("move-grid-options-down");
        isVisibleGrid = false;
    }
});

addCardBtn.addEventListener("click", function() {
    if(!isVisibleForm) {
        addCardForm.classList.remove("move-form-down");
        addCardForm.classList.add("move-form-up");
        isVisibleForm = true;
    }
    else {
        addCardForm.classList.remove("move-form-up");
        addCardForm.classList.add("move-form-down");
        isVisibleForm = false;
    }
})

function singleColumnGrid() {
    let animalCards = document.querySelectorAll(".animal-card");
    Array.from(animalCards).forEach((item) => {
        item.classList.replace("col-md-6", "col-md-12");
        item.children[0].classList.replace("flex-md-column", "flex-md-row");
        item.children[0].classList.remove("text-center");
        item.children[0].children[0].classList.remove("ms-md-auto", "me-md-auto", "mb-md-4");
    });
    isSingleColumn = true;
}

function multiColumnGrid() {
    let animalCards = document.querySelectorAll(".animal-card");
    Array.from(animalCards).forEach((item) => {
        item.classList.replace("col-md-12", "col-md-6");
        item.children[0].classList.replace("flex-md-row", "flex-md-column");
        item.children[0].classList.add("text-center");
        item.children[0].children[0].classList.add("ms-md-auto", "me-md-auto", "mb-md-4");
    });
    isSingleColumn = false;
}

function submitCard(e) {
    e.preventDefault();
    let animalNameInput = document.getElementById("animalNameInput");
    let animalImageInput = document.getElementById("animalImageInput");
    let animalDescriptionInput = document.getElementById("animalDescriptionInput");

    if(!animalImageInput.value.length) {
        tooltipList[5].show();
        setTimeout(() => {tooltipList[5].hide()}, tooltipShowTimer);
        return;
    }

    if(!animalImageInput.value.length) {
        tooltipList[6].show();
        setTimeout(() => {tooltipList[6].hide()}, tooltipShowTimer);
        return;
    }

    if(!animalDescriptionInput.value.length) {
        tooltipList[7].show();
        setTimeout(() => {tooltipList[7].hide()}, tooltipShowTimer);
        return;
    }

    let animalCard = createAnimalCard(animalNameInput.value, animalImageInput.value, animalDescriptionInput.value);

    cardsContainer.append(animalCard);
    addCardBtn.click();
}

function createAnimalCard(animalName, animalImageLink, animalDescription) {
    let div = document.createElement("div");
    div.classList = `animal-card col-12 ${(isSingleColumn) ? "col-md-12" : "col-md-6"} d-flex flex-column p-3 mb-3`;
    div.innerHTML = `
        <div class="animal-info h-100 d-flex flex-column ${(isSingleColumn) ? 'flex-md-row' : 'flex-md-column'} ${(isSingleColumn) ? '' : 'text-center'}">
            <img class="mb-4 me-md-3 mb-md-0 rounded-2 ${(isSingleColumn) ? '' : 'ms-md-auto me-md-auto mb-md-4'}" src=${animalImageLink}>
            <div class="info w-100 h-100">
                <h2 class="mb-4">${animalName}</h2>
                <p class="lead">${animalDescription}</p>
            </div>
        </div>
        <button id="deleteCardButton" onclick="deleteCard(event)" class="btn border-1 mt-3 mb-3 ms-auto rounded-pill text-uppercase text-white border-white fw-bold"><div class="button-overlay px-5 py-2 rounded-pill d-flex justify-content-center align-items-center">Delete</div></button>
    `;
    return div;
}

function deleteCard(event) {
    event.target.parentElement.parentElement.remove();
}

function displayData() {
    cardsContainer.innerHTML += currentUser.data;
}