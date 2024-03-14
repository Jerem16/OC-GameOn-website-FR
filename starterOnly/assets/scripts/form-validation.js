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
//* DOM Selector Elements
/**
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
//* DOM Selector Elements
/**
 * @param {HTMLInputElement} birthDateInput - The input element for the birthDate.
 * @param {HTMLElement} birthDateError - The element to display error message for the birthDate.
 */
const birthDateInput = document.getElementById("birthDate");
const birthDateError = document.querySelector(".birthDate[data-error-visible]");

//* Function P°1
//? Calculates age based on birth date.
/**
 * @param {Date} inputVerification - The birth date.
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

//* Function N°0
//? Validates the birth date to ensure the user is at least 12 years old.
/**
 * @param {Date} inputVerification - The birth date.
 * @param {Date} currentDate - The current date.
 * @param {function} calculateAge - The function to calculate the age based on the birth date and current date.
 * @param {string} printError - The element to display error message for the birth date.
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

//! FormData Tournaments Section  ------------------------------------------------------//
//* DOM Selector Elements
/**
 * @param {HTMLInputElement} tournamentsInput - The input element for the tournaments.
 * @param {HTMLElement} tournamentsError - The element to display error message for the tournaments.
 */
const tournamentsInput = document.querySelector('input[name="tournaments"]');
const tournamentsError = document.querySelector(
    ".tournaments[data-error-visible]"
);

//* Function P°1
//? Checks if the input value is defined, is a number, and is in the range [0, 99].
/**
 * @param {number} inputVerification - The value to check.
 * @param {string} printError - The element to display error message.
 * @returns {boolean} True if the value is a valid number within the specified range, otherwise false.
 */
function validateInput(inputVerification, printError) {
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
}

//* Function N°0
//? Event listener to re-validate on every change
/**
 * @param {string} inputVerification - The input element to verify.
 * @param {string} printError - The element to display error message.
 * @param {function} validateInput - Check this number is valid.
 */
function validateInputNumber(inputVerification, printError) {
    validateInput(inputVerification, printError);
    inputVerification.addEventListener("change", () => {
        validateInputNumber(inputVerification, printError);
    });
}

//! FormData Radio & CheckBox Section   ------------------------------------------------------//
//* Function Global for Radio & CheckBox
//? Adds "checked=true" attribute to the current element.
/**
 * @param {HTMLElement} inputElement - NodeListOf (Radio) or HTMLElement (checkbox)
 * @returns {string} Add attribute "checked=true" to selected elements.
 */
function addCheckedAttribute(inputElement) {
    inputElement.setAttribute("checked", true);
}

//TODO: Radio Section   ------------------------------------------------------//
//* DOM Selector Elements
/**
 * @param {NodeList} locationInputs - The input elements for [type="radio"] buttons.
 * @param {HTMLElement} locationError - Display error message on location.
 */
const locationInputs = document.querySelectorAll('input[name="location"]');
const locationError = document.querySelector(
    ".formData_location[data-error-visible]"
);

//* Function
//? Validates radio buttons to ensure at least one is selected.
/**
 * @param {NodeListOf<HTMLElement>} inputVerification - Check radio buttons to validate.
 * @param {HTMLElement} printError - Display: error message.
 */
function validateCheckbox(inputVerification, printError) {
    // Create array element's with Array.from(); the "some" method checks if any element in this array is true
    let isChecked = Array.from(inputVerification).some(
        (input) => input.checked
    );
    // If "input.checked"=> false, display error message
    printError.setAttribute("data-error-visible", isChecked ? "false" : "true");
}
//? For-off => querySelectorAll[Elements]
for (const input of locationInputs) {
    // Listen & Update the error based on the state of the radio button
    input.addEventListener("change", () => {
        // Deselect checked off all radio buttons
        for (const otherInput of locationInputs) {
            otherInput.removeAttribute("checked");
        }
        // Add checked to the current radio button
        addCheckedAttribute(input);
        validateCheckbox(locationInputs, locationError);
    });
}

//TODO: FormData Checkbox Section   ------------------------------------------------------//
//* DOM Selector Elements
/**
 * @param {HTMLInputElement} cguCheckbox - The checkbox input element for the CGU.
 * @param {HTMLElement} cguError - The element to display error message for the CGU.
 */
const cguCheckbox = document.getElementById("checkbox-cgu");
const cguError = document.querySelector(".form-cgu[data-error-visible]");

//* Function
//? Validates a checkbox to ensure it is checked.
/**
 * @param {HTMLInputElement} inputVerification - The checkbox input element to validate.
 * @param {HTMLElement} printError - Display: error message.
 */
function checked(inputVerification, printError) {
    // Display an error message if the checkbox is unchecked
    printError.setAttribute(
        "data-error-visible",
        inputVerification.checked ? "false" : "true"
    );
    // Listen Event changes to checkbox state, Update error message.
    cguCheckbox.addEventListener("change", () => {
        checked(cguCheckbox, cguError);
        addCheckedAttribute(cguCheckbox);
    });
}

//! FormData Validate() Function   ------------------------------------------------------//
//* DOM Selector Elements
const reserveForm = document.getElementById("reserveForm");
const endValidationMessage = document.querySelector(".end");

function validate() {
    validateName(firstNameInput, firstNameError);
    validateName(lastNameInput, lastNameError);
    validateEmail(emailInput, emailError);
    validateInputNumber(tournamentsInput, tournamentsError);
    validateBirthDate(birthDateInput, birthDateError);
    checked(cguCheckbox, cguError);
    validateCheckbox(locationInputs, locationError);

    const errors = document.querySelectorAll("[data-error-visible=true]");
    return errors.length === 0;
}

reserveForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validate()) {
        reserveForm.dataset.readyToSubmit = true;
        endValidationMessage.classList.remove("hidden");
        // If the form has been validated and submitted, it will be automatically submitted upon modal closure. See modal.js line 17.
    }
});
