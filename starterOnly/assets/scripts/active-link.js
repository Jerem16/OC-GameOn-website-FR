//!! Active Link */
//* DOM Elements
const activeLinks = document.querySelectorAll(".main-navbar a");

activeLinks.forEach(link => {
    link.addEventListener("click", () => {
        //TODO: Remove active class.
        activeLinks.forEach(otherLink => otherLink.classList.remove("active"));
        //TODO: Add active class.
        link.classList.add("active");
    });
});