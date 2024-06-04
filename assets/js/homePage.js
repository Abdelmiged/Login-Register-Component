let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let logoutBtn = document.getElementById("logoutButton");
var loadingScreen = document.querySelector(".loading-screen");

if(currentUser)
    document.querySelector("h1").textContent = `Welcome ${currentUser.name} to Zoology.`;
else
    document.querySelector("h1").textContent = `Welcome to Zoology.`;

logoutBtn.addEventListener("click", function() {
    sessionStorage.clear();
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