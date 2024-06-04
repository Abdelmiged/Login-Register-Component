let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let logoutBtn = document.getElementById("logoutButton");
var loadingScreen = document.querySelector(".loading-screen");

document.querySelector("h1").textContent = `Welcome ${currentUser.name} to Zoology.`;

logoutBtn.addEventListener("click", function() {
    open("../../index.html");
    close();
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