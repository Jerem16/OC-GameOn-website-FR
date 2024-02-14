const menuMobile = document.getElementById("mytopNav");

function editNav() {
    if (menuMobile.className === "topNav") {
        menuMobile.className += " responsive";
    } else {
        menuMobile.className = "topNav";
    }
}

// DOM Elements
const modalBkg = document.querySelector(".bground");
const openModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
openModalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
    modalBkg.style.display = "block";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);
// close modal event
function closeModal() {
    modalBkg.style.display = "none";
}
