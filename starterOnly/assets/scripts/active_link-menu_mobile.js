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



//! Menu Mobile */
//* DOM Elements
const menuMobile = document.getElementById("myTopNav");

function editNav() {
    if (menuMobile.className === "topNav") {
        //TODO: Add openMenu class.
        menuMobile.className += " openMenu";
    } else if (menuMobile.className === "topNav closeMenu") {
        //TODO: Remove closeMenu class.
        menuMobile.classList.remove("closeMenu");
        //TODO: Add openMenu class.
        menuMobile.className += " openMenu";
    } else {
        //TODO: Reset class & add topNav class.
        menuMobile.className = "topNav";
        //TODO: Add openMenu class.
        menuMobile.className += " closeMenu";
    }
}
