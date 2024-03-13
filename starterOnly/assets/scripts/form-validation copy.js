//! FormData Name Section   ------------------------------------------------------//
//* DOM Selector Elements
/**
 * @param {HTMLInputElement} firstNameInput - The input element for the first name.
 * @param {HTMLElement} firstNameError - The element to display error message for the first name.
 * @param {HTMLInputElement} lastNameInput - The input element for the last name.
 * @param {HTMLElement} lastNameError - The element to display error message for the last name.
 */
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.querySelector(".firstName[data-error-visible]");
const lastNameInput = document.getElementById("lastName");
const lastNameError = document.querySelector(".lastName[data-error-visible]");

/**
 * ? To Validates first or last Name input must be contain minimum 2 characters
 * @param {string} inputVerification - The input element to verify.
 * @param {string} printError - The element to display error message.
 */
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

//! FormData Email Section  ------------------------------------------------------//
/**
 * * DOM Selector Elements
 * @param {HTMLInputElement} emailInput - The input element for the email.
 * @param {HTMLElement} emailError - The element to display error message for the email.
 */
const emailInput = document.getElementById("email");
const emailError = document.querySelector(".email[data-error-visible]");

/**
 * ? To validate email, it must be in correct format
 * @param {string} inputVerification - The input element to verify.
 * @param {string} printError - The element to display error message.
 */
function validateEmail(inputVerification, printError) {
    let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegExp.test(inputVerification.value)) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }

    // Add input event to reevaluate validation on every change
    inputVerification.addEventListener("change", () => {
        validateEmail(inputVerification, printError);
    });
}

//! FormData Birth Day Section  ------------------------------------------------------//
/**
 * * DOM Selector Elements
 * @param {HTMLInputElement} birthDateInput - The input element for the email.
 * @param {HTMLElement} birthDateError - The element to display error message for the email.
 */
const birthDateInput = document.getElementById("birthDate");
const birthDateError = document.querySelector(".birthDate[data-error-visible]");

function validateInput(inputVerification, printError) {
    if (!inputVerification.value || isNaN(inputVerification.value)) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }
}
/**
 * ? Calculates age based on birth date .
 * @param {Date} birthDate - The birth date.
 * @param {Date} currentDate - The current date.
 * @returns {number}- Return age calculated based on the birth date.
 */
function calculateAge(inputVerification, currentDate) {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const birthMonth = inputVerification.getMonth();
    const birthDay = inputVerification.getDate();

    let age = currentDate.getFullYear() - inputVerification.getFullYear();

    if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
    ) {
        age--;
    }
    return age;
}

/**
 * ? Validates the birth date to ensure the user is at least 12 years old.
 * @param {Date} birthDate - The birth date.
 * @param {Date} currentDate - The current date.
 * @param {function} calculateAge - The function to calculate the age based on the birth date and current date.
 * @param {string} birthDateError - The element to display error message for the birth date.
 */
function validateBirthDate(inputVerification, printError) {
    // Get the current date
    const currentDate = new Date();

    // Convert the birth date string to a Date object
    const birthDate = new Date(inputVerification.value);

    // Calculate age based on the birth date and current date
    const age = calculateAge(birthDate, currentDate);

    if (!inputVerification.value || age < 12) {
        printError.setAttribute("data-error-visible", "true");
    } else {
        printError.setAttribute("data-error-visible", "false");
    }

    // Add an input event listener to re-validate on every change
    inputVerification.addEventListener("change", () => {
        validateBirthDate(inputVerification, printError);
    });
}

// validateBirthDate(birthDateInput, birthDateError);

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
    inputVerification.addEventListener("change", () => {
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

    const errors = document.querySelectorAll("[data-error-visible=true]");
    console.log("errors", errors);
    return errors.length === 0;
}

reserveForm.addEventListener("submit", function (event) {
    if (!validate()) {
        event.preventDefault();
        console.log("no submit");
    }
});
