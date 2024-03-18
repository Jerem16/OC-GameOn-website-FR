//!! Modal Open/Close */
//* DOM Elements
const modalBkg = document.querySelector(".modal-bg");
const modalForm = document.querySelector(".modal-bg > .content");
const openModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");

//? Function open/close modal
function launchModal() {
    //? Open modal function.
    modalBkg.style.display = "block";
}
//? launch modal btn event
openModalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


function closeModal() {
    if (reserveForm.dataset.readyToSubmit === "true") {
        //! If the form has been validated and submitted, submitted form upon modal closure.
        reserveForm.submit();
    }
    //? Close modal function.
    modalBkg.style.display = "none";
}
//? close modal btn event
modalBkg.addEventListener("click", closeModal);
//? close modal on background click
closeModalBtn.addEventListener("click", () => {
    closeModal();
});
//? Stop Close Modal Propagation
modalForm.addEventListener("click", (event) => {
    // Stop Close modal event from propagating to the modalBkg
    event.stopPropagation();
});
