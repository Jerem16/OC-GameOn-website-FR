//! FormData
//* DOM Elements
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.querySelector(".firstName[data-error-visible]");

const lastNameInput = document.getElementById("lastName");
const lastNameError = document.querySelector(".lastName[data-error-visible]");

function validateName(inputVerification, printError) {
    if (inputVerification.value.length < 2) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }
    inputVerification.addEventListener("change", () => {
        validateName(inputVerification, printError);
    });
}

const emailInput = document.getElementById("email");
const emailError = document.querySelector(".email[data-error-visible]");

function validateEmail(inputVerification, printError) {
    // Créez l'expression régulière sans les délimiteurs /
    let emailRegExp = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    // Vérifiez si l'adresse e-mail correspond à l'expression régulière
    if (!emailRegExp.test(inputVerification.value)) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }

    // Ajoutez l'événement de changement pour réévaluer la validation lors de chaque changement
    inputVerification.addEventListener("input", () => {
        validateEmail(inputVerification, printError);
    });
}

const birthDateInput = document.getElementById("birthDate");
const birthDateError = document.querySelector(".birthDate[data-error-visible]");

function validateBirthDate(inputVerification, printError) {
    // Récupérer la date actuelle
    let currentDate = new Date();

    // Convertir la date de naissance en objet Date
    let birthDate = new Date(inputVerification.value);

    // Calculer l'âge en prenant en compte la date d'anniversaire
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    console.log("age", age);
    // Vérifier si l'utilisateur a déjà célébré son anniversaire cette année
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }
 ; 
    // Vérifier si l'utilisateur a plus de 12 ans
    if (age < 12) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }

    // Ajouter un écouteur d'événements pour réévaluer la validation à chaque changement
    inputVerification.addEventListener("input", () => {
        validateBirthDate(inputVerification, printError);
    });
}

// Appeler la fonction initialement pour effectuer la validation
validateBirthDate(birthDateInput, birthDateError);

const tournamentsInput = document.querySelector('input[name="tournaments"]');
const tournamentsError = document.querySelector(
    ".tournaments[data-error-visible]"
);

function validateInputNumber(inputVerification, printError) {
    if (
        !inputVerification.value ||
        isNaN(inputVerification.value) ||
        inputVerification.value < 0 ||
        inputVerification.value > 99
    ) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }
    inputVerification.addEventListener("input", () => {
        validateInputNumber(inputVerification, printError);
    });
}

const locationInputs = document.querySelectorAll('input[type="radio"]');
const locationError = document.querySelector(
    ".formData_location[data-error-visible]"
);
const cguCheckbox = document.getElementById("checkbox-cgu");
const cguError = document.querySelector(".form-cgu[data-error-visible]");

function validateCheckbox(inputVerification, printError) {
    // TODO: Création du tableau d'éléments avec Array.from(); la méthode "some" vérifie si l'un des éléments du tableau "input.checked" est vrai

    let isChecked = Array.from(inputVerification).some(
        (input) => input.checked
    );
    // TODO: Affiche un message d'erreur si "input.checked"  false
    printError.setAttribute("data-error-visible", isChecked ? "false" : "true");
}

function checked(inputVerification, printError) {
    printError.setAttribute(
        "data-error-visible",
        inputVerification.checked ? "false" : "true"
    );
}

function addCheckedAttribute(inputElement) {
    inputElement.setAttribute("checked", true);
}

cguCheckbox.addEventListener("change", () => {
    checked(cguCheckbox, cguError);
    addCheckedAttribute(cguCheckbox);
});

for (const input of locationInputs) {
    input.addEventListener("change", () => {
        // Mettre à jour l'erreur en fonction de l'état du bouton radio
        // validateCheckbox(input, locationError);

        // Désélectionner tous les boutons radio
        for (const otherInput of locationInputs) {
            otherInput.removeAttribute("checked");
        }

        // Sélectionner le bouton radio actuel
        addCheckedAttribute(input);
        validateCheckbox(locationInputs, locationError);
    });
}

//** Validate Function */
const reserveForm = document.getElementById("reserveForm");

function validate() {
    validateName(firstNameInput, firstNameError);
    validateName(lastNameInput, lastNameError);
    validateEmail(emailInput, emailError);
    validateInputNumber(tournamentsInput, tournamentsError);
    validateBirthDate(birthDateInput, birthDateError);
    checked(cguCheckbox, cguError);
    validateCheckbox(locationInputs, locationError);

    // return (
    //     cguError.getAttribute("data-error-visible") === "false" &&
    //     locationError.getAttribute("data-error-visible") === "false"
    // );
}

reserveForm.addEventListener("submit", function (event) {
    if (!validate()) {
        event.preventDefault();
        console.log("no submit");
    }
});
