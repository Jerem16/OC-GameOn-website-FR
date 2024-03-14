//!! Modal Open/Close */
//* DOM Elements
const modalBkg = document.querySelector(".modal-bg");
const modalForm = document.querySelector(".modal-bg > .content");
const openModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
// const reserveForm = document.getElementById("reserveForm");
//? Function open/close modal
function launchModal() {
    //TODO: Open modal function.
    modalBkg.style.display = "block";
}
function closeModal() {
    //TODO: Close modal function.
    if (reserveForm.dataset.readyToSubmit === "true") {
        reserveForm.dataset.readyToSubmit = false; // Réinitialiser le statut de soumission
        reserveForm.submit(); // Soumettre le formulaire
    }
    modalBkg.style.display = "none";
}

//? launch modal btn event
openModalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//? close modal btn event
modalBkg.addEventListener("click", closeModal);
//? close modal on background click
closeModalBtn.addEventListener("click", () => {
    closeModal();
    console.log("close button");
});

//? Stop Close Modal Propagation
modalForm.addEventListener("click", (event) => {
    // Stop Close modal event from propagating to the modalBkg
    event.stopPropagation();
    console.log("Don't close");
});